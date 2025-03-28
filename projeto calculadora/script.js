let displayElement = document.getElementById('display');
let currentMode = 'deg';
let currentComplex = 'a+bi';

function appendToDisplay(value) {
    if (displayElement.textContent === 'Cv[x]') {
        displayElement.textContent = value;
    } else {
        displayElement.textContent += value;
    }
}

function handleAction(action) {
    switch(action) {
        case 'DEL':
            displayElement.textContent = displayElement.textContent.slice(0, -1);
            break;
        case 'AC':
            displayElement.textContent = 'Cv[x]';
            break;
        case 'x2':
            displayElement.textContent += '²';
            break;
        case 'x^n':
            displayElement.textContent += '^';
            break;
        case 'Exp':
            displayElement.textContent += 'E';
            break;
        case 'save':
            localStorage.setItem('calculatorMemory', displayElement.textContent);
            break;
        case 'load':
            displayElement.textContent = localStorage.getItem('calculatorMemory') || 'Cv[x]';
            break;
    }
}

function handleFunction(func) {
    console.log(func + ' function called');
}

function handleMode(mode) {
    currentMode = mode;
}

function handleComplex(type) {
    currentComplex = type;
}

function handleTrigFunction(func) {
    displayElement.textContent += func + '(';
}

function handleInverseTrigFunction(func) {
    displayElement.textContent += func + '(';
}

function handleLogarithm(type) {
    displayElement.textContent += type + '(';
}

function handleRoot(type) {
    displayElement.textContent += type + '(';
}

function calculateResult() {
    try {
        let result = eval(displayElement.textContent);
        displayElement.textContent = result;
    } catch (error) {
        displayElement.textContent = 'Error';
    }
}