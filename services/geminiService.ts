
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants.tsx";
import { Message, AppMode } from "../types.ts";

export const getAIResponse = async (
  mode: AppMode,
  chatHistory: Message[],
  userInput: string
): Promise<string> => {
  // 가이드라인에 따라 API Key를 직접 주입
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const modeContext = `현재 모드: ${mode}\n`;
  
  // Gemini API는 히스토리의 첫 번째 메시지가 'user'여야 하는 경우가 많으므로
  // 처음에 자동 생성된 환영 메시지(assistant)는 제외하고 전달합니다.
  const history = chatHistory
    .filter((m, index) => !(index === 0 && m.role === 'assistant'))
    .map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION + "\n" + modeContext,
        temperature: 0.7,
        topP: 0.95,
      },
      history: history as any,
    });

    const result = await chat.sendMessage({ message: userInput });
    return result.text || "죄송합니다. 응답을 생성하는 중에 문제가 발생했습니다.";
  } catch (error) {
    console.error("Gemini API 상세 오류:", error);
    // Vercel 환경에서 API KEY가 없을 경우 403/401 오류가 발생할 수 있습니다.
    return "시스템 오류가 발생했습니다. Vercel 환경 변수에 API_KEY가 설정되어 있는지 확인해주세요.";
  }
};
