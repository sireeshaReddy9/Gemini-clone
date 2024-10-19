
// // // npm install @google/generative-ai

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "API_KEY";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    return result.response.text(); // Ensure you return the correct response
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export default run;
