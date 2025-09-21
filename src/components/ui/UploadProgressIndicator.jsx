import React from 'react';
import Icon from '../AppIcon';

const UploadProgressIndicator = ({ 
  isVisible = false, 
  progress = 0, 
  status = 'uploading', // 'uploading', 'processing', 'success', 'error'
  fileName = '',
  message = '',
  onCancel = null,
  onRetry = null 
}) => {
  if (!isVisible) return null;

  const getStatusConfig = () => {
    switch (status) {
      case 'uploading':
        return {
          icon: 'Upload',
          iconColor: 'text-primary',
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary/20',
          title: 'Uploading your craft...',
          showProgress: true
        };
      case 'processing':
        return {
          icon: 'Sparkles',
          iconColor: 'text-accent',
          bgColor: 'bg-accent/10',
          borderColor: 'border-accent/20',
          title: 'AI is analyzing your craft...',
          showProgress: false
        };
      case 'success':
        return {
          icon: 'CheckCircle',
          iconColor: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          title: 'Upload successful!',
          showProgress: false
        };
      case 'error':
        return {
          icon: 'AlertCircle',
          iconColor: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20',
          title: 'Upload failed',
          showProgress: false
        };
      default:
        return {
          icon: 'Upload',
          iconColor: 'text-muted-foreground',
          bgColor: 'bg-muted',
          borderColor: 'border-border',
          title: 'Processing...',
          showProgress: false
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-fade-in">
      <div className={`${config?.bgColor} ${config?.borderColor} border rounded-lg shadow-warm-lg p-4 backdrop-blur-sm`}>
        <div className="flex items-start space-x-3">
          {/* Status Icon */}
          <div className={`flex-shrink-0 ${status === 'processing' ? 'animate-spin' : ''}`}>
            <Icon 
              name={config?.icon} 
              size={20} 
              className={config?.iconColor}
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground text-sm mb-1">
              {config?.title}
            </h4>
            
            {fileName && (
              <p className="text-xs text-muted-foreground mb-2 truncate font-data">
                {fileName}
              </p>
            )}

            {/* Progress Bar */}
            {config?.showProgress && (
              <div className="mb-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Progress</span>
                  <span className="font-data">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300 ease-cultural"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Message */}
            {message && (
              <p className="text-xs text-muted-foreground mb-2">
                {message}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 mt-3">
              {status === 'error' && onRetry && (
                <button
                  onClick={onRetry}
                  className="flex items-center space-x-1 px-2 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                >
                  <Icon name="RotateCcw" size={12} />
                  <span>Retry</span>
                </button>
              )}
              
              {(status === 'uploading' || status === 'processing') && onCancel && (
                <button
                  onClick={onCancel}
                  className="flex items-center space-x-1 px-2 py-1 text-xs bg-muted text-muted-foreground rounded hover:bg-muted/80 transition-colors"
                >
                  <Icon name="X" size={12} />
                  <span>Cancel</span>
                </button>
              )}

              {status === 'success' && (
                <button
                  onClick={() => {}}
                  className="flex items-center space-x-1 px-2 py-1 text-xs bg-success text-success-foreground rounded hover:bg-success/90 transition-colors"
                >
                  <Icon name="Eye" size={12} />
                  <span>View</span>
                </button>
              )}
            </div>
          </div>

          {/* Close Button */}
          {(status === 'success' || status === 'error') && (
            <button
              onClick={() => {}}
              className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>

        {/* Cultural accent border */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-primary to-accent opacity-30 rounded-b-lg" />
      </div>
    </div>
  );
};

export default UploadProgressIndicator;