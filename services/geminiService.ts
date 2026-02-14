
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getDailyVerse = async () => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Gere um versículo bíblico inspirador em português, curto, adequado para um aplicativo de relacionamento cristão. Retorne apenas o texto do versículo e a referência."
    });
    return response.text || "O Senhor é o meu pastor; de nada terei falta. — Salmos 23:1";
  } catch (error) {
    console.error("Erro ao buscar versículo:", error);
    return "O amor é paciente, o amor é bondoso. — 1 Coríntios 13:4";
  }
};

export const getDailyDevotional = async () => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Escreva um devocional curtíssimo (máximo 300 caracteres) em português para jovens adventistas no Bico do Papagaio (Tocantins). Foque em esperança e propósito. Retorne apenas o texto."
    });
    return response.text || "Deus tem um plano especial para sua vida hoje. Confie Nele.";
  } catch (error) {
    return "Sua jornada é guiada pelo Criador. Mantenha a fé.";
  }
};

export const getIceBreaker = async (userName: string, role: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Gere 3 sugestões criativas de quebra-gelo para iniciar uma conversa com uma pessoa chamada ${userName} que é ${role} na Igreja Adventista. Seja respeitoso e focado em interesses comuns da igreja. Retorne apenas os 3 itens em uma lista numerada.`
    });
    return response.text;
  } catch (error) {
    return "1. Há quanto tempo você atua como ${role}?\n2. Qual sua história favorita da Bíblia?\n3. Você gosta de participar de missões?";
  }
};
