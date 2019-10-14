function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.replace(/[(]/g, "( ");
  expr = expr.replace(/[)]/g, " )");
  var a = expr.indexOf(" ");
  if (a >= 0) {
    expr = expr.split(" ");
  } else {
    expr = expr.split("");
  }
  var arrayItem = [];
  expr.map(function(item) {
    if (item !== "") {
      arrayItem.push(item);
    }
  });

  var priority = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "(": 4,
    ")": 1
  };

  var counter1 = 0;
  var counter2 = 0;
  var zero = 0;
  for (var i = 0; i < arrayItem.length; i++) {
    if (arrayItem[i] === "(") {
      counter1++;
    } else if (arrayItem[i] === ")") {
      counter2++;
    } else if ((arrayItem[i] === "/") & (arrayItem[i + 1] === "0")) {
      zero++;
    }
  }
  if (counter1 !== counter2) {
    throw Error('ExpressionError: Brackets must be paired');
  }
  if (zero !== 0) {
    throw Error('TypeError: Division by zero.');
  }

  arrayNumbers = [];
  arraySign = [];
  for (var i = 0; i < arrayItem.length; i++) {
    if (
      arrayItem[i] === "+" ||
      arrayItem[i] === "-" ||
      arrayItem[i] === "*" ||
      arrayItem[i] === "/" ||
      arrayItem[i] === "(" ||
      arrayItem[i] === ")"
    ) {
      priority["("] = 6;
      if (arraySign[arraySign.length - 1] === ")") {
        arraySign.pop();
        arraySign.pop();
        priority["("] = 6;
      }
      if (arraySign.length === 0) {
        arraySign.push(arrayItem[i]);
      } else if (
        priority[arraySign[arraySign.length - 1]] < priority[arrayItem[i]] ||
        arraySign[arraySign.length - 1] === "("
      ) {
        arraySign.push(arrayItem[i]);
      } else if (
        priority[arraySign[arraySign.length - 1]] >= priority[arrayItem[i]]
      ) {
        while (
          priority[arraySign[arraySign.length - 1]] >= priority[arrayItem[i]]
        ) {
          if (arraySign[arraySign.length - 1] === "/") {
            var x =
              arrayNumbers[arrayNumbers.length - 2] /
              arrayNumbers[arrayNumbers.length - 1];
            arrayNumbers.pop();
            arrayNumbers.pop();
            arraySign.pop();
            arrayNumbers.push(x);
          } else if (arraySign[arraySign.length - 1] === "*") {
            var x =
              arrayNumbers[arrayNumbers.length - 1] *
              arrayNumbers[arrayNumbers.length - 2];
            arrayNumbers.pop();
            arrayNumbers.pop();
            arraySign.pop();
            arrayNumbers.push(x);
          } else if (arraySign[arraySign.length - 1] === "+") {
            var x =
              +arrayNumbers[arrayNumbers.length - 1] +
              +arrayNumbers[arrayNumbers.length - 2];
            arrayNumbers.pop();
            arrayNumbers.pop();
            arraySign.pop();
            arrayNumbers.push(x);
          } else if (arraySign[arraySign.length - 1] === "-") {
            var x =
              arrayNumbers[arrayNumbers.length - 2] -
              arrayNumbers[arrayNumbers.length - 1];
            arrayNumbers.pop();
            arrayNumbers.pop();
            arraySign.pop();
            arrayNumbers.push(x);
          } else if (arraySign[arraySign.length - 1] === "(") {
            priority["("] = 0;
          }
        }
        if (arrayItem[i] !== undefined) {
          arraySign.push(arrayItem[i]);
        }
      }
    } else {
      arrayNumbers.push(arrayItem[i]);
    }
  }
  if (arraySign[arraySign.length - 1] === ")") {
    arraySign.pop();
    arraySign.pop();
  }

  for (var i = arraySign.length - 1; i >= 0; i--) {
    if (arraySign[i] === "+") {
      var x = +arrayNumbers[i] + +arrayNumbers[i + 1];
      arrayNumbers.pop();
      arrayNumbers.pop();
      arraySign.pop();
      arrayNumbers.push(x);
    } else if (arraySign[i] === "-") {
      var x = arrayNumbers[i] - arrayNumbers[i + 1];
      arrayNumbers.pop();
      arrayNumbers.pop();
      arraySign.pop();
      arrayNumbers.push(x);
    } else if (arraySign[i] === "*") {
      var x = arrayNumbers[i] * arrayNumbers[i + 1];
      arrayNumbers.pop();
      arrayNumbers.pop();
      arraySign.pop();
      arrayNumbers.push(x);
    } else {
      var x = arrayNumbers[i] / arrayNumbers[i + 1];
      arrayNumbers.pop();
      arrayNumbers.pop();
      arraySign.pop();
      arrayNumbers.push(x);
    }
  }
  return arrayNumbers[0];
}

module.exports = {
    expressionCalculator
}