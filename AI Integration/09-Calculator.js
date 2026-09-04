export async function calculator({op, a, b}) {
    if(typeof a !== 'number' || typeof b !== 'number') {
        return "Both 'a' and 'b' must be numbers.";
    }
    switch(op) {
        case 'add':
            return a + b;   
        case 'subtract':
            return a - b;
        case 'multiply':
            return a * b;
        case 'divide':  
            if(b === 0) {
                return "Division by zero is not allowed.";
            }   
            return a / b;
        default:
            return "Unsupported operation. Use add, subtract, multiply, or divide.";
    }
}

export const calculatorTool = {
    type: "function",
    function: "calculator",
    description: "A simple calculator that can perform basic arithmetic operations: addition, subtraction, multiplication, and division.",
    parameters: {
        type: "object",
        properties: {
            op: { type: "string", enum: ["add", "subtract", "multiply", "divide"] },
            a: { type: "number"},
            b: { type: "number"}    
        },
        required: ["op", "a", "b"]
    }
}