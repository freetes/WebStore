
function addShopCar(item, seller) {
  const i = {
    seller,
    item,
    amount: $('.itemAmountInput').val(),
    price: parseInt($('.itemPrice').text()) * parseInt($('.itemAmountInput').val())
  }
  $.post('/user/addItemToShopCar',
    {
      item: i
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

function buyItem(id) {

}

function amountDown(){
  const amount = parseInt($('.itemAmountInput').val())
  if(amount > 1)
    $('.itemAmountInput').val(amount - 1)
}

function amountUp(){
  const amount = parseInt($('.itemAmountInput').val())
  if(amount < parseInt($(".itemAmount").text()))
    $('.itemAmountInput').val(amount + 1)
}

function getNewDate(){
	return `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`;
}