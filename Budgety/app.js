var values = [];

var valuesBudget = {
    totExpenses :"0",
    totIncome :"0",
    totBudget :"0"
}
var readExpensesIncomes = function (position) {
    var _value = {
        id: position,
        percent : "",
        selecctor: document.querySelector(".add__type").value,
        description: document.querySelector(".add__description").value,
        value: document.querySelector(".add__value").value
    };    
    return _value;
};

var writeValues = (function (values,budget) {
    writeBudget(budget);   

    document.querySelector(".income__list").innerHTML = "";
    document.querySelector(".expenses__list").innerHTML = "";
    for (var i = 0; i < values.length; i++) {
        writeValue(values[i]);
        console.log(values[i]);
    }
});

var writeBudget = (function(budget){
    var sign = " ";
    document.querySelector(".budget__income--value").innerHTML = budget.totIncome;
    document.querySelector(".budget__expenses--value").innerHTML = budget.totExpenses;
    
    var percent = budget.totIncome != 0?calcPercent(budget.totExpenses,budget.totIncome):"";

    budget.totBudget > 0?sign = " + ":" - ";

    document.querySelector(".budget__value").innerHTML = sign + budget.totBudget;
    document.querySelector(".budget__expenses--percentage").innerHTML = sign + percent + "\%";

});

var writeValue = (function (value) {
    
    if (value.selecctor == "inc") {
        document.querySelector(".income__list").insertAdjacentHTML("beforeend", stringHtml(value));
        return;
    }
    document.querySelector(".expenses__list").insertAdjacentHTML("beforeend", stringHtml(value));
});
var stringHtml = function (_value) {
    var expTex = "";
    if(_value.selecctor == "exp"){
        expTex =  '<div class="item__percentage">'+_value.percent+'</div>';
    }    
    return '<div class="item clearfix" id="income-' + _value.id + '">' +
        '<div class="item__description">' + _value.description + '</div>' +
        '<div class="right clearfix">' +
        '<div class="item__value">' + (_value.selecctor == "inc" ? " + " : " - ") + ' ' + _value.value + '</div>' +
        expTex+
        '<div class="item__delete"></div>' +
        '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
        '</div>' + ''
    '</div>' +
        '</div>';
};

var updateBudget = (function(budget,upIncome,upExpenses){
    budget.totIncome = upIncome;
    budget.totExpenses = upExpenses;
    budget.totBudget = upIncome - upExpenses;
});

var calcPercent = (function(ref,reftotal){
    return parseInt(100 * (ref / reftotal));
});

var updatePercentExpenses = (function(refTotal){
    for(var i = 0;i < values.length;i++){
        if(values[i].selecctor == "exp"){
            values[i].percent = calcPercent(values[i].value,refTotal);
        }
    }
});



var calcValues = (function (values,budget) {
    var tempBdgIncome = 0;
    var tempBdgExpenses = 0;    
    for (var data of values) {
        data.selecctor == "inc" ? tempBdgIncome += parseInt(data.value) : tempBdgExpenses += parseInt(data.value);        
    }
    //update budget values 
    updateBudget(budget,tempBdgIncome,tempBdgExpenses);
    //update expenses percents 
    updatePercentExpenses(budget.totExpenses);  
});


var btn = document.querySelector(".add__btn").addEventListener("click", function () {
    values.push(readExpensesIncomes(values.length)); 
    calcValues(values,valuesBudget);
    console.log(values);
    writeValues(values,valuesBudget);
});

var btnDel = document.onload.querySelector(".item__delete--btn").on("click",function(event){
    console.log(event.target);
});


 



