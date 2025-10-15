import React, { useState, useEffect, useMemo } from 'react';
import './Home.css';
import { useAuth } from './AuthContext';
import { productService } from './supabaseClient';

// Lazy load heavy components
const HeroSection = React.lazy(() => import('./components/HeroSection'));
const ProductCarousel = React.lazy(() => import('./components/ProductCarousel'));
const StatsSection = React.lazy(() => import('./components/StatsSection'));

const Home = () => {
  const { user } = useAuth();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoized featured products calculation
  const memoizedProducts = useMemo(() => {
    return featuredProducts.slice(0, 6); // Show only 6 featured products
  }, [featuredProducts]);

  // Load featured products
  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setLoading(true);
        const result = await productService.getProducts();
        
        if (result.success) {
          setFeaturedProducts(result.data || []);
        } else {
          throw new Error('Failed to load products');
        }
      } catch (err) {
        console.error('Error loading featured products:', err);
        setError('Failed to load featured products');
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  // Performance optimization: Only re-render when necessary
  const shouldShowUserGreeting = useMemo(() => {
    return user && user.email;
  }, [user]);

  if (error) {
    return (
      <div className="error-container">
        <div className="container">
          <h2>⚠️ Something went wrong</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="retry-btn"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <React.Suspense fallback={<div className="loading-hero">Loading...</div>}>
        <HeroSection 
          user={user}
          featuredCount={memoizedProducts.length}
        />
      </React.Suspense>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2>Featured Export Products</h2>
          <p className="section-subtitle">
            Premium African products ready for international markets
          </p>
          
          {loading ? (
            <div className="products-loading">
              <div className="loading-spinner"></div>
              <p>Loading featured products...</p>
            </div>
          ) : (
            <React.Suspense fallback={<div className="loading-carousel">Loading products...</div>}>
              <ProductCarousel products={memoizedProducts} />
            </React.Suspense>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <React.Suspense fallback={<div className="loading-stats">Loading stats...</div>}>
        <StatsSection />
      </React.Suspense>

      {/* User-specific content */}
      {shouldShowUserGreeting && (
        <section className="user-welcome">
          <div className="container">
            <div className="welcome-card">
              <h3>Welcome back! 👋</h3>
              <p>Ready to continue your export journey?</p>
              <div className="welcome-actions">
                <button className="btn-primary">Browse Products</button>
                <button className="btn-secondary">View Orders</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Exporting?</h2>
            <p>Join hundreds of successful African exporters on our platform</p>
            <div className="cta-buttons">
              <button className="btn-primary large">Become a Supplier</button>
              <button className="btn-outline large">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Performance optimization: Prevent unnecessary re-renders
export default React.memo(Home);
