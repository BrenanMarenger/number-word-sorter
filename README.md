# Number Word Sorter

The application allows users to enter a comma-separated list of numbers, converts them into their written word equivalents, sorting them alphabetically by spelling.  

#### For example:  
Input: 
```
1,2,3,11,8999,16
```
Output:
```
Eight Thousand Nine Hundred Ninety Nine
Eleven
One
Sixteen
Three
Two
```

## Features

- Accepts a comma-separated list of numbers as input  
- Converts numbers into number words 
- Sorts alphabetically
- Handles negative numbers, prefixing them with "Negative" 
- Gracefully handles invalid inputs  
- Visual cue for numbers greater than `9000`  
- Frontend communicates with a backend API 
- Built-in test cases that randomly generate values for different input scenarios:  
  - **Standard input** – Includes negative and positive numbers within -1500 to 1500  
  - **Large numbers** – Includes at least one number above 9000
  - **Non-numeric values** – Includes at least one invalid non-numeric value  
  - **Irregular delimiters** – Includes at least one extra spaces or commas around numbers
  - **Duplicate numbers** – Includes at least one duplicate number
  - **Decimal numbers** – Includes at least one decimal number 
---

## Acceptance Criteria

1. **Valid Input Sorting**  
   - User enters valid numbers and clicks "Sort Text"  
   - Numbers are converted to words and displayed alphabetically

2. **Invalid Input Handling**  
   - User enters invalid input (letters, symbols, etc.)  
   - Application displays an error and provides an example of valid input  

3. **Numbers Over 9000**  
   - Any number greater than `9000` is replaced with a special visual element
   - Hovering over the element reveals the number word  

---

## Example Scenarios

| Scenario | Description |
|----------|-------------|
| **Valid Input** | User enters `5,11,-2` → Output: "Eleven", "Five", "Negative Two" |
| **Invalid Input** | User enters `1,abc,3` → Error message shown with example valid input |
| **Over 9000** | User enters `12,9001` → "Twelve", [special visual for 9001 with hover text] |

---

## Setup

```bash
# Install dependencies
npm install

# Start the frontend
npm start
