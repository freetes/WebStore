const Models = require('../model/dataModel');
const CtrlDB = require('../model/ctrlDB');

// 秘书专用
const Owner = {
  // GET /owner/additem
  addItem: (req, res)=>{
    if(req.session.userid == undefined || req.session.userid == null)
      return res.redirect(302, '/');
    Models.UserModel.findOne({'id': req.session.userid}, (err, user)=>{
      if(user.level == 1) 
        return res.render('owner/additem',{
          title: '新增'
        });
    })
  },
  addItemPost: (req, res)=>{
    console.log(req.fields)
    console.log(req.files)
    // if(req.session.userid == undefined || req.session.userid == null)
    //   return res.render('owner/additem', {
    //     title: '新增',
    //     message: '新增失败！'
    //   })
    // Models.UserModel.findOne({'id': req.session.userid}, (err, user)=>{
    //   if(user.level == 1){
    //     form.parse(req, (err, fields, file)=>{
    //       console.log(fields)
    //       console.log(file)
    //       return res.render('owner/additem', {
    //         title: '新增',
    //         message: '新增成功！'
    //       })
    //     })
    //   }
    // })
  },
};

module.exports = Owner;
