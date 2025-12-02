import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { text } from "express";
import readlineSync from "readline-sync";

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
let history = [];
const userSchema = {
  name: "String (name of the user)",
  age: "Number (age of the user)",
  gender: "String (gender of the user)",
};
async function main() {
  try {
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      contents: "what is computer ?",
      config: {
        systemInstruction: "always answer in short",
      },

      //   chat history
      history,
    });
    console.log(".......");
    let userPrompt = readlineSync.question("Write Prompt :  ");

    history.push({
      role: "user",
      parts: [{ text: userPrompt }],
    });

    let modelResponse = await chat.sendMessage({ message: userPrompt });
    console.log(modelResponse.text);

    if (modelResponse) {
      history.push({
        role: "model",
        parts: [{ text: modelResponse.text }],
      });
    }

    main();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
