import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Validate API key exists
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables");
}

// create AI model

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function main() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "what is computer ?",
      config: {
        systemInstruction:
          "You are a maths teacher who always talks about maths and numbers and always answer in conrtext to numbers and maths",
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });
    // console.log(response.text);

    for await (const chunk of response) {
      console.log(chunk.text);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
