let runningTotal = '';
let secondOperand = '';
let operator = null;
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

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNum(button.textContent))
)


function refreshScreen() {
  display.textContent = "";
  resetScreen = false;
}

function clear() {
  display.textContent = '0';
  runningTotal = '';
  secondOperand = '';
  operator = null;
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