import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import CulturalBreadcrumb from '../../components/ui/CulturalBreadcrumb';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import CulturalBackground from './components/CulturalBackground';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      navigate('/homepage-landing');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="relative">
        <CulturalBackground />
        
        <div className="relative z-10 container mx-auto px-4 py-8">
          <CulturalBreadcrumb />
          
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            {/* Left Column - Login Form */}
            <div className="order-2 lg:order-1">
              <LoginForm />
            </div>
            
            {/* Right Column - Trust Signals */}
            <div className="order-1 lg:order-2">
              <div className="sticky top-24">
                <TrustSignals />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="relative z-10 bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* About */}
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">
                About ArtisanAI
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connecting authentic Indian artisans with craft enthusiasts through AI-powered marketplace technology.
              </p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Secure</span>
                <div className="w-1 h-1 bg-accent rounded-full"></div>
                <span>Trusted</span>
                <div className="w-1 h-1 bg-accent rounded-full"></div>
                <span>Authentic</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">
                Quick Links
              </h3>
              <div className="space-y-2">
                <a href="/homepage-landing" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </a>
                <a href="/product-catalog" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Browse Crafts
                </a>
                <a href="/artisan-upload-form" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  List Your Craft
                </a>
                <a href="/register" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Register
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">
                Contact & Support
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Email: support@artisanai.in</p>
                <p>Phone: +91 98765 43210</p>
                <p>Hours: Mon-Sat 9AM-6PM IST</p>
              </div>
              <div className="flex items-center space-x-3 mt-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} ArtisanAI Marketplace. All rights reserved. Made with ❤️ for Indian artisans.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;