import React from 'react';
import { useAppData } from '../AppDataContext.js';

const ProductCard = ({ product, onViewDetails }) => {
  const { addToCart, cart } = useAppData();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent triggering view details
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      supplier: product.supplier,
      category: product.category,
      quantity: 1
    });
    
    // Show success feedback
    const button = e.target;
    const originalText = button.textContent;
    button.textContent = '✅ Added!';
    button.style.background = '#4CAF50';
    
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = '#2E8B57';
    }, 1500);
  };

  const isInCart = cart.items.some(item => item.id === product.id);

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative'
    }} 
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
    }} 
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    }}
    onClick={() => onViewDetails(product)}>
      
      {/* Product Image */}
      <img 
        src={product.image} 
        alt={product.name}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '8px',
          marginBottom: '15px'
        }}
      />
      
      {/* Product Info */}
      <h3 style={{ 
        margin: '0 0 8px 0', 
        fontSize: '1.2rem', 
        color: '#333',
        lineHeight: '1.3'
      }}>
        {product.name}
      </h3>
      
      <p style={{ 
        color: '#666', 
        margin: '0 0 8px 0', 
        fontSize: '0.9rem' 
      }}>
        {product.category}
      </p>

      <p style={{ 
        color: '#2E8B57', 
        fontSize: '1.3rem', 
        fontWeight: 'bold', 
        margin: '0 0 15px 0' 
      }}>
        {product.price}
      </p>

      {/* Supplier & Verification */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '15px'
      }}>
        <span style={{ 
          color: '#666', 
          fontSize: '0.8rem' 
        }}>
          {product.supplier}
        </span>
        
        {product.verified && (
          <div style={{
            background: '#FFD700',
            color: '#000',
            padding: '2px 8px',
            borderRadius: '10px',
            fontSize: '0.7rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            ⭐ Verified
          </div>
        )}
      </div>

      {/* Cart Indicator */}
      {isInCart && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: '#4CAF50',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '10px',
          fontSize: '0.7rem',
          fontWeight: 'bold'
        }}>
          In Cart
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ 
        display: 'flex', 
        gap: '10px' 
      }}>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(product);
          }}
          style={{
            flex: 1,
            background: 'transparent',
            color: '#2E8B57',
            border: '2px solid #2E8B57',
            padding: '10px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#2E8B57';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#2E8B57';
          }}
        >
          View Details
        </button>
        
        <button 
          onClick={handleAddToCart}
          style={{
            flex: 1,
            background: isInCart ? '#4CAF50' : '#2E8B57',
            color: 'white',
            border: 'none',
            padding: '10px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (!isInCart) {
              e.target.style.background = '#228B22';
            }
          }}
          onMouseLeave={(e) => {
            if (!isInCart) {
              e.target.style.background = '#2E8B57';
            }
          }}
        >
          {isInCart ? '✅ In Cart' : '🛒 Get Quote'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
