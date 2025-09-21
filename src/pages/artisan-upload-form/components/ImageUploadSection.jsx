import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ImageUploadSection = ({ 
  selectedImage, 
  onImageSelect, 
  error = null,
  disabled = false 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;
    
    const files = e?.dataTransfer?.files;
    if (files?.length > 0) {
      handleFileSelection(files?.[0]);
    }
  };

  const handleFileSelection = (file) => {
    if (!file) return;
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes?.includes(file?.type)) {
      onImageSelect(null, 'Please select a valid image file (JPEG, PNG, or WebP)');
      return;
    }
    
    // Validate file size (5MB max)
    if (file?.size > 5 * 1024 * 1024) {
      onImageSelect(null, 'Image size must be less than 5MB');
      return;
    }
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageSelect({
        file: file,
        preview: e?.target?.result,
        name: file?.name,
        size: file?.size
      }, null);
    };
    reader?.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const handleRemoveImage = () => {
    onImageSelect(null, null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-foreground">
          Product Image *
        </label>
        <span className="text-xs text-muted-foreground">
          Max 5MB • JPEG, PNG, WebP
        </span>
      </div>
      {!selectedImage ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
            isDragOver
              ? 'border-primary bg-primary/5 scale-[1.02]'
              : error
              ? 'border-error bg-error/5' :'border-border hover:border-primary/50 hover:bg-muted/30'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef?.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileInputChange}
            className="hidden"
            disabled={disabled}
          />

          <div className="flex flex-col items-center space-y-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isDragOver ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              <Icon name={isDragOver ? "Upload" : "ImagePlus"} size={24} />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-foreground">
                {isDragOver ? 'Drop your image here' : 'Upload product image'}
              </h3>
              <p className="text-sm text-muted-foreground">
                Drag and drop your image here, or click to browse
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              disabled={disabled}
              iconName="Upload"
              iconPosition="left"
              type="button"
            >
              Choose File
            </Button>
          </div>

          {/* Cultural accent */}
          <div className="absolute bottom-2 right-2 flex space-x-1">
            <div className="w-2 h-2 bg-accent rounded-full opacity-30"></div>
            <div className="w-1.5 h-1.5 bg-primary rounded-full opacity-40"></div>
            <div className="w-2 h-2 bg-accent rounded-full opacity-30"></div>
          </div>
        </div>
      ) : (
        <div className="relative bg-card border border-border rounded-lg p-4">
          <div className="flex items-start space-x-4">
            {/* Image Preview */}
            <div className="flex-shrink-0 w-24 h-24 bg-muted rounded-lg overflow-hidden">
              <Image
                src={selectedImage?.preview}
                alt="Product preview"
                className="w-full h-full object-cover"
              />
            </div>

            {/* File Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium text-foreground truncate">
                    {selectedImage?.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(selectedImage?.size)}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-success">
                    <Icon name="CheckCircle" size={14} />
                    <span>Image uploaded successfully</span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRemoveImage}
                  disabled={disabled}
                  className="text-muted-foreground hover:text-error"
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Replace Button */}
          <div className="mt-4 pt-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef?.current?.click()}
              disabled={disabled}
              iconName="RefreshCw"
              iconPosition="left"
              type="button"
            >
              Replace Image
            </Button>
          </div>
        </div>
      )}
      {error && (
        <div className="flex items-center space-x-2 text-sm text-error">
          <Icon name="AlertCircle" size={16} />
          <span>{error}</span>
        </div>
      )}
      <div className="text-xs text-muted-foreground space-y-1">
        <p>• High-quality images help buyers appreciate your craft better</p>
        <p>• Show your product from the best angle with good lighting</p>
        <p>• Avoid blurry or pixelated images for better visibility</p>
      </div>
    </div>
  );
};

export default ImageUploadSection;