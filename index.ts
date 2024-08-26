
document.addEventListener('DOMContentLoaded', function () {
    const display = document.querySelector('.display') as HTMLInputElement;
    const buttons = document.querySelectorAll('.button button');
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = (button as HTMLElement).getAttribute('data-value') || '';

            if (value === 'AC') {
                currentInput = '';
                previousInput = '';
                operator = '';
                updateDisplay('');
            } else if (value === 'DEL') {
                currentInput = currentInput.slice(0, -1);
                updateDisplay(currentInput);
            } else if (value === '=') {
                if (previousInput && operator && currentInput) {
                    const result = calculate(parseFloat(previousInput), operator, parseFloat(currentInput));
                    updateDisplay(result.toString());
                    previousInput = result.toString();
                    currentInput = '';
                    operator = '';
                }
            } else if (['+', '-', '*', '/', '%'].includes(value)) {
                if (currentInput) {
                    if (previousInput && operator) {
                        const result = calculate(parseFloat(previousInput), operator, parseFloat(currentInput));
                        previousInput = result.toString();
                        currentInput = '';
                    } else {
                        previousInput = currentInput;
                        currentInput = '';
                    }
                    operator = value;
                    updateDisplay(previousInput + operator); // Display expression so far
                }
            } else {
                currentInput += value;
                updateDisplay(previousInput + operator + currentInput); // Display full expression
            }
        });
    });

    function updateDisplay(value: string) {
        display.value = value;
    }

    function calculate(a: number, operator: string, b: number): number {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            case '%':
                return a % b;
            default:
                return 0;
        }
    }
});
