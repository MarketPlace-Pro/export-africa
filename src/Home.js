import React, { useState, useEffect } from 'react';
import ProductShowcase from './components/ProductShowcase';

const Home = () => {
  const [stats, setStats] = useState([
    { value: 0, label: 'Verified Suppliers', suffix: '+' },
    { value: 0, label: 'Products Listed', suffix: '+' },
    { value: 0, label: 'Countries Served', suffix: '+' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const intervals = stats.map((stat, index) => {
      return setTimeout(() => {
        const targetValues = [500, 10000, 50];
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

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div style={pageContainer}>
      {/* Hero Section */}
      <section style={heroSection}>
        <div style={heroContent}>
          <h1 style={heroTitle}>
            Connect Directly with African Exporters
          </h1>
          <p style={heroSubtitle}>
            Source premium African products directly from verified suppliers. 
            Fresh produce, authentic goods, competitive prices.
          </p>
          
          <form onSubmit={handleSearch} style={searchForm}>
            <input
              type="text"
              placeholder="Search products, suppliers, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={searchInput}
            />
            <button type="submit" style={searchButton}>
              Search
            </button>
          </form>
          
          <div style={ctaButtons}>
            <button style={primaryBtn}>Find Suppliers</button>
            <button style={secondaryBtn}>Become a Seller</button>
          </div>
          
          <div style={statsRow}>
            {stats.map((stat, index) => (
              <div key={index} style={statCard}>
                <strong style={statNumber}>{stat.value}{stat.suffix}</strong>
                <span style={statText}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase - WITH HORIZONTAL SCROLL FIX */}
      <div style={showcaseContainer}>
        <ProductShowcase />
      </div>

      {/* Trust Stats */}
      <section style={trustSection}>
        <div style={trustContent}>
          <h2 style={sectionTitle}>Trusted by African Export Community</h2>
          <div style={statsGrid}>
            <div style={trustStat}>
              <div style={bigNumber}>500+</div>
              <div style={statDesc}>Verified Suppliers</div>
            </div>
            <div style={trustStat}>
              <div style={bigNumber}>10K+</div>
              <div style={statDesc}>Products Listed</div>
            </div>
            <div style={trustStat}>
              <div style={bigNumber}>50+</div>
              <div style={statDesc}>Countries Served</div>
            </div>
            <div style={trustStat}>
              <div style={bigNumber}>2.5K+</div>
              <div style={statDesc}>Successful Exports</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ========================
// STYLES WITH HORIZONTAL SCROLL FIX
// ========================

const pageContainer = {
  width: '100%',
  minHeight: '100vh',
  margin: 0,
  padding: 0,
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  overflowX: 'hidden', // CRITICAL: Prevents horizontal scroll
  position: 'relative'
};

// Hero Section
const heroSection = {
  background: 'linear-gradient(135deg, #2E8B57 0%, #228B22 100%)',
  color: 'white',
  padding: '40px 20px',
  minHeight: '60vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  boxSizing: 'border-box'
};

const heroContent = {
  width: '100%',
  maxWidth: '1200px',
  textAlign: 'center',
  margin: '0 auto',
  padding: '0 10px',
  boxSizing: 'border-box'
};

const heroTitle = {
  fontSize: '2rem',
  fontWeight: '700',
  marginBottom: '20px',
  lineHeight: '1.3',
  wordWrap: 'break-word'
};

const heroSubtitle = {
  fontSize: '1.1rem',
  marginBottom: '30px',
  opacity: '0.9',
  lineHeight: '1.6',
  wordWrap: 'break-word'
};

// Search Form
const searchForm = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginBottom: '30px',
  maxWidth: '500px',
  margin: '0 auto',
  width: '100%'
};

const searchInput = {
  padding: '15px 20px',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  width: '100%',
  boxSizing: 'border-box',
  maxWidth: '100%'
};

const searchButton = {
  padding: '15px 30px',
  background: '#ff6b35',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  width: '100%'
};

// CTA Buttons
const ctaButtons = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginBottom: '40px',
  maxWidth: '300px',
  margin: '0 auto',
  width: '100%'
};

const primaryBtn = {
  padding: '15px 30px',
  background: '#ff6b35',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  width: '100%'
};

const secondaryBtn = {
  padding: '15px 30px',
  background: 'transparent',
  color: 'white',
  border: '2px solid white',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  width: '100%'
};

// Stats Row
const statsRow = {
  display: 'flex',
  flexDirection: 'column',
  gap: '25px',
  maxWidth: '280px',
  margin: '0 auto',
  width: '100%'
};

const statCard = {
  textAlign: 'center'
};

const statNumber = {
  display: 'block',
  fontSize: '2rem',
  fontWeight: '700',
  marginBottom: '5px'
};

const statText = {
  fontSize: '1rem',
  opacity: '0.9'
};

// PRODUCT SHOWCASE CONTAINER - CRITICAL FIX FOR HORIZONTAL SCROLL
const showcaseContainer = {
  width: '100%',
  maxWidth: '100vw', // NEVER exceed viewport width
  padding: '40px 0', // Vertical padding only
  margin: 0,
  overflow: 'hidden', // Hide any overflow
  boxSizing: 'border-box',
  position: 'relative'
};

// Trust Section
const trustSection = {
  padding: '60px 20px',
  background: '#f8f9fa',
  width: '100%',
  boxSizing: 'border-box',
  overflow: 'hidden'
};

const trustContent = {
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 10px',
  boxSizing: 'border-box'
};

const sectionTitle = {
  textAlign: 'center',
  fontSize: '2rem',
  marginBottom: '50px',
  color: '#333',
  wordWrap: 'break-word'
};

// Stats Grid
const statsGrid = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '25px',
  maxWidth: '1000px',
  margin: '0 auto',
  width: '100%',
  boxSizing: 'border-box'
};

const trustStat = {
  textAlign: 'center',
  padding: '30px 20px',
  background: 'white',
  borderRadius: '12px',
  boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
  width: '100%',
  boxSizing: 'border-box'
};

const bigNumber = {
  fontSize: '2.5rem',
  fontWeight: '700',
  color: '#667eea',
  marginBottom: '10px',
  wordWrap: 'break-word'
};

const statDesc = {
  fontSize: '1.1rem',
  color: '#666',
  fontWeight: '500',
  wordWrap: 'break-word'
};

// ========================
// DESKTOP MEDIA QUERIES
// ========================

// Add CSS for desktop
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @media (min-width: 768px) {
      /* Hero improvements */
      [data-hero-title] { font-size: 3rem !important; }
      [data-hero-subtitle] { font-size: 1.3rem !important; }
      
      /* Search row layout */
      [data-search-form] { 
        flex-direction: row !important; 
        max-width: 600px !important;
      }
      [data-search-input] { 
        border-radius: 8px 0 0 8px !important; 
        width: 70% !important;
      }
      [data-search-button] { 
        border-radius: 0 8px 8px 0 !important; 
        width: 30% !important;
      }
      
      /* Buttons row */
      [data-cta-buttons] { 
        flex-direction: row !important; 
        max-width: 400px !important;
      }
      [data-primary-btn], [data-secondary-btn] { 
        width: auto !important;
        flex: 1 !important;
      }
      
      /* Stats row */
      [data-stats-row] { 
        flex-direction: row !important; 
        max-width: 600px !important;
        gap: 50px !important;
      }
      [data-stat-number] { font-size: 2.5rem !important; }
      
      /* Trust grid */
      [data-stats-grid] { 
        grid-template-columns: repeat(4, 1fr) !important; 
        gap: 40px !important;
      }
      [data-big-number] { font-size: 3rem !important; }
    }

    @media (min-width: 1024px) {
      [data-hero-section] { 
        padding: 80px 20px !important; 
        min-height: 80vh !important;
      }
      [data-trust-section] { 
        padding: 80px 20px !important; 
      }
    }

    /* GLOBAL FIX FOR ALL IMAGES */
    img, [class*="image"], [class*="img"] {
      max-width: 100% !important;
      height: auto !important;
      display: block !important;
    }

    /* FIX FOR PRODUCT CARDS */
    [class*="card"], [class*="product"], [class*="item"] {
      max-width: 100% !important;
      box-sizing: border-box !important;
    }
  `;
  document.head.appendChild(style);

  // Add data attributes for targeting
  setTimeout(() => {
    const elementsToTag = {
      '[data-hero-title]': document.querySelector('[style*="fontSize: 2rem"]'),
      '[data-hero-subtitle]': document.querySelector('[style*="fontSize: 1.1rem"]'),
      '[data-search-form]': document.querySelector('[style*="flexDirection: column"]'),
      '[data-search-input]': document.querySelector('[style*="padding: 15px 20px"]'),
      '[data-search-button]': document.querySelector('[style*="background: #ff6b35"]'),
      '[data-cta-buttons]': document.querySelector('[style*="flexDirection: column"]'),
      '[data-primary-btn]': document.querySelector('[style*="background: #ff6b35"]'),
      '[data-secondary-btn]': document.querySelector('[style*="border: 2px solid white"]'),
      '[data-stats-row]': document.querySelector('[style*="flexDirection: column"]'),
      '[data-stat-number]': document.querySelectorAll('[style*="fontSize: 2rem"]'),
      '[data-stats-grid]': document.querySelector('[style*="gridTemplateColumns: 1fr"]'),
      '[data-big-number]': document.querySelectorAll('[style*="fontSize: 2.5rem"]'),
      '[data-hero-section]': document.querySelector('[style*="background: linear-gradient"]'),
      '[data-trust-section]': document.querySelector('[style*="background: #f8f9fa"]')
    };

    Object.keys(elementsToTag).forEach(selector => {
      const element = elementsToTag[selector];
      if (element) {
        const attr = selector.replace('[', '').replace(']', '');
        if (typeof element.forEach === 'function') {
          element.forEach(el => el.setAttribute(attr, 'true'));
        } else {
          element.setAttribute(attr, 'true');
        }
      }
    });
  }, 100);
}

export default Home;
