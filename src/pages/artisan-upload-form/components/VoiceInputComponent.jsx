import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { 
  isSpeechRecognitionSupported,
  getSupportedLanguages,
  processVoiceInput,
  generateDescriptionFromVoice
} from '../../../services/voiceInputService';

const VoiceInputComponent = ({ 
  productName, 
  selectedState, 
  selectedCraftType, 
  onDescriptionGenerated,
  disabled = false 
}) => {
  const [isSupported, setIsSupported] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('hi-IN');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [processingMessage, setProcessingMessage] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [lastResult, setLastResult] = useState(null);
  const [error, setError] = useState('');

  const supportedLanguages = getSupportedLanguages();
  const processingTimeoutRef = useRef(null);

  useEffect(() => {
    setIsSupported(isSpeechRecognitionSupported());
  }, []);

  useEffect(() => {
    // Clear processing timeout on unmount
    return () => {
      if (processingTimeoutRef?.current) {
        clearTimeout(processingTimeoutRef?.current);
      }
    };
  }, []);

  const handleVoiceInput = async () => {
    if (!isSupported || isRecording || isProcessing || disabled) return;

    setIsRecording(true);
    setIsProcessing(false);
    setError('');
    setInterimTranscript('');
    setProcessingStage('');
    setProcessingMessage('');

    try {
      const result = await processVoiceInput({
        language: selectedLanguage,
        onProgress: (progress) => {
          setProcessingStage(progress?.stage);
          setProcessingMessage(progress?.message);
          
          if (progress?.stage === 'recording') {
            setIsRecording(true);
          } else if (progress?.stage === 'transcribing' && progress?.interim) {
            setInterimTranscript(progress?.interim);
          } else if (progress?.stage === 'transcribed') {
            setIsRecording(false);
            setIsProcessing(true);
            setInterimTranscript('');
          } else if (progress?.stage === 'error') {
            setIsRecording(false);
            setIsProcessing(false);
            setError(progress?.message);
          }
        }
      });

      setIsRecording(false);
      setIsProcessing(true);
      setProcessingStage('generating');
      setProcessingMessage('Generating product description with AI...');

      // Generate description from voice input
      const craftData = {
        productName,
        selectedState,
        selectedCraftType
      };

      const generatedDescription = await generateDescriptionFromVoice(
        result?.translated,
        craftData
      );

      setLastResult({
        original: result?.original,
        translated: result?.translated,
        language: selectedLanguage,
        description: generatedDescription
      });

      onDescriptionGenerated(generatedDescription);

      setProcessingStage('completed');
      setProcessingMessage('Voice description generated successfully!');

      // Auto-clear success message after 3 seconds
      processingTimeoutRef.current = setTimeout(() => {
        setProcessingStage('');
        setProcessingMessage('');
      }, 3000);

    } catch (error) {
      console.error('Voice input error:', error);
      setError(error?.message);
    } finally {
      setIsRecording(false);
      setIsProcessing(false);
    }
  };

  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
    setError('');
    setLastResult(null);
  };

  if (!isSupported) {
    return (
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
          <div>
            <h3 className="font-medium text-foreground mb-1">
              Voice Input Not Supported
            </h3>
            <p className="text-sm text-muted-foreground">
              Your browser doesn't support voice input. Please use a modern browser like Chrome, Edge, or Safari to access this feature.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getStatusIndicator = () => {
    if (isRecording) {
      return (
        <div className="flex items-center space-x-2 text-sm text-success">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span>Recording...</span>
        </div>
      );
    }
    
    if (isProcessing) {
      return (
        <div className="flex items-center space-x-2 text-sm text-primary">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <span>Processing...</span>
        </div>
      );
    }

    if (processingStage === 'completed') {
      return (
        <div className="flex items-center space-x-2 text-sm text-success">
          <Icon name="CheckCircle" size={16} />
          <span>Completed</span>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-accent/5 to-primary/5 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Mic" size={20} className="text-accent" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-medium text-foreground mb-2">
              Voice Input with AI Translation
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Speak in your local language and let our AI transcribe, translate, and generate 
              a professional product description for your craft.
            </p>

            <div className="space-y-4">
              {/* Language Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Select Language
                </label>
                <Select
                  options={supportedLanguages?.map(lang => ({
                    value: lang?.code,
                    label: `${lang?.displayName} (${lang?.name})`
                  }))}
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                  disabled={isRecording || isProcessing || disabled}
                  placeholder="Choose your language"
                />
              </div>

              {/* Voice Input Button */}
              <div className="flex items-center justify-between">
                <Button
                  variant={isRecording ? "secondary" : "default"}
                  size="sm"
                  onClick={handleVoiceInput}
                  disabled={isRecording || isProcessing || disabled}
                  loading={isRecording || isProcessing}
                  iconName="Mic"
                  iconPosition="left"
                  type="button"
                  className={isRecording ? 'animate-pulse' : ''}
                >
                  {isRecording 
                    ? 'Listening...' 
                    : isProcessing 
                    ? 'Processing...' :'Start Voice Input'
                  }
                </Button>

                {getStatusIndicator()}
              </div>

              {/* Processing Status */}
              {(processingStage || processingMessage) && (
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={processingStage === 'completed' ? 'CheckCircle' : 'Loader'} 
                      size={16} 
                      className={`${
                        processingStage === 'completed' ? 'text-success' : 'text-primary animate-spin'
                      }`} 
                    />
                    <span className="text-sm font-medium text-foreground">
                      {processingMessage}
                    </span>
                  </div>
                  
                  {interimTranscript && (
                    <div className="mt-2 p-2 bg-background/50 rounded text-xs text-muted-foreground">
                      <span className="font-medium">Hearing: </span>
                      {interimTranscript}
                    </div>
                  )}
                </div>
              )}

              {/* Error Display */}
              {error && (
                <div className="flex items-start space-x-2 p-3 bg-error/10 border border-error/20 rounded-lg">
                  <Icon name="AlertCircle" size={16} className="text-error mt-0.5" />
                  <div className="text-sm text-error">
                    <p className="font-medium">Voice input failed</p>
                    <p>{error}</p>
                  </div>
                </div>
              )}

              {/* Last Result Display */}
              {lastResult && (
                <div className="space-y-3 p-3 bg-success/5 border border-success/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span className="text-sm font-medium text-success">Voice Input Successful</span>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    {lastResult?.original !== lastResult?.translated && (
                      <div>
                        <span className="font-medium text-muted-foreground">Original: </span>
                        <span className="text-foreground">{lastResult?.original}</span>
                      </div>
                    )}
                    
                    <div>
                      <span className="font-medium text-muted-foreground">Translated: </span>
                      <span className="text-foreground">{lastResult?.translated}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Voice Input Features Info */}
      <div className="bg-muted/30 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <Icon name="Zap" size={16} className="text-accent mt-0.5" />
          <div className="text-xs text-muted-foreground space-y-1">
            <p className="font-medium">AI Voice Processing Features:</p>
            <ul className="space-y-0.5 ml-2">
              <li>• Real-time speech transcription in local languages</li>
              <li>• Automatic translation to English using Gemini AI</li>
              <li>• Intelligent product description generation</li>
              <li>• Support for 13+ Indian languages</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceInputComponent;