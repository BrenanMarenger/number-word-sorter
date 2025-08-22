import { convertToWords, parseNumberString } from "./utils.js";


export const sortNumbers = (req, res) => {
  try {
    const { numberString } = req.body;
    if (!numberString) {
      return res.status(400).json({ 
        error: "Missing parameters" 
      });
    }

    const numberArray = parseNumberString(numberString);
    const wordsArray = numberArray.map(number => (
      convertToWords(number)
    ));
    const sortedWordsArray = wordsArray.sort();

    res.json({
      message: "Numbers successfully converted and sorted.",
      payload: sortedWordsArray
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message 
    });
  }
}