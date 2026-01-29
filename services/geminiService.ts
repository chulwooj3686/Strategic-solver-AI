
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants.tsx";
import { Message, AppMode } from "../types.ts";

export const getAIResponse = async (
  mode: AppMode,
  chatHistory: Message[],
  userInput: string
): Promise<string> => {
  // API 키 유무 확인 (Vercel 환경 변수 API_KEY가 필수입니다)
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return "API 키가 설정되지 않았습니다. Vercel 환경 변수에 API_KEY를 추가해주세요.";
  }

  const ai = new GoogleGenAI({ apiKey });
  const modeContext = `현재 모드: ${mode}\n`;
  
  // 히스토리 변환: Gemini API 규격에 맞춰 'user'와 'model'로 매핑
  // 첫 번째 assistant 메시지는 보통 welcome 메시지이므로 history에서 제외하여 user 메시지로 시작하게 함
  const contents = chatHistory
    .filter((m, index) => !(index === 0 && m.role === 'assistant'))
    .map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

  // 현재 사용자의 입력을 마지막에 추가
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

    return result.text || "AI로부터 유효한 응답을 받지 못했습니다.";
  } catch (error: any) {
    console.error("Gemini API Error Detail:", error);
    
    // 더 구체적인 오류 피드백 제공
    if (error.message?.includes('403') || error.message?.includes('401')) {
      return "인증 오류: API 키가 유효하지 않거나 권한이 없습니다.";
    }
    if (error.message?.includes('429')) {
      return "할당량 초과: 요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";
    }
    
    return `시스템 오류: ${error.message || '알 수 없는 오류가 발생했습니다.'}`;
  }
};
