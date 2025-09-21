import React from 'react';
import Icon from '../../../components/AppIcon';

const FeatureCards = () => {
  const features = [
    {
      id: 1,
      icon: "Users",
      title: "Artisan-first Marketplace",
      description: "Direct connection between skilled artisans and craft enthusiasts, ensuring fair prices and authentic cultural products.",
      accent: "bg-primary/10 border-primary/20",
      iconColor: "text-primary"
    },
    {
      id: 2,
      icon: "Sparkles",
      title: "AI-Powered Product Descriptions",
      description: "Advanced AI technology generates compelling product stories, highlighting cultural significance and craftsmanship details.",
      accent: "bg-accent/10 border-accent/20",
      iconColor: "text-accent"
    },
    {
      id: 3,
      icon: "MapPin",
      title: "State-wise Cultural Products",
      description: "Explore authentic crafts organized by Indian states, discovering regional specialties and traditional art forms.",
      accent: "bg-secondary/10 border-secondary/20",
      iconColor: "text-secondary"
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Why Choose ArtisanAI?
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the perfect fusion of traditional Indian craftsmanship with cutting-edge AI technology
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features?.map((feature) => (
            <div
              key={feature?.id}
              className={`${feature?.accent} border rounded-xl p-6 hover:shadow-warm-lg transition-all duration-300 group relative overflow-hidden`}
            >
              {/* Cultural Pattern Overlay */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-foreground">
                  <circle cx="20" cy="20" r="2" />
                  <circle cx="40" cy="20" r="2" />
                  <circle cx="60" cy="20" r="2" />
                  <circle cx="80" cy="20" r="2" />
                  <circle cx="30" cy="40" r="2" />
                  <circle cx="50" cy="40" r="2" />
                  <circle cx="70" cy="40" r="2" />
                  <circle cx="20" cy="60" r="2" />
                  <circle cx="40" cy="60" r="2" />
                  <circle cx="60" cy="60" r="2" />
                  <circle cx="80" cy="60" r="2" />
                  <circle cx="30" cy="80" r="2" />
                  <circle cx="50" cy="80" r="2" />
                  <circle cx="70" cy="80" r="2" />
                </svg>
              </div>

              {/* Icon */}
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-background mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon 
                  name={feature?.icon} 
                  size={24} 
                  className={feature?.iconColor}
                />
              </div>

              {/* Content */}
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                {feature?.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                {feature?.description}
              </p>

              {/* Hover Effect Border */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Bottom Accent */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="w-8 h-px bg-accent"></div>
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <div className="w-8 h-px bg-secondary"></div>
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;