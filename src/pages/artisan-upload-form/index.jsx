import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import CulturalBreadcrumb from '../../components/ui/CulturalBreadcrumb';
import UploadProgressIndicator from '../../components/ui/UploadProgressIndicator';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';
import ImageUploadSection from './components/ImageUploadSection';
import AIDescriptionGenerator from './components/AIDescriptionGenerator';
import FormSuccessModal from './components/FormSuccessModal';

const ArtisanUploadForm = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    artisanName: '',
    productName: '',
    state: '',
    craftType: '',
    price: '',
    description: ''
  });
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedProduct, setSubmittedProduct] = useState(null);
  
  // Upload progress state
  const [uploadProgress, setUploadProgress] = useState({
    isVisible: false,
    progress: 0,
    status: 'uploading',
    fileName: '',
    message: ''
  });

  // Indian states data
  const indianStates = [
    { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
    { value: 'arunachal-pradesh', label: 'Arunachal Pradesh' },
    { value: 'assam', label: 'Assam' },
    { value: 'bihar', label: 'Bihar' },
    { value: 'chhattisgarh', label: 'Chhattisgarh' },
    { value: 'goa', label: 'Goa' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'haryana', label: 'Haryana' },
    { value: 'himachal-pradesh', label: 'Himachal Pradesh' },
    { value: 'jharkhand', label: 'Jharkhand' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'kerala', label: 'Kerala' },
    { value: 'madhya-pradesh', label: 'Madhya Pradesh' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'manipur', label: 'Manipur' },
    { value: 'meghalaya', label: 'Meghalaya' },
    { value: 'mizoram', label: 'Mizoram' },
    { value: 'nagaland', label: 'Nagaland' },
    { value: 'odisha', label: 'Odisha' },
    { value: 'punjab', label: 'Punjab' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'sikkim', label: 'Sikkim' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'telangana', label: 'Telangana' },
    { value: 'tripura', label: 'Tripura' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
    { value: 'uttarakhand', label: 'Uttarakhand' },
    { value: 'west-bengal', label: 'West Bengal' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'jammu-kashmir', label: 'Jammu & Kashmir' },
    { value: 'ladakh', label: 'Ladakh' },
    { value: 'puducherry', label: 'Puducherry' }
  ];

  // Craft types data
  const craftTypes = [
    { value: 'Warli', label: 'Warli Art' },
    { value: 'Madhubani', label: 'Madhubani Painting' },
    { value: 'Pashmina', label: 'Pashmina Shawls' },
    { value: 'Channapatna Toys', label: 'Channapatna Toys' },
    { value: 'Pottery', label: 'Traditional Pottery' },
    { value: 'Textiles', label: 'Handloom Textiles' },
    { value: 'Jewelry', label: 'Traditional Jewelry' },
    { value: 'Wood Carving', label: 'Wood Carving' },
    { value: 'Metalwork', label: 'Metal Crafts' },
    { value: 'Bamboo Crafts', label: 'Bamboo Crafts' },
    { value: 'Leather Work', label: 'Leather Crafts' },
    { value: 'Stone Carving', label: 'Stone Carving' },
    { value: 'Embroidery', label: 'Traditional Embroidery' },
    { value: 'Block Printing', label: 'Block Printing' },
    { value: 'Carpet Weaving', label: 'Carpet Weaving' }
  ];

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage-landing', icon: 'Home' },
    { label: 'List Your Craft', path: '/artisan-upload-form', icon: 'Plus' }
  ];

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  // Handle image selection
  const handleImageSelect = (imageData, error) => {
    setSelectedImage(imageData);
    if (error) {
      setErrors(prev => ({
        ...prev,
        image: error
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        image: null
      }));
    }
  };

  // Handle AI description generation
  const handleDescriptionGenerated = (description, error = null) => {
    if (error) {
      setErrors(prev => ({
        ...prev,
        aiDescription: error
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        description: description
      }));
      setErrors(prev => ({
        ...prev,
        aiDescription: null
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData?.artisanName?.trim()) {
      newErrors.artisanName = 'Artisan name is required';
    }

    if (!formData?.productName?.trim()) {
      newErrors.productName = 'Product name is required';
    }

    if (!formData?.state) {
      newErrors.state = 'Please select a state';
    }

    if (!formData?.craftType) {
      newErrors.craftType = 'Please select a craft type';
    }

    if (!formData?.price || parseFloat(formData?.price) <= 0) {
      newErrors.price = 'Please enter a valid price';
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'Product description is required';
    }

    if (!selectedImage) {
      newErrors.image = 'Product image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Show upload progress
    setUploadProgress({
      isVisible: true,
      progress: 0,
      status: 'uploading',
      fileName: selectedImage?.name,
      message: 'Uploading your craft image...'
    });

    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(prev => ({
          ...prev,
          progress: i
        }));
      }

      // Switch to processing
      setUploadProgress(prev => ({
        ...prev,
        status: 'processing',
        message: 'AI is analyzing your craft details...'
      }));

      await new Promise(resolve => setTimeout(resolve, 1500));

      // Success
      setUploadProgress(prev => ({
        ...prev,
        status: 'success',
        message: 'Your craft has been listed successfully!'
      }));

      // Prepare submitted product data
      const productData = {
        ...formData,
        price: parseFloat(formData?.price),
        image: selectedImage?.preview,
        id: Date.now()?.toString(),
        createdAt: new Date()?.toISOString()
      };

      setSubmittedProduct(productData);

      // Hide progress after delay
      setTimeout(() => {
        setUploadProgress(prev => ({
          ...prev,
          isVisible: false
        }));
        setShowSuccessModal(true);
      }, 1500);

    } catch (error) {
      console.error('Error submitting form:', error);
      setUploadProgress(prev => ({
        ...prev,
        status: 'error',
        message: 'Failed to upload. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle success modal actions
  const handleViewCatalog = () => {
    setShowSuccessModal(false);
    navigate('/product-catalog');
  };

  const handleAddAnother = () => {
    setShowSuccessModal(false);
    setFormData({
      artisanName: '',
      productName: '',
      state: '',
      craftType: '',
      price: '',
      description: ''
    });
    setSelectedImage(null);
    setErrors({});
    setSubmittedProduct(null);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  // Format price input
  const handlePriceChange = (e) => {
    const value = e?.target?.value?.replace(/[^\d.]/g, '');
    handleInputChange('price', value);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <CulturalBreadcrumb customItems={breadcrumbItems} />

        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Icon name="Plus" size={24} className="text-primary-foreground" />
            </div>
            <h1 className="font-heading font-bold text-3xl lg:text-4xl text-foreground">
              List Your Craft
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share your authentic handcrafted products with buyers across India. 
            Our AI will help create compelling descriptions that highlight your craft's cultural significance.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-card border border-border rounded-xl p-6 lg:p-8 shadow-warm">
            {/* Artisan Information */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="User" size={20} className="text-primary" />
                <h2 className="font-heading font-semibold text-xl text-foreground">
                  Artisan Information
                </h2>
              </div>

              <Input
                label="Artisan Name"
                type="text"
                placeholder="Enter your full name"
                value={formData?.artisanName}
                onChange={(e) => handleInputChange('artisanName', e?.target?.value)}
                error={errors?.artisanName}
                required
                description="This will be displayed as the creator of the product"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Package" size={20} className="text-primary" />
                <h2 className="font-heading font-semibold text-xl text-foreground">
                  Product Details
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Input
                  label="Product Name"
                  type="text"
                  placeholder="e.g., Handwoven Silk Saree"
                  value={formData?.productName}
                  onChange={(e) => handleInputChange('productName', e?.target?.value)}
                  error={errors?.productName}
                  required
                  description="Give your product a descriptive name"
                />

                <Input
                  label="Price (₹)"
                  type="text"
                  placeholder="e.g., 2500"
                  value={formData?.price}
                  onChange={handlePriceChange}
                  error={errors?.price}
                  required
                  description="Enter price in Indian Rupees"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Select
                  label="State"
                  placeholder="Select your state"
                  options={indianStates}
                  value={formData?.state}
                  onChange={(value) => handleInputChange('state', value)}
                  error={errors?.state}
                  required
                  searchable
                  description="State where the craft is made"
                />

                <Select
                  label="Craft Type"
                  placeholder="Select craft category"
                  options={craftTypes}
                  value={formData?.craftType}
                  onChange={(value) => handleInputChange('craftType', value)}
                  error={errors?.craftType}
                  required
                  searchable
                  description="Traditional craft category"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Image" size={20} className="text-primary" />
                <h2 className="font-heading font-semibold text-xl text-foreground">
                  Product Image
                </h2>
              </div>

              <ImageUploadSection
                selectedImage={selectedImage}
                onImageSelect={handleImageSelect}
                error={errors?.image}
                disabled={isSubmitting}
              />
            </div>

            {/* AI Description Generator */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Sparkles" size={20} className="text-primary" />
                <h2 className="font-heading font-semibold text-xl text-foreground">
                  Product Description
                </h2>
              </div>

              <AIDescriptionGenerator
                productName={formData?.productName}
                selectedState={formData?.state}
                selectedCraftType={formData?.craftType}
                onDescriptionGenerated={handleDescriptionGenerated}
                disabled={isSubmitting}
              />

              {errors?.aiDescription && (
                <div className="flex items-center space-x-2 text-sm text-error mt-2">
                  <Icon name="AlertCircle" size={16} />
                  <span>{errors?.aiDescription}</span>
                </div>
              )}
            </div>

            {/* Description Textarea */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-2">
                Product Description *
              </label>
              <textarea
                className={`w-full min-h-[120px] px-3 py-2 border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical ${
                  errors?.description ? 'border-error' : 'border-border'
                }`}
                placeholder="Describe your product's features, materials, and cultural significance..."
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                disabled={isSubmitting}
                rows={6}
              />
              {errors?.description && (
                <div className="flex items-center space-x-2 text-sm text-error mt-1">
                  <Icon name="AlertCircle" size={16} />
                  <span>{errors?.description}</span>
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                You can edit the AI-generated description or write your own
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
              <Button
                type="submit"
                variant="default"
                size="lg"
                disabled={isSubmitting}
                loading={isSubmitting}
                iconName="Upload"
                iconPosition="left"
                className="flex-1"
              >
                {isSubmitting ? 'Listing Your Craft...' : 'List Your Craft'}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => navigate('/homepage-landing')}
                disabled={isSubmitting}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </form>

        {/* Cultural Footer Accent */}
        <div className="flex items-center justify-center space-x-2 mt-12 mb-8">
          <div className="w-2 h-2 bg-accent rounded-full opacity-60"></div>
          <div className="w-3 h-3 bg-primary rounded-full opacity-40"></div>
          <div className="w-2 h-2 bg-accent rounded-full opacity-60"></div>
          <span className="text-xs text-muted-foreground font-caption mx-4">
            Empowering Local Artisans with AI
          </span>
          <div className="w-2 h-2 bg-accent rounded-full opacity-60"></div>
          <div className="w-3 h-3 bg-primary rounded-full opacity-40"></div>
          <div className="w-2 h-2 bg-accent rounded-full opacity-60"></div>
        </div>
      </main>
      {/* Upload Progress Indicator */}
      <UploadProgressIndicator
        isVisible={uploadProgress?.isVisible}
        progress={uploadProgress?.progress}
        status={uploadProgress?.status}
        fileName={uploadProgress?.fileName}
        message={uploadProgress?.message}
        onCancel={() => {
          setUploadProgress(prev => ({ ...prev, isVisible: false }));
          setIsSubmitting(false);
        }}
        onRetry={() => handleSubmit({ preventDefault: () => {} })}
      />
      {/* Success Modal */}
      <FormSuccessModal
        isVisible={showSuccessModal}
        productData={submittedProduct}
        onClose={handleCloseModal}
        onViewCatalog={handleViewCatalog}
        onAddAnother={handleAddAnother}
      />
    </div>
  );
};

export default ArtisanUploadForm;