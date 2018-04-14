function addUser(){
  $.post('/admin/addUser',
    {
      id: $(".newUserId").val(),
      name: $(".newUserName").val(),
      password: $(".newUserPassword").val(),
      level: $(".newUserLevel").val()
    },
    result=>{
      if(result){
				$(".alertMessage").text("新增成功！");
				$("#alertInfoModal").modal();
			}
			else{
				$(".alertMessage").text("出错了！");
				$("#alertInfoModal").modal();
			}
    }
  )
}
