import React from 'react';
import { useAppData } from './AppDataContext.js';

const Suppliers = () => {
  const { products = [] } = useAppData();

  // Extract unique suppliers from products
  const suppliers = [...new Set(products.map(product => product.supplier))].map(supplierName => {
    const supplierProducts = products.filter(p => p.supplier === supplierName);
    return {
      name: supplierName,
      productCount: supplierProducts.length,
      verified: supplierProducts.some(p => p.verified),
      categories: [...new Set(supplierProducts.map(p => p.category))],
      location: supplierProducts[0]?.origin || 'Africa'
    };
  });

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '10px' }}>
          Verified African Suppliers
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
          Connect directly with trusted African agricultural producers and exporters.
        </p>
      </div>

      {/* Suppliers Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '30px'
      }}>
        {suppliers.length > 0 ? (
          suppliers.map((supplier, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '25px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <h3 style={{ margin: 0, color: '#333', fontSize: '1.3rem' }}>
                  {supplier.name}
                </h3>
                {supplier.verified && (
                  <div style={{
                    background: '#FFD700',
                    color: '#000',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    ✅ Verified
                  </div>
                )}
              </div>

              <div style={{ color: '#666', marginBottom: '15px' }}>
                <strong>Location:</strong> {supplier.location}
              </div>

              <div style={{ color: '#666', marginBottom: '15px' }}>
                <strong>Products:</strong> {supplier.productCount} products
              </div>

              <div style={{ marginBottom: '20px' }}>
                <strong>Categories:</strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                  {supplier.categories.map((category, catIndex) => (
                    <span key={catIndex} style={{
                      background: '#f0f8f0',
                      color: '#2E8B57',
                      padding: '4px 12px',
                      borderRadius: '15px',
                      fontSize: '0.8rem'
                    }}>
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              <button style={{
                width: '100%',
                padding: '12px',
                background: '#2E8B57',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.3s ease'
              }} onMouseEnter={(e) => {
                e.target.style.background = '#228B22';
              }} onMouseLeave={(e) => {
                e.target.style.background = '#2E8B57';
              }}>
                Contact Supplier
              </button>
            </div>
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
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🏭</div>
            <h3 style={{ color: '#666', marginBottom: '10px' }}>No suppliers found</h3>
            <p style={{ color: '#888' }}>Supplier data is being updated</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Suppliers;
