const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function parseNumberString(numberString) {
  const numbers = numberString.split(',');
  const cleanedNumbers = numbers.filter(number => (
    number !== ''
  ))

  return cleanedNumbers.map(number => {
    const value = Number(number.trim());
    if (isNaN(value)) {
      throw new Error("Invalid input contains non-numeric values");
    }
    return value;
  })
}

function convertToWords(number) {

}

export const sortNumbers = (req, res) => {
  try {
    const { numberString } = req.body;
    if (!numberString) {
      return res.status(400).json({ 
        error: "Missing 'numbers' field in request body" 
      });
    }

    const numberArray = parseNumberString(numberString)
    console.log(numberArray)
    numberArray.map(number => (
      convertToWords(number)
    ))

    res.json({
      message: "Numbers successfully sorted.",
      payload: numberArray
    });
    
  } catch (error) {
    res.status(400).json({ 
      error: error.message 
    });
  }
}