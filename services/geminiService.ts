import { GoogleGenAI } from "@google/genai";
import { PersonalityResult, TemperamentResult } from "../types";

// Safety check for environment variables in case of browser/bundler issues
const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) || '';

// Initialize specific Gemini client if key exists
let ai: GoogleGenAI | null = null;
if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
}

export const generateGeminiAdvice = async (
  personality: PersonalityResult, 
  temperament: TemperamentResult
): Promise<string> => {
  // Fallback Message (Natural looking, no error disclaimer)
  const getFallbackMessage = () => {
    const mainTrait = personality.code.includes('T') ? '논리적인 사고' : '따뜻한 감성';
    const actionTrait = personality.code.includes('A') ? '과감한 실행력' : '부드러운 조율 능력';
    
    return `"${personality.title}" 성향을 가진 당신은 ${temperament.description}의 기질이 돋보입니다. 당신은 ${mainTrait}와 ${actionTrait}을(를) 동시에 겸비하고 있습니다. \n\n특히 ${temperament.details[0]} 하는 능력이 탁월하여, 이를 잘 활용한다면 어떤 분야에서든 독보적인 존재감을 드러낼 것입니다. 지금처럼 당신만의 강점을 믿고 나아가세요. 당신의 잠재력은 이미 충분히 빛나고 있습니다. ✨`;
  };

  if (!ai) {
    // Return fallback silently without warning user in UI
    return getFallbackMessage();
  }

  const prompt = `
    당신은 따뜻하고 통찰력 있는 진로 상담가입니다.
    사용자의 성향 검사 결과는 다음과 같습니다:
    - 성향 코드: ${personality.code} (${personality.title}) - ${personality.description}
    - 기질 코드: ${temperament.code} - ${temperament.description}

    이 사용자에게 이 두 가지 특성이 결합되었을 때의 잠재력과, 앞으로의 성장을 위한 따뜻하고 구체적인 조언을 한 문단(약 200~300자)으로 작성해주세요.
    말투는 친절하고 격려하는 해요체를 사용하세요.
    너무 딱딱하지 않게, 친구가 상담해주듯 자연스럽게 써주세요.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || getFallbackMessage();
  } catch (error) {
    console.error("Gemini API Error (using fallback):", error);
    return getFallbackMessage();
  }
};