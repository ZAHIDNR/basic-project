const display = document.querySelector(".display")
const buttons = document.querySelectorAll(".number")
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        let value = button.textContent;

        if (value === ".") {
            const pars = display.textContent.split(/[\+\-\*\/]/);
            const currentParts = pars[pars.length - 1]
            if (currentParts.includes(".")) {
                return
            }
        }
        display.textContent += button.textContent;
    })

})

const clearDisplay = document.querySelector(".clear")
clearDisplay.addEventListener("click", () => display.textContent = "")

const undo = document.querySelector(".undo")
undo.addEventListener("click", () => {
    display.textContent = display.textContent.slice(0, -1)

})

const oparetor = document.querySelectorAll(".operation");

oparetor.forEach((element) => {
    element.addEventListener("click", () => {
        const lastChar = display.textContent.slice(-1); 
       
        if (/[+\-*/÷×]/.test(lastChar)) {
            return; 
        }
        display.textContent += element.textContent; 
    });
});

const equal = document.querySelector(".equal");
equal.addEventListener("click", () => {
    let val = display.textContent.split(/([+\-*/÷×])/);

  
    for (let i = 0; i < val.length; i++) {
        if (val[i] === '*' || val[i] === '×' || val[i] === '/' || val[i] === '÷') {
            let result = 0;
            if (val[i] === '*' || val[i] === '×') {
                result = parseFloat(val[i - 1]) * parseFloat(val[i + 1]);
            } else if (val[i] === '/' || val[i] === '÷') {
                result = parseFloat(val[i - 1]) / parseFloat(val[i + 1]);
            }

          
            val.splice(i - 1, 3, result);
            i -= 2; 
        }
    }

  
    for (let i = 0; i < val.length; i++) {
        if (val[i] === '+' || val[i] === '-') {
            let result = 0;
            if (val[i] === '+') {
                result = parseFloat(val[i - 1]) + parseFloat(val[i + 1]);
            } else if (val[i] === '-') {
                result = parseFloat(val[i - 1]) - parseFloat(val[i + 1]);
            }

          
            val.splice(i - 1, 3, result);
            i -= 2; 
        }
    }

    display.textContent = val[0];
});
