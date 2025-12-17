let calculation = '';

const operators = ["+", "-", "*", "/"]

function pressEnter() {
  const display = document.querySelector('.js-display')

  if (calculation !== '') {
    const result = eval(calculation);
    display.value = result;
    calculation = String(result);

    display.setSelectionRange(calculation.length, calculation.length)

    display.focus();
  }
}

document.querySelectorAll('.js-string-button').forEach(button => {
  button.addEventListener('click', () => {
  const value = button.innerHTML
  const display = document.querySelector('.js-display');
  const start = display.selectionStart;                 
  const end = display.selectionEnd;
  const lastCharacter = calculation[start - 1] || '';
  const currentNumber = calculation.slice(0, start).split(/[\+\-\*\/]/).pop() || '';

  
  if (value === "." && currentNumber.includes(".") && start === end) {
    return;
  }

  if (operators.includes(value) && operators.includes(lastCharacter)) {
    return
  }

  
  calculation = calculation.slice(0, start) + value + calculation.slice(end);

  

  display.value = calculation;

  display.setSelectionRange(start + value.length, start + value.length);

  display.focus();
  
  
  })
})


document.querySelector('.js-back-button')
.addEventListener('click', () => {
  const input = document.querySelector('.js-display');
  const start = input.selectionStart;
  const end = input.selectionEnd;

  if (start > 0) {
    
    calculation = calculation.slice(0, start - 1) + calculation.slice(end);
    
    input.value = calculation;

    input.setSelectionRange(start - 1, start - 1);
    input.focus();
  }
});

  
document.querySelector('.js-equal-button')
.addEventListener('click', () => {
  pressEnter()
})


document.querySelector('.js-clear-button')
.addEventListener('click', () => {
  document.querySelector('.js-display')
      .value = '';

  calculation = '';

})


document.querySelector('.js-display').addEventListener('keydown',(e) => {
  const allowedKeys = [
      "0","1","2","3","4","5","6","7","8","9",
      "+","-","*","/",".",
      "Backspace","Escape","Enter",
      "ArrowLeft","ArrowRight"
  ];


  const display = document.querySelector('.js-display');
  const value = e.key
  const start = display.selectionStart;
  const end = display.selectionEnd;
  const lastCharacter = calculation[start - 1] || '';
  const currentNumber = calculation.slice(0, start).split(/[\+\-\*\/]/).pop() || '';


  if (value === "." && currentNumber.includes(".") && start === end) {
    e.preventDefault();
    return;
  }  


  if (operators.includes(value) && operators.includes(lastCharacter)) {
    e.preventDefault();
    return;
  }

  if (!allowedKeys.includes(e.key)) {
      e.preventDefault();
  }
  
  if(e.key === "Enter") {
    e.preventDefault();
    pressEnter();
    return;
  }

  if (e.key === "Escape") {
    e.preventDefault();
    document.querySelector('.js-display').value = '';
    calculation = '';
  }
})


const display = document.querySelector('.js-display');

display.addEventListener('input', () => {
  let value = display.value;

  // Remove any character that is not a number, dot, or operator
  value = value.replace(/[^0-9+\-*/.]/g, '');

  // Collapse multiple operators to keep only the last one typed
  value = value.replace(/([+\-*/]){2,}/g, (match) => match.slice(-1));

  // Remove extra dots in a number
  value = value.split(/([+\-*/])/).map(part => {
    if (!operators.includes(part)) {
      const nums = part.split('.');
      if (nums.length > 2) {
        return nums.shift() + '.' + nums.join('');
      }
    }
    return part;
  }).join('');

  display.value = value;
  calculation = value;
});


document.querySelector('.js-display').addEventListener('paste', e => e.preventDefault())















