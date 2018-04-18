const Models = require('../model/dataModel');

// 处理用户
const User = {
  // GET /getInfo
  getInfo: (req, res)=>{
    if(req.session.userid == undefined || req.session.userid == null)
      return res.redirect('/');
    Models.UserModel.findOne({id: req.session.userid}, (err, user)=>{
      return res.render('userinfo',{
        user,
        title: '信息管理'
      });
    })
  },
  // POST /getInfo
  changeInfo: (req, res)=>{
    if(req.session.userid == undefined || req.session.userid == null)
      return res.redirect('/');
    Models.UserModel.findOneAndUpdate(
      {id: req.session.userid},
      {
        name: req.body.name, 
        password: req.body.password
      }, 
      (err, user)=>{
        return res.redirect(302, '/user/info');
      }
    )
  },
  // GET /shopcar
  shopcar: (req, res)=>{
    if(req.session.userid == undefined || req.session.userid == null)
      return res.redirect('/');
    Models.UserModel.findOne({id: req.session.userid}, (err, user)=>{
      return res.render('user/shopcar',{
        user,
        title: '购物车'
      });
    })
  },
  // GET /order
  getOrder: (req, res)=>{
    if(req.session.userid == undefined || req.session.userid == null)
      return res.redirect('/');
    Models.UserModel.findOne({id: req.session.userid}, (err, user)=>{
      return res.render('user/order',{
        user,
        title: '订单管理'
      });
    })
  },
};

module.exports = User;
