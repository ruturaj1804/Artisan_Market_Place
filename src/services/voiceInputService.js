import { generateText, handleGeminiError } from './geminiService';

/**
 * Voice input service for handling speech-to-text functionality
 * with translation capabilities using browser's SpeechRecognition API
 */

/**
 * Checks if speech recognition is supported in the current browser
 * @returns {boolean} True if speech recognition is supported
 */
export function isSpeechRecognitionSupported() {
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
}

/**
 * Gets supported languages for speech recognition
 * @returns {Array} Array of supported language objects
 */
export function getSupportedLanguages() {
  return [
    { code: 'hi-IN', name: 'Hindi (India)', displayName: 'हिंदी' },
    { code: 'en-IN', name: 'English (India)', displayName: 'English' },
    { code: 'ta-IN', name: 'Tamil (India)', displayName: 'தமிழ்' },
    { code: 'te-IN', name: 'Telugu (India)', displayName: 'తెలుగు' },
    { code: 'bn-IN', name: 'Bengali (India)', displayName: 'বাংলা' },
    { code: 'gu-IN', name: 'Gujarati (India)', displayName: 'ગુજરાતી' },
    { code: 'kn-IN', name: 'Kannada (India)', displayName: 'ಕನ್ನಡ' },
    { code: 'ml-IN', name: 'Malayalam (India)', displayName: 'മലയാളം' },
    { code: 'mr-IN', name: 'Marathi (India)', displayName: 'मराठी' },
    { code: 'pa-IN', name: 'Punjabi (India)', displayName: 'ਪੰਜਾਬੀ' },
    { code: 'or-IN', name: 'Odia (India)', displayName: 'ଓଡ଼ିଆ' },
    { code: 'as-IN', name: 'Assamese (India)', displayName: 'অসমীয়া' },
    { code: 'ur-IN', name: 'Urdu (India)', displayName: 'اردو' }
  ];
}

/**
 * Creates a speech recognition instance with specified configuration
 * @param {Object} config Configuration object
 * @returns {SpeechRecognition} Configured speech recognition instance
 */
export function createSpeechRecognition(config = {}) {
  const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
  
  if (!SpeechRecognition) {
    throw new Error('Speech recognition is not supported in this browser');
  }

  const recognition = new SpeechRecognition();
  
  // Default configuration
  recognition.continuous = config?.continuous || false;
  recognition.interimResults = config?.interimResults || true;
  recognition.maxAlternatives = config?.maxAlternatives || 3;
  recognition.lang = config?.language || 'hi-IN';

  return recognition;
}

/**
 * Records audio and transcribes speech to text
 * @param {Object} options Recording options
 * @param {string} options.language Language code for recognition
 * @param {number} options.timeout Timeout in milliseconds
 * @param {Function} options.onStart Callback when recording starts
 * @param {Function} options.onResult Callback for interim results
 * @param {Function} options.onError Callback for errors
 * @returns {Promise<{transcript: string, confidence: number}>} Transcription result
 */
export async function recordAndTranscribe(options = {}) {
  const {
    language = 'hi-IN',
    timeout = 30000,
    onStart = () => {},
    onResult = () => {},
    onError = () => {}
  } = options;

  if (!isSpeechRecognitionSupported()) {
    throw new Error('Speech recognition is not supported in this browser');
  }

  return new Promise((resolve, reject) => {
    const recognition = createSpeechRecognition({
      language,
      interimResults: true,
      continuous: false
    });

    let finalTranscript = '';
    let timeoutId;

    // Set up timeout
    if (timeout > 0) {
      timeoutId = setTimeout(() => {
        recognition.stop();
        if (!finalTranscript.trim()) {
          reject(new Error('Recording timeout - no speech detected'));
        }
      }, timeout);
    }

    recognition.onstart = () => {
      onStart();
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        const confidence = event.results[i][0].confidence;
        
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      // Call result callback with interim results
      onResult({
        final: finalTranscript,
        interim: interimTranscript,
        isFinal: finalTranscript.length > 0
      });
    };

    recognition.onend = () => {
      if (timeoutId) clearTimeout(timeoutId);
      
      if (finalTranscript.trim()) {
        // Get the best result with confidence
        resolve({
          transcript: finalTranscript.trim(),
          confidence: 0.8, // Approximate confidence
          language: language
        });
      } else {
        reject(new Error('No speech was detected'));
      }
    };

    recognition.onerror = (event) => {
      if (timeoutId) clearTimeout(timeoutId);
      
      let errorMessage = 'Speech recognition failed';
      
      switch (event.error) {
        case 'no-speech':
          errorMessage = 'No speech was detected. Please try again.';
          break;
        case 'audio-capture':
          errorMessage = 'Microphone access denied or not available.';
          break;
        case 'not-allowed':
          errorMessage = 'Microphone permission denied. Please enable microphone access.';
          break;
        case 'network':
          errorMessage = 'Network error occurred during speech recognition.';
          break;
        case 'aborted':
          errorMessage = 'Speech recognition was cancelled.';
          break;
        case 'language-not-supported':
          errorMessage = 'Selected language is not supported.';
          break;
        default:
          errorMessage = `Speech recognition error: ${event.error}`;
      }
      
      onError(errorMessage);
      reject(new Error(errorMessage));
    };

    // Start recognition
    try {
      recognition.start();
    } catch (error) {
      if (timeoutId) clearTimeout(timeoutId);
      reject(new Error('Failed to start speech recognition'));
    }
  });
}

/**
 * Translates text to English using Gemini AI
 * @param {string} text Text to translate
 * @param {string} sourceLanguage Source language code
 * @returns {Promise<string>} Translated text in English
 */
export async function translateToEnglish(text, sourceLanguage = 'hi') {
  try {
    if (!text?.trim()) {
      throw new Error('No text provided for translation');
    }

    // If already in English, return as-is
    if (sourceLanguage === 'en-IN' || sourceLanguage === 'en') {
      return text;
    }

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

    const translationPrompt = `Translate the following text from ${languageName} to English. Keep the meaning and context intact, especially for craft and artisan-related terms. If there are specific traditional craft terms, provide the English equivalent while preserving cultural context.

Text to translate: "${text}"

Provide only the English translation, nothing else.`;

    let translatedText = await generateText(translationPrompt);
    return translatedText?.trim() || text;
    
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error(handleGeminiError(error));
  }
}

/**
 * Processes voice input with transcription and translation
 * @param {Object} options Processing options
 * @param {string} options.language Recording language
 * @param {Function} options.onProgress Progress callback
 * @returns {Promise<{original: string, translated: string, language: string}>} Processing result
 */
export async function processVoiceInput(options = {}) {
  const {
    language = 'hi-IN',
    onProgress = () => {}
  } = options;

  try {
    onProgress({ stage: 'microphone', message: 'Requesting microphone access...' });

    // Record and transcribe
    const transcriptionResult = await recordAndTranscribe({
      language,
      timeout: 30000,
      onStart: () => {
        onProgress({ stage: 'recording', message: 'Listening... Speak now!' });
      },
      onResult: (result) => {
        if (result?.interim) {
          onProgress({ 
            stage: 'transcribing', 
            message: 'Processing speech...',
            interim: result?.interim
          });
        }
      },
      onError: (error) => {
        onProgress({ stage: 'error', message: error });
      }
    });

    onProgress({ 
      stage: 'transcribed', 
      message: 'Speech captured successfully!',
      transcript: transcriptionResult?.transcript
    });

    // Translate to English if needed
    let translatedText = transcriptionResult?.transcript;
    
    if (language !== 'en-IN') {
      onProgress({ stage: 'translating', message: 'Translating to English...' });
      
      translatedText = await translateToEnglish(
        transcriptionResult?.transcript, 
        language
      );
      
      onProgress({ 
        stage: 'translated', 
        message: 'Translation completed!',
        translated: translatedText
      });
    }

    return {
      original: transcriptionResult?.transcript,
      translated: translatedText,
      language: language,
      confidence: transcriptionResult?.confidence
    };

  } catch (error) {
    console.error('Voice processing error:', error);
    onProgress({ stage: 'error', message: error?.message });
    throw error;
  }
}

/**
 * Generates craft description from voice input
 * @param {string} voiceText Transcribed and translated voice text
 * @param {Object} craftData Additional craft information
 * @returns {Promise<string>} Generated description
 */
export async function generateDescriptionFromVoice(voiceText, craftData = {}) {
  try {
    const { productName, selectedState, selectedCraftType } = craftData;
    
    if (!voiceText?.trim()) {
      throw new Error('No voice input provided');
    }

    const prompt = `As an expert in Indian traditional crafts and cultural heritage, create a compelling, authentic product description for an artisan marketplace based on the following voice input from an artisan:

Voice Input from Artisan: "${voiceText}"

Additional Product Details:
- Product Name: ${productName || 'Not specified'}
- State: ${selectedState || 'Not specified'}  
- Craft Type: ${selectedCraftType || 'Not specified'}

Please create a professional product description that:
1. Incorporates the artisan's personal insights and details from their voice input
2. Adds cultural significance and historical background of the craft
3. Describes traditional techniques and materials used
4. Highlights unique characteristics and artisan craftsmanship
5. Includes appropriate care instructions and authenticity markers
6. Maintains a warm, respectful tone that honors the artisan tradition

If the voice input contains specific details about materials, techniques, or cultural significance, emphasize those in the description. The final description should feel authentic and personal while being informative for buyers.

Length: 150-200 words.`;

    return await generateText(prompt);
    
  } catch (error) {
    console.error('Error generating description from voice:', error);
    throw new Error(handleGeminiError(error));
  }
}

/**
 * Custom hook for managing voice input state in React components
 * @returns {Object} Voice input state and controls
 */
export function useVoiceInput() {
  // This would be implemented as a React hook if needed
  // For now, returning the functions directly
  return {
    isSpeechRecognitionSupported,
    getSupportedLanguages,
    recordAndTranscribe,
    translateToEnglish,
    processVoiceInput,
    generateDescriptionFromVoice
  };
}