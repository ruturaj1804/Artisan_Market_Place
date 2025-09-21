import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-background via-card to-accent/5 py-16 lg:py-24 overflow-hidden">
      {/* Cultural Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary rounded-full"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border border-accent rotate-45"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary/10 rounded-full"></div>
        <div className="absolute bottom-10 right-1/3 w-20 h-20 border border-secondary/20 rotate-12"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Empowering Local{' '}
            <span className="text-primary relative">
              Artisans
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-accent/30"
                viewBox="0 0 200 12"
                fill="currentColor"
              >
                <path d="M0 8c40-4 80-4 120 0s80 4 80 0v4H0z" />
              </svg>
            </span>
            {' '}with AI
          </h1>

          {/* Subtext */}
          <p className="font-body text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover cultural crafts, stories, and handmade products directly from artisans across India. 
            Experience the perfect blend of traditional craftsmanship and modern AI technology.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              variant="default"
              size="lg"
              onClick={() => navigate('/product-catalog')}
              iconName="Search"
              iconPosition="left"
              className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-warm-lg"
            >
              Explore Products
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/artisan-upload-form')}
              iconName="Plus"
              iconPosition="left"
              className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              List Your Craft
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span>Authentic Crafts</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Sparkles" size={16} className="text-accent" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={16} className="text-primary" />
              <span>Pan-India Network</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Heart" size={16} className="text-error" />
              <span>Supporting Artisans</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
    </section>
  );
};

export default HeroSection;