import { GEMINI_API_KEY } from "../config/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const createFallbackSession = () => ({
  async sendMessage() {
    throw new Error(
      "Gemini API key is missing. Set VITE_GEMINI_API_KEY (or VITE_GEMENI_API_KEY) in Frontend/.env.local."
    );
  },
});

let chatSession = createFallbackSession();

if (GEMINI_API_KEY) {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });
}

export const AIChatSession = chatSession;
