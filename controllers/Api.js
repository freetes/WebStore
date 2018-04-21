const Models = require('../model/dataModel');

// 处理ajax的请求
const Api = {
  // POST /item
  getItem: (req, res)=>{
    Models.ItemModel.findOne({_id: req.body.id}, (err, item)=>{
      return res.json(item)
    })
  },
  // POST /user
  getUser: (req, res)=>{
    Models.UserModel.findOne({id: req.body.id}, (err, user)=>{
      user.password = null
      user.level = null
      user._id = null
      return res.json(user)
    })
  },
};

module.exports = Api;
