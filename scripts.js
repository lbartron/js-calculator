let currentValue = "";
let currentOpeartion = "";
let previousValue = "";

function appendToDisplay(value){
    const display = document.getElementById('result-window');
    currentValue += value;
    display.innerText = currentValue;
}

function clearDisplay(){
    const display = document.getElementById('result-window');
    display.innerText = "";
    currentValue = "";
    currentOperation ="";
    previousValue = "";
}

function calculateResult(){
    const display = document.getElementById('result-window');
}

function operatorClick()