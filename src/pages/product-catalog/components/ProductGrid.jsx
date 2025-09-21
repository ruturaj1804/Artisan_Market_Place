import React from 'react';
import ProductCard from './ProductCard';
import Icon from '../../../components/AppIcon';

const ProductGrid = ({ 
  products = [], 
  isLoading = false, 
  onProductClick,
  searchTerm = '',
  filters = {}
}) => {
  const hasActiveFilters = filters?.state !== 'all' || filters?.craftType !== 'all' || searchTerm;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 })?.map((_, index) => (
          <div key={index} className="bg-card rounded-lg border border-border shadow-warm animate-pulse">
            <div className="aspect-square bg-muted rounded-t-lg" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          {hasActiveFilters ? (
            <Icon name="SearchX" size={32} className="text-muted-foreground" />
          ) : (
            <Icon name="Package" size={32} className="text-muted-foreground" />
          )}
        </div>
        <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
          {hasActiveFilters ? 'No crafts found' : 'No crafts available'}
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          {hasActiveFilters 
            ? 'Try adjusting your filters or search terms to find more crafts.' :'Check back soon as artisans add their beautiful handcrafted products.'
          }
        </p>
        {hasActiveFilters && (
          <div className="space-y-4">
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              {searchTerm && (
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                  Search: "{searchTerm}"
                </span>
              )}
              {filters?.state !== 'all' && (
                <span className="bg-accent/10 text-accent px-3 py-1 rounded-full capitalize">
                  State: {filters?.state?.replace('-', ' ')}
                </span>
              )}
              {filters?.craftType !== 'all' && (
                <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full capitalize">
                  Craft: {filters?.craftType?.replace('-', ' ')}
                </span>
              )}
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>Try searching for:</p>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                <span className="text-primary">pottery</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-primary">handloom</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-primary">jewelry</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-primary">woodwork</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{products?.length}</span> craft{products?.length !== 1 ? 's' : ''}
          {hasActiveFilters && (
            <span className="ml-1">
              matching your criteria
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Grid3X3" size={14} />
          <span>Grid View</span>
        </div>
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard
            key={product?.id}
            product={product}
            onClick={onProductClick}
          />
        ))}
      </div>
      {/* Load More Indicator */}
      {products?.length > 0 && products?.length % 12 === 0 && (
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="MoreHorizontal" size={16} />
            <span>More crafts available - scroll to load</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;