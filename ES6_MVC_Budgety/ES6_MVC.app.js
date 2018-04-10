class Move{
    constructor(_sign,_description,_value){
        this.sign = _sign;
        this.descrition = _description;
        this.value = _value;
    }    
}

class ModelController {
    constructor(){
        this.Move = new Move; 
        this.ExpensesList = [];
        this.IncomeList = [];
    }
    addItem(move){

    }
}

class ViewController {
    constructor(srcType, srcDescrition, srcValue) {
        this.Type = "." +srcType;
        this.Descrition = "." + srcDescrition;
        this.Value = "." + srcValue;        
    }
    getInput(){
        let _type = document.querySelector(this.Type).value;
        let _description  = document.querySelector(this.Descrition).value;
        let _value = document.querySelector(this.Value).value;
        return new Move(_type,_description,_value);
    }
}

class BudgetyController {
    constructor(_ViewController, _ModelController) {
        this.View = _ViewController;
        this.Model = _ModelController;
    } 
    addMove(){
        let data  = this.View.getInput();
        console.log("teste");
    }   
}

let View = new ViewController("add__type","add__description","add__value");
let Model = new ModelController();
let BdgController = new BudgetyController(View,Model);    


var btn = document.querySelector(".add__btn").addEventListener("click", ()=>{
   console.log(View.getInput());
});


