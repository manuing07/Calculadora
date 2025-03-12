// Selección de elementos del DOM
let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");

// Variables de control
let newInput = true;
let firstNumber = "";
let operator = "";

// Capturar el click de los botones y actualizar el display
buttons.forEach((button) => {
    button.addEventListener("click", function () {
        console.log(`Clic en: ${button.textContent}`);
    });
});

// Función para actualizar el display
function updateDisplay(value) {
    if (newInput) {
        display.value = value;
        newInput = false;
    } else {
        display.value += value;
    }
}

// Función para limpiar el display
function clearDisplay() {
    display.value = "0";
    firstNumber = "";
    operator = "";
    newInput = true;
}

document.getElementById("erase").addEventListener("click", clearDisplay);

// Función para agregar números
function appendNumber(num) {
    if (display.value === "0" || newInput) {
        display.value = num;
        newInput = false;
    } else {
        display.value += num;
    }
}

document.querySelectorAll("button[id^='number-']").forEach(button => {
    button.addEventListener("click", function () {
        appendNumber(button.textContent);
    });
});

// Manejar operadores evitando operadores consecutivos
function setOperator(op) {
    if (operator && newInput) {
        operator = op;
        return;
    }
    
    if (firstNumber === "") {
        firstNumber = display.value;
    } else {
        calculate();
        firstNumber = display.value;
    }
    
    operator = op;
    newInput = true;
}

document.getElementById("plus").addEventListener("click", () => setOperator("+"));
document.getElementById("minus").addEventListener("click", () => setOperator("-"));
document.getElementById("multiplied").addEventListener("click", () => setOperator("*"));
document.getElementById("divided").addEventListener("click", () => setOperator("/"));

// Evitar múltiples puntos decimales en un número
function appendDecimal() {
    if (newInput) {
        display.value = "0.";
        newInput = false;
        return;
    }
    
    if (!display.value.includes(".")) {
        display.value += ".";
    }
}

document.getElementById("decimal").addEventListener("click", appendDecimal);

// Función para calcular resultado
function calculate() {
    if (firstNumber === "" || operator === "") return;
    
    let secondNumber = display.value;
    let result = 0;
    
    if (operator === "/" && secondNumber === "0") {
        display.value = "Error";
        firstNumber = "";
        operator = "";
        newInput = true;
        return;
    }
    
    switch (operator) {
        case "+":
            result = parseFloat(firstNumber) + parseFloat(secondNumber);
            break;
        case "-":
            result = parseFloat(firstNumber) - parseFloat(secondNumber);
            break;
        case "*":
            result = parseFloat(firstNumber) * parseFloat(secondNumber);
            break;
        case "/":
            result = parseFloat(firstNumber) / parseFloat(secondNumber);
            break;
    }
    
    display.value = result;
    firstNumber = result.toString();
    operator = "";
    newInput = true;
}

document.getElementById("equal").addEventListener("click", calculate);
