class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.readyToReset = false;
        this.clear();
    }

    clear() {
         this.currentOperand = '';
         this.previousOperand = '';
         this.operation = undefined;
         this.readyToReset = false;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    
    chooseOperation(operation) {


        if (this.currentOperand === '') return;
        if (this.currentOperand !== '' && this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    
    computeSqrt () {
        const val = parseFloat(this.currentOperand);
        if (val >= 0) 
            this.currentOperand = Math.sqrt(val)
            else
            {
                alert (Error('Излечение квадратного корня из отрицательного числа'));
                this.currentOperand = '';
            }
            this.readyToReset = true;

    }

    negativeNumber () {
        this.currentOperand = this.currentOperand * (-1);
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
            if (isNaN(prev) || isNaN(current)) return;
            switch (this.operation)
            {
                case '+':
                    computation = (prev + current);
                    break;
                case '-':
                    computation = (prev - current);
                    break;
                case '*':
                    computation = (prev * current);
                    break;
                case '÷':
                    computation = ((prev*1e15) / (1e15*current));
                    break;
                case '^':
                    if (prev < 0 && current%1 != 0) {
                        alert(Error('Возведение отрицательного числа в дробную степень'));
                        this.currentOperand = '';
                        this.previousOperand = '';
                        this.operation = undefined;
                        return;
                    } else
                    computation = Math.pow(prev, current);
                    break;
                default:
                    return;
            }
        let result = Number(computation.toFixed(10));
        this.currentOperand = result;
        this.readyToReset = true;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const operationSqrtButton = document.querySelector('[data-operation-sqrt]');
const operationNegativeButton = document.querySelector('[data-operation-negative]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(buttton => {
    buttton.addEventListener('click', () => {
        if(calculator.previousOperand === "" && calculator.currentOperand !== "" && calculator.readyToReset) {
          calculator.currentOperand = "";
          calculator.readyToReset = false;
      }
        calculator.appendNumber(buttton.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(buttton => {
    buttton.addEventListener('click', () => {
        calculator.chooseOperation(buttton.innerText);
        calculator.updateDisplay();
    })
})

operationSqrtButton.addEventListener('click', button => {
        calculator.computeSqrt();
        calculator.updateDisplay();
    })

operationNegativeButton.addEventListener('click', button => {
        calculator.negativeNumber();
        calculator.updateDisplay();
    })

equalButton.addEventListener('click', buttton => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', buttton => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', buttton => {
    calculator.delete();
    calculator.updateDisplay();
})
