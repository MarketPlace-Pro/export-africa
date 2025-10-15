import React from 'react';

const ProductGrid = ({ products, user }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <div className="product-image">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} />
            ) : (
              <div className="product-placeholder">🛒</div>
            )}
          </div>
          <div className="product-info">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-category">{product.category}</p>
            <p className="product-price">{product.price}</p>
            <p className="product-supplier">{product.supplier}</p>
            <button className="btn-view-details">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(ProductGrid);
