
// 请求前，验证表单数据
$(".signinBtn").click(function(e){
  e.preventDefault();
  
  if( $("#signinDiv .userIdInput").val() == '')
    return $("#signinDiv .text-danger").text('账号不能为空！')
  if( $("#signinDiv .userPasswordInput").val() == '')
    return $("#signinDiv .text-danger").text('密码不能为空！')
  // if( $("#signinDiv .userVerifyCodeInput").val() == '')
  //   return $("#signinDiv .text-danger").text('验证码不能为空！')

  // 提交请求
  $(".signinForm").submit()
})

// 请求前，验证表单数据
$(".signupBtn").click(function(e){
  e.preventDefault();
  
  if( $("#signupDiv .userIdInput").val() == '')
    return $("#signupDiv .text-danger").text('账号不能为空！')
  if( $("#signupDiv .userNameInput").val() == '')
    return $("#signupDiv .text-danger").text('用户昵称不能为空！')
  if( $("#signupDiv .userPasswordInput").val() == '' || $("#signupDiv .userPasswordAgainInput").val() == '' )
    return $("#signupDiv .text-danger").text('密码不能为空！')
  // if( $("#signupDiv .userVerifyCodeInput").val() == '')
  //   return $("#signupDiv .text-danger").text('验证码不能为空！')
  if( $("#signupDiv .userPasswordInput").val() != $("#signupDiv .userPasswordAgainInput").val() )
    return $("#signupDiv .text-danger").text('两次密码不相同！')

  // 提交请求
  $(".signupForm").submit()
})

// 验证码提示
$(".verifyPopoverHelp").hover(function(){
  $(".verifyPopoverHelp").popover('show')
}, function(){
  $(".verifyPopoverHelp").popover('hide')
})

$(".changeDiv").click(function () {
  $("#signinDiv").toggle()
  $("#signupDiv").toggle()
})
