const Models = require('../model/dataModel');
const CtrlDB = require('../model/ctrlDB');

// 处理主页的请求
const Home = {
  // GET /
  index: (req, res)=>{
    const title = '首页'
    if(req.session.userid == undefined || req.session.userid == null){
      CtrlDB.getAllItem().then(info=>{
        return res.render('index', {
          title,
          items: info.items
        })
      })
    }
    else{
      Models.UserModel.findOne({'id': req.session.userid}, (err, user)=>{
        // normal user
        if(user.level != 2){
          CtrlDB.getAllItem().then(info=>{
            return res.render('index', {
              title,
              user,
              items: info.items
            })
          })
        }
        // admin
        else{
          CtrlDB.getAllInfo().then(info=>{
            return res.render('index', {
              title,
              user,
              users: info.users,
              items: info.items
            })
          })
        }
      })
    }
  },

  // GET /allitem
  allitem: (req, res)=>{
    const title = '所有商品'
    // 未登录
    if(req.session.userid == undefined || req.session.userid == null)
      CtrlDB.getAllItem().then(info=>{
        return res.render('allitem', {
          title,
          items: info.items
        })
      })
    // 已登录
    else
      Models.UserModel.findOne({'id': req.session.userid}, (err, user)=>{
        // normal user
        if(user.level != 2)
          CtrlDB.getAllItem().then(info=>{
            return res.render('allitem', {
              title,
              user,
              items: info.items
            })
          })
      })
  },

  // GET /item
  item: (req, res)=>{
    // 未登录
    if(req.session.userid == undefined || req.session.userid == null)
      Models.ItemModel.findOne({_id: req.query.id}, (err, item)=>{
        Models.ItemModel.find({}, (err, items)=>{
          return res.render('item', {
            title: item.name==undefined?'无结果':item.name,
            item,
            items
          })
        })
      })
    // 已登录
    else
      Models.UserModel.findOne({'id': req.session.userid}, (err, user)=>{
        // normal user
        if(user.level != 2)
          Models.ItemModel.findOne({_id: req.query.id}, (err, item)=>{
            Models.ItemModel.find({}, (err, items)=>{
              return res.render('item', {
                title: item.name==undefined?'无结果':item.name,
                user,
                item,
                items
              })
            })
          })
      })
  },

  // GET /search
  search: (req, res)=>{
    // 搜索结果
    let result = []
    // 未登录
    if(req.session.userid == undefined || req.session.userid == null)
      Models.ItemModel.find({}, (err, items)=>{
        for(let item of items)
          for(let tag of item.tags)
            if(tag.indexOf(req.query.name) == 0){
              result.push(item)
              break
            }


        return res.render('search', {
          title: result.length == 0?'无结果':req.query.name,
          items,
          result,
        })
      })
    // 已登录
    else
      Models.UserModel.findOne({'id': req.session.userid}, (err, user)=>{
        // normal user
        if(user.level != 2)
          Models.ItemModel.find({}, (err, items)=>{
            for(let item of items)
              for(let tag of item.tags)
                if(tag.indexOf(req.query.name) == 0){
                  result.push(item)
                  break
                }
            return res.render('search', {
              title: result.length == 0?'无结果':req.query.name,
              user,
              items,
              result
            })
          })
      })
  },

  // GET /signin
  signinGet: (req, res)=>{
    const title = '登录'
    req.session.userid = null;
    buildVerifyCode(req)
    res.render('signin', {
      title,
      verifyCodeExpression: req.session.verifyExpression
    });
  },

  // POST /signin
  signinPost: (req, res)=>{
    const title = '登录'
    if(req.body.verifyCode != req.session.verifyResult){
      buildVerifyCode(req)
      return res.render('signin',{
        title,
        verifyCodeExpression: req.session.verifyExpression,
        message: '验证码错误，请重新输入！'
      });
    }
    Models.UserModel.findOne({'id': req.body.id}, (err, user)=>{
      if(user == null){
        return res.render('signin',{
          title,
          verifyCodeExpression: req.session.verifyExpression,
          message: '账号不存在，请重新输入！'
        });
      }
      if(user.password !== req.body.password){
        return res.render('signin',{
          title,
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
    const title = '登录'
    if(req.body.verifyCode != req.session.verifyResult){
      buildVerifyCode(req)
      return res.render('signin',{
        title,
        verifyCodeExpression: req.session.verifyExpression,
        message: '验证码错误，请重新输入！'
      });
    }
    Models.UserModel.find({'id': req.body.id}, (err, user)=>{
      if(user.length != 0)
        return res.render('signin',{
          title,
          verifyCodeExpression: req.session.verifyExpression,
          message: '用户被注册！'
        });
      else{
        Models.UserModel({
          id: req.body.id,
          name: req.body.name,
          password: req.body.password,
          level: 0
        }).save(result=>{
          Models.ShopCarModel({
            id: req.body.id,
            items: []
          }).save(()=>{
            req.session.userid = req.body.id;
            delete req.session.verifyExpression
            delete req.session.verifyResult
            return res.redirect(302, '/');
          })
        })
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
