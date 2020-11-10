$(function(){

    let orderCardWrapper= $("#card-list-left");
    var order = 0;    
    let orderCard = (data) =>{
       //         <div class="checkout-card">
         //               <img class="checkout-pic" src="https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/2060340/2017/9/14/11505387708574-Puma-Men-Black-Solid-Sporty-Jacket-371505387708496-1.jpg"/>
           //         <div>
             //           <h4>Men Black MAMGP T7 Sweat Sporty Jacket</h4>
               //         <p>x1</p>
               //         <p><span>Amount: Rs </span><span>7999</span></p>
                 //   </div>
                 //<div class="bin"><i class="far fa-trash-alt"></i></div>
               // </div>
            let orderGrid= $("<div>");
            orderGrid.addClass("checkout-card");
            let orderImg= $("<img>");
            orderImg.addClass("checkout-pic");
            orderImg.attr('src',data.propic);
            orderGrid.append(orderImg);
            let orderDes = $('<div>');
            let orderHead= $('<h4>');
            orderHead.text(data.name);
            let orderSub= $('<p>');
            orderSub.addClass('count');
            orderSub.text('x '+ data.count);
            let orderPara = $('<p>').append($('<span>').text('Amount: Rs '));
            orderPara.append($('<span>').addClass('money').text(data.rate));
            orderDes.append(orderHead);
            orderDes.append(orderSub);
            orderDes.append(orderPara);
            orderGrid.append(orderDes);
            let trash= $('<div>').addClass("bin");
            let icon= $('<i>').addClass("far fa-trash-alt");
            $(icon).click(function(){
                let abcList= JSON.parse(localStorage.getItem('product-list'));
                let pos= -1;
                for(var i=0; i<abcList.length; i++){
                    if(abcList[i].id== data.id){
                        pos= i;
                        break;
                    }
                }
                abcList.splice(pos, 1);
                localStorage.setItem('product-list',JSON.stringify(abcList));
                var totalCount = 0;
                for(var i=0; i<abcList.length; i++) {
                      totalCount = totalCount + abcList[i].count;
                    }   
                $('#item-count').html(totalCount);

                var totalItem=0;
                totalItem= totalItem + abcList.length; 
                $('#count').html(totalItem); 

                var totalAmount = 0;
               
                for(var i=0; i<abcList.length; i++) {
                     totalAmount = totalAmount + abcList[i].rate;
                   }
                $('#total-amount').html(totalAmount);

                orderGrid.remove();
            });
            trash.append(icon);
            orderGrid.append(trash);
            
       
            return orderGrid;
       };
function create() {      
var orderList= localStorage.getItem('product-list');
    if( orderList === null){ 
              localStorage.setItem('product-list', JSON.stringify([]));
          } 
          else{
             orderList= JSON.parse(orderList);
             for(let j=0; j<orderList.length; j++){
                 let orderWrapper= orderCard(orderList[j]);
                  orderCardWrapper.append(orderWrapper);
              }
          }
}         

create();


const proID= window.location.search.split('=')[1];
console.log(proID);
$.get('https://5ee248c68b27f30016094891.mockapi.io/homepagedata/' + proID,function(product){ 
console.log(product);   
$('#product-head').text(product.name);
$('sub-head').text(product.brand);
$('#price').text(product.price);
$('#desc').text(product.description);
for(let i=0; i<product.photos.length; i++){
     $('#default').attr('src', product.photos[0]);
     const imageCloth= $('<img>');
     imageCloth.attr('src',product.photos[i]);
     $('#sample-pic').append(imageCloth);
     imageCloth.click(function(){
        $('#default').attr('src', product.photos[i]);
        //$("#sample-pic").removeClass('active-img');
        //$(this).addClass('active-img');           
    });
}
$("#btn-cart").click(function(){

    $('#btn-cart').addClass('bigger');
        setTimeout(function() {
            $('#btn-cart').removeClass('bigger');
        }, 200)
    
    var list= {
        id: product.id,
        name: product.name,
        propic: product.preview,
        rate: product.price,
        count: 0
    }; 
    var storedList = JSON.parse(localStorage.getItem('product-list'));
     if(storedList.length == 0){
         storedList.push(list);
     }else{
         var hasProductKey = false;
         for(let key in storedList){
            if(proID == storedList[key].id){
                hasProductKey = true;
                break;          
        }
    }
     if(!hasProductKey){
         storedList.push(list);
     }
     
     }  
     localStorage.setItem('product-list', JSON.stringify(storedList)); 
      let abcList= JSON.parse(localStorage.getItem('product-list'));
      for(let j=0; j<abcList.length; j++){
           if (proID == abcList[j].id) {
             abcList[j].count= abcList[j].count+=1;
             abcList[j].rate= abcList[j].count * product.price;
            localStorage.setItem('product-list', JSON.stringify(abcList)); 
           }
       } 
     
       var totalCount = 0;
       for(var i=0; i<abcList.length; i++) {
           totalCount = totalCount + abcList[i].count;
       }   
       console.log(totalCount);
       $('#item-count').html(totalCount);       
 
})  

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















});