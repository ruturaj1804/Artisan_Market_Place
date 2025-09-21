import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import ProductCard from './ProductCard';
import Icon from '../../../components/AppIcon';

const RecommendedCarousel = ({ products = [], title = "AI Recommended for You", onProductClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const carouselRef = useRef(null);

  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCards(1);
      else if (width < 768) setVisibleCards(2);
      else if (width < 1024) setVisibleCards(3);
      else setVisibleCards(4);
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const maxIndex = Math.max(0, products?.length - visibleCards);

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const handleProductClick = (product) => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  if (!products?.length) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Sparkles" size={24} className="text-muted-foreground" />
        </div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
          No Recommendations Yet
        </h3>
        <p className="text-muted-foreground">
          Start chatting with our AI assistant to get personalized craft recommendations!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-warm p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <Icon name="Sparkles" size={16} className="text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">
              Curated based on your interests and queries
            </p>
          </div>
        </div>

        {/* Navigation Controls */}
        {products?.length > visibleCards && (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        )}
      </div>
      {/* Carousel Container */}
      <div className="relative overflow-hidden" ref={carouselRef}>
        <div 
          className="flex transition-transform duration-300 ease-cultural"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
            width: `${(products?.length / visibleCards) * 100}%`
          }}
        >
          {products?.map((product) => (
            <div 
              key={product?.id}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / products?.length}%` }}
            >
              <ProductCard 
                product={product} 
                onClick={handleProductClick}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Dots Indicator */}
      {products?.length > visibleCards && (
        <div className="flex items-center justify-center space-x-2 mt-6">
          {Array.from({ length: maxIndex + 1 })?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex 
                  ? 'bg-primary' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      )}
      {/* View All Button */}
      <div className="flex justify-center mt-6 pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={() => {}}
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={14}
        >
          View All Recommendations
        </Button>
      </div>
    </div>
  );
};

export default RecommendedCarousel;