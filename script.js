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
    let result;
    if (operator == "+") {
        result = add(a, b);
    } else if (operator == "-") {
        result = subtract(a, b);
    } else if (operator == "/") {
        result = divide(a, b);
    } else if (operator == "*") {
        result = multiply(a, b);
    } else {
        return null;
    }
    return Number(result.toFixed(4));
}

let operand1 = "";
let operand2 = "";
let operator = "";
let result = "";

function handleInput(e) {
    const value = e.target.textContent;

    if (DIGITS.includes(value)) {
        if (!operator) {
            if (!result) {
                // _ (2)
                operand1 += value;
                display.textContent += value;
                // 2
            } else {
                // 4 (2)
                operand1 = value;
                result = "";
                display.textContent = operand1;
            }
        } else {
            // 2 + (2)
            operand2 += value;
            display.textContent += value;
            // 2 + 2
        }
    } else if (OPERATORS.includes(value)) {
        if (!operator) {
            if (value != "=" && operand1) {
                // 2 (+)
                operator = value;
                // 2 +
                display.textContent += value;
            }
        } else {
            if (!operand2) {
                if (value != "=") {
                    // 2 + (/)
                    operator = value;
                    display.textContent = display.textContent.slice(0, -1) + value;
                } else {
                    // 2 + (=)
                    operator = "";
                    display.textContent = display.textContent.slice(0, -1);
                }
            } else {
                if (operator == "/" && operand2 == "0") {
                    // 2 / 0 (=)
                    operand1 = operand2 = operator = "";
                    result = "dude...";
                    display.textContent = result;
                } else {
                    // 2 + 2
                    result = operate(operand1, operand2, operator);
                    operand1 = result;
                    operand2 = "";
                    display.textContent = result;
                    if (value == "=") {
                        // 2 + 2 (=)
                        operator = "";
                        // 4
                    } else {
                        // 2 + 2 (+)
                        operator = value;
                        // 4 +
                        display.textContent += value;
                    }
                }
            }
        }
    } else if (CONTROLS.includes(value)) {
        // 2 +
        if (value == "AC") {
            // 2 + (AC)
            operand1 = operand2 = operator = "";
            // _
            display.textContent = "";
        }
    }
}

numpad.addEventListener("click", handleInput);