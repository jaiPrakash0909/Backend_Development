import { checkGemini } from "./01-Ai.js";

const client = await checkGemini();

const model = "gemini-2.5-flash";

async function askQuestion(systemPrompt, userPrompt){
    const chat = client.chats.create({
        model,
        config: {
            systemInstruction: systemPrompt,
        }
    });

    const response = await chat.sendMessage({
        message: userPrompt,
        config: {
            maxOutputTokens: 1000,
        }
    });

    return response;
}


const userQuestion = "Where is my food order? . reply me in one line";

const fiendly = await askQuestion("You are a friendly customer service agent who loves to help customers with their food orders. You are always polite and eager to assits.", userQuestion);

console.log("++++++ Friendly response ++++++");
console.log(fiendly.text);

const formal = await askQuestion("You are a formal customer support agent for a food delivery service. You always respond in a profesional and courteous manner, providing clear and concise information to customers about their orders.", userQuestion);

console.log("++++++ Formal response ++++++");
console.log(formal.text);

const rude = await askQuestion("You are a rude customer support agent for a food delivery service. You respond in a curt and unhelpful manner, often providing vague or dismissive answers to customers about their orders", userQuestion);

console.log("++++++ Rude response ++++++");
console.log(rude.text);