function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const OPERATORS = ["+", "-", "/", "*", "="];
const CONTROLS = ["AC"];

const numpad = document.querySelector("#numpad");
const display = document.querySelector("#display");
const digits = document.querySelector("#digits");
const operators = document.querySelector("#operators");
const controls = document.querySelector("#controls");

function populateButtons(container, values) {
    for (const value of values) {
        const btn = document.createElement("button");
        btn.textContent = value;
        container.appendChild(btn);
    }
}

display.textContent = "";
populateButtons(digits, DIGITS);
populateButtons(operators, OPERATORS);
populateButtons(controls, CONTROLS);

function operate(a, b, operator) {
    [a, b] = [+a, +b];
    if (operator == "+") {
        return add(a, b);
    } else if (operator == "-") {
        return subtract(a, b);
    } else if (operator == "/") {
        return divide(a, b);
    } else if (operator == "*") {
        return multiply(a, b);
    } else {
        return null;
    }
}

let operand1 = "";
let operand2 = "";
let operator = "";

function handleInput(e) {
    const value = e.target.textContent;

    if (DIGITS.includes(value)) {
        if (!operator) {
            operand1 += value;
        } else {
            operand2 += value;
        }
        display.textContent += value;
    } else if (OPERATORS.includes(value)) {
        if (!operator) {
            operator = value;
            display.textContent += value;
        } else if (value == "=") {
            operand1 = operate(operand1, operand2, operator);
            operand2 = "";
            operator = "";
            display.textContent = operand1;
        }
    } else if (CONTROLS.includes(value)) {
        if (value == "AC") {
            operand1 = operand2 = operator = "";
            display.textContent = "";
        }
    }
}

numpad.addEventListener("click", handleInput);