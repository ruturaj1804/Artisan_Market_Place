import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check authentication status from localStorage or context
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, [location]);

  const navigationItems = [
    {
      label: 'Home',
      path: '/homepage-landing',
      icon: 'Home',
      tooltip: 'Return to homepage and explore featured artisan crafts'
    },
    {
      label: 'Browse Crafts',
      path: '/product-catalog',
      icon: 'Search',
      tooltip: 'Discover authentic handcrafted products with AI-powered recommendations'
    },
    {
      label: 'List Your Craft',
      path: '/artisan-upload-form',
      icon: 'Plus',
      tooltip: 'Share your handcrafted creations with our community'
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      localStorage.removeItem('isAuthenticated');
      setIsAuthenticated(false);
    } else {
      // Navigate to login
      window.location.href = '/login';
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-warm">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <Link to="/homepage-landing" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-primary-foreground"
                fill="currentColor"
              >
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                <path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-semibold text-lg text-foreground leading-none">
                ArtisanAI
              </span>
              <span className="font-caption text-xs text-muted-foreground leading-none">
                Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-accent/20' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={item?.tooltip}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} className="text-primary-foreground" />
                  </div>
                  <span className="text-foreground font-medium">Welcome back</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAuthAction}
                  iconName="LogOut"
                  iconPosition="left"
                  iconSize={14}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.href = '/login'}
                >
                  Login
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => window.location.href = '/register'}
                >
                  Register
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={handleMobileMenuToggle}
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          <div className="fixed top-16 right-0 w-80 h-full bg-card border-l border-border shadow-warm-lg animate-slide-in">
            <div className="flex flex-col p-6 space-y-6">
              {/* Mobile Navigation */}
              <nav className="space-y-2">
                <h3 className="font-heading font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-4">
                  Navigation
                </h3>
                {navigationItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActivePath(item?.path)
                        ? 'text-primary bg-accent/20 border border-accent' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <div className="flex flex-col">
                      <span>{item?.label}</span>
                      <span className="text-xs text-muted-foreground font-normal">
                        {item?.tooltip}
                      </span>
                    </div>
                  </Link>
                ))}
              </nav>

              {/* Mobile Auth Section */}
              <div className="border-t border-border pt-6">
                <h3 className="font-heading font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-4">
                  Account
                </h3>
                {isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 px-4 py-3 bg-muted rounded-lg">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <Icon name="User" size={20} className="text-primary-foreground" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-foreground font-medium">Welcome back</span>
                        <span className="text-xs text-muted-foreground">Authenticated user</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => {
                        handleAuthAction();
                        closeMobileMenu();
                      }}
                      iconName="LogOut"
                      iconPosition="left"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => {
                        window.location.href = '/login';
                        closeMobileMenu();
                      }}
                      iconName="LogIn"
                      iconPosition="left"
                    >
                      Login
                    </Button>
                    <Button
                      variant="default"
                      fullWidth
                      onClick={() => {
                        window.location.href = '/register';
                        closeMobileMenu();
                      }}
                      iconName="UserPlus"
                      iconPosition="left"
                    >
                      Register
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Content Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Header;