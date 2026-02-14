const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const operations = document.querySelector('.operation');

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
    return x / y;
}

function operate(x, y, operation) {
    switch (operation) {
        case '+':
            return add(x, y);
        case '-':
            return subtract(x, y);
        case '×':
            return multiply(x, y);
        case '÷':
            return divide(x, y);
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