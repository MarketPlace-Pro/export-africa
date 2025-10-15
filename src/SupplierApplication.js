import React from 'react';
import { Link } from 'react-router-dom';
import SupplierRegistration from './components/SupplierRegistration';

function SupplierApplication() {
  return (
    <div className="container">
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        {/* Back Navigation */}
        <Link 
          to="/suppliers" 
          style={{ 
            color: 'var(--primary-green)', 
            textDecoration: 'none', 
            fontWeight: '600', 
            display: 'inline-block', 
            marginBottom: '2rem',
            padding: '10px 20px',
            border: '2px solid var(--primary-green)',
            borderRadius: '8px',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'var(--primary-green)';
            e.target.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = 'var(--primary-green)';
          }}
        >
          ← Back to Suppliers
        </Link>

        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ color: 'var(--primary-green)', marginBottom: '1rem', fontSize: '2.5rem' }}>
            Supplier Application Form
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto' }}>
            Join South Africa's premier export platform. Complete this form to become a verified supplier.
          </p>
        </div>

        {/* Application Steps */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem', 
          marginBottom: '3rem',
          padding: '2rem',
          background: 'var(--light-bg)',
          borderRadius: '15px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              background: 'var(--primary-green)', 
              color: 'white', 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontWeight: 'bold'
            }}>1</div>
            <h4 style={{ color: 'var(--primary-green)', marginBottom: '0.5rem' }}>Submit Form</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>Complete the application below</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              background: 'var(--primary-blue)', 
              color: 'white', 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontWeight: 'bold'
            }}>2</div>
            <h4 style={{ color: 'var(--primary-blue)', marginBottom: '0.5rem' }}>Verification</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>We review your application</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              background: 'var(--accent-orange)', 
              color: 'white', 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontWeight: 'bold'
            }}>3</div>
            <h4 style={{ color: 'var(--accent-orange)', marginBottom: '0.5rem' }}>Onboarding</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>Get access to buyers</p>
          </div>
        </div>

        {/* Registration Form */}
        <div style={{ 
          background: 'white', 
          padding: '2rem', 
          borderRadius: '15px', 
          boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
          border: '2px solid var(--light-bg)'
        }}>
          <SupplierRegistration />
        </div>

        {/* Trust Section */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '3rem', 
          padding: '2rem', 
          background: 'var(--light-bg)', 
          borderRadius: '15px' 
        }}>
          <h3 style={{ color: 'var(--primary-green)', marginBottom: '1rem' }}>Why Become a Verified Supplier?</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem', 
            marginTop: '1.5rem' 
          }}>
            <div>
              <h4 style={{ color: 'var(--accent-orange)' }}>🌍 Global Reach</h4>
              <p>Access buyers from Middle East, Europe, and Asia</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--accent-orange)' }}>💳 Secure Payments</h4>
              <p>Guaranteed payments through our platform</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--accent-orange)' }}>🚢 Export Support</h4>
              <p>We handle documentation and logistics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupplierApplication;
