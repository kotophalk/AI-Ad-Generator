
import { GoogleGenAI } from "@google/genai";
import { AspectRatio } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

async function generateImagePrompt(description: string, url: string): Promise<string> {
  const prompt = `Based on the following product information, create a single, concise, and visually descriptive prompt for an AI image generator. The prompt should describe a high-quality, professional, and eye-catching banner ad image. Focus on the product's essence and visual appeal. Do not include any text, letters, or words in the image description itself. The prompt should be a pure description of visuals.
  Product Description: "${description}"
  Product URL: "${url}"
  
  Example of a good prompt: "A sleek, modern sneaker with glowing neon accents, splashing through a puddle on a dark, rainy city street at night, dynamic motion blur, hyper-realistic."
  
  Generated Prompt:`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating image prompt:", error);
    throw new Error("Failed to create a creative prompt for the image generator.");
  }
}

export async function generateAdImage(
  description: string,
  url: string,
  aspectRatio: AspectRatio
): Promise<string> {
  try {
    const imagePrompt = await generateImagePrompt(description, url);
    console.log(`Using generated image prompt: ${imagePrompt}`);

    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: imagePrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: aspectRatio,
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image.imageBytes) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("Image generation returned no images.");
    }
  } catch (error) {
    console.error("Error generating ad image:", error);
    throw new Error("Failed to generate ad image. Please check your inputs or the API key.");
  }
}
