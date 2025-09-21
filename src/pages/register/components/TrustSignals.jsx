import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Madhubani Artist",
      state: "Bihar",
      image: "https://images.unsplash.com/photo-1494790108755-2616c27b1e2d?w=150&h=150&fit=crop&crop=face",
      quote: `ArtisanAI helped me reach customers across India. The AI descriptions perfectly capture the essence of my traditional Madhubani paintings.`,
      rating: 5,
      sales: "₹2,50,000+ in sales"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Wood Carver",
      state: "Karnataka",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      quote: `The platform made it easy to showcase my Channapatna toys. Now I have regular orders from cities I never imagined reaching.`,
      rating: 5,
      sales: "₹1,80,000+ in sales"
    },
    {
      id: 3,
      name: "Meera Patel",
      role: "Craft Enthusiast",
      state: "Gujarat",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote: `I discovered authentic crafts from every corner of India. The quality and stories behind each piece make every purchase special.`,
      rating: 5,
      purchases: "50+ authentic crafts"
    }
  ];

  const achievements = [
    {
      icon: "Users",
      number: "10,000+",
      label: "Active Artisans",
      description: "Skilled craftspeople from across India"
    },
    {
      icon: "MapPin",
      number: "28",
      label: "States Covered",
      description: "Representing diverse cultural traditions"
    },
    {
      icon: "ShoppingBag",
      number: "₹50L+",
      label: "Artisan Earnings",
      description: "Direct income generated for creators"
    },
    {
      icon: "Award",
      number: "4.9/5",
      label: "Customer Rating",
      description: "Based on 5,000+ reviews"
    }
  ];

  const certifications = [
    {
      icon: "Shield",
      title: "Authenticity Guaranteed",
      description: "Every product verified by craft experts"
    },
    {
      icon: "Truck",
      title: "Secure Delivery",
      description: "Safe packaging for delicate handmade items"
    },
    {
      icon: "Heart",
      title: "Fair Trade Practices",
      description: "Direct payments to artisans, no middlemen"
    },
    {
      icon: "Sparkles",
      title: "AI-Powered Discovery",
      description: "Smart recommendations for authentic crafts"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Platform Achievements */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-6 text-center">
          Trusted by Artisans Nationwide
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {achievements?.map((achievement, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={achievement?.icon} size={20} className="text-primary" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="font-heading font-bold text-xl text-primary">
                  {achievement?.number}
                </div>
                <div className="font-medium text-sm text-foreground">
                  {achievement?.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {achievement?.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Success Stories */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-lg text-foreground text-center">
          Success Stories
        </h3>
        
        <div className="space-y-4">
          {testimonials?.map((testimonial) => (
            <div key={testimonial?.id} className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-start space-x-3">
                <Image
                  src={testimonial?.image}
                  alt={testimonial?.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-sm text-foreground">
                        {testimonial?.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {testimonial?.role} • {testimonial?.state}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial?.rating)]?.map((_, i) => (
                        <Icon key={i} name="Star" size={12} className="text-warning fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                    {testimonial?.quote}
                  </p>
                  
                  <div className="flex items-center space-x-2">
                    <Icon name="TrendingUp" size={12} className="text-success" />
                    <span className="text-xs font-medium text-success">
                      {testimonial?.sales || testimonial?.purchases}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Trust Certifications */}
      <div className="bg-accent/5 rounded-lg p-6 border border-accent/20">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4 text-center">
          Why Choose ArtisanAI?
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          {certifications?.map((cert, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={cert?.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm text-foreground">
                  {cert?.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {cert?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Cultural Accent */}
      <div className="flex items-center justify-center space-x-2 py-4">
        <div className="w-2 h-2 bg-accent rounded-full opacity-60"></div>
        <div className="w-3 h-3 bg-primary rounded-full opacity-40"></div>
        <div className="w-2 h-2 bg-accent rounded-full opacity-60"></div>
      </div>
    </div>
  );
};

export default TrustSignals;