import { checkGemini } from "./01-Ai.js";

const client = await checkGemini();
const model = "gemini-2.5-flash";

const conversation = [];

async function askQuestion(systemPrompt, userPrompt, history = []) {

    const response = await client.models.generateContent({
        model,

        contents: [
            ...history,

            {
                role: "user",
                parts: [
                    {
                        text: userPrompt
                    }
                ]
            }
        ],

        config: {
            systemInstruction: systemPrompt,
            maxOutputTokens: 1000
        }
    });

    const answer = response.text;


    history.push({
        role: "user",
        parts: [
            {
                text: userPrompt
            }
        ]
    });

    
    history.push({
        role: "model",
        parts: [
            {
                text: answer
            }
        ]
    });

    return answer;
}


const userQuestion = "MY name is jai, tell me a 1 line joke";

const friendly = await askQuestion(
    "You always respond in 1 line",
    userQuestion,
    conversation
);

console.log("++++++ Friendly response ++++++");
console.log(friendly);


const userQuestion2 = "tell me my name";

const formal = await askQuestion(
    "You always respond in 1 line",
    userQuestion2,
    conversation
);

console.log("++++++ Response 2 ++++++");
console.log(formal);