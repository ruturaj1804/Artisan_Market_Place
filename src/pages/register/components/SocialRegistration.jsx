import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialRegistration = ({ onSocialRegister, isLoading }) => {
  const socialOptions = [
    {
      provider: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-white border-border text-foreground hover:bg-muted',
      description: 'Continue with Google account'
    }
  ];

  const handleSocialRegister = (provider) => {
    // Mock social registration
    const mockUserData = {
      provider,
      fullName: 'Demo User',
      email: 'demo@example.com',
      verified: true
    };
    
    onSocialRegister(mockUserData);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground font-medium">
            Or continue with
          </span>
        </div>
      </div>
      <div className="space-y-3">
        {socialOptions?.map((option) => (
          <Button
            key={option?.provider}
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => handleSocialRegister(option?.provider)}
            loading={isLoading}
            iconName={option?.icon}
            iconPosition="left"
            className={`${option?.color} transition-all duration-200`}
          >
            {option?.description}
          </Button>
        ))}
      </div>
      <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon name="Shield" size={16} className="text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-sm text-foreground mb-1">
              Secure Registration
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We use industry-standard security measures to protect your information. 
              Your data is encrypted and never shared with third parties without your consent.
            </p>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          By registering, you agree to our{' '}
          <button className="text-primary hover:text-primary/80 transition-colors font-medium">
            Terms of Service
          </button>
          {' '}and{' '}
          <button className="text-primary hover:text-primary/80 transition-colors font-medium">
            Privacy Policy
          </button>
        </p>
      </div>
    </div>
  );
};

export default SocialRegistration;