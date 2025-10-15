import React from 'react';

const ProductCarousel = ({ products }) => {
  return (
    <div className="product-carousel">
      <div className="carousel-container">
        {products.map((product, index) => (
          <div key={index} className="carousel-item">
            <div className="product-image">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} />
              ) : (
                <div className="product-placeholder">🛒</div>
              )}
            </div>
            <div className="product-info">
              <h4>{product.name}</h4>
              <p className="product-category">{product.category}</p>
              <p className="product-price">{product.price}</p>
              <button className="btn-view-details">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
