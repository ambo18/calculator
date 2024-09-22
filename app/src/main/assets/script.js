let currentValue = '';
let previousValue = '';
let operator = undefined;
const currentValueElement = document.getElementById('current-value');
const previousValueElement = document.getElementById('previous-value');

function adjustFontSize() {
    const maxFontSize = 3; // Maximum font size in rem
    const minFontSize = 1.5; // Minimum font size in rem
    const maxLength = 10; // Number of characters at which font starts shrinking

    const currentLength = currentValueElement.innerText.length;

    if (currentLength > maxLength) {
        const newFontSize = Math.max(minFontSize, maxFontSize - (currentLength - maxLength) * 0.2);
        currentValueElement.style.fontSize = `${newFontSize}rem`;
    } else {
        currentValueElement.style.fontSize = `${maxFontSize}rem`;
    }
}

// Simulate an update to the display (replace this with actual calculation logic)
function updateDisplay(value) {
    currentValueElement.innerText = value;
    adjustFontSize();
}

// Example of usage
updateDisplay("21,520"); // Normal size
updateDisplay("123,456,789,012"); // Shrinks font size for longer numbers

function appendNumber(number) {
  if (number === '.' && currentValue.includes('.')) return;
  currentValue = currentValue.toString() + number.toString();
  updateDisplay();
}

function appendOperator(op) {
  if (op === '%' && currentValue !== '') {
    currentValue = (parseFloat(currentValue) / 100).toString(); // Treat standalone % as dividing by 100
    updateDisplay();
    return;
  }
  
  if (currentValue === '') return;
  if (previousValue !== '') calculateResult();
  
  operator = op;
  previousValue = currentValue;
  currentValue = '';
}

function clearDisplay() {
  currentValue = '';
  previousValue = '';
  operator = undefined;
  updateDisplay();
}

function deleteLast() {
  currentValue = currentValue.toString().slice(0, -1);
  updateDisplay();
}

function calculateResult() {
  let computation;
  const prev = parseFloat(previousValue);
  const curr = parseFloat(currentValue);
  
  if (isNaN(prev) || isNaN(curr)) return;

  switch (operator) {
    case '+':
      computation = prev + curr;
      break;
    case '-':
      computation = prev - curr;
      break;
    case '*':
      computation = prev * curr;
      break;
    case '/':
      computation = prev / curr;
      break;
    case '%':
      computation = prev * (curr / 100); // Calculate percentage (prev * curr / 100)
      break;
    default:
      return;
  }

  currentValue = computation;
  operator = undefined;
  previousValue = '';
  updateDisplay();
}

function updateDisplay() {
  document.getElementById('current-value').textContent = currentValue || '0';
  document.getElementById('previous-value').textContent = previousValue;
}
