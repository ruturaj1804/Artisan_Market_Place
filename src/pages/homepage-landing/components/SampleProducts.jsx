import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SampleProducts = () => {
  const navigate = useNavigate();

  const sampleProducts = [
    {
      id: 1,
      name: "Warli Art Canvas Painting",
      artisan: "Meera Patil",
      state: "Maharashtra",
      price: 2500,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      craftType: "Warli Art",
      rating: 4.8,
      reviews: 23
    },
    {
      id: 2,
      name: "Madhubani Fish Motif Painting",
      artisan: "Sunita Devi",
      state: "Bihar",
      price: 1800,
      image: "https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?w=400&h=400&fit=crop",
      craftType: "Madhubani",
      rating: 4.9,
      reviews: 31
    },
    {
      id: 3,
      name: "Kashmiri Pashmina Shawl",
      artisan: "Abdul Rahman",
      state: "Jammu & Kashmir",
      price: 8500,
      image: "https://images.pixabay.com/photo/2019/07/15/16/14/shawl-4339784_1280.jpg?w=400&h=400&fit=crop",
      craftType: "Pashmina",
      rating: 5.0,
      reviews: 18
    },
    {
      id: 4,
      name: "Channapatna Wooden Toys Set",
      artisan: "Ravi Kumar",
      state: "Karnataka",
      price: 1200,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      craftType: "Channapatna Toys",
      rating: 4.7,
      reviews: 42
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    })?.format(price);
  };

  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Featured Artisan Crafts
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Discover authentic handmade products from talented artisans across India
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Sparkles" size={16} className="text-accent" />
            <span>AI-curated selection</span>
            <span className="w-1 h-1 bg-accent rounded-full"></span>
            <span>Authentic crafts</span>
            <span className="w-1 h-1 bg-accent rounded-full"></span>
            <span>Direct from artisans</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {sampleProducts?.map((product) => (
            <div
              key={product?.id}
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-warm-lg transition-all duration-300 group cursor-pointer"
              onClick={() => navigate('/product-catalog')}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden h-48">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                  <Icon name="Star" size={12} className="text-warning fill-current" />
                  <span className="text-xs font-medium text-foreground">{product?.rating}</span>
                </div>
                <div className="absolute bottom-3 left-3 bg-primary/90 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium text-primary-foreground">{product?.craftType}</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {product?.name}
                </h3>
                
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="User" size={14} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{product?.artisan}</span>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="MapPin" size={14} className="text-accent" />
                  <span className="text-sm text-accent font-medium">{product?.state}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-heading text-xl font-bold text-primary">
                      {formatPrice(product?.price)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {product?.reviews} reviews
                    </span>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Icon name="ArrowRight" size={16} className="text-primary" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/product-catalog')}
            iconName="ArrowRight"
            iconPosition="right"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SampleProducts;