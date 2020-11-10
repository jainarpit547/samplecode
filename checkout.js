$(function(){

$('#place-order').click(function(){
  
$('#place-order').addClass('bigger');
        setTimeout(function() {
            $('#place-order').removeClass('bigger');
}, 200)

let abcList= JSON.parse(localStorage.getItem('product-list'));
if( abcList === null){
    alert('Oops cart is empty!!');
}else{
    location.assign('./confirm.html');
}

  localStorage.removeItem('product-list');  
  //$('#item-count').html('0');  
})

let abcList= JSON.parse(localStorage.getItem('product-list'));
var totalCount = 0;
       for(var i=0; i<abcList.length; i++) {
           totalCount = totalCount + abcList[i].count;
       }
//console.log(totalCount);
$('#item-count').html(totalCount);

var totalItem=0;
totalItem= totalItem + abcList.length;
//console.log(totalItem); 
$('#count').html(totalItem); 

var totalAmount = 0;
       for(var i=0; i<abcList.length; i++) {
           totalAmount = totalAmount + abcList[i].rate;
       }
//console.log(totalAmount);
if(totalAmount != 0){
    $('#place-order').css('display','inline-block');
}
$('#total-amount').html(totalAmount);


$('#hamburger').click(function(){
    $('#sidebar').css('display','block');
    $('#overlay').css('display','block');
});   
$('#overlay').click(function(){
    $('#sidebar').css('display','none');
    $('#overlay').css('display','none');
});        
$('.sidebar-icon').click(function(){
    $('#sidebar').css('display','none');
    $('#overlay').css('display','none'); 
});


});
