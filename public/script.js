import { DELIMITER, generateTestValues, getDecimalValue, getLargeNumber, getRandomWord, getRepeatValue, getSpecialFormatting, getValidNumber } from "./utils.js";

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

function displayResult(payload, isError = false) {
  const resultItem = document.createElement('div');
  resultItem.className = isError ?
    'error-item' :
    'result-item';
  resultItem.textContent = isError ?
    'Failed to fetch results.' :
    `Sorted Numbers: ${payload}`;
  resultsContainer.appendChild(resultItem);
}

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
    console.log(data.payload)
    displayResult(data.payload)
  } catch (error) {
    console.error('Error:', error);
    displayResult(error, true)
  }
});

clearLink.addEventListener('click', (e) => {
  e.preventDefault();
  setInput(['']);
});

function setInput(newValue) {
  inputField.value = newValue.join(DELIMITER);
}

test1Button.addEventListener('click', () => {
  const values = generateTestValues(
    getValidNumber
  );
  setInput(values);
});

test2Button.addEventListener('click', () => {
  const values = generateTestValues(
    getLargeNumber
  );
  setInput(values);
});

test3Button.addEventListener('click', () => {
  const values = generateTestValues(
    getRandomWord
  );
  setInput(values);
});

const CUSTOM_FORMAT_CHANCE = 0.35;
test4Button.addEventListener('click', () => {
  const values = generateTestValues(
    getSpecialFormatting,
    CUSTOM_FORMAT_CHANCE
  );
  setInput(values);
});

const CUSTOM_REPEAT_CHANCE = 0.15;
test5Button.addEventListener('click', () => {
  const values = generateTestValues(
    getRepeatValue,
    CUSTOM_REPEAT_CHANCE
  );
  setInput(values);
});

test6Button.addEventListener('click', () => {
  const values = generateTestValues(
    getDecimalValue
  );
  setInput(values);
});