var description = document.querySelector(".add__description");
var values = document.querySelector(".add__value");
var selecctor = document.querySelector(".add__type");

var stringHtml = function(){
    return  '<div class="item clearfix" id="income-0">'+
    '<div class="item__description">'+description.value+'</div>'+
        '<div class="right clearfix">'+
            '<div class="item__value">'+(selecctor.value=="inc"?" + ":" - ")+' '+ values.value +'</div>'+
            '<div class="item__delete"></div>'+
            '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>'+
        '</div>'+''
    '</div>'+
    '</div>';
};

var btn = document.querySelector(".add__btn").addEventListener("click",function(){          
   
    document.querySelector(".income__list").innerHTML = stringHtml();

    
});




