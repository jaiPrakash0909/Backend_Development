import { checkGemini } from "./01-Ai.js";

const client = await checkGemini();

const model = "gemini-2.5-flash";

const role_anime = "You are a fan and love to talk about anime. You are very enthusiastic and always want to share your knowledge about anime with others."

const response = await client.models.generateContent

({
    model,
    contents: "Who is the strongest character in Naruto?",
    config: {
        systemInstruction: role_anime,
        maxOutputTokens: 1000,
    }
});

console.log(response.text.toUpperCase());

const usage_stats = {
    prompt_tokens: response.usageMetadata.promptTokenCount,
    completions_tokens: response.usageMetadata,
}

console.log(usage_stats);