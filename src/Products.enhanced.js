import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './Products.css';
import { useAuth } from './AuthContext';
import { productService } from './supabaseClient';

// Lazy load components
const ProductGrid = React.lazy(() => import('./components/ProductGrid'));
const SearchFilters = React.lazy(() => import('./components/SearchFilters'));
const Pagination = React.lazy(() => import('./components/Pagination'));

const Products = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        console.log('🔄 Loading products...');
        
        const result = await productService.getProducts();
        
        if (result.success) {
          setProducts(result.data || []);
          console.log(`✅ Loaded ${result.data?.length || 0} products`);
        } else {
          throw new Error('Failed to load products');
        }
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Memoized filtered products
  const memoizedFilteredProducts = useMemo(() => {
    let filtered = products;
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    return filtered;
  }, [products, searchTerm, selectedCategory]);

  // Memoized paginated products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return memoizedFilteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [memoizedFilteredProducts, currentPage]);

  // Memoized callback functions
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page on new search
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Get unique categories for filter
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
    return ['all', ...uniqueCategories];
  }, [products]);

  if (error) {
    return (
      <div className="products-error">
        <div className="container">
          <div className="error-card">
            <h2>⚠️ Unable to Load Products</h2>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="retry-btn"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="container">
        {/* Header */}
        <header className="products-header">
          <h1>Export Products Catalog</h1>
          <p>Discover premium African products for international markets</p>
        </header>

        {/* Search and Filters */}
        <React.Suspense fallback={<div className="loading-filters">Loading filters...</div>}>
          <SearchFilters
            searchTerm={searchTerm}
            onSearchChange={handleSearch}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            categories={categories}
            totalProducts={memoizedFilteredProducts.length}
          />
        </React.Suspense>

        {/* Products Grid */}
        {loading ? (
          <div className="products-loading">
            <div className="loading-spinner large"></div>
            <p>Loading products...</p>
          </div>
        ) : (
          <>
            <React.Suspense fallback={<div className="loading-grid">Loading products grid...</div>}>
              <ProductGrid 
                products={paginatedProducts}
                user={user}
              />
            </React.Suspense>

            {/* Pagination */}
            {memoizedFilteredProducts.length > productsPerPage && (
              <React.Suspense fallback={<div className="loading-pagination">Loading pagination...</div>}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(memoizedFilteredProducts.length / productsPerPage)}
                  onPageChange={handlePageChange}
                />
              </React.Suspense>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && memoizedFilteredProducts.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or filters</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Performance optimization
export default React.memo(Products);
