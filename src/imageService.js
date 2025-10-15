// Image optimization and CDN service
export const optimizeImage = (imageUrl, options = {}) => {
  if (!imageUrl) return '/placeholder-image.jpg';
  
  const width = options.width || 800;
  const height = options.height || 600;
  const quality = options.quality || 80;
  
  // For Unsplash images - use their built-in optimization
  if (imageUrl.includes('unsplash.com')) {
    return `${imageUrl}?w=${width}&h=${height}&q=${quality}&fit=crop`;
  }
  
  // For other images - return as is (in production, use Cloudflare)
  return imageUrl;
};

export const preloadCriticalImages = (imageUrls) => {
  if (typeof window !== 'undefined') {
    imageUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = optimizeImage(url, { quality: 30 });
      document.head.appendChild(link);
    });
  }
};

export const getImagePlaceholder = (category) => {
  const placeholders = {
    wine: '🍷',
    fruits: '🍓', 
    crafts: '🎨',
    textiles: '👕',
    spices: '🌶️'
  };
  return placeholders[category] || '📦';
};
