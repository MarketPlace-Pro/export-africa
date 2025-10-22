import React from 'react';
import { Link } from 'react-router-dom';
import SupplierRegistration from './components/SupplierRegistration';

function SupplierApplication() {
  return (
    <div className="container">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {/* Back Navigation */}
        <Link
          to="/suppliers"
          style={{
            color: '#2E8B57',
            textDecoration: 'none',
            fontWeight: '600',
            display: 'inline-block',
            marginBottom: '2rem',
            padding: '10px 20px',
            border: '2px solid #2E8B57',
            borderRadius: '8px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#2E8B57';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#2E8B57';
          }}
        >
          ← Back to Suppliers
        </Link>

        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ 
            color: '#2E8B57', 
            fontSize: '2.5rem', 
            marginBottom: '1rem' 
          }}>
            Become a Supplier
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#666', 
            maxWidth: '600px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Join our network of trusted African suppliers and connect with global buyers. 
            Showcase your products to international markets.
          </p>
        </div>

        {/* Benefits Section */}
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '2rem', 
          borderRadius: '12px',
          marginBottom: '3rem'
        }}>
          <h2 style={{ color: '#2E8B57', marginBottom: '1.5rem' }}>Why Join Us?</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem' 
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                backgroundColor: '#2E8B57', 
                color: 'white', 
                width: '50px', 
                height: '50px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1rem',
                fontSize: '1.5rem'
              }}>
                🌍
              </div>
              <h3 style={{ color: '#2E8B57', marginBottom: '0.5rem' }}>Global Reach</h3>
              <p>Access international buyers from Europe, Asia, and Americas</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                backgroundColor: '#2E8B57', 
                color: 'white', 
                width: '50px', 
                height: '50px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1rem',
                fontSize: '1.5rem'
              }}>
                💼
              </div>
              <h3 style={{ color: '#2E8B57', marginBottom: '0.5rem' }}>Business Growth</h3>
              <p>Expand your customer base and increase sales</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                backgroundColor: '#2E8B57', 
                color: 'white', 
                width: '50px', 
                height: '50px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1rem',
                fontSize: '1.5rem'
              }}>
                🤝
              </div>
              <h3 style={{ color: '#2E8B57', marginBottom: '0.5rem' }}>Trusted Partners</h3>
              <p>Connect with verified buyers and build long-term relationships</p>
            </div>
          </div>
        </div>

        {/* Supplier Registration Component */}
        <SupplierRegistration />
      </div>
    </div>
  );
}

export default SupplierApplication;
