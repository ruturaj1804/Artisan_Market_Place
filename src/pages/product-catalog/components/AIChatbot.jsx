import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import { streamText, handleGeminiError } from '../../../services/geminiService';

const AIChatbot = ({ onQuerySubmit, isProcessing = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: `Welcome to ArtisanAI powered by Gemini! I can help you discover amazing crafts. Try asking me:\n\n• "Show me sarees from West Bengal"\n• "Recommend wooden toys from Karnataka"\n• "Find pottery under ₹2,000"\n• "What crafts are popular in Rajasthan?"`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!inputValue?.trim() || isProcessing || isStreaming) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue?.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue?.trim();
    setInputValue('');
    setIsStreaming(true);

    // Add typing indicator
    const typingMessage = {
      id: Date.now() + 1,
      type: 'bot',
      content: '',
      timestamp: new Date(),
      isTyping: true
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      // Call parent function to handle the query for search
      if (onQuerySubmit) {
        onQuerySubmit(currentInput);
      }

      // Use Gemini AI for chat response with streaming
      let botResponse = '';
      const botMessage = {
        id: Date.now() + 2,
        type: 'bot',
        content: '',
        timestamp: new Date()
      };

      // Remove typing indicator and add the message that will be updated with streaming content
      setMessages(prev => prev?.filter(msg => !msg?.isTyping)?.concat(botMessage));

      // Use streaming for better user experience
      await streamText(
        `You are an AI assistant for an Indian artisan marketplace. A user is asking: "${currentInput}". 
        
        Provide a helpful, conversational response that:
        1. Acknowledges their request
        2. Offers specific suggestions about Indian crafts, regions, or artisan products
        3. Guides them to relevant categories or filters
        4. Maintains enthusiasm for traditional Indian handicrafts
        
        Keep responses under 150 words and sound natural and helpful.`,
        (chunk) => {
          botResponse += chunk;
          setMessages(prev => 
            prev?.map(msg => 
              msg?.id === botMessage?.id 
                ? { ...msg, content: botResponse }
                : msg
            )
          );
        }
      );

      // Update chat history for context
      const newHistory = [
        ...chatHistory,
        { role: 'user', parts: [{ text: currentInput }] },
        { role: 'model', parts: [{ text: botResponse }] }
      ];
      setChatHistory(newHistory);

    } catch (error) {
      console.error('Error in AI chat:', error);
      const errorMessage = handleGeminiError(error);
      
      // Remove typing indicator and show error
      setMessages(prev => 
        prev?.filter(msg => !msg?.isTyping)?.concat({
          id: Date.now() + 3,
          type: 'bot',
          content: `I apologize, but I encountered an issue: ${errorMessage}. Please try asking again.`,
          timestamp: new Date(),
          isError: true
        })
      );
    } finally {
      setIsStreaming(false);
    }
  };

  const quickQueries = [
    "Show me Warli art from Maharashtra",
    "Recommend Pashmina shawls",
    "Find wooden toys under ₹1,500",
    "What\'s popular in Kerala?"
  ];

  const handleQuickQuery = (query) => {
    setInputValue(query);
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="relative">
      {/* Chat Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <Icon name="Bot" size={20} className="text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Gemini AI Craft Assistant
            </h3>
            <p className="text-sm text-muted-foreground">
              Ask me to find specific crafts or get recommendations
            </p>
          </div>
        </div>
        
        <Button
          variant={isOpen ? "default" : "outline"}
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          iconName={isOpen ? "ChevronUp" : "MessageCircle"}
          iconPosition="left"
          iconSize={16}
        >
          {isOpen ? "Minimize" : "Chat"}
        </Button>
      </div>
      
      {/* Chat Interface */}
      {isOpen && (
        <div className="bg-card rounded-lg border border-border shadow-warm mb-6 overflow-hidden">
          {/* Chat Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-muted/20">
            {messages?.map((message) => (
              <div
                key={message?.id}
                className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message?.type === 'user' ?'bg-primary text-primary-foreground' 
                      : message?.isError 
                        ? 'bg-destructive/10 border border-destructive/20 text-destructive' :'bg-background border border-border'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message?.type === 'bot' && (
                      <Icon 
                        name={message?.isTyping ? "Loader2" : "Bot"} 
                        size={16} 
                        className={`mt-0.5 text-primary ${message?.isTyping ? 'animate-spin' : ''}`} 
                      />
                    )}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-line">
                        {message?.isTyping ? 'Gemini AI is thinking...' : message?.content}
                      </p>
                      <span className={`text-xs mt-1 block ${
                        message?.type === 'user' ?'text-primary-foreground/70' :'text-muted-foreground'
                      }`}>
                        {formatTime(message?.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Query Suggestions */}
          {messages?.length <= 1 && (
            <div className="px-4 py-3 border-t border-border bg-muted/10">
              <p className="text-xs text-muted-foreground mb-2">Quick suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQueries?.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuery(query)}
                    className="text-xs bg-background border border-border rounded-full px-3 py-1 hover:bg-muted transition-colors"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-background">
            <div className="flex space-x-2">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Ask me about crafts... e.g., 'Show me pottery from Gujarat'"
                  value={inputValue}
                  onChange={(e) => setInputValue(e?.target?.value)}
                  disabled={isProcessing || isStreaming}
                />
              </div>
              <Button
                type="submit"
                variant="default"
                size="icon"
                disabled={!inputValue?.trim() || isProcessing || isStreaming}
                loading={isStreaming}
              >
                <Icon name="Send" size={16} />
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIChatbot;