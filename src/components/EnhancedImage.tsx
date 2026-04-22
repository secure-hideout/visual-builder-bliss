import React, { useState, useRef, useEffect, useMemo } from 'react';
import { normalizeImageUrl } from '@/utils/imageDebugger';

interface EnhancedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  onClick?: () => void;
  loading?: 'lazy' | 'eager';
  showLoadingSpinner?: boolean;
  aspectRatio?: 'square' | 'video' | 'auto';
}

const EnhancedImage: React.FC<EnhancedImageProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc = "https://placehold.co/800x400/e2e8f0/64748b?text=Recipe+Image",
  onClick,
  loading = 'lazy',
  showLoadingSpinner = true,
  aspectRatio = 'auto'
}) => {
  // Normalize the image URL synchronously
  const normalizedSrc = useMemo(() => {
    return normalizeImageUrl(src, fallbackSrc) || fallbackSrc;
  }, [src, fallbackSrc]);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(normalizedSrc);
  const imgRef = useRef<HTMLImageElement>(null);

  // Update currentSrc when normalizedSrc changes
  useEffect(() => {
    setCurrentSrc(normalizedSrc);
    setIsLoading(true);
    setHasError(false);
  }, [normalizedSrc]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    if (!hasError && !currentSrc.includes('placehold.co')) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    }
  };

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square': return 'aspect-square';
      case 'video': return 'aspect-video';
      default: return '';
    }
  };

  return (
    <div 
      className={`relative overflow-hidden bg-white/5 ${getAspectRatioClass()} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {/* Skeleton Placeholder / Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-white/10 animate-pulse overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_70%)] opacity-[0.03]" />
        </div>
      )}

      {/* Main Image with Premium Transition */}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-1000 ease-out-expo ${
          isLoading ? 'opacity-0 scale-110 blur-xl' : 'opacity-100 scale-100 blur-0'
        } ${className}`}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        draggable={false}
      />

      {/* Error State */}
      {hasError && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md text-white/30 text-[10px] font-black uppercase tracking-widest">
          <div className="text-center">
            <div className="mb-2 text-xl">EMPTY</div>
            <div>Image Missing</div>
          </div>
        </div>
      )}

      {/* Click Overlay for Interactive Images */}
      {onClick && (
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
          <div className="bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
            Click to view
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedImage;