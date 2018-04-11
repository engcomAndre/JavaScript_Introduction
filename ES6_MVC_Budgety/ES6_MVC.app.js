class Moviment {
    constructor(_sign, _description, _value) {
        this.id;
        this.sign = _sign;
        this.descrition = _description;
        this.value = _value;
    }
}


class ModelController {
    constructor() {
        this.id = 0;
        this.ExpensesList = [];
        this.IncomeList = [];
    }
    addItem(_Moviment) {
        _Moviment.id = this.id++;
        if (_Moviment.sign == "inc") {
            this.IncomeList.push(_Moviment);
            return;
        }
        this.ExpensesList.push(_Moviment);
    }
    getMovimentList() {
        return {
            Expenses: this.ExpensesList,
            Incomes: this.IncomeList
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
        let _type = document.querySelector(this.Type).value;
        let _description = document.querySelector(this.Descrition).value;
        let _value = document.querySelector(this.Value).value;
        return new Moviment(_type, _description, _value);
    }
    showData(_Moviment) {             
        let type = _Moviment.descrition == "inc" ? "Income-" : "Expense-";
        let percent = "NI";//not implemented
        let html =  `<div class="item clearfix" id=${type}${_Moviment.id}>
        <div class="item__description">${_Moviment.descrition}</div>
        <div class="right clearfix">
            <div class="item__value">${_Moviment.value}</div>
            <div class="item__percentage">${percent}</div>
            <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
        </div>
        </div>`;       

        return html;
    }
    showIncomes(_IncomesList) {
        for (let Inc of _IncomesList) {
            document.querySelector(".income__list").insertAdjacentHTML("beforeend", this.showData(Inc));
        }        
    }
    showExpenses(_ExpensesList) {
        for (let Exp of _ExpensesList) {
            document.querySelector(".expenses__list").insertAdjacentHTML("beforeend", this.showData(Exp));
        }    
    }
    showAllMoviment(_Moviment){
        document.querySelector(".income__list").innerHTML = "";
        document.querySelector(".expenses__list").innerHTML = "";  
        this.showIncomes(_Moviment.Incomes);
        this.showExpenses(_Moviment.Expenses);
        console.log("controlle - "+_Moviment);
    }
}

class BudgetyController {
    constructor(_ViewController, _ModelController) {
        this.View = _ViewController;
        this.Model = _ModelController;
    }
    addMove() {
        let data = this.View.getInput();
        this.Model.addItem(data);
        console.log(this.Model.getMovimentList());
    }
    updateScreen(){
        console.log("controller");
        let Moviment = Model.getMovimentList();       
        View.showAllMoviment(Moviment);        
        console.log("controller");
    }
}

let View = new ViewController("add__type", "add__description", "add__value");
let Model = new ModelController();
let BdgController = new BudgetyController(View, Model);

var btn = document.querySelector(".add__btn").addEventListener("click", () => {
    BdgController.addMove();
    BdgController.updateScreen();
});

var enter = document.addEventListener("keypress", (event) => {
    if(event.key ===13 || event.which ===13){
        BdgController.addMove();
        BdgController.updateScreen();
    }    
});



