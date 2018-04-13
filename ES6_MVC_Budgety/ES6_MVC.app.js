class Moviment {
    constructor(_sign, _description, _value) {
        this.id;
        this.sign = _sign;
        this.description = _description;
        this.value = _value;
        if (this.sign === "exp") {
            this.Percent = "---";
        }
    }
}


class Comunication{    
        
    static _Post(_Moviment){
        $.ajax({
            url:"http://localhost:61161/api/Budget",
            method :"POST",
            contentType: "application/json",
            datatype:"jsonp",
            data: JSON.stringify({"type": _Moviment.sign,"description": _Moviment.description,"value":_Moviment.value}) ,
        }).done((result)=>{
            let res = {
                log : "inPost",
                res : result,
                data : _Moviment
            }
            console.log(res);
        });        
    }

    static _Get(){
        let data = $.ajax({
            url: "http://localhost:61161/api/Budget",
            method :"GET",              
        }).done((result)=>{                        
            let res = {
                log : "inGet",
                data : result,                
            }            
            
            return res;
        });
        console.log(data);        
        return data;
    }
}


class Math {

    static calcTotal(list) {
        let sum = 0;
        for (let i = 0; i < list.length; i++) {
            sum += parseInt(list[i].value);
        }
        return sum;
    }   

    static calcPercenValues(ReferenceValue, ReferenceTotal) {
        return parseInt(100 * (ReferenceValue / ReferenceTotal));
    }
}

class ModelController {
    constructor() {
        this.id = 0;
        this.ExpensesList = [];
        this.IncomeList = [];
        this.ExpenseTotal = 0;
        this.IncomeTotal = 0;                
    }
    addItem(_Moviment) {
        _Moviment.id = this.id++;
        if (_Moviment.sign == "inc") {
            this.IncomeList.push(_Moviment);
        }
        else{
            this.ExpensesList.push(_Moviment);
        }
        return _Moviment;
    }
    updatePercents() {        
        for (let i = 0; i < this.ExpensesList.length; i++) {            
            this.ExpensesList[i].Percent = Math.calcPercenValues(this.ExpensesList[i].value, this.IncomeTotal)
        }        
    
    }    

    updateValues() {
        this.ExpenseTotal = Math.calcTotal(this.ExpensesList);
        this.IncomeTotal = Math.calcTotal(this.IncomeList);
        this.updatePercents();        
    }

    getMovimentData() {
        return {
            ExpenseTotal: this.ExpenseTotal,
            IncomeTotal: this.IncomeTotal,
            Expenses: this.ExpensesList,
            Incomes: this.IncomeList,
        }
    }
}

class ViewController {
    constructor(srcType, srcDescrition, srcValue) {
        this.Type = "." + srcType;
        this.Descrition = "." + srcDescrition;
        this.Value = "." + srcValue;
    }
    getInput() {
        let _type = $(this.Type).val();
        let _description = $(this.Descrition).val();
        let _value = $(this.Value).val();
        return new Moviment(_type, _description, _value);
    }

    showData(_Moviment) {
        let type = "- Expense-";

        if (_Moviment.sign === "inc") {
            type = "+ Income-";
            return `<div class="item clearfix" id=${type}${_Moviment.id}>
            <div class="item__description">${_Moviment.descrition}</div>
            <div class="right clearfix">
                <div class="item__value">+ ${_Moviment.value}</div>                
                <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
            </div>`;
        }
        return `<div class="item clearfix" id=${type}${_Moviment.id}>
                <div class="item__description">${_Moviment.descrition}</div>
                <div class="right clearfix">
                <div class="item__value">- ${_Moviment.value}</div>
                <div class="item__percentage">${_Moviment.Percent}</div>
                <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
        </div>
        </div>`;
    }
    showIncomes(_IncomesList) {
        for (let Inc of _IncomesList) {
            $(".income__list").append(this.showData(Inc));
        }
    }
    showExpenses(_ExpensesList) {
        for (let Exp of _ExpensesList) {
            $(".expenses__list").append(this.showData(Exp));
        }
    }    
    showTotalPercent(_Moviment){
        let totalPercet = 0;
        if(_Moviment.IncomeTotal > 0){            
            totalPercet = Math.calcPercenValues(_Moviment.ExpenseTotal,_Moviment.IncomeTotal);
            $(".budget__expenses--percentage").text( `${totalPercet}%`);
            return;
        }
        
        console.log(totalPercet);
        $(".budget__expenses--percentage").text("---");
    }

    clearScreen(){
        $(".income__list").text("");
        $(".expenses__list").text("");
        $(".budget__expenses--percentage").text("---");
        $(".budget__value").text("0");
        
    }
    showTotals(_Moviment){
        $(".budget__income--value").text(`+ ${_Moviment.IncomeTotal}`);
        $(".budget__expenses--value").text(`- ${_Moviment.ExpenseTotal}`);
        
        
        let percent = Math.calcPercenValues(_Moviment.ExpenseTotal,_Moviment.IncomeTotal);
        //document.querySelector(".budget__expenses--percentage").innerHTML = `${percent}`;


        let resBudgety = _Moviment.IncomeTotal - _Moviment.ExpenseTotal;        
        if(resBudgety > 0){
            $(".budget__value").text(`+ ${resBudgety}`) ;
            return;
        }
        if(resBudgety < 0){
            $(".budget__value").text(`- ${resBudgety}`);
        }                      
        
    }

    showAllMoviments(_Moviment) {                
        this.clearScreen();        
        this.showTotals(_Moviment);
        this.showIncomes(_Moviment.Incomes);
        this.showExpenses(_Moviment.Expenses);
        this.showTotalPercent(_Moviment);
    }
}

class BudgetyController {
    constructor(_ViewController, _ModelController) {
        this.View = _ViewController;
        this.Model = _ModelController;
    }
    addMove() {
        let data = this.View.getInput();
        let temp = this.Model.addItem(data);
        this.Post(temp);                        
        this.Model.updateValues();
    }

    updateScreen() {
        let Moviment = Model.getMovimentData();        
        View.showAllMoviments(Moviment);
    }
    
    Get(){  
        let res = {
            log : "InControllerGet",
            data : Comunication._Get()
        }
        console.log(res);
            
    }
    
    Post(_MovimentType){
        Comunication._Post(_MovimentType);
    }
}

let View = new ViewController("add__type", "add__description", "add__value");
let Model = new ModelController();
let BdgController = new BudgetyController(View, Model);

BdgController.updateScreen();

var btn = $(".add__btn").on("click", () => {    
    BdgController.Get()    
    
});

var enter = $(document).keypress((event) => {
    if (event.key === 13 || event.which === 13) {
        BdgController.addMove();
        BdgController.updateScreen();
        event.preventDefault();
    }
});




