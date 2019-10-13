const throws = { // Исключения
    divisionByZero:       () => { throw new Error("TypeError: Division by zero.") },
    bracketsMustBePaired: () => { throw new Error("ExpressionError: Brackets must be paired") }
}
const priority = s => ({ // Альтернатива switch - https://medium.com/chrisburgin/rewriting-javascript-replacing-the-switch-statement-cfff707cf045
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
})[s];
const operators = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y
};
const isOperand = token => token in operators ? true :false;
const convertPPN = (input, output = '', stack = [], countBrackets = 0, separator = ' ') => {
    for(const char of input) {
        switch(char){
            case '(': // Положить открывающую скобку в стек и увеличить счетчик скобок
                stack.push(char);
                countBrackets ++;
                break;
            case ')': // Копировать из стека в выход пока не найдена открывающая скобка
                !countBrackets ? throws.bracketsMustBePaired(): false;
                while(stack[stack.length-1] != '(') output += separator + stack.pop();
                stack.pop();        // Удалить открывающую скобку
                countBrackets --;   // Уменьшить счетчик скобок
                break;
            default:
                if(isOperand(char)) {
                    output += separator; // Добавить разделитель перед операцией
                    while(priority(char) <= priority(stack[stack.length-1])) output += stack.pop() + separator;
                    stack.push(char)
                }
                else output += char;
        }
    }
    countBrackets ? throws.bracketsMustBePaired(): false;
    while(stack.length > 0) output += " " + stack.pop();
    return [...output.split(/\s+/g)];
}
const eval = (expr, stack = []) => {
    expr.forEach(token => {
        isOperand(token) ? ([y, x] = [stack.pop(), stack.pop()], token == '/' && y == '0' ? throws.divisionByZero() : stack.push(operators[token](x, y))) : stack.push(parseFloat(token));
    });
    return stack.pop();
}
const expressionCalculator = expr => eval(convertPPN(expr.replace(/\s+/g,'')));
module.exports = {
    expressionCalculator
}
