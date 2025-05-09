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

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const OPERATORS = ["+", "-", "/", "*", "="];
const CONTROLS = ["AC"];

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

display.textContent = "2*2";
populateButtons(digits, DIGITS);
populateButtons(operators, OPERATORS);
populateButtons(controls, CONTROLS);