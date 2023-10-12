// Calculator functions:

const add = function (a, b) {
  return a + b
};

const subtract = function (a, b) {
  return a - b
};


const multiply = function (a, b) {
  return a * b
};

const divide = function (a, b) {
  return a / b
};

const power = function (a, b) {
  return Math.pow(a, b);
};

const factorial = function (n) {

  let product = 1;
  if (n === 0 || n === 1) {
    return 1;
  } else if (n > 1) {
    for (let i = n; i > 0; i--) {
      product *= i;
    }
    return product;
  } else {
    return "number has to be positive"
  }
};

//Calculator variables:

const mainDisplay = document.querySelector('.display-bot');
const secondaryDisplay = document.querySelector('.display-top');
const numpad = document.querySelectorAll('.numpad');
const divideBtn = document.querySelector('.btn-divide');
const multiplyBtn = document.querySelector('.btn-multiply');
const minusBtn = document.querySelector('.btn-minus');
const plusBtn = document.querySelector('.btn-plus');
const equalsBtn = document.querySelector('.btn-equals');
const allClearBtn = document.querySelector('.btn-allclear');
const clearBtn = document.querySelector('.btn-clear');
const backBtn = document.querySelector('.btn-back');

let previousOperation = '';
let inputBacklog = '';
let input = '';
let displayInput = '0';
let sign = '';

//FUNCTIONS:
function inputNumber(num) {
  if (input == '' && num.textContent === '0') return;
  // 8 digit limit
  if (Number(input).toString().length >= 8) return;
  input += num.textContent;
  displayInput = Number(input).toLocaleString();
  mainDisplay.textContent = displayInput;
}

function clearAll() {
  // Clear operations
  input = '';
  displayInput = '0';
  inputBacklog = '';
  previousOperation = '';
  // Clear displays
  mainDisplay.textContent = displayInput;
  secondaryDisplay.textContent = '';
}

function clearInput() {
  input = '';
  displayInput = '0';
  mainDisplay.textContent = displayInput;
}

function removeLastNum() {
  if (input === '') return;
  let newInput = input.slice(0, input.length - 1);
  input = newInput;
  displayInput = Number(input).toLocaleString();
  mainDisplay.textContent = displayInput;
}

function operation(symbol) {
  if (secondaryDisplay.textContent !== '' || input === '') return;

  sign = symbol;
  switch (symbol) {
    case '-':
      secondaryDisplay.textContent = `${input} -`;
      break;
    case '+':
      secondaryDisplay.textContent = `${input} +`;
      break;
    case '/':
      secondaryDisplay.textContent = `${input} /`;
      break;
    case 'x':
      secondaryDisplay.textContent = `${input} *`;
      break;
    default:
      return;
  }
  inputBacklog = input;
  input = '';
  displayInput = '0';
  mainDisplay.textContent = displayInput;
}

function handleOperation() {
  if (input === '') return;

  let result;
  switch (sign) {
    case '-':
      result = Number(inputBacklog) - Number(input);
      break;
    case '+':
      result = Number(inputBacklog) + Number(input);
      break;
    case '/':
      result = Number(inputBacklog) / Number(input);
      break;
    case 'x':
      result = Number(inputBacklog) * Number(input);
      break;
    default:
      return;
  }

  // 8 digit limit
  if (result.toString().length > 8) {
    clearAll();
    mainDisplay.textContent = 'TOO LONG';
    return;
  }

  input = result.toString();
  inputBacklog = '';
  displayInput = result.toLocaleString();
  mainDisplay.textContent = displayInput;
  secondaryDisplay.textContent = '';
}

function copyToClipboard(containerid) {
  // Create temporary textarea to copy text
  let textarea = document.createElement('textarea')
  textarea.id = 'temp_element'
  textarea.style.height = 0
  document.body.appendChild(textarea)
  textarea.value = document.querySelector(".display-bot").innerText

  let selector = document.querySelector('#temp_element')
  // Copy text
  selector.select()
  document.execCommand('copy')

  // Remove temp element
  document.body.removeChild(textarea)
  // Alert user
  alert('Copied to clipboard');
}

// EVENT LISTENERS:
// All numpad numbers
for (let i = 0; i < numpad.length; i++) {
  numpad[i].addEventListener('click', () => inputNumber(numpad[i]));
}
console.log(numpad[1])
// Calculator functions
allClearBtn.addEventListener('click', () => clearAll());
clearBtn.addEventListener('click', () => clearInput());
backBtn.addEventListener('click', () => removeLastNum());

// Operators
minusBtn.addEventListener('click', () => operation('-'));
plusBtn.addEventListener('click', () => operation('+'));
divideBtn.addEventListener('click', () => operation('/'));
multiplyBtn.addEventListener('click', () => operation('x'));
equalsBtn.addEventListener('click', () => handleOperation());

// Copy product to clipboard
mainDisplay.addEventListener('click', () => copyToClipboard(mainDisplay.textContent));
