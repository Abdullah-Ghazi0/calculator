
// -------------Buttons Arrays--------------

const buttons = ['','','DEL','AC','7' ,'8' ,'9' ,'+' ,'4' ,'5' ,'6' , '-' ,'1' ,'2' ,'3' ,'×' , '0','.', '=','÷'];
const operators = ['×', '÷', '+', '-'];

let display = '';

let expression = '';

let opUsed = true;

let pointAllowed = true;

let lastChar = '';

let validNumberUsed = false;

// ----------Selecting Elements------------

const keyboard = document.querySelector('#keyboard');
const displayScreen = document.querySelector('#display');


// -----------Creating Initial UI----------

function createButtons() {
    for (const ch of buttons) {

        const btn = document.createElement('button');

        btn.textContent = ch;
        btn.classList.add('btns');

        btnLooks(ch, btn);

        listnerAdding(btn);

        keyboard.append(btn);
    };
};

// -------------Update UI---------------------


function updateUI() {
    displayScreen.textContent = display;
    displayScreen.scrollLeft = displayScreen.scrollWidth;
};

// -----------Build Expression----------------

function handleInput(e) {
    let char = e.target.textContent;
    appendToExpression(char);
};

function appendToExpression(char) {

    lastChar = display.slice(-1);

    !isNaN(char) && char !== '0' && (validNumberUsed = true);

    operators.includes(char) ? (opUsed = true, validNumberUsed = false, pointAllowed = true): opUsed = false;

    if (expression === '' && !isNaN(char)) {
        display = '';
    }else if (expression === '' && isNaN(char)) {
        expression = display;
    }

    if ((display === '0' || display === '') && char === '0') {
        display = '0';
        expression = '0';
        updateUI();
        return;
    }

    if (display === '0' && !isNaN(char) && char !== '0') {
        display = '';
        expression = '';
    }


    if (!validNumberUsed && lastChar === '0' && char === '0') {
        return;
    }

    if (!pointAllowed && char == '.') {
        return;
    }

    if (display === '' && operators.includes(char)) {
        display = '0';
        expression = '0';
    }

    if (display === '0' && char === '-') {
        display = '';
    }

    if (operators.includes(lastChar) && operators.includes(char)) {
        display = display.slice(0, -1);
        expression = expression.slice(0, -1);
    }

    display = display + char;

    char === '×' && (char = '*');
    char === '÷' && (char = '/');
    expression = expression + char;
    updateUI();
};

// -----------Delete Expression------------

function removeChar(e) {
    let charRemoved = display.slice(-1);
    display = display.slice(0, -1);
    expression = expression.slice(0, -1);
    updateUI();
    display.length === 0 && (displayScreen.textContent = '0');

    if (operators.includes(expression.slice(-1))) {
        opUsed = true;
        validNumberUsed = false;
        pointAllowed = true;
    }
    if (charRemoved === '.') {
        pointAllowed = true;

    }
    
};

function clearAll(e) {
    display = '';
    expression = '';
    displayScreen.textContent = '0';
    pointAllowed = true;
}

// --------Evaluate Expression------------

function evaluate() {
    let result = eval(expression);
    result = parseFloat(result.toPrecision(6));

    expression && (display = String(result));
    expression = '';

    display.includes('.') ? pointAllowed = false: pointAllowed = true;
    updateUI();
}

// -----Zero Point---------------------

function addpoint() {
    if (!pointAllowed) return;

    if (display.length === 0) {
        expression = '0.';
        display = '0.';
    }else if (operators.includes(expression.slice(-1))) {
        expression = expression + '0.';
        display = display + '0.';
    }
    else {
        expression = expression + '.';
        display = display + '.';
    }
    pointAllowed = false;
    updateUI();
}



// --------Custom Buttons--------------

function btnLooks(char, button) {
    operators.includes(char) && button.classList.add('op-btns');
    char === '=' && button.classList.add('equal-btn');
    char === '' && (button.style.visibility = 'hidden');
}

// ---------Adding event listeners---------------

function listnerAdding(btn) {

    let eventFunc = handleInput;
    
    if (btn.textContent === '=') {
        eventFunc = evaluate;
    }else if (btn.textContent === 'DEL') {
        eventFunc = removeChar;
    }else if (btn.textContent === 'AC') {
        eventFunc = clearAll;
    }else if (btn.textContent === '.') {
        eventFunc = addpoint;
    }

    btn.addEventListener('click', eventFunc);

}

document.addEventListener('keydown', (e)=> {
    let keyPressed = e.key;
    
    if (keyPressed === 'Enter') {
        evaluate();
        e.preventDefault();
    } else if (keyPressed === 'Backspace') {
        removeChar();
    } else if (keyPressed === 'Escape') {
        clearAll();
    } else if (keyPressed === '.') {
        addpoint();
    } else if (operators.includes(keyPressed) || !isNaN(keyPressed)) {
        appendToExpression(keyPressed);
    } else if (keyPressed === '*') {
        appendToExpression('×');
    } else if (keyPressed === '/') {
        appendToExpression('÷');
    }
})

createButtons();