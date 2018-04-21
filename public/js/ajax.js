
function getItemInfo(id, btn){    
    $.post('/api/item',
        {
            id,
        },
        result=>{
            $(btn).siblings(".col-md-2").children().attr('src', result.picture)
            $(btn).siblings(".col-md-10").find(".name").text(result.name)
            $(btn).siblings(".col-md-10").find(".amount").text(result.amount)
            
        }
    )
}

function getUserInfo(id, btn){
    $.post('/api/user', 
        {
            id,
        },
        result=>{
            $(btn).siblings(".col-md-10").find(".seller").text(result.name)
        }
    )
}

function getAllInfo(item, user, btn){
    getItemInfo(item, btn)
    getUserInfo(user, btn)
}

$(".btn-getinfo").click()