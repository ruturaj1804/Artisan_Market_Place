import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const CulturalBreadcrumb = ({ customItems = null, filters = null, searchTerm = null }) => {
  const location = useLocation();

  const pathMapping = {
    '/homepage-landing': 'Home',
    '/product-catalog': 'Browse Crafts',
    '/artisan-upload-form': 'List Your Craft',
    '/login': 'Login',
    '/register': 'Register'
  };

  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const breadcrumbs = [];
    
    // Always start with Home
    breadcrumbs?.push({
      label: 'Home',
      path: '/homepage-landing',
      icon: 'Home'
    });

    // Add current page if not home
    if (location?.pathname !== '/homepage-landing') {
      const currentPageLabel = pathMapping?.[location?.pathname] || 'Page';
      breadcrumbs?.push({
        label: currentPageLabel,
        path: location?.pathname,
        icon: getCurrentPageIcon(location?.pathname)
      });
    }

    // Add filter context for product catalog
    if (location?.pathname === '/product-catalog') {
      if (searchTerm) {
        breadcrumbs?.push({
          label: `Search: "${searchTerm}"`,
          path: null,
          icon: 'Search'
        });
      }
      
      if (filters && Object.keys(filters)?.length > 0) {
        const activeFilters = Object.entries(filters)?.filter(([key, value]) => value && value !== 'all')?.map(([key, value]) => `${key}: ${value}`);
        
        if (activeFilters?.length > 0) {
          breadcrumbs?.push({
            label: `Filtered (${activeFilters?.length})`,
            path: null,
            icon: 'Filter'
          });
        }
      }
    }

    return breadcrumbs;
  };

  const getCurrentPageIcon = (path) => {
    const iconMap = {
      '/homepage-landing': 'Home',
      '/product-catalog': 'Search',
      '/artisan-upload-form': 'Plus',
      '/login': 'LogIn',
      '/register': 'UserPlus'
    };
    return iconMap?.[path] || 'ChevronRight';
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground py-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((crumb, index) => (
          <li key={index} className="flex items-center space-x-2">
            {index > 0 && (
              <div className="flex items-center justify-center w-4 h-4">
                <svg
                  viewBox="0 0 24 24"
                  className="w-3 h-3 text-accent fill-current"
                  style={{
                    filter: 'drop-shadow(0 1px 2px rgba(193, 123, 90, 0.2))'
                  }}
                >
                  <path d="M8 4l8 8-8 8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="1" fill="currentColor"/>
                </svg>
              </div>
            )}
            
            <div className="flex items-center space-x-1.5">
              <Icon 
                name={crumb?.icon} 
                size={14} 
                className={index === breadcrumbs?.length - 1 ? 'text-primary' : 'text-muted-foreground'} 
              />
              
              {crumb?.path && index < breadcrumbs?.length - 1 ? (
                <Link
                  to={crumb?.path}
                  className="hover:text-primary transition-colors font-medium"
                >
                  {crumb?.label}
                </Link>
              ) : (
                <span 
                  className={`font-medium ${
                    index === breadcrumbs?.length - 1 
                      ? 'text-primary' :'text-foreground'
                  }`}
                >
                  {crumb?.label}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
      {/* Cultural motif accent */}
      <div className="ml-4 flex items-center space-x-1">
        <div className="w-1 h-1 bg-accent rounded-full opacity-60"></div>
        <div className="w-1.5 h-1.5 bg-primary rounded-full opacity-40"></div>
        <div className="w-1 h-1 bg-accent rounded-full opacity-60"></div>
      </div>
    </nav>
  );
};

export default CulturalBreadcrumb;