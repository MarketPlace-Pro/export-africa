import React, { useState } from 'react';
import { useAppData } from './AppDataContext.js';
import { ComponentFactory } from './ComponentFactory.js';

const Products = () => {
  const { products = [], categories = [], setCategoryFilter, setSearchQuery, searchQuery } = useAppData();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCategoryFilter(category);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleViewDetails = (product) => {
    alert(`Viewing details for: ${product.name}\n\nDescription: ${product.description}\n\nSupplier: ${product.supplier}\n\nMinimum Order: ${product.moq}\n\nCertifications: ${product.certifications?.join(', ') || 'Not specified'}`);
  };

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        const priceA = parseFloat(a.price.replace(/[^\d.]/g, '')) || 0;
        const priceB = parseFloat(b.price.replace(/[^\d.]/g, '')) || 0;
        return priceA - priceB;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Cart Summary Floating Button */}
      <ComponentFactory.CartSummary />
      
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '10px' }}>
          Premium African Products
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
          Direct from verified African suppliers. Quality guaranteed with export certification.
        </p>
      </div>

      {/* Search and Filters */}
      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '12px', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Search Input */}
          <div style={{ flex: '1', minWidth: '300px' }}>
            <input
              type="text"
              placeholder="🔍 Search products, suppliers, categories..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2E8B57'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '1rem',
              minWidth: '200px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Sort Filter */}
          <select
            value={sortBy}
            onChange={handleSortChange}
            style={{
              padding: '12px 16px',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '1rem',
              minWidth: '150px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '30px'
      }}>
        {sortedProducts.length > 0 ? (
          sortedProducts.map(product => (
            <ComponentFactory.ProductCard
              key={product.id}
              product={product}
              onViewDetails={handleViewDetails}
            />
          ))
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            gridColumn: '1 / -1'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
            <h3 style={{ color: '#666', marginBottom: '10px' }}>No products found</h3>
            <p style={{ color: '#888' }}>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '40px', 
        color: '#666',
        padding: '20px'
      }}>
        Showing {sortedProducts.length} products
        {selectedCategory && ` in ${selectedCategory}`}
        {searchQuery && ` matching "${searchQuery}"`}
      </div>
    </div>
  );
};

export default Products;
