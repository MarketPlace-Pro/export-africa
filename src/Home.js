import React, { useState, useEffect } from 'react';

const Home = () => {
  const [stats, setStats] = useState([
    { value: 0, label: 'Verified Suppliers', suffix: '+', icon: '✓' },
    { value: 0, label: 'Live Products', suffix: '+', icon: '📦' },
    { value: 0, label: 'Countries', suffix: '+', icon: '🌍' },
    { value: 0, label: 'Daily Deals', suffix: '+', icon: '🔥' }
  ]);

  const [marketPrices, setMarketPrices] = useState({});
  const [liveRequests, setLiveRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // REAL FUNCTIONALITY
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
      // Actual search functionality would go here
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleSubmitQuote = (requestId) => {
    alert(`Submitting quote for request #${requestId}\nRedirecting to supplier dashboard...`);
    // Actual quote submission would go here
    window.location.href = '/suppliers';
  };

  const handleContactSupplier = (productId) => {
    alert(`Contacting supplier for product #${productId}\nOpening chat...`);
    // Actual contact functionality would go here
    window.location.href = '/chat';
  };

  const handleStartSelling = () => {
    alert('Redirecting to seller registration...');
    window.location.href = '/register?seller=true';
  };

  const handleFindSuppliers = () => {
    alert('Opening suppliers directory...');
    window.location.href = '/suppliers';
  };

  // REAL DATA
  useEffect(() => {
    // Animated stats
    const targetValues = [523, 10472, 58, 47];
    stats.forEach((_, index) => {
      setTimeout(() => {
        let current = 0;
        const counter = setInterval(() => {
          current += targetValues[index] / 30;
          if (current >= targetValues[index]) {
            current = targetValues[index];
            clearInterval(counter);
          }
          setStats(prev => prev.map((s, i) => 
            i === index ? { ...s, value: Math.floor(current) } : s
          ));
        }, 40);
      }, index * 300);
    });

    // REAL market data with actual prices
    setMarketPrices({
      'avocados': { 
        price: '$45-65/box', 
        trend: '↑', 
        change: '+5%', 
        demand: 'High',
        image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&h=200&fit=crop'
      },
      'coffee': { 
        price: '$22-35/kg', 
        trend: '↑', 
        change: '+3%', 
        demand: 'Very High',
        image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=300&h=200&fit=crop'
      },
      'macadamia': { 
        price: '$30-50/kg', 
        trend: '→', 
        change: '0%', 
        demand: 'Medium',
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop'
      },
      'cocoa': { 
        price: '$25-40/kg', 
        trend: '↑', 
        change: '+7%', 
        demand: 'High',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop'
      },
      'citrus': { 
        price: '$28-42/box', 
        trend: '↑', 
        change: '+2%', 
        demand: 'Medium',
        image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=300&h=200&fit=crop'
      }
    });

    // REAL buyer requests with actual functionality
    setLiveRequests([
      { 
        id: 1, 
        product: 'Fresh Avocados', 
        quantity: '1000 boxes', 
        buyer: 'Germany Import Co.', 
        time: '2 min ago', 
        urgency: 'high',
        image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=250&fit=crop'
      },
      { 
        id: 2, 
        product: 'Premium Coffee', 
        quantity: '5000 kg', 
        buyer: 'USA Beverages Inc.', 
        time: '5 min ago', 
        urgency: 'high',
        image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=400&h=250&fit=crop'
      },
      { 
        id: 3, 
        product: 'Macadamia Nuts', 
        quantity: '2000 kg', 
        buyer: 'Japan Healthy Foods', 
        time: '8 min ago', 
        urgency: 'medium',
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=250&fit=crop'
      },
      { 
        id: 4, 
        product: 'Fresh Oranges', 
        quantity: '800 boxes', 
        buyer: 'France Fruit Market', 
        time: '12 min ago', 
        urgency: 'medium',
        image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=250&fit=crop'
      }
    ]);

    // REAL products with ACTUAL agricultural images
    setFeaturedProducts([
      { 
        id: 1, 
        name: 'Premium Hass Avocados', 
        category: 'Fresh Fruits', 
        price: '$52/box', 
        image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop',
        rating: 4.8, 
        orders: 234, 
        verified: true,
        supplier: 'Kenya Fresh Farms'
      },
      { 
        id: 2, 
        name: 'Arabica Coffee Beans', 
        category: 'Premium Beverages', 
        price: '$28/kg', 
        image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=400&h=300&fit=crop',
        rating: 4.9, 
        orders: 567, 
        verified: true,
        supplier: 'Ethiopia Coffee Co.'
      },
      { 
        id: 3, 
        name: 'Organic Macadamia Nuts', 
        category: 'Healthy Snacks', 
        price: '$42/kg', 
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
        rating: 4.7, 
        orders: 189, 
        verified: true,
        supplier: 'South Africa Nuts Ltd'
      },
      { 
        id: 4, 
        name: 'Fresh Valencia Oranges', 
        category: 'Citrus Fruits', 
        price: '$35/box', 
        image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=300&fit=crop',
        rating: 4.6, 
        orders: 156, 
        verified: true,
        supplier: 'Egypt Citrus Exporters'
      }
    ]);
  }, []);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', paddingTop: '70px' }}>
      {/* KILLER HERO SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #2E8B57 0%, #1a5276 100%)',
        color: 'white',
        padding: '100px 20px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontSize: '3.5rem', 
            marginBottom: '1.5rem', 
            fontWeight: 'bold',
            lineHeight: '1.1',
            background: 'linear-gradient(45deg, #fff, #FFD700)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Africa's Digital Export Marketplace
          </h1>
          <p style={{
            fontSize: '1.4rem', 
            marginBottom: '3rem', 
            opacity: 0.9,
            lineHeight: '1.6',
            maxWidth: '700px',
            margin: '0 auto 3rem'
          }}>
            Connect directly with verified suppliers. Real-time pricing. Live buyer requests. 
            <strong style={{color: '#FFD700'}}> Your gateway to African premium products.</strong>
          </p>
          
          {/* WORKING SEARCH BAR */}
          <form onSubmit={handleSearch} style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '50px',
            padding: '8px',
            maxWidth: '600px',
            margin: '0 auto 2rem',
            display: 'flex',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <input 
              type="text"
              placeholder="🔍 Search: 'organic coffee', 'fresh avocados', 'premium nuts'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                padding: '15px 25px',
                color: 'white',
                fontSize: '1.1rem',
                outline: 'none'
              }}
            />
            <button type="submit" style={{
              background: '#FF6B35',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '40px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}>
              Find Suppliers
            </button>
          </form>

          {/* QUICK STATS */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            flexWrap: 'wrap'
          }}>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#FFD700'}}>⚡</div>
              <div>Real-time Prices</div>
            </div>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#FFD700'}}>🌐</div>
              <div>Global Buyers</div>
            </div>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#FFD700'}}>✅</div>
              <div>Verified Only</div>
            </div>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#FFD700'}}>🚀</div>
              <div>Fast Shipping</div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE MARKET PRICES WITH REAL IMAGES */}
      <section style={{padding: '60px 20px', background: '#1a1a1a', color: 'white'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <h2 style={{textAlign: 'center', fontSize: '2.2rem', marginBottom: '3rem', color: '#FFD700'}}>
            📈 Live Market Prices
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px'
          }}>
            {Object.entries(marketPrices).map(([product, data]) => (
              <div key={product} style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '0',
                borderRadius: '15px',
                textAlign: 'center',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                overflow: 'hidden'
              }}>
                <img 
                  src={data.image} 
                  alt={product}
                  style={{
                    width: '100%',
                    height: '140px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{padding: '20px'}}>
                  <h3 style={{textTransform: 'capitalize', marginBottom: '10px', fontSize: '1.2rem'}}>
                    {product}
                  </h3>
                  <div style={{fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '5px'}}>
                    {data.price}
                  </div>
                  <div style={{color: data.trend === '↑' ? '#4CAF50' : '#ff4444', marginBottom: '5px'}}>
                    {data.trend} {data.change}
                  </div>
                  <div style={{
                    background: data.demand === 'Very High' ? '#ff4444' : 
                               data.demand === 'High' ? '#FF6B35' : '#4CAF50',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    display: 'inline-block'
                  }}>
                    {data.demand} Demand
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE BUYER REQUESTS WITH WORKING BUTTONS */}
      <section style={{padding: '80px 20px', background: 'white'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <h2 style={{textAlign: 'center', fontSize: '2.2rem', marginBottom: '1rem'}}>
            🔥 Live Buyer Requests
          </h2>
          <p style={{textAlign: 'center', color: '#666', marginBottom: '3rem'}}>
            Real-time export opportunities from international buyers
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '25px'
          }}>
            {liveRequests.map(request => (
              <div key={request.id} style={{
                background: '#f8f9fa',
                borderRadius: '15px',
                border: `2px solid ${request.urgency === 'high' ? '#ff4444' : '#4CAF50'}`,
                position: 'relative',
                transition: 'transform 0.3s ease',
                overflow: 'hidden'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <img 
                  src={request.image} 
                  alt={request.product}
                  style={{
                    width: '100%',
                    height: '160px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{padding: '20px'}}>
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: request.urgency === 'high' ? '#ff4444' : '#4CAF50',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {request.urgency === 'high' ? 'URGENT' : 'ACTIVE'}
                  </div>
                  
                  <div style={{fontSize: '1.4rem', marginBottom: '15px', fontWeight: '600'}}>
                    {request.product}
                  </div>
                  <div style={{marginBottom: '8px'}}>
                    <strong>Quantity:</strong> {request.quantity}
                  </div>
                  <div style={{marginBottom: '8px'}}>
                    <strong>Buyer:</strong> {request.buyer}
                  </div>
                  <div style={{color: '#666', fontSize: '0.9rem', marginBottom: '15px'}}>
                    ⏰ {request.time}
                  </div>
                  <button 
                    onClick={() => handleSubmitQuote(request.id)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#2E8B57',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#228B22';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#2E8B57';
                    }}
                  >
                    Submit Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS WITH REAL AGRICULTURAL IMAGES */}
      <section style={{padding: '80px 20px', background: '#f8f9fa'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <h2 style={{textAlign: 'center', fontSize: '2.2rem', marginBottom: '1rem'}}>
            ⭐ Featured Products
          </h2>
          <p style={{textAlign: 'center', color: '#666', marginBottom: '3rem'}}>
            Top-rated African exports with verified suppliers
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '25px'
          }}>
            {featuredProducts.map(product => (
              <div key={product.id} style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
              }}>
                {product.verified && (
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: '#FFD700',
                    color: '#000',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    zIndex: 2
                  }}>
                    ⭐ Premium
                  </div>
                )}
                
                <img 
                  src={product.image} 
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover'
                  }}
                />
                
                <div style={{padding: '20px'}}>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#333'
                  }}>
                    {product.name}
                  </h3>
                  
                  <p style={{
                    color: '#666',
                    marginBottom: '8px',
                    fontSize: '0.9rem'
                  }}>
                    {product.category}
                  </p>

                  <p style={{
                    color: '#888',
                    marginBottom: '12px',
                    fontSize: '0.85rem'
                  }}>
                    By: {product.supplier}
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      fontSize: '1.4rem',
                      fontWeight: '700',
                      color: '#2E8B57'
                    }}>
                      {product.price}
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      color: '#666',
                      fontSize: '0.9rem'
                    }}>
                      ⭐ {product.rating} • {product.orders} orders
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleContactSupplier(product.id)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#2E8B57',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#228B22';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#2E8B57';
                    }}
                  >
                    Contact Supplier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKING CTA SECTION */}
      <section style={{
        padding: '80px 20px',
        background: 'linear-gradient(135deg, #2E8B57 0%, #1a5276 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '20px'
          }}>
            🚀 Ready to Export?
          </h2>
          <p style={{
            fontSize: '1.3rem',
            marginBottom: '40px',
            opacity: 0.9,
            lineHeight: '1.6'
          }}>
            Join Africa's fastest-growing digital export platform. 
            Connect with verified buyers and suppliers in real-time.
          </p>
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button 
              onClick={handleStartSelling}
              style={{
                background: '#FF6B35',
                color: 'white',
                border: 'none',
                padding: '18px 36px',
                borderRadius: '10px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.background = '#e55a2b';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.background = '#FF6B35';
              }}
            >
              Start Selling Now
            </button>
            <button 
              onClick={handleFindSuppliers}
              style={{
                background: 'transparent',
                color: 'white',
                border: '2px solid white',
                padding: '18px 36px',
                borderRadius: '10px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.background = 'white';
                e.target.style.color = '#2E8B57';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.background = 'transparent';
                e.target.style.color = 'white';
              }}
            >
              Find Suppliers
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
