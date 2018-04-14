const Models = require('../model/dataModel');
const CtrlDB = require('../model/ctrlDB');

// 处理主页的请求
const Home = {
  // GET /
  index: (req, res)=>{
    if(req.session.userid == undefined || req.session.userid == null)
      return res.render('index', {
        title: '绿铺-发现更健康的美食'        
      })
    else{
      Models.UserModel.findOne({'id': req.session.userid}, (err, user)=>{
        // normal user
        if(user.level != 2){
          CtrlDB.getAllItemInfo().then(info=>{
            return res.render('index', {
              title: '绿铺-发现更健康的美食',
              user,
              items: info.items
            })
          })        }
        // admin
        else{
          CtrlDB.getALlInfo().then(info=>{
            return res.render('index', {
              title: '绿铺-发现更健康的美食',
              user,
              users: info.users,
              items: info.items
            })
          })
        }
      })
    }
  },

  // GET /signin
  signinGet: (req, res)=>{
    req.session.userid = null;
    buildVerifyCode(req)
    res.render('signin', {
      title: '绿铺-发现更健康的美食',
      verifyCodeExpression: req.session.verifyExpression
    });
  },

  // POST /signin
  signinPost: (req, res)=>{
    if(req.body.verifyCode != req.session.verifyResult){
      buildVerifyCode(req)
      return res.render('signin',{
        title: '绿铺-发现更健康的美食',
        verifyCodeExpression: req.session.verifyExpression,
        message: '验证码错误，请重新输入！'
      });
    }
    Models.UserModel.findOne({'id': req.body.id}, (err, user)=>{
      if(user == null){
        return res.render('signin',{
          title: '绿铺-发现更健康的美食',
          verifyCodeExpression: req.session.verifyExpression,
          message: '账号不存在，请重新输入！'
        });
      }
      if(user.password !== req.body.password){
        return res.render('signin',{
          title: '绿铺-发现更健康的美食',
          verifyCodeExpression: req.session.verifyExpression,
          message: '密码错误，请重新输入！'
        });
      }

      req.session.userid = user.id;
      delete req.session.verifyExpression
      delete req.session.verifyResult
      return res.redirect(302, '/');
    });
  },

  // POST /signup
  signupPost: (req, res)=>{
    if(req.body.verifyCode != req.session.verifyResult){
      buildVerifyCode(req)
      return res.render('signin',{
        title: '绿铺-发现更健康的美食',
        verifyCodeExpression: req.session.verifyExpression,
        message: '验证码错误，请重新输入！'
      });
    }
    Models.UserModel.find({'id': req.body.id}, (err, user)=>{
      if(user.length != 0)
        return res.json({
          message: '用户名已被注册！'
        });
      else{
        Models.UserModel({
          id: req.body.id,
          name: req.body.name,
          password: req.body.password,
          level: 0
        }).save(result=>{
          return res.json({
            message: '注册成功！'
          })
        })

        req.session.userid = req.body.id
        delete req.session.verifyExpression
        delete req.session.verifyResult
        return res.redirect(302, '/');
      }
    })
  },

};

// 生成验证码
function buildVerifyCode(req){
  const chineseNums = ['零','壹','贰','叁','肆','伍','陆','柒','捌','玖'],
        chineseSymbol = ['加','减','乘'],
        x = parseInt(Math.random()*10),
        y = parseInt(Math.random()*10),
        z = parseInt(Math.random()*3)

  req.session.verifyExpression = `(${chineseNums[x]} ${chineseSymbol[z]} ${chineseNums[y]})`
  req.session.verifyResult =  z==0?x+y:z==1?x-y:x*y
}

//获取url请求客户端ip
function getIP(req) {
  var ip = req.headers['x-forwarded-for'] ||
      req.ip ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress || '';
  if(ip.split(',').length>0){
      ip = ip.split(',')[0]
  }
  return ip;
};

module.exports = Home;
