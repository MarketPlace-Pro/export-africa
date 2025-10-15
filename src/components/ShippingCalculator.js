import React, { useState } from 'react';

function ShippingCalculator() {
  const [formData, setFormData] = useState({
    origin: 'South Africa',
    destination: '',
    containerSize: '20FT',
    productType: 'refrigerated'
  });

  const shippingEstimates = {
    'Middle East': { '20FT': '2800-3500', '40FT': '4200-5200' },
    'Europe': { '20FT': '3200-4000', '40FT': '4800-6000' },
    'Asia': { '20FT': '3500-4500', '40FT': '5200-6800' },
    'North America': { '20FT': '4800-6200', '40FT': '7200-9200' }
  };

  const getEstimate = () => {
    if (!formData.destination || !shippingEstimates[formData.destination]) {
      return null;
    }
    return shippingEstimates[formData.destination][formData.containerSize];
  };

  const estimate = getEstimate();

  return (
    <div style={{ 
      background: 'white', 
      padding: '1.5rem', 
      borderRadius: '15px', 
      boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      <h3 style={{ 
        color: 'var(--primary-green)', 
        marginBottom: '1.5rem', 
        textAlign: 'center',
        fontSize: '1.3rem'
      }}>
        Shipping Estimate Calculator
      </h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '1rem', 
        marginBottom: '1.5rem' 
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Destination Region</label>
          <select
            value={formData.destination}
            onChange={(e) => setFormData({...formData, destination: e.target.value})}
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #ddd', 
              borderRadius: '5px',
              fontSize: '0.9rem',
              boxSizing: 'border-box'
            }}
          >
            <option value="">Select region</option>
            <option value="Middle East">Middle East</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="North America">North America</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Container Size</label>
          <select
            value={formData.containerSize}
            onChange={(e) => setFormData({...formData, containerSize: e.target.value})}
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #ddd', 
              borderRadius: '5px',
              fontSize: '0.9rem',
              boxSizing: 'border-box'
            }}
          >
            <option value="20FT">20FT Container</option>
            <option value="40FT">40FT Container</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Product Type</label>
          <select
            value={formData.productType}
            onChange={(e) => setFormData({...formData, productType: e.target.value})}
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #ddd', 
              borderRadius: '5px',
              fontSize: '0.9rem',
              boxSizing: 'border-box'
            }}
          >
            <option value="refrigerated">Refrigerated</option>
            <option value="dry">Dry Container</option>
          </select>
        </div>
      </div>

      {estimate && (
        <div style={{ 
          background: 'var(--light-bg)', 
          padding: '1.5rem', 
          borderRadius: '10px', 
          textAlign: 'center',
          border: '2px solid var(--primary-green)',
          marginBottom: '1rem'
        }}>
          <h4 style={{ color: 'var(--primary-green)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Estimated Shipping Cost</h4>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-orange)', margin: '0.5rem 0' }}>
            ${estimate} USD
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', margin: 0 }}>
            {formData.containerSize} to {formData.destination}
          </p>
        </div>
      )}

      <div style={{ 
        padding: '1rem', 
        background: '#fff3cd', 
        borderRadius: '5px',
        border: '1px solid #ffeaa7'
      }}>
        <p style={{ 
          margin: 0, 
          fontSize: '0.8rem', 
          color: '#856404',
          lineHeight: '1.4'
        }}>
          <strong>Important:</strong> This is an estimate only. Final shipping costs will be based on actual freight quotes from multiple forwarders.
        </p>
      </div>
    </div>
  );
}

export default ShippingCalculator;
