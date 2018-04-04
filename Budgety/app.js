var values = [];

var readValues = function () {
    var _value = {
        id: "",
        selecctor: document.querySelector(".add__type").value,
        description: document.querySelector(".add__description").value,
        value: document.querySelector(".add__value").value
    };
    return _value;
};
var writeValues = (function () {
    document.querySelector(".income__list").innerHTML = "";
    document.querySelector(".expenses__list").innerHTML = "";
    for (var i = 0; i < values.length; i++) {
        writeValue(values[i]);
    }
});
var writeValue = (function (_value) {
    var id = values.length;
    var selecctor = _value.selecctor;
    var description = _value.description;
    var value = _value.value;
    if (selecctor == "inc") {
        document.querySelector(".income__list").insertAdjacentHTML("beforeend", stringHtml(id, selecctor, description, value));
        return;
    }
    document.querySelector(".expenses__list").insertAdjacentHTML("beforeend", stringHtml(id, selecctor, description, value));
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


var calcValueIncome = (function () {
    var tempBdgIncome = 0;
    var tempBdgExpenses = 0;
    
    for (var data of values) {
        data.selecctor == "inc" ? tempBdgIncome += parseInt(data.value) : tempBdgExpenses += parseInt(data.value);
    }
    document.querySelector(".budget__income--value").innerHTML = tempBdgIncome;
    document.querySelector(".budget__expenses--value").innerHTML = tempBdgExpenses;
    console.log(tempBdgIncome);
    console.log(tempBdgExpenses);




});
var btn = document.querySelector(".add__btn").addEventListener("click", function () {
    values.push(readValues());
    calcValueIncome();
    writeValues();
});










