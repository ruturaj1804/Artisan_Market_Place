import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Secure Authentication',
      description: 'Your data is protected with industry-standard encryption'
    },
    {
      icon: 'Lock',
      title: 'Privacy Protected',
      description: 'We never share your personal information with third parties'
    },
    {
      icon: 'CheckCircle',
      title: 'Verified Platform',
      description: 'Trusted by thousands of artisans across India'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Madhubani Artist',
      state: 'Bihar',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      quote: `ArtisanAI has transformed how I showcase my Madhubani paintings.\nThe platform is secure and easy to use.`,
      rating: 5
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      role: 'Craft Collector',
      state: 'Delhi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      quote: `I love discovering authentic crafts here.\nThe login process is smooth and secure.`,
      rating: 5
    }
  ];

  const stats = [
    { number: '5,000+', label: 'Verified Artisans' },
    { number: '50,000+', label: 'Happy Customers' },
    { number: '28', label: 'States Covered' }
  ];

  return (
    <div className="space-y-8">
      {/* Security Features */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-4 text-center">
          Your Security Matters
        </h3>
        <div className="space-y-4">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                <Icon name={feature?.icon} size={16} className="text-success" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground text-sm mb-1">
                  {feature?.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Platform Stats */}
      <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-lg p-6">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-4 text-center">
          Trusted Community
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-heading text-xl font-bold text-primary mb-1">
                {stat?.number}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Testimonials */}
      <div className="space-y-4">
        <h3 className="font-heading text-lg font-semibold text-foreground text-center">
          What Our Community Says
        </h3>
        {testimonials?.map((testimonial) => (
          <div key={testimonial?.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Image
                src={testimonial?.avatar}
                alt={`${testimonial?.name} profile`}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-foreground text-sm">
                    {testimonial?.name}
                  </h4>
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial?.rating)]?.map((_, i) => (
                      <Icon key={i} name="Star" size={12} className="text-warning fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {testimonial?.role} • {testimonial?.state}
                </p>
                <p className="text-sm text-foreground whitespace-pre-line">
                  {testimonial?.quote}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Cultural Pattern */}
      <div className="flex justify-center items-center space-x-3 py-4">
        <div className="w-8 h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full"></div>
        <div className="w-2 h-2 bg-primary rounded-full"></div>
        <div className="w-8 h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full"></div>
      </div>
    </div>
  );
};

export default TrustSignals;