import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import CulturalBreadcrumb from '../../components/ui/CulturalBreadcrumb';
import RegistrationForm from './components/RegistrationForm';
import TrustSignals from './components/TrustSignals';
import SocialRegistration from './components/SocialRegistration';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [registrationStep, setRegistrationStep] = useState('form'); // 'form', 'verification', 'success'

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      navigate('/homepage-landing');
    }
  }, [navigate]);

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock registration success
      const userData = {
        id: Date.now(),
        fullName: formData?.fullName,
        email: formData?.email,
        userType: formData?.userType,
        state: formData?.state,
        craftSpecialization: formData?.craftSpecialization,
        registeredAt: new Date()?.toISOString(),
        verified: false
      };
      
      // Store user data
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('pendingVerification', 'true');
      
      setRegistrationStep('verification');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = async (socialData) => {
    setIsLoading(true);
    
    try {
      // Simulate social registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData = {
        id: Date.now(),
        fullName: socialData?.fullName,
        email: socialData?.email,
        userType: 'buyer', // Default for social registration
        provider: socialData?.provider,
        registeredAt: new Date()?.toISOString(),
        verified: true
      };
      
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      
      navigate('/homepage-landing');
    } catch (error) {
      console.error('Social registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationComplete = () => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.removeItem('pendingVerification');
    setRegistrationStep('success');
    
    setTimeout(() => {
      navigate('/homepage-landing');
    }, 2000);
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage-landing', icon: 'Home' },
    { label: 'Register', path: '/register', icon: 'UserPlus' }
  ];

  if (registrationStep === 'verification') {
    return (
      <>
        <Helmet>
          <title>Email Verification - ArtisanAI Marketplace</title>
          <meta name="description" content="Verify your email to complete registration" />
        </Helmet>
        
        <Header />
        
        <main className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <CulturalBreadcrumb customItems={breadcrumbItems} />
            
            <div className="max-w-md mx-auto">
              <div className="bg-card rounded-lg p-8 border border-border text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Mail" size={32} className="text-primary" />
                </div>
                
                <h1 className="font-heading font-bold text-2xl text-foreground mb-4">
                  Check Your Email
                </h1>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We've sent a verification link to your email address. 
                  Please click the link to complete your registration.
                </p>
                
                <div className="space-y-4">
                  <button
                    onClick={handleVerificationComplete}
                    className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    I've Verified My Email
                  </button>
                  
                  <button
                    onClick={() => setRegistrationStep('form')}
                    className="w-full px-4 py-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Back to Registration
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (registrationStep === 'success') {
    return (
      <>
        <Helmet>
          <title>Welcome to ArtisanAI - Registration Complete</title>
          <meta name="description" content="Registration successful - Welcome to ArtisanAI Marketplace" />
        </Helmet>
        
        <Header />
        
        <main className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto">
              <div className="bg-card rounded-lg p-8 border border-border text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="CheckCircle" size={32} className="text-success" />
                </div>
                
                <h1 className="font-heading font-bold text-2xl text-foreground mb-4">
                  Welcome to ArtisanAI!
                </h1>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Your account has been created successfully. 
                  You're now part of India's premier artisan marketplace.
                </p>
                
                <div className="animate-pulse text-sm text-muted-foreground">
                  Redirecting to homepage...
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Register - Join ArtisanAI Marketplace</title>
        <meta name="description" content="Create your account to discover authentic Indian crafts or showcase your handmade creations on ArtisanAI Marketplace" />
        <meta name="keywords" content="register, signup, artisan, crafts, marketplace, handmade, India" />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <CulturalBreadcrumb customItems={breadcrumbItems} />
          
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left Column - Registration Form */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h1 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4">
                  Join ArtisanAI Marketplace
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Create your account to discover authentic Indian crafts or showcase your handmade creations to customers nationwide.
                </p>
              </div>

              {/* Hero Image for Mobile */}
              <div className="lg:hidden">
                <Image
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop"
                  alt="Indian artisans creating traditional crafts"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              <div className="bg-card rounded-lg p-6 lg:p-8 border border-border">
                <RegistrationForm 
                  onSubmit={handleFormSubmit}
                  isLoading={isLoading}
                />
                
                <div className="mt-8">
                  <SocialRegistration 
                    onSocialRegister={handleSocialRegister}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Trust Signals & Hero */}
            <div className="space-y-8">
              {/* Hero Image for Desktop */}
              <div className="hidden lg:block">
                <Image
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop"
                  alt="Indian artisans creating traditional crafts in workshop"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              {/* Welcome Message */}
              <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Heart" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="font-heading font-semibold text-xl text-foreground mb-2">
                      Empowering Local Artisans
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Join thousands of artisans who have transformed their craft into sustainable businesses. 
                      Our AI-powered platform helps you reach customers who value authentic, handmade products.
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Signals */}
              <TrustSignals />
            </div>
          </div>
        </div>

        {/* Cultural Footer Pattern */}
        <div className="mt-16 border-t border-border">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center space-x-4 opacity-60">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="w-4 h-4 bg-accent rounded-full"></div>
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="w-3 h-3 bg-accent rounded-full"></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;