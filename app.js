let runningTotal = '';
let secondOperand = '';
let currentOperator = null;
let resetScreen = false;

const display = document.getElementById("display-text");
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.getElementById("equals-btn");
const decimalButton = document.getElementById("point-btn");
const clearButton = document.getElementById("clear-btn");
const deleteButton = document.getElementById("delete-btn");

clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNum);
decimalButton.addEventListener('click', appendPoint);
equalsButton.addEventListener('click', evaluate);

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNum(button.textContent))
)

operationButtons.forEach((button) =>
  button.addEventListener('click', () => setOperator(button.textContent))
)

function refreshScreen() {
  display.textContent = "";
  resetScreen = false;
}

function clear() {
  display.textContent = '0';
  runningTotal = '';
  secondOperand = '';
  currentOperator = null;
}

function appendNum(num) {
  if (display.textContent === '0' || resetScreen) {
    refreshScreen()
  }
  display.textContent += num;
}

function appendPoint() {
  if (resetScreen) refreshScreen()
  if (display.textContent === '')
    display.textContent = '0'
  if (display.textContent.includes('.')) return
  display.textContent += '.'
}

function deleteNum() {
  display.textContent = display.textContent.toString().slice(0, -1)
}

function setOperator(operator) {
  if (currentOperator !== null) {
    evaluate();
  }
  runningTotal = display.textContent;
  currentOperator = operator;
  resetScreen = true;
}

function evaluate() {
  if (currentOperator === null || resetScreen) {
    return;
  }

  if (currentOperator === "÷" && display.textContent === '0') {
    alert("You can't divide by 0!");
    return;
  }

  secondOperand = display.textContent;
  display.textContent = round(operate(runningTotal, secondOperand, currentOperator));
  currentOperator = null;
}

function round(number) {
  return Math.round(number * 1000) / 1000;
}

function operate(num1, num2, operator) {
  num1 = Number(num1);
  num2 = Number(num2);
  switch(operator){
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case 'x':
      return num1 * num2;
    case '÷':
      if (num2 === 0) {
        return null;
      }
      return num1 / num2;
    default:
      return null;
  }
}