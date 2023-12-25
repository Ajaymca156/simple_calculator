const resultElement = document.getElementById('result');
const clearBtn = document.getElementById('clear-button');
const deleteBtn = document.getElementById('delete-button');
const divideBtn = document.getElementById('divide-button');
const multiplyBtn = document.getElementById('multiply-button');
const sutractBtn = document.getElementById('subtract-button');
const additionBtn = document.getElementById('addition-button');
const decimalBtn = document.getElementById('decimal-button');
const equalBtn = document.getElementById('equal-button');
const numberBtns = document.querySelectorAll('.number');


//Initialization of variables
let result = '';
let operation = '';
let previousOperand = 0;

//function to append no.
const appendNumber = (number) => {
    if(number=='.' && result.includes('.'))return;
    result += number;
    resultElement.innerText = result;
    updatedisplay();
} 

//function to update display
const updatedisplay = () => {
    if(operation){
        resultElement.innerText=`${previousOperand} ${operation} ${result}`;
    }
    else{
        resultElement.innerText=result;
    }
}

//function to select operators
const selectOperator = (operatorValue) => {
    if(result === '')return;
    if(operation !== '' && previousOperand !== ''){
        calculateResult();
    }
    operation = operatorValue;
    previousOperand = result;
    result = '';
    updatedisplay();
}

//function to calculate the no.
const calculateResult = () => {
    let evaluateResult;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(result);
    
    if(isNaN(prev)||isNaN(current))return;
    switch (operation) {
        case '+':
            evaluateResult = prev + current;
            break;
            
        case '-':

            evaluateResult = prev - current;
            break;
        case '*':
            evaluateResult = prev * current;
            break;   
        case '/':
            evaluateResult = prev / current;
            break;
        default:
            return;
    }
    result = evaluateResult.toString();
    operation = '';
    previousOperand = '';
}



//Add event listener to buttons
numberBtns.forEach(button => {
    button.addEventListener('click',() => {
        appendNumber(button.innerText);
    });
});

//clear display function 
const clearDisplay = () =>{
    result = '';
    previousOperand = '';
    operation = '';
    updatedisplay();
}

//delete last digit function
const deleteLastDigit = () =>{
    if(result==='')return;
    result=result.slice(0,-1);
    updatedisplay();
}
decimalBtn.addEventListener('click',() => appendNumber('.'));
additionBtn.addEventListener('click' , () => selectOperator('+'));
sutractBtn.addEventListener('click',()=>selectOperator('-'));
multiplyBtn.addEventListener('click',()=>selectOperator('*'));
divideBtn.addEventListener('click',()=>selectOperator('/'));

equalBtn.addEventListener('click',()=>{
    if(result==='')return;
    calculateResult();
    updatedisplay();
});
clearBtn.addEventListener('click',clearDisplay);
deleteBtn.addEventListener('click',deleteLastDigit);