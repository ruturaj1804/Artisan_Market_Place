import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import CulturalBreadcrumb from '../../components/ui/CulturalBreadcrumb';
import FilterControls from './components/FilterControls';
import ProductGrid from './components/ProductGrid';
import AIChatbot from './components/AIChatbot';
import RecommendedCarousel from './components/RecommendedCarousel';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isChatProcessing, setIsChatProcessing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const [filters, setFilters] = useState({
    state: 'all',
    craftType: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      productName: "Traditional Warli Art Canvas",
      artisanName: "Priya Sharma",
      state: "maharashtra",
      craftType: "warli",
      price: 2500,
      description: "Authentic Warli tribal art depicting village life and nature, hand-painted on canvas using traditional white pigment on earthy background.",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      productName: "Madhubani Fish Painting",
      artisanName: "Sunita Devi",
      state: "bihar",
      craftType: "madhubani",
      price: 1800,
      description: "Vibrant Madhubani painting featuring traditional fish motifs, created with natural dyes and intricate geometric patterns.",
      imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      productName: "Kashmiri Pashmina Shawl",
      artisanName: "Mohammad Ali",
      state: "jammu-kashmir",
      craftType: "pashmina",
      price: 8500,
      description: "Luxurious hand-woven Pashmina shawl made from finest Cashmere wool, featuring delicate embroidery and traditional patterns.",
      imageUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      productName: "Channapatna Wooden Elephant",
      artisanName: "Ravi Kumar",
      state: "karnataka",
      craftType: "channapatna",
      price: 650,
      description: "Colorful wooden elephant toy crafted using traditional Channapatna techniques with natural lacquer and vibrant colors.",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop"
    },
    {
      id: 5,
      productName: "Blue Pottery Vase",
      artisanName: "Meera Joshi",
      state: "rajasthan",
      craftType: "pottery",
      price: 1200,
      description: "Exquisite blue pottery vase with traditional Jaipur motifs, glazed with cobalt blue and white patterns.",
      imageUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop"
    },
    {
      id: 6,
      productName: "Banarasi Silk Saree",
      artisanName: "Kamala Devi",
      state: "uttar-pradesh",
      craftType: "handloom",
      price: 12000,
      description: "Elegant Banarasi silk saree with gold zari work, featuring traditional brocade patterns and rich burgundy color.",
      imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop"
    },
    {
      id: 7,
      productName: "Dhokra Metal Horse",
      artisanName: "Bhushan Mahato",
      state: "west-bengal",
      craftType: "metalwork",
      price: 950,
      description: "Traditional Dhokra art brass horse figurine created using ancient lost-wax casting technique with intricate tribal patterns.",
      imageUrl: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop"
    },
    {
      id: 8,
      productName: "Rosewood Carved Box",
      artisanName: "Arjun Nair",
      state: "kerala",
      craftType: "woodwork",
      price: 1500,
      description: "Intricately carved rosewood jewelry box featuring traditional Kerala motifs and brass fittings.",
      imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop"
    },
    {
      id: 9,
      productName: "Kundan Jewelry Set",
      artisanName: "Rajesh Soni",
      state: "rajasthan",
      craftType: "jewelry",
      price: 4500,
      description: "Traditional Kundan jewelry set with gold-plated base, featuring uncut diamonds and colorful gemstones.",
      imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop"
    },
    {
      id: 10,
      productName: "Leather Mojari Shoes",
      artisanName: "Ibrahim Khan",
      state: "punjab",
      craftType: "leather",
      price: 800,
      description: "Handcrafted leather Mojari shoes with traditional embroidery and comfortable sole, perfect for ethnic wear.",
      imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop"
    },
    {
      id: 11,
      productName: "Kantha Embroidered Dupatta",
      artisanName: "Rashida Begum",
      state: "west-bengal",
      craftType: "handloom",
      price: 750,
      description: "Beautiful Kantha embroidered dupatta with running stitch patterns and traditional Bengali motifs on soft cotton.",
      imageUrl: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop"
    },
    {
      id: 12,
      productName: "Terracotta Garden Planter",
      artisanName: "Gopal Das",
      state: "odisha",
      craftType: "pottery",
      price: 450,
      description: "Eco-friendly terracotta planter with traditional Odishan patterns, perfect for indoor and outdoor gardening.",
      imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop"
    }
  ];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setRecommendedProducts(mockProducts?.slice(0, 6));
      setIsLoading(false);
    };

    loadProducts();
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered?.filter(product =>
        product?.productName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        product?.craftType?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        product?.artisanName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Apply state filter
    if (filters?.state !== 'all') {
      filtered = filtered?.filter(product => product?.state === filters?.state);
    }

    // Apply craft type filter
    if (filters?.craftType !== 'all') {
      filtered = filtered?.filter(product => product?.craftType === filters?.craftType);
    }

    setFilteredProducts(filtered);
  }, [products, filters, searchTerm]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleClearFilters = () => {
    setFilters({
      state: 'all',
      craftType: 'all'
    });
    setSearchTerm('');
  };

  const handleChatQuery = async (query) => {
    setIsChatProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI response - filter products based on query
    let aiFiltered = [...products];
    const queryLower = query?.toLowerCase();
    
    // Simple keyword matching for demo
    if (queryLower?.includes('saree') || queryLower?.includes('west bengal')) {
      aiFiltered = products?.filter(p => 
        p?.craftType === 'handloom' || p?.state === 'west-bengal'
      );
    } else if (queryLower?.includes('wooden') || queryLower?.includes('toy') || queryLower?.includes('karnataka')) {
      aiFiltered = products?.filter(p => 
        p?.craftType === 'channapatna' || p?.craftType === 'woodwork' || p?.state === 'karnataka'
      );
    } else if (queryLower?.includes('pottery') || queryLower?.includes('under') || queryLower?.includes('2000')) {
      aiFiltered = products?.filter(p => 
        p?.craftType === 'pottery' && p?.price < 2000
      );
    } else if (queryLower?.includes('rajasthan')) {
      aiFiltered = products?.filter(p => p?.state === 'rajasthan');
    }
    
    setRecommendedProducts(aiFiltered?.slice(0, 6));
    setFilteredProducts(aiFiltered);
    setIsChatProcessing(false);
  };

  const handleProductClick = (product) => {
    console.log('Product clicked:', product);
    // Navigate to product detail page
  };

  return (
    <>
      <Helmet>
        <title>Browse Crafts - ArtisanAI Marketplace</title>
        <meta name="description" content="Discover authentic handcrafted products from local Indian artisans. Browse by state, craft type, or use our AI assistant to find the perfect cultural crafts." />
        <meta name="keywords" content="Indian crafts, handmade products, artisan marketplace, traditional crafts, cultural products" />
      </Helmet>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Breadcrumb */}
          <CulturalBreadcrumb 
            filters={filters}
            searchTerm={searchTerm}
          />

          {/* Filter Controls */}
          <FilterControls
            filters={filters}
            onFilterChange={handleFilterChange}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            resultCount={filteredProducts?.length}
            onClearFilters={handleClearFilters}
            isMobile={isMobile}
          />

          {/* AI Chatbot */}
          <AIChatbot
            onQuerySubmit={handleChatQuery}
            isProcessing={isChatProcessing}
          />

          {/* Recommended Products Carousel */}
          <RecommendedCarousel
            products={recommendedProducts}
            onProductClick={handleProductClick}
          />

          {/* Product Grid */}
          <ProductGrid
            products={filteredProducts}
            isLoading={isLoading}
            onProductClick={handleProductClick}
            searchTerm={searchTerm}
            filters={filters}
          />
        </div>
      </main>
      {/* Footer Spacer */}
      <div className="h-16" />
    </>
  );
};

export default ProductCatalog;