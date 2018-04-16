const Models = require('../model/dataModel');
const CtrlDB = require('../model/ctrlDB');

// 秘书专用
const Owner = {
  // POST /owner/additem
  addItem: (req, res)=>{
    if(req.session.userid == undefined || req.session.userid == null)
      return res.json(false);
    Models.UserModel.findOne({'id': req.session.userid}, (err, user)=>{
      if(user.level == 1) 
        return res.render('owner/additem',{
          title: '新增'
        });
    })
  },
  
};

module.exports = Owner;
