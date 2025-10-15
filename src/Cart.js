import React from 'react';
import { useAppData } from './AppDataContext.js';

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useAppData();

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    if (cart.items.length === 0) {
      alert('Your cart is empty. Add products to get quotes.');
      return;
    }
    
    const productList = cart.items.map(item => 
      `• ${item.name} - ${item.quantity} units - ${item.price}`
    ).join('\n');
    
    alert(`Quote Request Submitted!\n\nProducts:\n${productList}\n\nTotal Items: ${cart.itemCount}\n\nOur suppliers will contact you within 24 hours with competitive quotes.`);
    clearCart();
  };

  const calculateTotal = () => {
    return cart.items.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', minHeight: '70vh' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '30px' }}>
        Your Quote Requests ({cart.itemCount} items)
      </h1>
      
      {cart.items.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🛒</div>
          <h3 style={{ color: '#666', marginBottom: '10px' }}>Your cart is empty</h3>
          <p style={{ color: '#888', marginBottom: '30px' }}>Add products to get quotes from suppliers</p>
          <button 
            onClick={() => window.location.href = '/products'}
            style={{
              padding: '12px 30px',
              background: '#2E8B57',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '30px'
        }}>
          {/* Cart Items */}
          <div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}>
              {cart.items.map((item, index) => (
                <div key={item.id} style={{
                  padding: '20px',
                  borderBottom: index < cart.items.length - 1 ? '1px solid #f0f0f0' : 'none',
                  display: 'flex',
                  gap: '15px',
                  alignItems: 'center'
                }}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                  
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>
                      {item.name}
                    </h4>
                    <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '0.9rem' }}>
                      {item.supplier}
                    </p>
                    <p style={{ margin: 0, color: '#2E8B57', fontWeight: 'bold' }}>
                      {item.price}
                    </p>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      style={{
                        background: '#ff4444',
                        color: 'white',
                        border: 'none',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        fontSize: '1rem'
                      }}
                    >
                      -
                    </button>
                    
                    <span style={{ 
                      minWidth: '30px', 
                      textAlign: 'center',
                      fontWeight: 'bold'
                    }}>
                      {item.quantity}
                    </span>
                    
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      style={{
                        background: '#2E8B57',
                        color: 'white',
                        border: 'none',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        fontSize: '1rem'
                      }}
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    style={{
                      background: '#ff4444',
                      color: 'white',
                      border: 'none',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            
            <button 
              onClick={handleClearCart}
              style={{
                marginTop: '15px',
                background: 'transparent',
                color: '#ff4444',
                border: '1px solid #ff4444',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Clear All Items
            </button>
          </div>
          
          {/* Cart Summary */}
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            height: 'fit-content'
          }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>
              Quote Summary
            </h3>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#666' }}>Items:</span>
                <span style={{ color: '#333' }}>{cart.itemCount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#666' }}>Products:</span>
                <span style={{ color: '#333' }}>{cart.items.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#666' }}>Estimated Total:</span>
                <span style={{ color: '#2E8B57', fontWeight: 'bold' }}>
                  ${calculateTotal().toLocaleString()}
                </span>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout}
              style={{
                width: '100%',
                padding: '15px',
                background: '#2E8B57',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1.1rem',
                transition: 'background 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#228B22';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#2E8B57';
              }}
            >
              Request Quotes
            </button>
            
            <p style={{ 
              fontSize: '0.8rem', 
              color: '#666', 
              textAlign: 'center',
              marginTop: '15px'
            }}>
              Suppliers will contact you with competitive quotes within 24 hours
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
