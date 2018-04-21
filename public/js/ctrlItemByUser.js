
function addShopCar(item, seller) {
  $.post('/user/addItemToShopCar',
    {
      seller,
      item,
      price: parseInt($('.itemPrice').text()),
      date: getNewDate()
    },
    result=>{
      if(result){
				$(".alertMessage").text("添加成功！");
				$("#alertInfoModal").modal();
			}
			else{
				$(".alertMessage").text("出错了！");
				$("#alertInfoModal").modal();
			}
    }
  )
}

function getNewDate(){
	return `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`;
}