import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

export const apikeyCheker = () => {
    if (!API_KEY) {
        console.error("GEMINI_API_KEY is not set in the environment variables.");
        process.exit(1);
    }
}

export const checkGemini = async () => {
    apikeyCheker();

    const client = new GoogleGenAI({
        apiKey: API_KEY,
    });

    console.log("Gemini client initialized successfully.");

    return client;
};


