import React from 'react';

const CulturalBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main cultural pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Warli-inspired patterns */}
          <g stroke="currentColor" strokeWidth="1" className="text-primary">
            {/* Central mandala */}
            <circle cx="200" cy="200" r="80" fill="none" />
            <circle cx="200" cy="200" r="60" fill="none" />
            <circle cx="200" cy="200" r="40" fill="none" />
            <circle cx="200" cy="200" r="20" fill="none" />
            
            {/* Radiating lines */}
            {[...Array(8)]?.map((_, i) => {
              const angle = (i * 45) * Math.PI / 180;
              const x1 = 200 + Math.cos(angle) * 20;
              const y1 = 200 + Math.sin(angle) * 20;
              const x2 = 200 + Math.cos(angle) * 80;
              const y2 = 200 + Math.sin(angle) * 80;
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
              );
            })}
            
            {/* Corner decorative elements */}
            <g transform="translate(50, 50)">
              <path d="M0,0 L20,0 L20,20 L0,20 Z" fill="none" />
              <path d="M5,5 L15,5 L15,15 L5,15 Z" fill="none" />
              <circle cx="10" cy="10" r="3" fill="currentColor" />
            </g>
            
            <g transform="translate(330, 50)">
              <path d="M0,0 L20,0 L20,20 L0,20 Z" fill="none" />
              <path d="M5,5 L15,5 L15,15 L5,15 Z" fill="none" />
              <circle cx="10" cy="10" r="3" fill="currentColor" />
            </g>
            
            <g transform="translate(50, 330)">
              <path d="M0,0 L20,0 L20,20 L0,20 Z" fill="none" />
              <path d="M5,5 L15,5 L15,15 L5,15 Z" fill="none" />
              <circle cx="10" cy="10" r="3" fill="currentColor" />
            </g>
            
            <g transform="translate(330, 330)">
              <path d="M0,0 L20,0 L20,20 L0,20 Z" fill="none" />
              <path d="M5,5 L15,5 L15,15 L5,15 Z" fill="none" />
              <circle cx="10" cy="10" r="3" fill="currentColor" />
            </g>
          </g>
        </svg>
      </div>
      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-accent/10 rounded-full animate-float-slow"></div>
      <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-primary/10 rounded-full animate-float-slower"></div>
      <div className="absolute top-1/2 left-1/6 w-3 h-3 bg-accent/15 rounded-full animate-float"></div>
      <div className="absolute bottom-1/4 right-1/6 w-5 h-5 bg-primary/8 rounded-full animate-float-slow"></div>
      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background/50 to-transparent"></div>
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background/30 to-transparent"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background/30 to-transparent"></div>
    </div>
  );
};

export default CulturalBackground;