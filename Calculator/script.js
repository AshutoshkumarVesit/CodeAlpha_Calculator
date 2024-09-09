const display = document.getElementById('display');
let currentInput = '';
let operator = '';
let equation = '';
let resetDisplay = false;
let lastResult = ''; // To store the last calculated result

// Handling button clicks
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    if (button.classList.contains('number')) {
      inputNumber(value);
    } else if (button.classList.contains('operator')) {
      handleOperator(value);
    } else if (button.id === 'clear') {
      clearAll();
    } else if (button.id === 'equal') {
      calculateResult();
    } else if (button.id === 'backspace') {
      handleBackspace();
    }
  });
});

function inputNumber(num) {
  if (resetDisplay) {
    currentInput = num;
    resetDisplay = false;
  } else {
    currentInput += num;
  }
  equation += num;
  updateDisplay();
}

function handleOperator(op) {
  if (resetDisplay) {
    // Instead of treating it like backspace, append the operator to the result
    equation = lastResult + ' ' + op + ' ';
    currentInput = '';
  } else {
    if (currentInput !== '') {
      equation += ' ' + op + ' ';
      currentInput = '';
    }
  }
  operator = op;
  resetDisplay = false; // Do not reset display after using an operator post-calculation
  updateDisplay();
}

function calculateResult() {
  try {
    const result = eval(equation.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-'));
    currentInput = result.toString();
    lastResult = currentInput; // Store the result
    equation = result.toString(); // Replace equation with the result
    updateDisplay();
    resetDisplay = true; // Reset for the next input
  } catch (error) {
    display.textContent = "Error";
    equation = '';
    currentInput = '';
  }
}

function clearAll() {
  currentInput = '';
  equation = '';
  lastResult = ''; // Clear the stored result as well
  updateDisplay();
}

function updateDisplay() {
  display.textContent = equation || '0';
}

function handleBackspace() {
  if (equation.length > 0 && !resetDisplay) {
    equation = equation.slice(0, -1);
    currentInput = equation;
    updateDisplay();
  }
}
