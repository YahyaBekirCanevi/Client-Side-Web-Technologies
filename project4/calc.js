class TopBarActions extends HTMLElement {
    connectedCallback() {
        this.isLight = true;

        const darkIcon = document.createElement("i")
        darkIcon.className = "fa-sharp fa-solid fa-moon"

        const lightIcon = document.createElement("i")
        lightIcon.className = "fa-sharp fa-solid fa-sun"

        const arrow = document.createElement("i")
        arrow.className = "fa-sharp fa-solid fa-arrow-rotate-right"

        this.appendChild(arrow)
        this.appendChild(lightIcon)

        arrow.addEventListener('click', () => {
            this.isLight = !this.isLight
            this.innerHTML = ""
            this.appendChild(arrow)
            this.appendChild(this.isLight ? lightIcon : darkIcon)
            let themeCssEl = document.querySelector('#theme-css')
            themeCssEl.setAttribute('href', this.isLight ? 'light.css' : 'dark.css')
        })
    }
}

customElements.define('topbar-actions', TopBarActions);

class Calculator {
    constructor(preText, curText) {
        this.preText = preText;
        this.curText = curText;
        this.clear();
    }
    clear() {
        this.curOperand = `0`;
        this.preOperand = ` `;
        this.operation = undefined;
    }
    appendNumber(number) {
        if (number == '.' && this.curOperand.includes('.')) return;
        this.curOperand = this.curOperand.toString() + number.toString();
    }
    chooseOperation(operation) {
        if (this.curOperand == ``) return;
        if (this.preOperand != ``) this.compute();
        this.operation = operation;
        this.preOperand = this.curOperand;
        this.curOperand = ``;
    }
    compute() {
        let computation;
        const prev = parseFloat(this.preOperand);
        const curr = parseFloat(this.curOperand);
        if (isNaN(prev) || isNaN(curr)) return;
        let compString = prev;
        switch (this.operation) {
            case `+`: {
                computation = prev + curr;
                compString += ` + `;
                break;
            }
            case `-`: {
                computation = prev - curr;
                compString += ` - `;
                break;
            }
            case `*`: {
                computation = prev * curr;
                compString += ` * `;
                break;
            }
            case `/`: {
                computation = prev / curr;
                compString += ` / `;
                break;
            }
            default: return;
        }
        compString += curr + ` = `
        console.log(compString)
        this.preOperand = compString;
        this.curOperand = computation;
        this.operation = undefined;
    }
    getDisplayNumber(number) {
        const strNumber = number.toString();
        const intDigits = parseFloat(strNumber.split(`.`)[0]);
        let decimalDigits = strNumber.split(`.`)[1];
        console.log(decimalDigits)
        if (decimalDigits != undefined) {
            decimalDigits = decimalDigits.toString()
            if (decimalDigits.length > 8)
                decimalDigits = decimalDigits.substring(0, 8);
        }
        let intDisplay = isNaN(intDigits) ? `` : intDigits.toLocaleString(`en`, { maximumFractionDigits: 0 });
        return (decimalDigits != null) ? `${intDisplay}.${decimalDigits}` : intDisplay;
    }
    updateDisplay() {
        this.curText.innerText = this.getDisplayNumber(this.curOperand);
        const op = (this.operation != null) ? ` ${this.operation}` : ``;
        this.preText.innerText = (this.operation != null) ?
            `${this.getDisplayNumber(this.preOperand)} ${op}` : this.preOperand;
    }
}

const numberButtons = document.querySelectorAll(`.number`);
const operandButtons = document.querySelectorAll(`.operand`);
const clearButton = document.getElementById(`clear`);
const equalsButton = document.getElementById(`equals`);
const preText = document.getElementById(`pre-operand`);
const curText = document.getElementById(`cur-operand`);

const calculator = new Calculator(preText, curText);

numberButtons.forEach(button => {
    button.addEventListener(`click`, () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operandButtons.forEach(button => {
    button.addEventListener(`click`, () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener(`click`, () => {
    calculator.compute();
    calculator.updateDisplay();
});

clearButton.addEventListener(`click`, () => {
    calculator.clear();
    calculator.updateDisplay();
});