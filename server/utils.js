const HUNDRED = 100;
const THOUSAND = 1000;
const MILLION = 1000000;
const BILLION = 1000000000;
const WORDS = {
  ones: {
    0: "", 1: "One", 2: "Two",
    3:"Three", 4: "Four", 5: "Five",
    6: "Six", 7: "Seven", 8: "Eight",
    9: "Nine"
  },
  teens: {
    10: "Ten", 11: "Eleven", 12: "Twelve",
    13: "Thirteen", 14: "Fourteen", 15: "Fifteen",
    16: "Sixteen", 17: "Seventeen", 18: "Eighteen",
    19: "Nineteen"
  },
  tens: {
    20: "Twenty", 30: "Thirty", 40: "Forty",
    50: "Fifty", 60: "Sixty", 70: "Seventy",
    80: "Eighty", 90: "Ninety"
  }
};

export function parseNumberString(numberString) {
  const numbers = numberString.split(",");
  const cleanedNumbers = numbers.filter(number => (
    number !== ""
  ));
  return cleanedNumbers.map(number => {
    const value = Number(number.trim());
    if (isNaN(value)) {
      throw new Error("Input contains non-numeric values");
    }
    if (!Number.isInteger(value)) {
      throw new Error("Input contains a decimal value");
    }
    return value;
  })
}

function handleUnderHundred(number) {
  if (number < 10) {
    return WORDS.ones[number];
  } else if (number < 20) {
    return WORDS.teens[number];
  } else {
    const onesDigit = number % 10;
    const tensDigit = number - onesDigit;
    return onesDigit === 0 ? (
      WORDS.tens[tensDigit]
    ) : (
      WORDS.tens[tensDigit] + " " + WORDS.ones[onesDigit]
    )
  }
}

function handleLargeNumber(number, bracket, suffix) {
  const numberOfUnits = Math.floor(number / bracket);
  const remainder = number % bracket;
  let result = recursiveNumberToWord(numberOfUnits) + " " + suffix;
  return remainder > 0 ? (
    result + " " + recursiveNumberToWord(remainder)
  ) : (
    result
  );
}

function recursiveNumberToWord(number) {
  if (number >= BILLION) {
    return handleLargeNumber(number, BILLION, "Billion")
  } else if (number >= MILLION) {
    return handleLargeNumber(number, MILLION, "Million");
  } else if (number >= THOUSAND) {
    return handleLargeNumber(number, THOUSAND, "Thousand");
  } else if (number >= HUNDRED) {
    return handleLargeNumber(number, HUNDRED, "Hundred");
  } else {
    return handleUnderHundred(number);
  }
} 

export function convertToWords(number) {
  if (number === 0) {
    return "Zero";
  }
  let wordString = recursiveNumberToWord(Math.abs(number));
  return number < 0 ? (
    "Negative " +  wordString
  ) : (
    wordString
  );
}