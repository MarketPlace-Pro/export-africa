import React from 'react';
import './HeroSection.css';

const HeroSection = ({ user, stats }) => {
  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Premium <span className="highlight">African</span> Exports
            </h1>
            <p className="hero-subtitle">
              Connecting global buyers with authentic African suppliers. 
              Source directly from farms and producers across the continent.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">{stats.totalExports}+</span>
                <span className="stat-label">Successful Exports</span>
              </div>
              <div className="stat">
                <span className="stat-number">{stats.countriesServed}+</span>
                <span className="stat-label">Countries Served</span>
              </div>
              <div className="stat">
                <span className="stat-number">{stats.happyClients}%</span>
                <span className="stat-label">Happy Clients</span>
              </div>
            </div>
            <div className="hero-actions">
              <button className="btn-hero-primary">
                🌍 Browse Products
              </button>
              <button className="btn-hero-secondary">
                📦 Become Supplier
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-products">
              <div className="product-item avocados">🥑</div>
              <div className="product-item coffee">☕</div>
              <div className="product-item citrus">🍊</div>
              <div className="product-item nuts">🌰</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
