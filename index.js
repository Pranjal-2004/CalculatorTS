(function () {
    var screen = document.querySelector('.screen');
    var buttons = document.querySelectorAll('.btn');
    var clear = document.querySelector('.btn-clear');
    var clearAll = document.querySelector('.btn-clear-all');
    var equal = document.querySelector('.btn-equal');
    var isValidExpression = function (expression) {
        var validPattern = /^[0-9+\-*/.() ]*$/;
        return validPattern.test(expression);
    };
    var safeEval = function (expression) {
        if (!isValidExpression(expression)) {
            throw new Error('Invalid expression');
        }
        var func = new Function("return ".concat(expression));
        var result = func();
        if (typeof result !== 'number' || !isFinite(result)) {
            throw new Error('Invalid result');
        }
        return result;
    };
    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            var value = button.dataset.num;
            if (value !== undefined) {
                screen.value += value;
            }
        });
    });
    equal.addEventListener('click', function () {
        if (screen.value === '') {
            screen.value = "Please enter a value";
            return;
        }
        try {
            var answer = safeEval(screen.value);
            screen.value = answer.toString();
        }
        catch (error) {
            screen.value = "Error";
            console.error('Calculation error:', error);
        }
    });
    clear.addEventListener('click', function () {
        screen.value = screen.value.slice(0, -1);
    });
    clearAll.addEventListener('click', function () {
        screen.value = "";
    });
})();
