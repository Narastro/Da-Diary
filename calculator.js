const numbers = document.querySelector(".display-num");

const num1 = document.querySelector(".button-1"),
  num2 = document.querySelector(".button-2"),
  num3 = document.querySelector(".button-3"),
  num4 = document.querySelector(".button-4"),
  num5 = document.querySelector(".button-5"),
  num6 = document.querySelector(".button-6"),
  num7 = document.querySelector(".button-7"),
  num8 = document.querySelector(".button-8"),
  num9 = document.querySelector(".button-9"),
  num0 = document.querySelector(".button-0");

let initial = true,
  operation = false,
  op = "",
  result = 0;

const plus = document.querySelector(".button-plus"),
  minus = document.querySelector(".button-minus"),
  multiply = document.querySelector(".button-multiply"),
  divider = document.querySelector(".button-divider");

const equal = document.querySelector(".button-equal"),
  clear = document.querySelector(".button-C");

function clearNumber() {
  numbers.innerText = "0";
  initial = true;
  operation = false;
  op = "";
  result = 0;
}

function handleNumber(event) {
  const currentClick = event.target.innerText;

  if (initial) {
    numbers.innerText = currentClick;
    initial = false;
  } else {
    numbers.innerText += currentClick;
  }
}

function handleOperation(event) {
  const currentOperation = event.target.innerText;
  const currentValue = parseInt(numbers.innerText);

  if (operation) {
    if (op === "+") {
      op = currentOperation;
      operation = true;
      initial = true;
      result = result + currentValue;
      numbers.innerText = result;
    } else if (op === "-") {
      op = currentOperation;
      operation = true;
      initial = true;
      result = result - currentValue;
      numbers.innerText = result;
    } else if (op === "*") {
      op = currentOperation;
      operation = true;
      initial = true;
      result = result * currentValue;
      numbers.innerText = result;
    } else if (op === "/") {
      op = currentOperation;
      operation = true;
      initial = true;
      result = result / currentValue;
      numbers.innerText = result;
    }
  } else {
    result = currentValue;
    op = currentOperation;
    initial = true;
    operation = true;
  }
}

function handleEqual(event) {
  const currentValue = parseInt(numbers.innerText);
  if (operation) {
    if (op === "+") {
      op = "";
      operation = false;
      initial = true;
      result = result + currentValue;
      numbers.innerText = result;
    } else if (op === "-") {
      op = "";
      operation = false;
      initial = true;
      result = result - currentValue;
      numbers.innerText = result;
    } else if (op === "*") {
      op = "";
      operation = false;
      initial = true;
      result = result * currentValue;
      numbers.innerText = result;
    } else if (op === "/") {
      op = "";
      operation = false;
      initial = true;
      result = result / currentValue;
      numbers.innerText = result;
    }
  }
}

function init() {
  clear.addEventListener("click", clearNumber);

  num0.addEventListener("click", handleNumber);
  num1.addEventListener("click", handleNumber);
  num2.addEventListener("click", handleNumber);
  num3.addEventListener("click", handleNumber);
  num4.addEventListener("click", handleNumber);
  num5.addEventListener("click", handleNumber);
  num6.addEventListener("click", handleNumber);
  num7.addEventListener("click", handleNumber);
  num8.addEventListener("click", handleNumber);
  num9.addEventListener("click", handleNumber);

  plus.addEventListener("click", handleOperation);
  minus.addEventListener("click", handleOperation);
  multiply.addEventListener("click", handleOperation);
  divider.addEventListener("click", handleOperation);

  equal.addEventListener("click", handleEqual);
}
init();
