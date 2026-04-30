# Calculator 

A responsive calculator built using HTML, CSS, and JavaScript with controlled input handling and safe expression evaluation.

## Features

- Perform basic arithmetic operations:
    * Addition (+)
    * Subtraction (−)
    * Multiplication (×)
    * Division (÷)
- Keyboard input support
- Delete (DEL) and clear (AC) functionality
- Decimal number support with validation
- Scientific notation for very small/large numbers
- Real-time expression building
- Safe evaluation using math.js (no eval)

## Key Highlights

- Custom input handling system to prevent invalid expressions
- Separation between **display value** and **evaluation expression**
- Prevention of:
  - Multiple consecutive operators
  - Multiple decimal points in a number
  - Leading zero issues
- Graceful handling of edge cases and invalid inputs

## Tech Stack

- HTML5 – Structure
- CSS3 – Styling and layout
- JavaScript – Logic and functionality
- math.js – Safe expression parsing and evaluation

## Preview 
<img width="600" height="630" alt="cal" src="https://github.com/user-attachments/assets/dc84c22f-0b85-4828-bff7-ccfa98553965" />

## How to Run
1. Clone the repository
2. Open the project folder
3. Run the app: (Open index.html in your browser)

## Implementation Details

- User input is captured via buttons and keyboard
- Expressions are built manually as a controlled string
- Special symbols (×, ÷) are mapped internally to `*` and `/`
- Evaluation is handled using math.js instead of `eval()` for safety and reliability
- Errors are gracefully handled to prevent UI crashes


## Note
Initially implemented using 'eval()' but replaced with math.js to: <br>

- Avoid security risks
- Prevent unintended code execution
- Enable better control over parsing and future extensibility

## Author
**Abdullah Ghazi** <br>
GitHub: https://github.com/Abdullah-Ghazi0 <br>
LinkedIn: https://www.linkedin.com/in/abdullah-ghazi-swe/ <br>
