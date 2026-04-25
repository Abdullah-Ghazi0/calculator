
// -------------Buttons Arrays--------------

const buttons = ['','','DEL','AC','7' ,'8' ,'9' ,'+' ,'4' ,'5' ,'6' , '-' ,'3' ,'2' ,'1' ,'×' , '0','.', '=','÷'];
const operators = ['×', '÷', '+', '-'];

let display = '';

let expression = '';

// ----------Selecting Elements------------

const keyboard = document.querySelector('#keyboard');
const displayScreen = document.querySelector('#display');


// -----------Creating Initial UI----------

function createButtons() {
    for (ch of buttons) {

        const btn = document.createElement('button');

        btn.textContent = ch;
        btn.classList.add('sm-btns');

        btnLooks(ch, btn);

        listnerAdding(btn);

        keyboard.append(btn);
    };
};

// -------------Update UI---------------------


function updateUI() {
    displayScreen.textContent = display;
};

// -----------Build Expression----------------

function buildExp(e) {
    char = e.target.textContent
    display = display + char;

    char === '×' && (char = '*');
    char === '÷' && (char = '/')
    expression = expression + char;
    updateUI()
};

// -----------Delete Expression------------

function removeChar(e) {
    display = display.slice(0, -1);
    expression = expression.slice(0, -1);
    updateUI();
    display.length === 0 && (displayScreen.textContent = '0');
    
};

function clearDispaly(e) {
    display = '';
    expression = '';
    displayScreen.textContent = '0';
}

// --------Evaluate Expression------------

function evaluate(){
    result = eval(expression);
    display = result;
    expression = '';
    updateUI();
}

// -----Zero Point---------------------

function addpoint() {
    if (display.length === 0) {
        expression = '0.';
        display = '0.';
    }else {
        expression = expression + '.';
        display = display + '.';
    }
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

    let eventFunc = buildExp;
    
    if (btn.textContent === '=') {
        eventFunc = evaluate;
    }else if (btn.textContent === 'DEL') {
        eventFunc = removeChar;
    }else if (btn.textContent === 'AC') {
        eventFunc = clearDispaly;
    }else if (btn.textContent === '.') {
        eventFunc = addpoint;
    }

    btn.addEventListener('click', eventFunc);

}

createButtons();