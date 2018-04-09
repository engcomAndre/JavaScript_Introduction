
let ModelController = (()=>{   
    
   
})();

let ViewController = (()=>{

    let Ds = {
        inType : ".add__type",
        inDescription : ".add__description",
        inValue :".add__value"
    };

    return{
        getInput: () =>{
            return{
                _type : document.querySelector(Ds.inType).value,
                _description :document.querySelector(Ds.inDescription).value,
                _value : document.querySelector(Ds.inValue).value
            };
            
        getDs = () =>{
                return Ds;
            };            
        }
    }
  
})();




let budgetyController = ((ViewController,ModelController) => { 
    let controllerAddItem = ()=>{

        (ViewController.readInput());
    }
    document.querySelector(".add__btn").addEventListener('click',controllerAddItem);

    document.addEventListener('keypress',(event)=>{
        if(event.key === 13 || event.which === 13){
            controllerAddItem();
        }
    });

        
 
})(ViewController,ModelController);
