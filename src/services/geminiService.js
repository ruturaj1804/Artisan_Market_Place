import genAI from './geminiClient';

/**
 * Handles common Gemini API errors with user-friendly messages.
 * @param {Error} error - The error object from the API.
 * @returns {string} User-friendly error message.
 */
export function handleGeminiError(error) {
  console.error('Gemini API Error:', error);

  if (error?.message?.includes('429')) {
    return 'Rate limit exceeded. Please wait a moment before trying again.';
  }
  
  if (error?.message?.includes('SAFETY')) {
    return 'Content was blocked by safety filters. Please modify your request.';
  }
  
  if (error?.message?.includes('cancelled')) {
    return 'Request was cancelled by user.';
  }
  
  if (error?.message?.includes('timeout')) {
    return 'Request timed out. Please try again.';
  }
  
  if (error?.message?.includes('API key')) {
    return 'API key is invalid or missing. Please check your configuration.';
  }
  
  return 'An unexpected error occurred. Please try again.';
}

/**
 * Comprehensive safety settings for content filtering.
 * @returns {Array} Safety settings configuration.
 */
export function getSafetySettings() {
  return [
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_LOW_AND_ABOVE"
    },
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "BLOCK_LOW_AND_ABOVE"
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_LOW_AND_ABOVE"
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_LOW_AND_ABOVE"
    }
  ];
}

/**
 * Generates a text response based on user input.
 * @param {string} prompt - The user's input prompt.
 * @returns {Promise<string>} The generated text.
 */
export async function generateText(prompt) {
  try {
    if (!prompt?.trim()) {
      throw new Error('Please provide a valid prompt.');
    }

    const model = genAI?.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      safetySettings: getSafetySettings(),
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 32,
        maxOutputTokens: 2048,
      }
    });
    
    const result = await model?.generateContent(prompt);
    const response = await result?.response;
    return response?.text();
  } catch (error) {
    console.error('Error in text generation:', error);
    throw new Error(handleGeminiError(error));
  }
}

/**
 * Streams a text response chunk by chunk.
 * @param {string} prompt - The user's input prompt.
 * @param {Function} onChunk - Callback to handle each streamed chunk.
 */
export async function streamText(prompt, onChunk) {
  try {
    if (!prompt?.trim()) {
      throw new Error('Please provide a valid prompt.');
    }

    const model = genAI?.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      safetySettings: getSafetySettings(),
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 32,
        maxOutputTokens: 2048,
      }
    });
    
    const result = await model?.generateContentStream(prompt);

    for await (const chunk of result?.stream) {
      const text = chunk?.text();
      if (text && onChunk) {
        onChunk(text);
      }
    }
  } catch (error) {
    console.error('Error in streaming text generation:', error);
    throw new Error(handleGeminiError(error));
  }
}

/**
 * Generates text based on a text prompt and an image.
 * @param {string} prompt - The text prompt.
 * @param {File} imageFile - The image file.
 * @returns {Promise<string>} The generated text.
 */
export async function generateTextFromImage(prompt, imageFile) {
  try {
    if (!prompt?.trim()) {
      throw new Error('Please provide a valid prompt.');
    }

    if (!imageFile) {
      throw new Error('Please provide an image file.');
    }

    const model = genAI?.getGenerativeModel({ 
      model: 'gemini-2.5-pro',
      safetySettings: getSafetySettings(),
    });

    // Convert image file to base64
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = (error) => reject(error);
      });

    const imageBase64 = await toBase64(imageFile);
    const imagePart = {
      inlineData: {
        data: imageBase64,
        mimeType: imageFile?.type,
      },
    };

    const result = await model?.generateContent([prompt, imagePart]);
    const response = await result?.response;
    return response?.text();
  } catch (error) {
    console.error('Error in multimodal generation:', error);
    throw new Error(handleGeminiError(error));
  }
}

/**
 * Manages a chat session with history.
 * @param {string} prompt - The user's input prompt.
 * @param {Array} history - The chat history.
 * @returns {Promise<{response: string, updatedHistory: Array}>} The response and updated history.
 */
export async function chatWithHistory(prompt, history = []) {
  try {
    if (!prompt?.trim()) {
      throw new Error('Please provide a valid prompt.');
    }

    const model = genAI?.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      safetySettings: getSafetySettings(),
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 32,
        maxOutputTokens: 2048,
      }
    });
    
    const chat = model?.startChat({ history });

    const result = await chat?.sendMessage(prompt);
    const response = await result?.response;
    const text = response?.text();

    const updatedHistory = [
      ...history,
      { role: 'user', parts: [{ text: prompt }] },
      { role: 'model', parts: [{ text }] },
    ];

    return { response: text, updatedHistory };
  } catch (error) {
    console.error('Error in chat session:', error);
    throw new Error(handleGeminiError(error));
  }
}

/**
 * Generates craft descriptions based on artisan marketplace context.
 * @param {Object} craftData - The craft information.
 * @param {string} craftData.productName - Name of the craft product.
 * @param {string} craftData.selectedState - State where the craft originates.
 * @param {string} craftData.selectedCraftType - Type of craft (e.g., Warli, Madhubani).
 * @returns {Promise<string>} The generated description.
 */
export async function generateCraftDescription(craftData) {
  try {
    const { productName, selectedState, selectedCraftType } = craftData;
    
    if (!productName?.trim() || !selectedState || !selectedCraftType) {
      throw new Error('Please provide product name, state, and craft type.');
    }

    const prompt = `As an expert in Indian traditional crafts and cultural heritage, create a compelling, authentic product description for an artisan marketplace.

Product Details:
- Name: ${productName}
- Craft Type: ${selectedCraftType}
- Origin State: ${selectedState}

Please write a detailed description that includes:
1. Cultural significance and historical background of ${selectedCraftType}
2. Traditional techniques and materials used
3. Unique characteristics of ${selectedCraftType} from ${selectedState}
4. Artisan craftsmanship and skill involved
5. Care instructions and authenticity markers

The description should be engaging, informative, and help buyers understand the cultural value and quality of this handcrafted product. Write in a warm, respectful tone that honors the artisan tradition.

Length: 150-200 words.`;

    return await generateText(prompt);
  } catch (error) {
    console.error('Error generating craft description:', error);
    throw new Error(handleGeminiError(error));
  }
}

/**
 * Processes search queries and provides relevant product recommendations.
 * @param {string} searchQuery - User's search query.
 * @returns {Promise<string>} AI-generated search insights and recommendations.
 */
export async function processSearchQuery(searchQuery) {
  try {
    if (!searchQuery?.trim()) {
      throw new Error('Please provide a search query.');
    }

    const prompt = `As an AI assistant for an Indian artisan marketplace, analyze this search query and provide helpful insights:

Search Query: "${searchQuery}"

Please provide:
1. Understanding of what the user is looking for
2. Relevant craft types, states, or categories they might be interested in
3. Helpful suggestions to refine their search
4. Related traditional crafts they might also like

Keep the response conversational, helpful, and focused on Indian handicrafts and traditional artisan products. Limit response to 100-150 words.`;

    return await generateText(prompt);
  } catch (error) {
    console.error('Error processing search query:', error);
    throw new Error(handleGeminiError(error));
  }
}

/**
 * Processes voice input with transcription, translation, and description generation
 * @param {string} voiceText Transcribed voice text
 * @param {string} sourceLanguage Source language of the voice input
 * @param {Object} craftData Additional craft information
 * @returns {Promise<string>} Generated description
 */
export async function processVoiceForDescription(voiceText, sourceLanguage, craftData = {}) {
  try {
    const { productName, selectedState, selectedCraftType } = craftData;
    
    if (!voiceText?.trim()) {
      throw new Error('Please provide voice input text.');
    }

    // First translate if needed
    let translatedText = voiceText;
    if (sourceLanguage !== 'en' && sourceLanguage !== 'en-IN') {
      const languageMap = {
        'hi-IN': 'Hindi',
        'ta-IN': 'Tamil',
        'te-IN': 'Telugu',
        'bn-IN': 'Bengali',
        'gu-IN': 'Gujarati',
        'kn-IN': 'Kannada',
        'ml-IN': 'Malayalam',
        'mr-IN': 'Marathi',
        'pa-IN': 'Punjabi',
        'or-IN': 'Odia',
        'as-IN': 'Assamese',
        'ur-IN': 'Urdu'
      };

      const languageName = languageMap?.[sourceLanguage] || 'the source language';
      
      const translationPrompt = `Translate the following text from ${languageName} to English, preserving the meaning and cultural context, especially for craft and artisan terms:

"${voiceText}"

Provide only the English translation:`;

      translatedText = await generateText(translationPrompt);
    }

    // Generate description incorporating voice input
    const descriptionPrompt = `As an expert in Indian traditional crafts and cultural heritage, create a compelling, authentic product description for an artisan marketplace.

Artisan's Voice Input: "${translatedText}"

Product Details:
- Name: ${productName || 'Not specified'}
- Craft Type: ${selectedCraftType || 'Not specified'}  
- Origin State: ${selectedState || 'Not specified'}

Create a professional description that:
1. Incorporates the artisan's personal insights and voice input authentically
2. Adds cultural significance and historical background of ${selectedCraftType || 'the craft'}
3. Describes traditional techniques and materials mentioned or implied
4. Highlights unique characteristics from ${selectedState || 'the region'}
5. Includes artisan craftsmanship details from their input
6. Provides care instructions and authenticity markers
7. Maintains the artisan's personal touch while being professionally structured

The description should feel authentic and personal, as if the artisan is directly sharing their craft story with potential buyers, while being informative and compelling.

Length: 150-200 words.`;

    return await generateText(descriptionPrompt);
    
  } catch (error) {
    console.error('Error processing voice for description:', error);
    throw new Error(handleGeminiError(error));
  }
}