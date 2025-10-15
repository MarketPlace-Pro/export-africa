import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { products } from '../data/appData';
import './ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart, getCartItemQuantity } = useCart();

  // Find the product by ID
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h1>Product Not Found</h1>
          <p>The product you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/products')} className="btn btn-primary">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const inCart = isInCart(product.id);
  const cartQuantity = getCartItemQuantity(product.id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleContactSupplier = () => {
    const subject = `Inquiry: ${product.name} - AfriTrade Global`;
    const body = `Dear ${product.supplier} Team,

I'm interested in your ${product.name} and would like to request:
- Current pricing and availability
- Sample availability
- Shipping details to our location

Product Details:
- Product: ${product.name}
- Quantity Required: [Please specify]
- Destination: [Our location]

Please contact me with more information.

Best regards,
[Your Name]
[Your Company]
[Your Contact Information]`;

    window.open(`mailto:${product.supplier_contact}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <div className="container">
      <div className="product-details-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <button onClick={() => navigate('/products')} className="breadcrumb-link">
            🛒 Products
          </button>
          <span> / </span>
          <span>{product.name}</span>
        </nav>

        <div className="product-details-layout">
          {/* Product Image */}
          <div className="product-image-section">
            <div className="product-image-container">
              <img 
                src={product.image_url} 
                alt={product.name}
                className="product-image"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop';
                }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info-section">
            <div className="product-header">
              <span className="product-category-badge">{product.category?.replace('-', ' ').toUpperCase()}</span>
              <h1 className="product-title">{product.name}</h1>
              <p className="product-description">{product.description}</p>
            </div>

            {/* Key Specifications */}
            <div className="specs-grid">
              <div className="spec-item">
                <strong>🏢 Supplier</strong>
                <span>{product.supplier}</span>
              </div>
              <div className="spec-item">
                <strong>📍 Origin</strong>
                <span>{product.origin}</span>
              </div>
              <div className="spec-item">
                <strong>📅 Season</strong>
                <span>{product.season}</span>
              </div>
              <div className="spec-item">
                <strong>📦 Min Order</strong>
                <span>{product.min_order}{product.unit}</span>
              </div>
            </div>

            {/* Certifications */}
            {product.certifications && (
              <div className="certifications">
                <strong>✅ Certifications:</strong>
                <div className="cert-badges">
                  {product.certifications.map(cert => (
                    <span key={cert} className="cert-badge">{cert}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Export Markets */}
            {product.export_markets && (
              <div className="export-markets">
                <strong>🌍 Export Markets:</strong>
                <div className="market-tags">
                  {product.export_markets.map(market => (
                    <span key={market} className="market-tag">{market}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing & Actions */}
            <div className="pricing-actions">
              <div className="price-section">
                <div className="price-amount">${product.price}/{product.unit}</div>
                <div className="min-order">Minimum: {product.min_order}{product.unit}</div>
              </div>

              <div className="action-buttons">
                <button 
                  onClick={handleAddToCart}
                  className={`btn btn-primary ${inCart ? 'in-cart' : ''}`}
                >
                  {inCart ? `✅ Added to Cart (${cartQuantity})` : '🛒 Add to Cart'}
                </button>
                
                <button 
                  onClick={handleContactSupplier}
                  className="btn btn-secondary"
                >
                  💬 Contact Supplier
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Specifications */}
        <div className="detailed-specs">
          <h3>📋 Product Specifications</h3>
          <div className="specs-detail-grid">
            {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="spec-detail-item">
                <strong>{key.replace('_', ' ').toUpperCase()}:</strong>
                <span>{value}</span>
              </div>
            ))}
            <div className="spec-detail-item">
              <strong>LEAD TIME:</strong>
              <span>{product.lead_time}</span>
            </div>
            <div className="spec-detail-item">
              <strong>SHIPPING:</strong>
              <span>{product.shipping_info}</span>
            </div>
            <div className="spec-detail-item">
              <strong>ANNUAL CAPACITY:</strong>
              <span>{product.annual_capacity}</span>
            </div>
          </div>
        </div>

        {/* Supplier Contact */}
        <div className="supplier-contact">
          <h3>🏢 Supplier Information</h3>
          <div className="supplier-details">
            <p><strong>Company:</strong> {product.supplier}</p>
            <p><strong>Contact:</strong> {product.supplier_contact}</p>
            <p><strong>Origin:</strong> {product.origin}</p>
            <button 
              onClick={handleContactSupplier}
              className="btn btn-primary"
            >
              📧 Email Supplier Directly
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
