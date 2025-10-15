🤖 AI GENERATED HOME.JS:
============================================================

import React, {{ useState, useEffect, useMemo }} from 'react';
import './Home.css';
import {{ useAuth }} from './AuthContext';
import {{ productService }} from './supabaseClient';

// Lazy load heavy components
const HeroSection = React.lazy(() => import('./components/HeroSection'));
const ProductCarousel = React.lazy(() => import('./components/ProductCarousel'));
const StatsSection = React.lazy(() => import('./components/StatsSection'));
const FeaturedSuppliers = React.lazy(() => import('./components/FeaturedSuppliers'));

const Home = () => {{
  const {{ user }} = useAuth();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({{
    totalExports: 1250,
    happyClients: 89,
    countriesServed: 24,
    productsAvailable: 156
  }});

  // Load featured products
  useEffect(() => {{
    const loadFeaturedProducts = async () => {{
      try {{
        setLoading(true);
        const result = await productService.getProducts();
        
        if (result.success) {{
          // Take only first 6 products for featured section
          setFeaturedProducts(result.data?.slice(0, 6) || []);
        }} else {{
          throw new Error('Failed to load products');
        }}
      }} catch (err) {{
        console.error('Error loading featured products:', err);
        setError('Failed to load featured products');
      }} finally {{
        setLoading(false);
      }}
    }};

    loadFeaturedProducts();
  }}, []);

  // Memoized user greeting
  const userGreeting = useMemo(() => {{
    if (!user) return null;
    return (
      <div className="user-welcome-banner">
        <div className="container">
          <div className="welcome-content">
            <h3>Welcome back, {{user.email}}! 👋</h3>
            <p>Ready to continue your export journey?</p>
          </div>
        </div>
      </div>
    );
  }}, [user]);

  if (error) {{
    return (
      <div className="error-container">
        <div className="container">
          <div className="error-card">
            <h2>⚠️ Something went wrong</h2>
            <p>{{error}}</p>
            <button 
              onClick={{() => window.location.reload()}}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }}

  return (
    <div className="home">
      {{/* Hero Section with African theme */}}
      <React.Suspense fallback={{<div className="loading-hero">Loading...</div>}}>
        <HeroSection 
          user={{user}}
          stats={{stats}}
        />
      </React.Suspense>

      {{/* User Welcome Banner */}}
      {{userGreeting}}

      {{/* Stats Section */}}
      <React.Suspense fallback={{<div className="loading-stats">Loading stats...</div>}}>
        <StatsSection stats={{stats}} />
      </React.Suspense>

      {{/* Featured Products */}}
      <section className="featured-products-section">
        <div className="container">
          <div className="section-header">
            <h2>🌍 Premium African Exports</h2>
            <p className="section-subtitle">
              Discover authentic products sourced directly from African producers
            </p>
          </div>
          
          {{loading ? (
            <div className="products-loading">
              <div className="loading-spinner"></div>
              <p>Loading featured products...</p>
            </div>
          ) : (
            <React.Suspense fallback={{<div className="loading-carousel">Loading products...</div>}}>
              <ProductCarousel products={{featuredProducts}} />
            </React.Suspense>
          )}}
        </div>
      </section>

      {{/* Featured Suppliers */}}
      <React.Suspense fallback={{<div className="loading-suppliers">Loading suppliers...</div>}}>
        <FeaturedSuppliers />
      </React.Suspense>

      {{/* Export Process */}}
      <section className="export-process">
        <div className="container">
          <div className="section-header">
            <h2>🚀 How Export Works</h2>
            <p>Simple steps to start your export business</p>
          </div>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-icon">📝</div>
              <h3>Register</h3>
              <p>Create your supplier account</p>
            </div>
            <div className="process-step">
              <div className="step-icon">📦</div>
              <h3>List Products</h3>
              <p>Add your export products</p>
            </div>
            <div className="process-step">
              <div className="step-icon">🌍</div>
              <h3>Connect</h3>
              <p>Find international buyers</p>
            </div>
            <div className="process-step">
              <div className="step-icon">💰</div>
              <h3>Export</h3>
              <p>Complete transactions</p>
            </div>
          </div>
        </div>
      </section>

      {{/* CTA Section */}}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Export Journey?</h2>
            <p>Join hundreds of successful African exporters connecting with global markets</p>
            <div className="cta-buttons">
              <button className="btn-primary large">
                🚀 Become a Supplier
              </button>
              <button className="btn-outline large">
                📞 Contact Our Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}};

export default React.memo(Home);

============================================================
