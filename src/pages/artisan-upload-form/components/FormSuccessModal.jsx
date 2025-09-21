import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FormSuccessModal = ({ 
  isVisible = false, 
  productData = null, 
  onClose = () => {}, 
  onViewCatalog = () => {},
  onAddAnother = () => {} 
}) => {
  if (!isVisible || !productData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-xl shadow-warm-xl max-w-md w-full animate-fade-in">
        {/* Header with cultural accent */}
        <div className="relative bg-gradient-to-r from-success/10 to-primary/10 rounded-t-xl p-6 text-center">
          <div className="absolute top-2 right-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success-foreground" />
          </div>

          <h2 className="font-heading font-semibold text-xl text-foreground mb-2">
            Product Listed Successfully!
          </h2>
          <p className="text-sm text-muted-foreground">
            Your craft has been added to the ArtisanAI Marketplace
          </p>

          {/* Cultural motif */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent opacity-30" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Product Summary */}
          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-foreground text-sm">Product Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Product Name:</span>
                <span className="text-foreground font-medium">{productData?.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Artisan:</span>
                <span className="text-foreground font-medium">{productData?.artisanName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">State:</span>
                <span className="text-foreground font-medium">{productData?.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Craft Type:</span>
                <span className="text-foreground font-medium">{productData?.craftType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price:</span>
                <span className="text-foreground font-medium">₹{productData?.price?.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2 text-success text-sm">
              <Icon name="Sparkles" size={16} />
              <span className="font-medium">Your craft is now live on the marketplace!</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Buyers can now discover and purchase your authentic handcrafted product
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              variant="default"
              fullWidth
              onClick={onViewCatalog}
              iconName="Eye"
              iconPosition="left"
            >
              View in Catalog
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={onAddAnother}
                iconName="Plus"
                iconPosition="left"
                size="sm"
              >
                Add Another
              </Button>
              <Button
                variant="ghost"
                onClick={onClose}
                size="sm"
              >
                Close
              </Button>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
              <div className="text-xs text-muted-foreground space-y-1">
                <p className="font-medium text-foreground">What's Next?</p>
                <ul className="space-y-0.5">
                  <li>• Your product will appear in search results immediately</li>
                  <li>• Share your listing on social media to reach more buyers</li>
                  <li>• Monitor your product performance in the catalog</li>
                  <li>• Consider adding more products to increase visibility</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSuccessModal;