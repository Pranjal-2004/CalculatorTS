(() => {
    interface HTMLCalculatorElement extends HTMLInputElement {
        value: string;
    }

    interface CalculatorButton extends HTMLElement {
        dataset: {
            num?: string;
        };
    }

    const screen = document.querySelector('.screen') as HTMLCalculatorElement;
    const buttons = document.querySelectorAll('.btn') as NodeListOf<CalculatorButton>;
    const clear = document.querySelector('.btn-clear') as HTMLElement;
    const clearAll = document.querySelector('.btn-clear-all') as HTMLElement;
    const equal = document.querySelector('.btn-equal') as HTMLElement;

    const isValidExpression = (expression: string): boolean => {
        const validPattern = /^[0-9+\-*/.() ]*$/;
        return validPattern.test(expression);
    };

    const safeEval = (expression: string): number => {
        if (!isValidExpression(expression)) {
            throw new Error('Invalid expression');
        }

        const func = new Function(`return ${expression}`);
        const result = func();
        
        if (typeof result !== 'number' || !isFinite(result)) {
            throw new Error('Invalid result');
        }
        
        return result;
    };

    buttons.forEach((button: CalculatorButton): void => {
        button.addEventListener('click', (): void => {
            const value = button.dataset.num;
            if (value !== undefined) {
                screen.value += value;
            }
        });
    });

    equal.addEventListener('click', (): void => {
        if (screen.value === '') {
            screen.value = "Please enter a value";
            return;
        }

        try {
            const answer = safeEval(screen.value);
            screen.value = answer.toString();
        } catch (error) {
            screen.value = "Error";
            console.error('Calculation error:', error);
        }
    });

    clear.addEventListener('click', (): void => {
        screen.value = screen.value.slice(0, -1);
    });

    clearAll.addEventListener('click', (): void => {
        screen.value = "";
    });
    
})();
