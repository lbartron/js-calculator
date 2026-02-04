let currentValue = "";

//Appends value to the display and updates currentValue
function appendToDisplay(value){
    const display = document.getElementById('result-window');
    currentValue += value;
    display.innerText = currentValue;
}

//Clears the display and resets currentValue
function clearDisplay(){
    const display = document.getElementById('result-window');
    display.innerText = "";
    currentValue = "";
}

//Calls evaluation function and updates display with result
function calculateResult(){
    const display = document.getElementById('result-window');
    let result = evaluateNumbers(currentValue);
    if(result !== "Error" && result !== "Infinity"){
        display.innerText = result;
        currentValue = result.toString();
    }else{
        display.innerText = result;
        currentValue = "";
    }
}

//Evaluates the equation in currentValue
function evaluateNumbers(currentValue){
    //Get tokens by splitting the string by spaces
    let tokens = currentValue.trim().split(" ");
    let numbers = [];
    let operators = [];
    let result;

    for(let i = 0; i < tokens.length; i++){
        //if even index, it's a number, otherwise its an operator
        if( i % 2 === 0 ){
            numbers.push(parseFloat(tokens[i]));
        }else {
            operators.push(tokens[i]);
        }
    }

    //Process multiplication and division first
    for(let i = 0; i < operators.length; i++){
        if(operators[i] === "×" || operators[i] === "÷"){
            let leftNum = numbers[i];
            let rightNum = numbers[i + 1];

            if(operators[i] === "×"){
                result = leftNum * rightNum;
            }else if(operators[i] === "÷"){
                if(rightNum === 0){
                    return "Infinity";
                }
                result = leftNum / rightNum;
            }
            //Remove old numbers and operator, then add result
            numbers.splice(i, 2, result);
            operators.splice(i, 1);
            i--;
        }
    }

    //Process addition and subtraction
    for(let i = 0; i < operators.length; i++){
        let leftNum = numbers[i];
        let rightNum = numbers[i + 1];
        if(operators[i] === "+"){
            result = leftNum + rightNum;
        }else if(operators[i] === "-"){
            result = leftNum - rightNum;
        }
        numbers.splice(i, 2, result);
        operators.splice(i, 1);
        i--;
    }
    return numbers[0];
}

/*
*Wrapper function for operator button clicks. It has error checking for invalid inputs.
*It also adds spaces around the operator so evaluateNumbers can parse the equation easier
*/
function operatorClick(symbol){
    //Return if display is empty or last character is an operator
    if(currentValue === "") return;
    let trimmedValue = currentValue.trim();
    let lastChar = trimmedValue.slice(-1);
    //Checks for multiplication and division symbols, not the letter x or the / character
    if("+-×÷".includes(lastChar)){
        return;
    }
    appendToDisplay(` ${symbol} `);
}