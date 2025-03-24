let firstValue = 0;
let displayReturn = false;
let operator;
window.onload = function () {
  // changeDisplayText();

  const buttons = document.querySelectorAll('button');
  let clickedValue;
  for (const button of buttons) {
    button.addEventListener('click', onclickButton);
  }
};

const onclickButton = (e) => {
  const clickedButton = e.target;
  const display = document.querySelector('.calc-display');

  if (clickedButton.classList.contains('num')) {
    changeDisplayText(clickedButton, display);
    displayReturn = false;
  }

  if (clickedButton.classList.contains('delete')) {
    display.innerText =
      display.innerText.length > 1 ? display.innerText.slice(0, -1) : '0';
  }

  if (clickedButton.classList.contains('clear')) {
    display.innerText = '0';
    firstValue = 0;
    displayReturn = false;
    operator = null;
  }

  if (clickedButton.classList.contains('operator')) {
    if (firstValue && operator) {
      firstValue = calcuate(operator, firstValue, Number(display.innerText));
      display.innerText = firstValue;
    } else {
      firstValue = Number(display.innerText);
    }
    displayReturn = true;
    operator = clickedButton.innerText;
  }

  if (clickedButton.classList.contains('total')) {
    if (operator) {
      display.innerText = calcuate(
        operator,
        firstValue,
        Number(display.innerText),
      );
      firstValue = 0;
      displayReturn = true;
      operator = null;
    }
  }
};

const calcuate = (operator, first, second) => {
  switch (operator) {
    case '+':
      return first + second;
    case '-':
      return first - second;
    case '*':
      return first * second;
    case '/':
      return first / second;
  }
};

const changeDisplayText = (input, display) => {
  if (displayReturn || (!displayReturn && display.innerText === '0')) {
    // 기존 입력값이 없을때
    display.innerText = input.innerText;
  } else if (!displayReturn && display.innerText.length < 10) {
    // 기존 입력값이 있을때. 최대 10글자까지
    display.innerText += input.innerText;
  }
};
