window.onload = function(){ 
    // Применяем сохранённую тему
    if(localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-theme");
    }

    // Если на странице есть элемент калькулятора, запускаем соответствующий код
    const outputElement = document.getElementById("result");
    if(outputElement) {
        let a = '';
        let b = '';
        let expressionResult = '';
        let selectedOperation = null;

        // Функция для динамического обновления шрифта в поле результата
        function updateDisplay(text) {
            outputElement.innerHTML = text;
            // Динамически уменьшаем шрифт при увеличении числа символов
            const len = text.length;
            let fontSize = 1.5; // базовый размер в rem
            if(len > 10) {
                fontSize = Math.max(1, 1.5 - (len - 10) * 0.05);
            }
            outputElement.style.fontSize = fontSize + "rem";
        }

        // Универсальная функция для добавления символа с обработкой нулей и точки
        function appendDigit(current, digit) {
            if(digit === "0"){
                if(current === "0" || current === "-0"){
                    return current; // повторный ноль не добавляем
                } else if(current === "" || current === "-"){
                    return current + "0"; // получаем "0" или "-0"
                } else {
                    return current + "0";
                }
            } else if(digit === "."){
                if(current === "" || current === "0" || current === "-0"){
                    return current.startsWith("-") ? "-0." : "0.";
                } else if(!current.includes(".")){
                    return current + ".";
                } else {
                    return current; // если точка уже есть, ничего не делаем
                }
            } else { // для цифр 1-9
                if(current === "0" || current === "-0"){
                    // заменяем "0" на новую цифру, сохраняя знак минус если есть
                    return current.startsWith("-") ? "-" + digit : digit;
                } else {
                    return current + digit;
                }
            }
        }

        // Функция обработки нажатия цифр и точки
        function onDigitButtonClicked(digit) {
            if (!selectedOperation) {
                a = appendDigit(a, digit);
                updateDisplay(a);
            } else {
                b = appendDigit(b, digit);
                updateDisplay(b);
            }
        }

        // Обработчики нажатий кнопок цифр
        const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');
        digitButtons.forEach(button => {
            button.onclick = function() {
                const digitValue = button.innerHTML;
                onDigitButtonClicked(digitValue);
            }
        });

        // Функция для вычисления текущего выражения
        function calculate() {
            if(a === '' || b === '' || !selectedOperation) return;
            switch(selectedOperation) { 
                case 'x':
                    expressionResult = (+a) * (+b);
                    break;
                case '+':
                    expressionResult = (+a) + (+b);
                    break;
                case '-':
                    expressionResult = (+a) - (+b);
                    break;
                case '/':
                    expressionResult = (+a) / (+b);
                    break;
            }
            a = expressionResult.toString();
            b = '';
            selectedOperation = null;
            updateDisplay(a);
        }

        // Функция обработки операции (позволяет выполнять несколько операций подряд)
        function handleOperation(op) {
            if(selectedOperation && b !== '') {
                // Если уже выбрана операция и введено b, сначала вычисляем предыдущее выражение
                calculate();
            }
            // Устанавливаем новую операцию
            if(a !== '') {
                selectedOperation = op;
            }
        }

        // Обработчики операторов
        document.getElementById("btn_op_mult").onclick = function() { handleOperation('x'); }
        document.getElementById("btn_op_plus").onclick = function() { handleOperation('+'); }
        document.getElementById("btn_op_minus").onclick = function() { handleOperation('-'); }
        document.getElementById("btn_op_div").onclick = function() { handleOperation('/'); }

        document.getElementById("btn_op_clear").onclick = function() { 
            a = '';
            b = '';
            selectedOperation = null;
            expressionResult = '';
            outputElement.style.fontSize = "1.5rem";
            updateDisplay(0);
        }

        document.getElementById("btn_op_sign").onclick = function() {
            if (!selectedOperation) {
                if (a.length > 0) {
                    a = a.charAt(0) === '-' ? a.substring(1) : '-' + a;
                    updateDisplay(a);
                }
            } else {
                if (b.length > 0) {
                    b = b.charAt(0) === '-' ? b.substring(1) : '-' + b;
                    updateDisplay(b);
                }
            }
        }

        document.getElementById("btn_op_percent").onclick = function() {
            if (!selectedOperation) {
                if (a.length > 0) {
                    a = (parseFloat(a) / 100).toString();
                    updateDisplay(a);
                }
            } else {
                if (b.length > 0) {
                    b = (parseFloat(b) / 100).toString();
                    updateDisplay(b);
                }
            }
        }

        document.getElementById("btn_op_equal").onclick = function() { 
            calculate();
        }
    }
  
    // Обработчик переключения темы, который работает на всех страницах
    const themeToggleButton = document.getElementById("theme-toggle");
    if(themeToggleButton){
      themeToggleButton.onclick = function() {
          document.body.classList.toggle("dark-theme");
          if(document.body.classList.contains("dark-theme")){
              localStorage.setItem("theme", "dark");
          } else {
              localStorage.setItem("theme", "light");
          }
      }
    }
};
