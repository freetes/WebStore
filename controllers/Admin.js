const Models = require('../model/dataModel');

// 管理员专用
const Admin = {
  // POST /addUser
  addUser: (req, res)=>{
    Models.UserModel({
      id: req.body.id,
      name: req.body.name,
      password: req.body.password,
      level: req.body.level,
    }).save((err, result)=>{
      if(err) return res.json(false);
      if(req.body.level == 0)
        Models.ShopCarModel({
          id: req.body.id,
          items: []
        }).save(()=>{
          return res.json(true);
        })
    })
  },
  // POST /deletePay
  deletePay: (req, res)=>{

  },
  // POST /deleteNotice
  deleteNotice: (req, res)=>{

  },
  // POST /deleteUser
  deleteUser: (req, res)=>{
    if(req.session.userid == undefined || req.session.userid == null)
      return res.json(false);
    Models.UserModel.findOne({'id': req.session.userid}, (err, user)=>{
      if(user.level == 0) return res.json(false);
      else
        Models.UserModel.findByIdAndRemove({_id: req.body.id}, (err, result)=>{
            if(err) return res.json(false)
            return res.json(true)
        })
    })
  },  
};

module.exports = Admin;
