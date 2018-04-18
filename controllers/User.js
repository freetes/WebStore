const Models = require('../model/dataModel');

// 处理用户
const User = {
  // GET /getInfo
  getInfo: (req, res)=>{
    Models.UserModel.findOne({id: req.session.userid}, (err, user)=>{
      return res.render('userinfo',{
        user,
        title: '信息管理'
      });
    })
  },
  // POST /getInfo
  changeInfo: (req, res)=>{
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
    Models.UserModel.findOne({id: req.session.userid}, (err, user)=>{
      Models.ShopCarModel.findOne({id: user.id}, (err, shopcar)=>{
        return res.render('user/shopcar',{
          user,
          items: shopcar.items,
          title: '购物车'
        });
      })
    })
  },
  // GET /order
  getOrder: (req, res)=>{
    Models.UserModel.findOne({id: req.session.userid}, (err, user)=>{
      return res.render('user/order',{
        user,
        title: '订单管理'
      });
    })
  },
  // GET /order
  newOrder: (req, res)=>{
    Models.UserModel.findOne({id: req.session.userid}, (err, user)=>{
      return res.render('user/order',{
        user,
        title: '订单管理'
      });
    })
  },
  // POST /addItemToShopCar
  addItem: (req, res)=>{
    Models.ShopCarModel.findOne({id: req.session.userid}, (err, shopcar)=>{
      if(err) return res.json(false)
      console.log(req.body.item)
      shopcar.items.push(req.body.item)
      // Models.ShopCarModel.findOneAndUpdate(
      //   {id: req.session.userid}, 
      //   {items: shopcar.items}, 
      //   (err, result)=>{
      //     if(err) return res.json(false)
      //     return res.json(true)
      //   }
      // )
    })
  },
};

module.exports = User;
