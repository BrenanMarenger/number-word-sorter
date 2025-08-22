const MAX_VALUE = 1500;
const MIN_VALUE = -1500;
const MAX_COUNT_TO_GENERATE = 10;
const MIN_COUNT_TO_GENERATE = 1;
const BASE_LARGE_NUMBER = 9000;
const LARGE_NUMBER_VARIANCE = 2000;
const CHANCE_VALUE = 0.25;
const WORD_LIST = [
  'three',
  'apple',
  'cat',
  'dog',
  'seven',
  'eight',
  'nine'
];
export const DELIMITER = ",";

export function getValidNumber(max = MAX_VALUE, min = MIN_VALUE) {
  return Math.floor(Math.random() * (max - (min) + 1)) + (min);
}

export function getTestValueCount(count = MAX_COUNT_TO_GENERATE) {
  return Math.floor(Math.random() * count) + MIN_COUNT_TO_GENERATE;
}

export function getRandomIndex(maxIndex) {
  return Math.floor(Math.random() * maxIndex);
}

export function rollChance(probability) {
  return Math.random() < probability;
}

export function generateTestValues(chanceFn, chance = CHANCE_VALUE) {
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

export function getLargeNumber(amountOver = LARGE_NUMBER_VARIANCE) {
  return BASE_LARGE_NUMBER + Math.floor(Math.random() * amountOver);
}

export function getRandomWord() {
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
}

export function getSpecialFormatting() {
  const value = getValidNumber();
  return rollChance(0.5) ?
    value + DELIMITER :
    " " + value + " ";
}

export function getRepeatValue() {
  const value = getValidNumber();
  return value + DELIMITER + value;
}

export function getDecimalValue() {
  const integer = getValidNumber();
  const decimal = getValidNumber(99, 11);
  return `${integer}.${decimal}`;
}
