module.exports = (req, res, next)=>{
  if(req.session.userid == undefined || req.session.userid == null)
    return res.redirect('/');
  next()
}