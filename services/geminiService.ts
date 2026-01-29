
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants.tsx";
import { Message, AppMode } from "../types.ts";

export const getAIResponse = async (
  mode: AppMode,
  chatHistory: Message[],
  userInput: string
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const modeContext = `현재 모드: ${mode}\n`;
  const contents = chatHistory.map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }]
  }));

  // Add the current input
  contents.push({
    role: 'user',
    parts: [{ text: userInput }]
  });

  try {
    const result = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents as any,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION + "\n" + modeContext,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return result.text || "죄송합니다. 응답을 생성하는 중에 문제가 발생했습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "시스템 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }
};
