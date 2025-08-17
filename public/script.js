//https://docs.google.com/document/d/1pjyEqZlR6zz8JMCaMAOtR6TDZfKc61MJlQEaZkCblLY/edit?tab=t.0

const MAX_VALUE = 1500;
const MIN_VALUE = -1500;
const MAX_COUNT_TO_GENERATE = 10;
const MIN_COUNT_TO_GENERATE = 1;
const DELIMITER = ",";
const CHANCE_VALUE = 0.25;
const BASE_LARGE_NUMBER = 9000;
const LARGE_NUMBER_VARIANCE = 2000;
const WORD_LIST = [
  'three',
  'apple',
  'cat',
  'dog',
  'seven',
  'eight',
  'nine'
];

const inputField = document.getElementById('inputString');
const test1Button = document.getElementById('test1');
const test2Button = document.getElementById('test2');
const test3Button = document.getElementById('test3');
const test4Button = document.getElementById('test4');
const test5Button = document.getElementById('test5');
const test6Button = document.getElementById('test6');
const submitButton = document.getElementById('submitButton');
const clearLink = document.getElementById('clearInput');
const resultsContainer = document.getElementById('results');

submitButton.addEventListener('click', async () => {
  const numberString = inputField.value;
  resultsContainer.innerHTML = '';

  try {
    const response = await fetch('/sort-numbers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ numberString })
    });
    const data = await response.json();
     if (!response.ok) {
      throw new Error(data.error || `${response.status} Error`);
    }
    const resultItem = document.createElement('div');
    resultItem.className = 'result-item';
    resultItem.textContent = `Sorted Numbers: ${data.payload}`;
    resultsContainer.appendChild(resultItem);
  } catch (error) {
    console.error('Error:', error);
    const errorItem = document.createElement('div');
    errorItem.className = 'error-item';
    errorItem.textContent = 'Failed to fetch results.';
    resultsContainer.appendChild(errorItem);
  }
});

clearLink.addEventListener('click', (e) => {
  e.preventDefault();
  setInput(['']);
});

function setInput(newValue) {
  inputField.value = newValue.join(DELIMITER);
}

function getValidNumber(max = MAX_VALUE, min = MIN_VALUE) {
  return Math.floor(Math.random() * (max - (min) + 1)) + (min);
}

function getTestValueCount(count = MAX_COUNT_TO_GENERATE) {
  return Math.floor(Math.random() * count) + MIN_COUNT_TO_GENERATE;
}

function getRandomIndex(maxIndex) {
  return Math.floor(Math.random() * maxIndex);
}

function rollChance(probability) {
  return Math.random() < probability;
}

function generateTestValues(chanceFn, chance = CHANCE_VALUE) {
  const count = getTestValueCount();
  const guaranteedIndex = getRandomIndex(count);
  return Array.from({ length: count }, (_value, i) => {
    if (i === guaranteedIndex) {
      return chanceFn();
    } else {
      return rollChance(chance) ? chanceFn() : getValidNumber();
    }
  });
}

// Test 1: Standard
test1Button.addEventListener('click', () => {
  const values = generateTestValues(
    getValidNumber
  );
  setInput(values);
});

// Test 2: Large number
function getLargeNumber(amountOver = LARGE_NUMBER_VARIANCE) {
  return BASE_LARGE_NUMBER + Math.floor(Math.random() * amountOver);
}

test2Button.addEventListener('click', () => {
  const values = generateTestValues(
    getLargeNumber
  );
  setInput(values);
});

// Test 3: String
function getRandomWord() {
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
}

test3Button.addEventListener('click', () => {
  const values = generateTestValues(
    getRandomWord
  );
  setInput(values);
});

// Test4: Funky delimiter
function getSpecialFormatting() {
  const value = getValidNumber();
  return rollChance(0.5) ?
    value + DELIMITER :
    " " + value + " ";
}

test4Button.addEventListener('click', () => {
  const values = generateTestValues(
    getSpecialFormatting,
    0.35
  );
  setInput(values);
});

// Test 5: Repeated value
function getRepeatValue() {
  const value = getValidNumber();
  return value + DELIMITER + value;
}

test5Button.addEventListener('click', () => {
  const values = generateTestValues(
    getRepeatValue,
    0.15
  );
  setInput(values);
});

// Test 6: Decimal value
function getDecimalValue() {
  const integer = getValidNumber();
  const decimal = getValidNumber(99, 11);
  return `${integer}.${decimal}`;
}

test6Button.addEventListener('click', () => {
  const values = generateTestValues(
    getDecimalValue
  );
  setInput(values);
});