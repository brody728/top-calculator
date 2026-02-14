const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operation');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const decimal = document.querySelector('.decimal');
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
            return add(+x, +y);
        case '-':
            return subtract(+x, +y);
        case '×':
            return multiply(+x, +y);
        case '÷':
            return divide(+x, +y);
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
    if (display.textContent.match(/(\d*\.?\d+)([\+\-×÷]{1})(\d*\.?\d+)/)) {
        const [_, x, operation, y] = display.textContent.match(/(\d*\.?\d+)([\+\-×÷]{1})(\d*\.?\d+)/);
        const result = operate(x, y, operation);
        updateDisplay(parseFloat(result.toFixed(5)))
        // if (display.textContent.match(/\./)) makeDecimalUnpressable();
        // else makeDecimalPressable();
        makeDecimalPressable();
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
    makeDecimalPressable();
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
    makeDecimalPressable();
})

let decimalHandler = function() {
    if (answerDisplayed) updateDisplay('');
    updateDisplay(display.textContent + '.')
    makeDecimalUnpressable();
    answerDisplayed = false;
}

function makeDecimalPressable() {
    decimal.addEventListener('click', decimalHandler);
    decimal.classList.remove('notPressable');
}

function makeDecimalUnpressable() {
    decimal.removeEventListener('click', decimalHandler);
    decimal.classList.add('notPressable');
}

makeDecimalPressable();