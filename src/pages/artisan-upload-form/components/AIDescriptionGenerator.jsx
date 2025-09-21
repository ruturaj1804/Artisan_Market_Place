import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import VoiceInputComponent from './VoiceInputComponent';
import { generateCraftDescription, handleGeminiError } from '../../../services/geminiService';

const AIDescriptionGenerator = ({ 
  productName, 
  selectedState, 
  selectedCraftType, 
  onDescriptionGenerated,
  disabled = false 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState(null);
  const [activeMode, setActiveMode] = useState('text'); // 'text' or 'voice'

  const canGenerate = productName && selectedState && selectedCraftType;

  const generateDescription = async () => {
    if (!canGenerate || isGenerating) return;

    setIsGenerating(true);
    
    try {
      const craftData = {
        productName: productName?.trim(),
        selectedState,
        selectedCraftType
      };

      const generatedDescription = await generateCraftDescription(craftData);
      
      onDescriptionGenerated(generatedDescription);
      setLastGenerated({ productName, selectedState, selectedCraftType });
      
    } catch (error) {
      console.error('Error generating description:', error);
      const errorMessage = handleGeminiError(error);
      onDescriptionGenerated('', errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleVoiceDescription = (description, error = null) => {
    if (error) {
      onDescriptionGenerated('', error);
    } else {
      onDescriptionGenerated(description);
      setLastGenerated({ productName, selectedState, selectedCraftType, method: 'voice' });
    }
  };

  const hasChanged = lastGenerated && (
    lastGenerated?.productName !== productName ||
    lastGenerated?.selectedState !== selectedState ||
    lastGenerated?.selectedCraftType !== selectedCraftType
  );

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Sparkles" size={20} className="text-primary" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-medium text-foreground mb-2">
              AI-Powered Description Generator
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Generate compelling product descriptions using our Gemini AI. Choose between automatic generation 
              or voice input in your local language for personalized descriptions.
            </p>

            {/* Mode Selection Tabs */}
            <div className="flex space-x-1 p-1 bg-muted/50 rounded-lg mb-4">
              <button
                type="button"
                onClick={() => setActiveMode('text')}
                className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeMode === 'text' ?'bg-background text-primary shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
                disabled={disabled}
              >
                <Icon name="Type" size={14} />
                <span>Auto Generate</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMode('voice')}
                className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeMode === 'voice' ?'bg-background text-accent shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
                disabled={disabled}
              >
                <Icon name="Mic" size={14} />
                <span>Voice Input</span>
              </button>
            </div>

            {activeMode === 'text' ? (
              <div className="space-y-3">
                {/* Requirements Check */}
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Required Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className={`flex items-center space-x-2 text-xs ${
                      productName ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      <Icon name={productName ? "CheckCircle" : "Circle"} size={14} />
                      <span>Product Name</span>
                    </div>
                    <div className={`flex items-center space-x-2 text-xs ${
                      selectedState ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      <Icon name={selectedState ? "CheckCircle" : "Circle"} size={14} />
                      <span>State</span>
                    </div>
                    <div className={`flex items-center space-x-2 text-xs ${
                      selectedCraftType ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      <Icon name={selectedCraftType ? "CheckCircle" : "Circle"} size={14} />
                      <span>Craft Type</span>
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <div className="flex items-center justify-between">
                  <Button
                    variant={canGenerate ? "default" : "outline"}
                    size="sm"
                    onClick={generateDescription}
                    disabled={!canGenerate || isGenerating || disabled}
                    loading={isGenerating}
                    iconName="Sparkles"
                    iconPosition="left"
                    type="button"
                  >
                    {isGenerating ? 'Generating with Gemini AI...' : 'Generate Description'}
                  </Button>

                  {hasChanged && (
                    <div className="flex items-center space-x-2 text-xs text-warning">
                      <Icon name="AlertTriangle" size={14} />
                      <span>Details changed - regenerate for updated description</span>
                    </div>
                  )}
                </div>

                {!canGenerate && (
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Icon name="Info" size={14} />
                    <span>Please fill in product name, state, and craft type to generate description</span>
                  </div>
                )}
              </div>
            ) : (
              <VoiceInputComponent
                productName={productName}
                selectedState={selectedState}
                selectedCraftType={selectedCraftType}
                onDescriptionGenerated={handleVoiceDescription}
                disabled={disabled}
              />
            )}
          </div>
        </div>
      </div>

      {/* AI Features Info */}
      <div className="bg-muted/30 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
          <div className="text-xs text-muted-foreground space-y-1">
            <p className="font-medium">Gemini AI Description Features:</p>
            <ul className="space-y-0.5 ml-2">
              <li>• Cultural context and historical significance</li>
              <li>• Traditional crafting techniques and materials</li>
              <li>• Regional artisan heritage and authenticity</li>
              <li>• Product care and usage recommendations</li>
              {activeMode === 'voice' && (
                <>
                  <li>• Voice input in 13+ Indian languages</li>
                  <li>• Real-time transcription and translation</li>
                  <li>• Personalized descriptions from artisan's own words</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDescriptionGenerator;