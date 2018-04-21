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
        Models.ItemModel.find({}, (err, items)=>{
          return res.render('user/shopcar',{
            user,
            items,
            myitems: shopcar.items,
            title: '购物车'
          });
        })
      })
    })
  },
  // GET /order
  getOrder: (req, res)=>{
    Models.UserModel.findOne({id: req.session.userid}, (err, user)=>{
      Models.OrderModel.find({buyer: user.id}, (err, orders)=>{
        Models.ItemModel.find({}, (err, items)=>{
          return res.render('user/order',{
            user,
            orders,
            items,
            title: '订单管理'
          });
        })
      })
    })
  },
  // GET /buy/:id
  getBuy: (req, res)=>{
    Models.UserModel.findOne({id: req.session.userid}, (err, user)=>{
      Models.ItemModel.findOne({_id: req.params.id}, (err, item)=>{
        return res.render('user/buy',{
          user,
          item,
          title: '购买'
        });
      })
    })
  },
  // POST /order ajax
  newOrder: (req, res)=>{
    Models.ItemModel.findOne({_id: req.body.item}, (err, item)=>{
      Models.ItemModel.findByIdAndUpdate({_id: req.body.item}, {amount: item.amount-parseInt(req.body.amount)}, (err, r)=>{
        req.body.buyer = req.session.userid
        req.body.status = 1
    
        Models.OrderModel(req.body).save((err, result)=>{
          if(err) return res.json(false)
          return res.json(true)
        })
      })
    })
  },
  // POST /addItemToShopCar
  addItem: (req, res)=>{
    Models.ShopCarModel.findOne({id: req.session.userid}, (err, shopcar)=>{
      if(err) return res.json(false)
      shopcar.items.push(req.body)
      Models.ShopCarModel.findOneAndUpdate(
        {id: req.session.userid},
        {items: shopcar.items}, 
        (err, result)=>{
          if(err) return res.json(false)
          return res.json(true)
        }
      )
    })
  },
};

module.exports = User;
