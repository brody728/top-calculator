const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operation');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
let answerDisplayed = false;

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y === 0) return 'computer broke';
    return x / y;
}

function operate(x, y, operation) {
    switch (operation) {
        case '+':
            updateDisplay(add(+x, +y));
            break;
        case '-':
            updateDisplay(subtract(+x, +y));
            break;
        case '×':
            updateDisplay(multiply(+x, +y));
            break;
        case '÷':
            updateDisplay(divide(+x, +y));
            break;
    }
}

function updateDisplay(newDisplay) {
    display.textContent = newDisplay;
}

let handleNumberPress = function(newNumber) {
    if (answerDisplayed) {
        updateDisplay('');
        answerDisplayed = false;
    }
    updateDisplay(display.textContent + `${newNumber}`);
}

numbers.forEach((number) => {
    number.addEventListener("click", () => {handleNumberPress(number.textContent);});
});

function evalCurrentDisplay() {
    if (display.textContent.match(/(\d+)([\+\-×÷]{1})(\d+)/)) {
        const [_, x, operation, y] = display.textContent.match(/(\d+\.?\d*)([\+\-×÷]{1})(\d+)/);
        operate(x, y, operation);
        return true;
    }
}

let handleOperationPress = function(operation) {
    if (!display.textContent.match(/[\+\-×÷]{1}/)) {
        updateDisplay(display.textContent + `${operation}`);
    } else {
        if (evalCurrentDisplay()) updateDisplay(display.textContent + `${operation}`);
        else updateDisplay(display.textContent.replace(/([\+\-×÷]{1})/, operation));
    }
    answerDisplayed = false;
}

operations.forEach((operation) => {
    operation.addEventListener("click", () => {
        handleOperationPress(operation.textContent)
    })
})

equals.addEventListener('click', () => {
    evalCurrentDisplay();
    answerDisplayed = true;
})

clear.addEventListener('click', () => {
    updateDisplay('');
})