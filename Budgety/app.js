var values = [];

var valuesBudget = {
    totExpenses :"0",
    totIncome :"0",
    totBudget :"0"
}
var readExpensesIncomes = function () {
    var _value = {
        id: "",
        percent : "",
        selecctor: document.querySelector(".add__type").value,
        description: document.querySelector(".add__description").value,
        value: document.querySelector(".add__value").value
    };
    return _value;
};

var writeBudget = (function(budget){
    document.querySelector(".budget__income--value").innerHTML = budget.totIncome;
    document.querySelector(".budget__expenses--value").innerHTML = budget.totExpenses;
    document.querySelector(".budget__value").innerHTML = budget.totBudget;
    var percent = budget.totIncome != 0?parseInt(100 * budget.totExpenses/budget.totIncome):"";
    document.querySelector(".budget__expenses--percentage").innerHTML = percent + "\%";

});
var writeValues = (function (values,budget) {
    writeBudget(budget);
    

    document.querySelector(".income__list").innerHTML = "";
    document.querySelector(".expenses__list").innerHTML = "";
    for (var i = 0; i < values.length; i++) {
        writeValue(values[i]);
        console.log(values[i]);
    }
});
var writeValue = (function (value) {
    
    if (value.selecctor == "inc") {
        document.querySelector(".income__list").insertAdjacentHTML("beforeend", stringHtml(value.id, value.selecctor, value.description, value.value));
        return;
    }
    document.querySelector(".expenses__list").insertAdjacentHTML("beforeend", stringHtml(value.id, value.selecctor, value.description, value.value));
});
var stringHtml = function (id, selecctor, description, value) {
    return '<div class="item clearfix" id="income-' + id + '">' +
        '<div class="item__description">' + description + '</div>' +
        '<div class="right clearfix">' +
        '<div class="item__value">' + (selecctor == "inc" ? " + " : " - ") + ' ' + value + '</div>' +
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

var calcValues = (function (values,budget) {
    var tempBdgIncome = 0;
    var tempBdgExpenses = 0;
    
    for (var data of values) {
        data.selecctor == "inc" ? tempBdgIncome += parseInt(data.value) : tempBdgExpenses += parseInt(data.value);        
    }
    //update budget values 
    updateBudget(budget,tempBdgIncome,tempBdgExpenses);
    //update percents

    
});
var btn = document.querySelector(".add__btn").addEventListener("click", function () {
    values.push(readExpensesIncomes());  

    calcValues(values,valuesBudget);
    console.log(valuesBudget);
    writeValues(values,valuesBudget);
});










