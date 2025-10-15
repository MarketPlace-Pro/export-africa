import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [stats, setStats] = useState([
    { value: 0, label: 'Verified Suppliers', suffix: '+' },
    { value: 0, label: 'Products Listed', suffix: '+' },
    { value: 0, label: 'Countries Served', suffix: '+' },
    { value: 0, label: 'Successful Exports', suffix: '+' }
  ]);

  const [products] = useState([
    { id: 1, name: 'Premium Avocados', category: 'Fresh Fruits', price: '$45/box', image: '/api/placeholder/300/200' },
    { id: 2, name: 'Arabica Coffee', category: 'Premium Beans', price: '$25/kg', image: '/api/placeholder/300/200' },
    { id: 3, name: 'Macadamia Nuts', category: 'Organic Nuts', price: '$35/kg', image: '/api/placeholder/300/200' },
    { id: 4, name: 'Fresh Citrus', category: 'Seasonal Fruits', price: '$30/box', image: '/api/placeholder/300/200' }
  ]);

  useEffect(() => {
    // Animate stats
    const intervals = stats.map((stat, index) => {
      return setTimeout(() => {
        const targetValues = [500, 10000, 50, 2500];
        let current = 0;
        const increment = targetValues[index] / 50;

        const counter = setInterval(() => {
          current += increment;
          if (current >= targetValues[index]) {
            current = targetValues[index];
            clearInterval(counter);
          }

          setStats(prev => prev.map((s, i) =>
            i === index ? { ...s, value: Math.floor(current) } : s
          ));
        }, 30);
      }, index * 200);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="home">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Connect Directly with <span className="highlight">African Exporters</span>
            </h1>
            <p className="hero-subtitle">
              Source premium African products directly from verified suppliers. 
              Fresh produce, authentic goods, competitive prices.
            </p>
            
            <div className="hero-search">
              <input 
                type="text" 
                placeholder="Search products, suppliers, categories..."
                className="search-input"
              />
              <button className="search-btn">Search</button>
            </div>

            <div className="hero-cta">
              <button className="cta-primary">Find Suppliers</button>
              <button className="cta-secondary">Become a Seller</button>
            </div>

            <div className="trust-badges">
              <div className="badge">✓ Verified Suppliers</div>
              <div className="badge">✓ Quality Certified</div>
              <div className="badge">✓ Secure Payments</div>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="floating-card card-1">
              <span>🥑 Fresh Avocados</span>
            </div>
            <div className="floating-card card-2">
              <span>☕ Premium Coffee</span>
            </div>
            <div className="floating-card card-3">
              <span>🌰 Macadamia Nuts</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats-section">
        <div className="container">
          <h2 className="section-title">Trusted by African Export Community</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-value">
                  {stat.value}{stat.suffix}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="products-section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">Premium African products ready for export</p>
          
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-price">{product.price}</p>
                  <button className="product-btn">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Trading?</h2>
          <p>Join thousands of buyers and sellers in Africa's fastest growing export platform</p>
          <div className="cta-buttons">
            <button className="btn-primary">Sign Up Free</button>
            <button className="btn-outline">Learn More</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
