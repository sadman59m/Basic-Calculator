class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();

    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') {
            this.operation = operation;
            return;
        }
        if (this.previousOperand !== '') {
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let result;
        const previousValue = parseFloat(this.previousOperand);
        const currentValue = parseFloat(this.currentOperand);
        if (isNaN(previousValue) || isNaN(currentValue)) return;
        switch (this.operation) {
            case '+':
                result = previousValue + currentValue;
                break;
            case '-':
                result = previousValue - currentValue;
                break;
            case '×':
                result = previousValue * currentValue;
                break;
            case '÷':
                result = previousValue / currentValue;
                break;
            default:
                return;
        }
        this.currentOperand = result;
        this.previousOperand = '';
        this.operation = undefined;
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalNumber = stringNumber.split('.')[1];
        let integerNumber;
        if (isNaN(integerDigits)) integerNumber = '';
        else {
            integerNumber = integerDigits.toLocaleString('en', { maximunFactionDigits: 0 });
        }
        if (decimalNumber != null) {
            return `${integerNumber}.${decimalNumber}`;
        }
        else {
            return integerNumber;
        }

    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        }
        else
            this.previousOperandTextElement.innerText = this.previousOperand;
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const equalButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})


allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})
