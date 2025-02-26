// Selección de elementos del DOM
let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");

// Variable para controlar nueva entrada
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
        display.value = value; // Reemplaza el contenido del display
        newInput = false; // Permite concatenar números en la siguiente entrada
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

// Capturar el click del botón "C" y limpiar el display
document.getElementById("erase").addEventListener("click", clearDisplay);

// Función para agregar números al display
function appendNumber(num) {
    updateDisplay(num);
}

// Asignar la función appendNumber a los botones de números
document.querySelectorAll("button[id^='number-']").forEach(button => {
    button.addEventListener("click", function () {
        appendNumber(button.textContent);
    });
});

// Manejar los operadores matemáticos
function setOperator(op) {
    if (firstNumber === "") {
        firstNumber = display.value;
    } else {
        calculate(); // Si ya hay un primer número, se realiza la operación antes de asignar un nuevo operador
        firstNumber = display.value;
    }
    
    operator = op;
    newInput = true; // Permite que el usuario ingrese un nuevo número sin concatenar
}

// Ejecutar las operaciones matemáticas con "="
function calculate() {
    if (firstNumber === "" || operator === "") return; // Si no hay valores válidos, salir

    let secondNumber = display.value;
    let result = 0;

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
            result = secondNumber === "0" ? "Error" : parseFloat(firstNumber) / parseFloat(secondNumber);
            break;
    }

    display.value = result;
    firstNumber = result; // Permite continuar operaciones con el resultado
    operator = "";
    newInput = true;
}

// Asignar los eventos a los botones de operadores
document.getElementById("plus").addEventListener("click", () => setOperator("+"));
document.getElementById("minus").addEventListener("click", () => setOperator("-"));
document.getElementById("multiplied").addEventListener("click", () => setOperator("*"));
document.getElementById("divided").addEventListener("click", () => setOperator("/"));
document.getElementById("equal").addEventListener("click", calculate);

// Función para agregar el punto decimal
function appendDecimal() {
    let display = document.getElementById("display");
    
    // Verificar si el número ya tiene un punto decimal
    if (!display.value.includes(".")) {
        display.value += "."; // Si no tiene, agregar el punto decimal
    }
}

// Asignar la función appendDecimal a los botones de punto
document.getElementById("decimal").addEventListener("click", appendDecimal);

// Función para manejar la operación de cálculo
function calculate() {
    let secondNumber = document.getElementById("display").value;
    let result = 0;

    // Verificación para evitar la división por cero
    if (operator === "/" && secondNumber === "0") {
        document.getElementById("display").value = "Error"; // Mostrar error en la pantalla
        return; // Detener la ejecución del cálculo
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

    document.getElementById("display").value = result;
}
