const Models = require('../model/dataModel');
const CtrlDB = require('../model/ctrlDB');
const form = require('../formidable');
const util = require('util')
// 卖家
const Owner = {
  // GET /owner/additem
  addItem: (req, res)=>{
    Models.UserModel.findOne({'id': req.session.userid}, (err, user)=>{
      if(user.level == 1){
        if(req.query.id == undefined){
          return res.render('owner/additem',{
            user,
            title: '发布商品'
          });
        }
        else{
          Models.ItemModel.findOne({_id: req.query.id}, (err, item)=>{
            if(err) return res.json(false)
            return res.render('owner/additem',{
              user,
              item,
              title: '发布商品'
            });
          })
        }
      }
    })
  },
  // POST /owner/additem
  addItemPost: (req, res)=>{
    form.parse(req, function(err, fields, files) {
      let item = fields
      item.tags = item.tags.split(' ')
      // Linux
      if(files.picture.name != '')
        // item.picture = '/tmp/' + files['picture'].path.split('/tmp/')[1]
      // windows
        item.picture = '/tmp/' + files['picture'].path.split("\\tmp\\")[1]
      
      item.owner = req.session.userid
      item.isHot = false
      
      if(item.id == undefined)
        Models.ItemModel(item).save((err, result)=>{
          if(err)
            return res.render('error',{
              message: err
            });
          else{
            Models.UserModel.findOne({'id': req.session.userid}, (err, user)=>{
              if(user.level == 1)
                return res.render('owner/additem',{
                  user,
                  title: '发布商品',
                  msg: '发布成功'
                });
            })
          }
        })
      else{
        Models.ItemModel.findByIdAndUpdate({_id: item.id}, item, (err, item)=>{
          if(err)
            return res.render('error',{
              message: err
            });
          Models.UserModel.findOne({'id': req.session.userid}, (err, user)=>{
            if(user.level == 1)
              return res.render('owner/additem',{
                user,
                title: '发布商品',
                msg: '发布成功'
              });
          })
        })
      }
    });
  },
  // GET /owner/myadd
  getAdd: (req, res)=>{
    Models.UserModel.findOne({'id': req.session.userid}, (err, user)=>{
      if(user.level == 1){
        Models.ItemModel.find({owner: user.id}, (err, items)=>{
          return res.render('owner/myadd',{
            user,
            title: '发布管理',
            items
          });
        })
      }
    })
  },
  // GET /owner/order
  getOrder: (req, res)=>{
    Models.UserModel.findOne({'id': req.session.userid}, (err, user)=>{
      if(user.level == 1)
        Models.OrderModel.find({seller: user.id}, (err, orders)=>{
          return res.render('owner/order', {
            user,
            orders,
            title: '订单管理'
          })
        })
    })
  },
  // POST /owner/deleteItem
  deleteItem: (req, res)=>{
    Models.UserModel.findOne({'id': req.session.userid}, (err, user)=>{
      if(user.level == 1)
        Models.ItemModel.findOneAndRemove({_id: req.body.id}, (err, result)=>{
          if(err) return res.json(false)
          return res.json(true)
        })
    })
  },
};

module.exports = Owner;
