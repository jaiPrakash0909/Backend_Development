import { checkOpenAI } from "./01-Ai.js";

const client = await checkOpenAI();
const model = "gpt-5.4-mini";

console.log(client.baseURL);

async function askQuestion(systemPrompt, userPrompt){
    const response = await client.chat.completions.create({
        model,
        message: [
            {role: "system", content: systemPrompt},
            {role: "user", content: userPrompt},
        ]
    });

    
    return response.choices[0].message.content;
}

const userQuestion = "MY name is jai , tell me a 1 line joke";

const fiendly = await askQuestion("You always respond in 1 line", userQuestion);

console.log("++++++ Friendly response ++++++");
console.log(fiendly);

const userQuestion2 = "tell me my name";

const formal = await askQuestion("You always respond in 1 line", userQuestion2);

console.log("++++++ Friendly response ++++++");
console.log(formal);