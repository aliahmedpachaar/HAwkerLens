import { GoogleGenAI, Type } from "@google/genai";
import { ScanResult } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `You are a Malaysian street food interpreter and food safety assistant.
Analyze the uploaded image, which may show a hawker menu, menu board, handwritten menu, kopitiam menu, or prepared dish.
Your job is to identify visible or inferable Malaysian food items and explain them clearly in plain English.

Rules:
1. Prioritize Malaysian hawker and street food context.
2. If the image contains menu text, read and interpret the menu items.
3. If the image shows a dish, identify the most likely dish.
4. If uncertain, be conservative and lower confidence.
5. For allergens, only mark them as:
   - Detected: directly visible or clearly stated
   - Likely: strongly associated with the dish
   - Possible: common but uncertain
6. Never overstate certainty for allergens.
7. Include cultural origin and practical eating tips when relevant.
8. Keep descriptions concise and useful.
9. Estimate the typical street food price range in Malaysian Ringgit (MYR).
10. Determine the Halal status (Halal, Non-Halal, Muslim-Friendly, or Unknown) based on typical ingredients and preparation.
11. Return strict valid JSON only, with no markdown and no extra commentary.`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    scanType: { type: Type.STRING, description: "menu | dish | mixed | unknown" },
    overallSummary: { type: Type.STRING },
    globalWarnings: { type: Type.ARRAY, items: { type: Type.STRING } },
    items: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          dishName: { type: Type.STRING },
          altNames: { type: Type.ARRAY, items: { type: Type.STRING } },
          description: { type: Type.STRING },
          mainIngredients: { type: Type.ARRAY, items: { type: Type.STRING } },
          cookingMethod: { type: Type.STRING },
          spiceLevel: { type: Type.STRING, description: "Mild | Medium | Spicy | Very Spicy | Unknown" },
          culturalOrigin: { type: Type.STRING },
          eatingTip: { type: Type.STRING },
          allergens: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "Eggs | Peanuts | Tree nuts | Milk / dairy | Soy | Fish | Shellfish | Gluten | Sesame | Unknown" },
                presence: { type: Type.STRING, description: "Detected | Likely | Possible" },
                reason: { type: Type.STRING }
              },
              required: ["name", "presence", "reason"]
            }
          },
          dietaryNotes: { type: Type.ARRAY, items: { type: Type.STRING } },
          confidence: { type: Type.STRING, description: "High | Medium | Low" },
          estimatedPrice: { type: Type.STRING, description: "Estimated price range in MYR, e.g., 'RM 5.00 - RM 10.00'" },
          halalStatus: { type: Type.STRING, description: "Halal | Non-Halal | Muslim-Friendly | Unknown" }
        },
        required: ["dishName", "altNames", "description", "mainIngredients", "cookingMethod", "spiceLevel", "culturalOrigin", "eatingTip", "allergens", "dietaryNotes", "confidence", "estimatedPrice", "halalStatus"]
      }
    }
  },
  required: ["scanType", "overallSummary", "globalWarnings", "items"]
};

export async function analyzeFoodImage(base64Image: string, mimeType: string): Promise<ScanResult> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          inlineData: {
            data: base64Image,
            mimeType: mimeType,
          },
        },
        {
          text: "Analyze this image according to the system instructions and return the JSON.",
        }
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA as any
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    
    return JSON.parse(text) as ScanResult;
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
}

export async function analyzeFoodText(description: string): Promise<ScanResult> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          text: `Analyze this food description and identify the Malaysian dish: "${description}". Return the JSON according to the system instructions.`,
        }
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA as any
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    
    const result = JSON.parse(text) as ScanResult;

    // Generate images for identified dishes
    if (result.items && result.items.length > 0) {
      for (const item of result.items) {
        try {
          const imagePrompt = `A high quality, professional food photography shot of ${item.dishName}, a Malaysian dish. ${item.description}. Authentic street food style, delicious, well-lit, appetizing.`;
          const imageResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
              parts: [
                { text: imagePrompt }
              ]
            },
            config: {
              // @ts-ignore
              imageConfig: {
                aspectRatio: "16:9",
                imageSize: "1K"
              }
            }
          });
          
          if (imageResponse.candidates && imageResponse.candidates[0].content.parts) {
            for (const part of imageResponse.candidates[0].content.parts) {
              if (part.inlineData) {
                const base64EncodeString = part.inlineData.data;
                const mime = part.inlineData.mimeType || 'image/png';
                item.imageUrl = `data:${mime};base64,${base64EncodeString}`;
                break;
              }
            }
          }
        } catch (imgError) {
          console.error("Failed to generate image for", item.dishName, imgError);
        }
      }
    }

    return result;
  } catch (error) {
    console.error("Error analyzing text:", error);
    throw error;
  }
}
