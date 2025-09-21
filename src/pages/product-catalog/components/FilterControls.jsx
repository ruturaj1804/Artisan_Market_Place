import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterControls = ({ 
  filters, 
  onFilterChange, 
  searchTerm, 
  onSearchChange, 
  resultCount,
  onClearFilters,
  isMobile = false 
}) => {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const stateOptions = [
    { value: 'all', label: 'All States' },
    { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
    { value: 'assam', label: 'Assam' },
    { value: 'bihar', label: 'Bihar' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'haryana', label: 'Haryana' },
    { value: 'himachal-pradesh', label: 'Himachal Pradesh' },
    { value: 'jharkhand', label: 'Jharkhand' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'kerala', label: 'Kerala' },
    { value: 'madhya-pradesh', label: 'Madhya Pradesh' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'odisha', label: 'Odisha' },
    { value: 'punjab', label: 'Punjab' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
    { value: 'west-bengal', label: 'West Bengal' }
  ];

  const craftTypeOptions = [
    { value: 'all', label: 'All Craft Types' },
    { value: 'warli', label: 'Warli Art' },
    { value: 'madhubani', label: 'Madhubani Painting' },
    { value: 'pashmina', label: 'Pashmina Shawls' },
    { value: 'channapatna', label: 'Channapatna Toys' },
    { value: 'pottery', label: 'Traditional Pottery' },
    { value: 'handloom', label: 'Handloom Textiles' },
    { value: 'metalwork', label: 'Metal Crafts' },
    { value: 'woodwork', label: 'Wood Crafts' },
    { value: 'jewelry', label: 'Traditional Jewelry' },
    { value: 'leather', label: 'Leather Crafts' }
  ];

  const hasActiveFilters = filters?.state !== 'all' || filters?.craftType !== 'all' || searchTerm;

  const FilterContent = () => (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Input
          type="search"
          placeholder="Search products or craft types..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="pr-10"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Icon name="Search" size={16} className="text-muted-foreground" />
        </div>
      </div>

      {/* Filter Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Filter by State"
          options={stateOptions}
          value={filters?.state}
          onChange={(value) => onFilterChange('state', value)}
          searchable
        />
        
        <Select
          label="Filter by Craft Type"
          options={craftTypeOptions}
          value={filters?.craftType}
          onChange={(value) => onFilterChange('craftType', value)}
          searchable
        />
      </div>

      {/* Results Count and Clear Filters */}
      <div className="flex items-center justify-between pt-2">
        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{resultCount}</span> products found
        </div>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={14}
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Filter Toggle */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Browse Crafts
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFilterPanelOpen(true)}
            iconName="Filter"
            iconPosition="left"
            iconSize={16}
          >
            Filters {hasActiveFilters && `(${Object.values(filters)?.filter(v => v !== 'all')?.length + (searchTerm ? 1 : 0)})`}
          </Button>
        </div>
        {/* Mobile Filter Panel */}
        {isFilterPanelOpen && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-card border-l border-border shadow-warm-lg">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-heading font-semibold text-lg">Filters</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFilterPanelOpen(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              
              <div className="p-4 space-y-6">
                <FilterContent />
                
                <div className="pt-4 border-t border-border">
                  <Button
                    variant="default"
                    fullWidth
                    onClick={() => setIsFilterPanelOpen(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-warm mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Browse Crafts
        </h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Sparkles" size={16} className="text-accent" />
          <span>AI-powered discovery</span>
        </div>
      </div>
      
      <FilterContent />
    </div>
  );
};

export default FilterControls;