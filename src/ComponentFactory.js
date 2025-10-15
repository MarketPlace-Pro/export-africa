import React from 'react';
import { useAppData } from './AppDataContext.js';

// Import the enhanced ProductCard
import ProductCard from './components/ProductCard.js';

// Enhanced Product Card Component (with cart functionality)
export const EnhancedProductCard = ({ product, onViewDetails }) => {
  return (
    <ProductCard product={product} onViewDetails={onViewDetails} />
  );
};

// Blog Post Card Component
export const BlogCard = ({ post, onReadMore }) => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
    }}>
      <img 
        src={post.image} 
        alt={post.title}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover'
        }}
      />
      
      <div style={{ padding: '20px' }}>
        <div style={{
          background: '#2E8B57',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '0.8rem',
          display: 'inline-block',
          marginBottom: '10px'
        }}>
          {post.category}
        </div>
        
        <h3 style={{ margin: '0 0 10px 0', fontSize: '1.3rem', lineHeight: '1.4' }}>
          {post.title}
        </h3>
        
        <p style={{ color: '#666', margin: '0 0 15px 0', lineHeight: '1.5' }}>
          {post.excerpt}
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#888', fontSize: '0.9rem' }}>
            {post.date} • {post.readTime}
          </span>
          <button 
            onClick={() => onReadMore(post)}
            style={{
              background: 'transparent',
              color: '#2E8B57',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Read More →
          </button>
        </div>
      </div>
    </div>
  );
};

// Trust Badge Component
export const TrustBadge = ({ badge }) => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
        {badge.icon}
      </div>
      <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>
        {badge.title}
      </h4>
      <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
        {badge.description}
      </p>
    </div>
  );
};

// Cart Summary Component
export const CartSummary = () => {
  const { cart } = useAppData();
  
  const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <div style={{
      position: 'fixed',
      top: '80px',
      right: '20px',
      background: '#2E8B57',
      color: 'white',
      padding: '10px 15px',
      borderRadius: '20px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }}
    onClick={() => window.location.href = '/cart'}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = '#228B22';
      e.currentTarget.style.transform = 'scale(1.05)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = '#2E8B57';
      e.currentTarget.style.transform = 'scale(1)';
    }}>
      <span style={{ fontSize: '1.1rem' }}>🛒</span>
      <span style={{ fontWeight: '600' }}>{itemCount}</span>
    </div>
  );
};

// Component factory
export const ComponentFactory = {
  ProductCard: EnhancedProductCard,
  BlogCard,
  TrustBadge,
  CartSummary
};

export default ComponentFactory;
