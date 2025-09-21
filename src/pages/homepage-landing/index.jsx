import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import CulturalBreadcrumb from '../../components/ui/CulturalBreadcrumb';
import HeroSection from './components/HeroSection';
import FeatureCards from './components/FeatureCards';
import SampleProducts from './components/SampleProducts';
import Footer from './components/Footer';

const HomepageLanding = () => {
  return (
    <>
      <Helmet>
        <title>ArtisanAI Marketplace - Empowering Local Artisans with AI</title>
        <meta 
          name="description" 
          content="Discover authentic Indian crafts and handmade products directly from local artisans. AI-powered marketplace connecting traditional craftsmanship with modern technology." 
        />
        <meta name="keywords" content="Indian crafts, artisan marketplace, handmade products, AI-powered, cultural crafts, traditional art" />
        <meta property="og:title" content="ArtisanAI Marketplace - Empowering Local Artisans with AI" />
        <meta property="og:description" content="Discover cultural crafts, stories, and handmade products directly from artisans across India" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/homepage-landing" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CulturalBreadcrumb />
          </div>
          
          <HeroSection />
          <FeatureCards />
          <SampleProducts />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HomepageLanding;