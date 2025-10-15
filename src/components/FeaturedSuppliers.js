import React from 'react';
import './FeaturedSuppliers.css';

const FeaturedSuppliers = () => {
  const suppliers = [
    { name: 'Kenya Fresh Produce', products: ['Avocados', 'Mangoes'], rating: 4.9 },
    { name: 'Ethiopia Coffee Co', products: ['Arabica Coffee'], rating: 5.0 },
    { name: 'SA Citrus Farms', products: ['Oranges', 'Lemons'], rating: 4.8 },
    { name: 'Ghana Cocoa Export', products: ['Premium Cocoa'], rating: 4.9 }
  ];

  return (
    <section className="featured-suppliers">
      <div className="container">
        <div className="section-header">
          <h2>🏆 Featured Suppliers</h2>
          <p>Verified exporters with proven track records</p>
        </div>
        <div className="suppliers-grid">
          {suppliers.map((supplier, index) => (
            <div key={index} className="supplier-card">
              <div className="supplier-avatar">
                {supplier.name.charAt(0)}
              </div>
              <h4>{supplier.name}</h4>
              <div className="supplier-products">
                {supplier.products.map((product, i) => (
                  <span key={i} className="product-tag">{product}</span>
                ))}
              </div>
              <div className="supplier-rating">
                ⭐ {supplier.rating}
              </div>
              <button className="btn-view-profile">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSuppliers;
