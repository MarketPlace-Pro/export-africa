import './App.css';
import { useCart } from './CartContext';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from './appData';
import { useState } from 'react';

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === parseInt(productId));

  if (!product) {
    return (
      <div style={{padding: '4rem 0', textAlign: 'center'}}>
        <h2>Product Not Found</h2>
        <button onClick={() => navigate('/products')} className="btn-primary">
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    alert(`✅ ${quantity} ${product.name} added to cart!`);
  };

  const handleInquire = () => {
    const totalQuantity = quantity * product.min_order;
    alert(`📧 Export inquiry sent for ${product.name}!\n\nQuantity: ${totalQuantity} ${product.unit}s\nTotal Value: $${(product.price * totalQuantity).toFixed(2)}\n\nOur export team will contact you within 24 hours.`);
  };

  return (
    <div>
      {/* Product Header */}
      <section style={{padding: '2rem 0', background: '#f8fafc'}}>
        <div className="container">
          <button 
            onClick={() => navigate('/products')}
            style={{
              background: 'transparent',
              border: '1px solid #1e3c72',
              color: '#1e3c72',
              padding: '8px 16px',
              borderRadius: '5px',
              cursor: 'pointer',
              marginBottom: '1rem'
            }}
          >
            ← Back to Products
          </button>
        </div>
      </section>

      {/* Product Details */}
      <section style={{padding: '2rem 0'}}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'start'
          }}>
            {/* Product Image */}
            <div>
              <img 
                src={product.image_url} 
                alt={product.name}
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: '15px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}
              />
            </div>

            {/* Product Info */}
            <div>
              <div style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: '600',
                display: 'inline-block',
                marginBottom: '1rem'
              }}>
                {product.category.toUpperCase()}
              </div>

              <h1 style={{fontSize: '2.2rem', marginBottom: '1rem', color: '#1e3c72'}}>
                {product.name}
              </h1>
              
              <p style={{color: '#2d3748', fontWeight: '600', fontSize: '1.1rem', marginBottom: '1rem'}}>
                Supplier: {product.supplier}
              </p>
              
              <p style={{color: '#4a5568', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem'}}>
                {product.description}
              </p>

              {/* Pricing & Order Info */}
              <div style={{
                background: '#f7fafc',
                padding: '1.5rem',
                borderRadius: '10px',
                marginBottom: '2rem'
              }}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
                  <span style={{color: '#4a5568', fontWeight: '500'}}>Price:</span>
                  <span style={{color: '#1e3c72', fontWeight: '700', fontSize: '1.3rem'}}>
                    ${product.price}/{product.unit}
                  </span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
                  <span style={{color: '#4a5568', fontWeight: '500'}}>Minimum Order:</span>
                  <span style={{color: '#1e3c72', fontWeight: '600'}}>
                    {product.min_order} {product.unit}s
                  </span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
                  <span style={{color: '#4a5568', fontWeight: '500'}}>Origin:</span>
                  <span style={{color: '#1e3c72', fontWeight: '600'}}>{product.origin}</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <span style={{color: '#4a5568', fontWeight: '500'}}>Lead Time:</span>
                  <span style={{color: '#1e3c72', fontWeight: '600'}}>{product.lead_time}</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div style={{marginBottom: '2rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#2d3748'}}>
                  Quantity (Units):
                </label>
                <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="quantity-btn"
                    style={{width: '40px', height: '40px'}}
                  >-</button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="quantity-input"
                    style={{width: '80px'}}
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="quantity-btn"
                    style={{width: '40px', height: '40px'}}
                  >+</button>
                  <span style={{color: '#4a5568', fontSize: '0.9rem'}}>
                    Total: {quantity * product.min_order} {product.unit}s
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{display: 'flex', gap: '1rem'}}>
                <button 
                  className="btn-primary" 
                  style={{flex: 1, padding: '15px'}}
                  onClick={handleInquire}
                >
                  📧 Export Inquiry
                </button>
                <button 
                  className="btn-secondary" 
                  style={{flex: 1, background: '#48bb78', color: 'white', border: 'none', padding: '15px'}}
                  onClick={handleAddToCart}
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Specifications */}
      <section style={{padding: '3rem 0', background: '#f8fafc'}}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {/* Specifications */}
            <div>
              <h3 style={{marginBottom: '1.5rem', color: '#1e3c72'}}>Product Specifications</h3>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '10px'}}>
                {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.75rem 0',
                    borderBottom: '1px solid #e2e8f0'
                  }}>
                    <span style={{color: '#4a5568', fontWeight: '500', textTransform: 'capitalize'}}>
                      {key.replace('_', ' ')}:
                    </span>
                    <span style={{color: '#1e3c72', fontWeight: '600'}}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Information */}
            <div>
              <h3 style={{marginBottom: '1.5rem', color: '#1e3c72'}}>Export Details</h3>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '10px'}}>
                <div style={{marginBottom: '1rem'}}>
                  <strong style={{color: '#4a5568'}}>Target Markets:</strong>
                  <div style={{marginTop: '0.5rem'}}>
                    {product.export_markets.map(market => (
                      <span key={market} style={{
                        background: '#e2e8f0',
                        color: '#1e3c72',
                        padding: '4px 12px',
                        borderRadius: '15px',
                        fontSize: '0.8rem',
                        marginRight: '0.5rem',
                        display: 'inline-block',
                        marginBottom: '0.5rem'
                      }}>
                        {market}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{marginBottom: '1rem'}}>
                  <strong style={{color: '#4a5568'}}>Certifications:</strong>
                  <div style={{marginTop: '0.5rem'}}>
                    {product.certifications.map(cert => (
                      <span key={cert} style={{
                        background: '#c6f6d5',
                        color: '#22543d',
                        padding: '4px 12px',
                        borderRadius: '15px',
                        fontSize: '0.8rem',
                        marginRight: '0.5rem',
                        display: 'inline-block',
                        marginBottom: '0.5rem'
                      }}>
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <strong style={{color: '#4a5568'}}>Shipping:</strong>
                  <p style={{margin: '0.5rem 0 0 0', color: '#1e3c72'}}>{product.shipping_info}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;
