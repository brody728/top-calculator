const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operation');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');

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
    updateDisplay(display.textContent + `${newNumber}`);
}

numbers.forEach((number) => {
    number.addEventListener("click", () => {handleNumberPress(number.textContent);});
});

function evalCurrentDisplay() {
    const [_, x, operation, y] = display.textContent.match(/(\d+)([\+\-×÷]{1})(\d+)/);
    operate(x, y, operation);
}

let handleOperationPress = function(operation) {
    if (!display.textContent.match(/[\+\-×÷]{1}/)) {
        updateDisplay(display.textContent + `${operation}`);
    } else {
        evalCurrentDisplay();
        updateDisplay(display.textContent + `${operation}`);
    }
}

operations.forEach((operation) => {
    operation.addEventListener("click", () => {
        handleOperationPress(operation.textContent)
    })
})

equals.addEventListener('click', () => {
    if (display.textContent.match(/(\d+)([\+\-×÷]{1})(\d+)/)) {
        evalCurrentDisplay();
    }
})

clear.addEventListener('click', () => {
    updateDisplay('');
})