import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ProductCard = ({ product, onClick }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(price);
  };

  const getCraftTypeIcon = (craftType) => {
    const iconMap = {
      'warli': 'Palette',
      'madhubani': 'Brush',
      'pashmina': 'Shirt',
      'channapatna': 'Gamepad2',
      'pottery': 'Circle',
      'handloom': 'Scissors',
      'metalwork': 'Wrench',
      'woodwork': 'TreePine',
      'jewelry': 'Gem',
      'leather': 'Package'
    };
    return iconMap?.[craftType] || 'Package';
  };

  return (
    <div 
      className="bg-card rounded-lg border border-border shadow-warm hover:shadow-warm-lg transition-all duration-300 cursor-pointer group overflow-hidden"
      onClick={() => onClick(product)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product?.imageUrl}
          alt={product?.productName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Craft Type Badge */}
        <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <Icon 
            name={getCraftTypeIcon(product?.craftType)} 
            size={12} 
            className="text-primary" 
          />
          <span className="text-xs font-medium text-foreground capitalize">
            {product?.craftType?.replace('-', ' ')}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full px-3 py-1">
          <span className="text-sm font-semibold">
            {formatPrice(product?.price)}
          </span>
        </div>
      </div>
      {/* Product Details */}
      <div className="p-4 space-y-3">
        {/* Product Name */}
        <h3 className="font-heading font-semibold text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {product?.productName}
        </h3>

        {/* Artisan Info */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="User" size={14} />
          <span>by {product?.artisanName}</span>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="MapPin" size={14} />
          <span className="capitalize">{product?.state?.replace('-', ' ')}</span>
        </div>

        {/* Description Preview */}
        {product?.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product?.description}
          </p>
        )}

        {/* Action Indicator */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="Eye" size={12} />
            <span>View Details</span>
          </div>
          
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Icon name="ArrowRight" size={16} className="text-primary" />
          </div>
        </div>
      </div>
      {/* Cultural accent border */}
      <div className="h-1 bg-gradient-to-r from-accent via-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default ProductCard;