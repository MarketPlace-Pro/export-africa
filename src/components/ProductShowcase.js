import React from 'react';

const ProductShowcase = () => {
  const products = [
    {
      id: 1,
      name: 'Premium Maize Grains',
      category: 'Staple Cereal',
      price: '$280-320/ton',
      demand: 'Very High',
      market: 'SADC Region',
      trend: 'Stable',
      description: 'Non-GMO yellow maize for human consumption and animal feed',
      premium: 'Food Grade',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop',
      profit: '25-35% margin',
      specs: 'Protein: 8-10%, Moisture: 12.5% max'
    },
    {
      id: 2,
      name: 'Table Grapes',
      category: 'Premium Fruits',
      price: '$18-25/kg',
      demand: 'High',
      market: 'EU Supermarkets',
      trend: 'Growing',
      description: 'Seedless Crimson & Thompson varieties for European markets',
      premium: 'Export Grade',
      image: 'https://images.unsplash.com/photo-1590912480412-8aa5d0c63ae3?w=400&h=300&fit=crop',
      profit: '45-60% margin',
      specs: 'Brix: 16-18°, Size: 18-22mm'
    },
    {
      id: 3,
      name: 'Fresh Lemons',
      category: 'Citrus Fruits',
      price: '$12-18/box',
      demand: 'High',
      market: 'Middle East',
      trend: 'Rising',
      description: 'Eureka lemons with high juice content and vibrant color',
      premium: 'Grade AA',
      image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=300&fit=crop',
      profit: '35-50% margin',
      specs: 'Diameter: 55-65mm, Juice: 30-35%'
    },
    {
      id: 4,
      name: 'Soybeans',
      category: 'Oil Seeds',
      price: '$450-550/ton',
      demand: 'Growing',
      market: 'China',
      trend: 'Soaring',
      description: 'Non-GMO soybeans for oil extraction and animal feed',
      premium: 'Food Grade',
      image: 'https://images.unsplash.com/photo-1594135716567-1a2dc3dd5f40?w=400&h=300&fit=crop',
      profit: '30-40% margin',
      specs: 'Protein: 35-38%, Oil: 18-20%'
    },
    {
      id: 5,
      name: 'Sunflower Seeds',
      category: 'Oil Seeds',
      price: '$380-450/ton',
      demand: 'High',
      market: 'Europe',
      trend: 'Stable',
      description: 'High-oil content seeds for premium cooking oil production',
      premium: 'Crushing Grade',
      image: 'https://images.unsplash.com/photo-1615485500705-97db6ddf1b7e?w=400&h=300&fit=crop',
      profit: '28-38% margin',
      specs: 'Oil: 42-45%, Moisture: 9% max'
    },
    {
      id: 6,
      name: 'Saffron',
      category: 'Premium Spice',
      price: '$3,000-5,000/kg',
      demand: 'Luxury',
      market: 'Gourmet EU',
      trend: 'Premium',
      description: 'Worlds most expensive spice - hand-picked crimson threads',
      premium: 'Grade 1',
      image: 'https://images.unsplash.com/photo-1602774539332-80d0dc29f113?w=400&h=300&fit=crop',
      profit: '200-300% margin',
      specs: 'Crocin: 250+, Safranal: 40-50'
    },
    {
      id: 7,
      name: 'Avocados',
      category: 'Fresh Fruits',
      price: '$45-65/box',
      demand: 'Very High',
      market: 'UK & EU',
      trend: 'Booming',
      description: 'Hass avocados with perfect butter texture and flavor',
      premium: 'Organic',
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop',
      profit: '50-70% margin',
      specs: 'Dry Matter: 23-25%, Size: 12-14'
    },
    {
      id: 8,
      name: 'Macadamia Nuts',
      category: 'Premium Nuts',
      price: '$8-12/kg',
      demand: 'High',
      market: 'China',
      trend: 'Growing',
      description: 'Crunchy, buttery nuts for premium snack markets',
      premium: 'Grade A',
      image: 'https://images.unsplash.com/photo-1626628153908-3c26e09afa7e?w=400&h=300&fit=crop',
      profit: '60-80% margin',
      specs: 'First Grade: 98%, Moisture: 3.5%'
    },
    {
      id: 9,
      name: 'Citrus Oranges',
      category: 'Fresh Fruits',
      price: '$15-22/box',
      demand: 'Stable',
      market: 'Middle East',
      trend: 'Consistent',
      description: 'Navel oranges with perfect sugar-acid balance',
      premium: 'Export Quality',
      image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=300&fit=crop',
      profit: '30-45% margin',
      specs: 'Brix: 12-14°, Size: 72-88'
    },
    {
      id: 10,
      name: 'Deciduous Fruits',
      category: 'Stone Fruits',
      price: '$20-30/box',
      demand: 'High',
      market: 'Europe',
      trend: 'Seasonal',
      description: 'Peaches, plums, and nectarines for summer markets',
      premium: 'Premium Grade',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop',
      profit: '40-55% margin',
      specs: 'Firmness: 6-8lb, Sugar: 14-16°'
    },
    {
      id: 11,
      name: 'Coffee Beans',
      category: 'Premium Beverage',
      price: '$6-10/kg',
      demand: 'Very High',
      market: 'Global',
      trend: 'Growing',
      description: 'Arabica coffee beans from high-altitude farms',
      premium: 'Specialty Grade',
      image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=400&h=300&fit=crop',
      profit: '60-90% margin',
      specs: 'Grade: AA, Altitude: 1500-2000m'
    },
    {
      id: 12,
      name: 'Cocoa Beans',
      category: 'Premium Commodity',
      price: '$3-5/kg',
      demand: 'High',
      market: 'Europe & US',
      trend: 'Stable',
      description: 'Fermented cocoa beans for premium chocolate production',
      premium: 'Fine Flavor',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop',
      profit: '50-70% margin',
      specs: 'Fermentation: 85%, Moisture: 7.5%'
    }
  ];

  return (
    <section style={showcaseStyle}>
      <div style={backgroundStyle}></div>
      
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>Premium African Exports</h2>
          <p style={subtitleStyle}>Farm-fresh agricultural products with verified market demand</p>
        </div>
        
        {/* GRID VIEW - Responsive */}
        <div style={productsGridStyle}>
          {products.map((product) => (
            <div key={product.id} style={productCardStyle}>
              {/* Product Image */}
              <div style={imageContainerStyle}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  style={imageStyle}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop';
                  }}
                />
                <div style={marketTagStyle}>{product.market}</div>
                <div style={demandTagStyle}>{product.demand}</div>
              </div>
              
              {/* Product Info */}
              <div style={productContentStyle}>
                <h3 style={productNameStyle}>{product.name}</h3>
                <p style={categoryStyle}>{product.category}</p>
                <p style={descriptionStyle}>{product.description}</p>
                
                <div style={specsStyle}>
                  <strong>Specs:</strong> {product.specs}
                </div>
                
                <div style={priceTrendStyle}>
                  <div style={priceStyle}>{product.price}</div>
                  <div style={trendStyle}>{product.trend}</div>
                </div>
                
                <div style={badgesStyle}>
                  <span style={premiumBadgeStyle}>{product.premium}</span>
                  <span style={profitBadgeStyle}>{product.profit}</span>
                </div>
                
                <button style={ctaButtonStyle}>
                  Request Samples & Pricing
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Load More Button */}
        <div style={loadMoreContainer}>
          <button style={loadMoreButton}>
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

// ========================
// MODERN GRID STYLES
// ========================

const showcaseStyle = {
  padding: '80px 0',
  background: 'linear-gradient(135deg, #f8fff8 0%, #f0fff0 50%, #e6f7e6 100%)',
  position: 'relative',
  overflow: 'hidden'
};

const backgroundStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `
    radial-gradient(circle at 10% 20%, rgba(46, 139, 87, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 90% 80%, rgba(34, 139, 34, 0.05) 0%, transparent 50%)
  `,
  zIndex: 0
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px',
  position: 'relative',
  zIndex: 1
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '60px'
};

const titleStyle = {
  fontSize: '2.5rem',
  fontWeight: '700',
  marginBottom: '15px',
  background: 'linear-gradient(135deg, #2E8B57, #228B22)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
};

const subtitleStyle = {
  fontSize: '1.2rem',
  color: '#556B2F',
  fontWeight: '400',
  maxWidth: '600px',
  margin: '0 auto',
  lineHeight: '1.6'
};

// GRID LAYOUT
const productsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
  gap: '30px',
  marginBottom: '50px'
};

// PRODUCT CARD
const productCardStyle = {
  background: 'white',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(46, 139, 87, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
};

// IMAGE SECTION
const imageContainerStyle = {
  position: 'relative',
  height: '200px',
  overflow: 'hidden'
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block'
};

const marketTagStyle = {
  position: 'absolute',
  top: '12px',
  left: '12px',
  background: 'rgba(255, 255, 255, 0.95)',
  padding: '6px 12px',
  borderRadius: '20px',
  fontSize: '0.8rem',
  fontWeight: '600',
  color: '#2d5016',
  backdropFilter: 'blur(10px)'
};

const demandTagStyle = {
  position: 'absolute',
  top: '12px',
  right: '12px',
  background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
  color: 'white',
  padding: '6px 12px',
  borderRadius: '20px',
  fontSize: '0.8rem',
  fontWeight: '700'
};

// CONTENT SECTION
const productContentStyle = {
  padding: '24px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column'
};

const productNameStyle = {
  fontSize: '1.3rem',
  fontWeight: '700',
  marginBottom: '8px',
  color: '#2d5016',
  lineHeight: '1.3'
};

const categoryStyle = {
  fontSize: '0.9rem',
  color: '#7c8a6d',
  marginBottom: '12px',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

const descriptionStyle = {
  fontSize: '0.95rem',
  color: '#666',
  marginBottom: '15px',
  lineHeight: '1.5',
  flex: 1
};

const specsStyle = {
  fontSize: '0.85rem',
  color: '#666',
  marginBottom: '20px',
  lineHeight: '1.4',
  background: 'rgba(46, 139, 87, 0.05)',
  padding: '12px',
  borderRadius: '8px',
  borderLeft: '3px solid #2E8B57'
};

const priceTrendStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '15px'
};

const priceStyle = {
  fontSize: '1.3rem',
  fontWeight: '800',
  color: '#2E8B57'
};

const trendStyle = {
  fontSize: '0.9rem',
  fontWeight: '600',
  color: '#228B22'
};

const badgesStyle = {
  display: 'flex',
  gap: '8px',
  marginBottom: '20px',
  flexWrap: 'wrap'
};

const premiumBadgeStyle = {
  background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
  color: '#8b6914',
  padding: '6px 12px',
  borderRadius: '12px',
  fontSize: '0.8rem',
  fontWeight: '700'
};

const profitBadgeStyle = {
  background: 'linear-gradient(135deg, #20bf6b, #26de81)',
  color: 'white',
  padding: '6px 12px',
  borderRadius: '12px',
  fontSize: '0.8rem',
  fontWeight: '700'
};

const ctaButtonStyle = {
  background: 'linear-gradient(135deg, #2E8B57, #228B22)',
  color: 'white',
  border: 'none',
  padding: '12px 20px',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '0.9rem',
  transition: 'all 0.3s ease',
  marginTop: 'auto'
};

const loadMoreContainer = {
  textAlign: 'center',
  marginTop: '40px'
};

const loadMoreButton = {
  background: 'transparent',
  color: '#2E8B57',
  border: '2px solid #2E8B57',
  padding: '12px 30px',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '1rem',
  transition: 'all 0.3s ease'
};

// Hover effects
const style = document.createElement('style');
style.textContent = `
  @media (min-width: 768px) {
    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    }
    
    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(46, 139, 87, 0.4);
    }
    
    .load-more-btn:hover {
      background: #2E8B57;
      color: white;
      transform: translateY(-2px);
    }
  }
`;
document.head.appendChild(style);

// Add hover classes
setTimeout(() => {
  const cards = document.querySelectorAll('[style*="productCardStyle"]');
  const buttons = document.querySelectorAll('[style*="ctaButtonStyle"]');
  const loadMore = document.querySelector('[style*="loadMoreButton"]');
  
  cards.forEach(card => card.classList.add('product-card'));
  buttons.forEach(button => button.classList.add('cta-button'));
  if (loadMore) loadMore.classList.add('load-more-btn');
}, 100);

export default ProductShowcase;
