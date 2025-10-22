import React from 'react';
import { useAppData } from './AppDataContext.js';
import { Link } from 'react-router-dom';

const Suppliers = () => {
  const { products = [] } = useAppData();

  // Sample supplier data (fallback if no products)
  const sampleSuppliers = [
    {
      name: "Green Valley Farms",
      location: "Kenya",
      productCount: 8,
      verified: true,
      categories: ["Coffee", "Tea", "Avocados"]
    },
    {
      name: "Sunrise Exports",
      location: "Ethiopia",
      productCount: 12,
      verified: true,
      categories: ["Coffee", "Spices", "Honey"]
    },
    {
      name: "African Harvest Co.",
      location: "South Africa",
      productCount: 15,
      verified: true,
      categories: ["Citrus", "Grapes", "Wine"]
    },
    {
      name: "West Africa Traders",
      location: "Ghana",
      productCount: 6,
      verified: false,
      categories: ["Cocoa", "Shea Butter"]
    },
    {
      name: "Nile Delta Producers",
      location: "Egypt",
      productCount: 10,
      verified: true,
      categories: ["Cotton", "Dates", "Grains"]
    },
    {
      name: "Congo Basin Exports",
      location: "DR Congo",
      productCount: 7,
      verified: false,
      categories: ["Coffee", "Palm Oil", "Timber"]
    }
  ];

  // Use sample data if no products from context
  const suppliers = sampleSuppliers;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
      {/* Page Header with Application Button */}
      <div style={{ textAlign: 'center', marginBottom: '40px', padding: '40px 20px', backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#2E8B57', marginBottom: '15px', fontWeight: 'bold' }}>
          Verified African Suppliers
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto', marginBottom: '30px', lineHeight: '1.6' }}>
          Connect directly with trusted African agricultural producers and exporters. 
          Source quality products directly from the source.
        </p>
        
        {/* Become a Supplier Button */}
        <Link 
          to="/supplier-application"
          style={{
            display: 'inline-block',
            backgroundColor: '#2E8B57',
            color: 'white',
            padding: '15px 40px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1.1rem',
            transition: 'all 0.3s ease',
            marginBottom: '20px',
            boxShadow: '0 4px 6px rgba(46, 139, 87, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#228B22';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 12px rgba(46, 139, 87, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#2E8B57';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 6px rgba(46, 139, 87, 0.2)';
          }}
        >
          🚀 Become a Supplier
        </Link>
        
        <div style={{ marginTop: '20px', fontSize: '0.9rem', color: '#888' }}>
          Join 100+ African suppliers already connecting with global buyers
        </div>
      </div>

      {/* Suppliers Grid */}
      <div style={{ marginTop: '40px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#333', fontSize: '2rem' }}>
          Featured Supplier Network
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '25px' 
        }}>
          {suppliers.map((supplier, index) => (
            <div 
              key={index}
              style={{
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                padding: '25px',
                backgroundColor: 'white',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }}
            >
              {/* Verification Badge */}
              {supplier.verified && (
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  backgroundColor: '#2E8B57',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  ✓ Verified
                </div>
              )}
              
              <h3 style={{ 
                color: '#2E8B57', 
                marginBottom: '15px', 
                fontSize: '1.3rem',
                paddingRight: '80px'
              }}>
                {supplier.name}
              </h3>
              
              <div style={{ marginBottom: '15px' }}>
                <span style={{ 
                  backgroundColor: '#f0f8f4', 
                  color: '#2E8B57',
                  padding: '8px 15px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  📍 {supplier.location}
                </span>
              </div>
              
              <div style={{ color: '#666', lineHeight: '1.8' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ marginRight: '8px' }}>📦</span>
                  <strong>{supplier.productCount} products</strong>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ marginRight: '8px' }}>🏷️</span>
                  <span>{supplier.categories.join(', ')}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '8px' }}>⭐</span>
                  <span>{supplier.verified ? 'Verified Partner' : 'New Supplier'}</span>
                </div>
              </div>
              
              <button 
                style={{
                  width: '100%',
                  marginTop: '20px',
                  padding: '12px',
                  backgroundColor: supplier.verified ? '#2E8B57' : '#f8f9fa',
                  color: supplier.verified ? 'white' : '#666',
                  border: supplier.verified ? 'none' : '1px solid #ddd',
                  borderRadius: '6px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (supplier.verified) {
                    e.target.style.backgroundColor = '#228B22';
                  } else {
                    e.target.style.backgroundColor = '#e9ecef';
                  }
                }}
                onMouseLeave={(e) => {
                  if (supplier.verified) {
                    e.target.style.backgroundColor = '#2E8B57';
                  } else {
                    e.target.style.backgroundColor = '#f8f9fa';
                  }
                }}
              >
                {supplier.verified ? 'Contact Supplier' : 'View Profile'}
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom CTA */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '60px', 
        padding: '40px',
        backgroundColor: '#2E8B57',
        color: 'white',
        borderRadius: '12px'
      }}>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>
          Ready to Grow Your Business?
        </h3>
        <p style={{ fontSize: '1.1rem', marginBottom: '25px', opacity: '0.9' }}>
          Join our network and connect with international buyers today.
        </p>
        <Link 
          to="/supplier-application"
          style={{
            display: 'inline-block',
            backgroundColor: 'white',
            color: '#2E8B57',
            padding: '12px 35px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1.1rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          Start Your Application
        </Link>
      </div>
    </div>
  );
};

export default Suppliers;
