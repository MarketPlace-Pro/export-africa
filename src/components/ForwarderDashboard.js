import React, { useState, useEffect } from 'react';
import { freightForwarders, shippingRoutes } from '../data/forwarders/forwarderList';

function ForwarderDashboard() {
  const [selectedRoute, setSelectedRoute] = useState('South Africa → Kuwait');
  const [selectedForwarders, setSelectedForwarders] = useState([]);
  const [contactMessage, setContactMessage] = useState('');

  const routeDetails = shippingRoutes[selectedRoute];

  const handleContactForwarder = (forwarder) => {
    const emailSubject = `Partnership Opportunity - AfriTrade Global`;
    const emailBody = `
Dear ${forwarder.name} Team,

I'm reaching out from AfriTrade Global, South Africa's premier digital fresh produce export platform.

We're establishing partnerships with reliable freight forwarders to handle our growing export volumes (20-30 containers monthly, growing to 50+).

Key routes we need coverage for:
- South Africa → Middle East (Kuwait, Qatar, UAE)
- South Africa → Europe (Netherlands, UK)  
- South Africa → Asia

We're looking for:
✅ Competitive rates for reefer containers
✅ Reliable transit times
✅ Temperature monitoring
✅ Documentation expertise

Would you be interested in discussing a partnership arrangement?

You can view our platform here: https://afritrade-export.vercel.app

Best regards,
Lucky Masilo
Founder - AfriTrade Global
Afritradexport@outlook.com
    `;

    window.open(`mailto:${forwarder.contact}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`);
  };

  const filteredForwarders = freightForwarders.filter(forwarder => 
    forwarder.routes.some(route => route.includes(selectedRoute.split('→')[1].trim()))
  );

  return (
    <div className="container">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ color: 'var(--primary-green)', marginBottom: '2rem' }}>🚢 Freight Forwarder Partners</h1>

        {/* Route Selection */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Select Shipping Route:
          </label>
          <select 
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd', width: '300px' }}
          >
            {Object.keys(shippingRoutes).map(route => (
              <option key={route} value={route}>{route}</option>
            ))}
          </select>
        </div>

        {/* Route Details */}
        {routeDetails && (
          <div style={{ 
            background: 'var(--light-bg)', 
            padding: '1.5rem', 
            borderRadius: '10px', 
            marginBottom: '2rem' 
          }}>
            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Route Details: {selectedRoute}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <strong>Transit Time:</strong> {routeDetails.seaFreight}
              </div>
              <div>
                <strong>Cost Range:</strong> {routeDetails.costPerContainer}
              </div>
              <div>
                <strong>Temperature:</strong> {routeDetails.temperature}
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <strong>Required Documents:</strong>
              <ul style={{ margin: '0.5rem 0 0 1rem' }}>
                {routeDetails.documentation.map((doc, index) => (
                  <li key={index}>{doc}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Forwarder List */}
        <div className="forwarders-grid">
          <h3>Recommended Forwarders for {selectedRoute}</h3>
          {filteredForwarders.map(forwarder => (
            <div key={forwarder.id} className="forwarder-card">
              <div className="forwarder-header">
                <h3>{forwarder.name}</h3>
                <span className={`reliability-badge reliability-${forwarder.reliability.toLowerCase()}`}>
                  {forwarder.reliability}
                </span>
              </div>
              
              <div className="forwarder-details">
                <p><strong>Type:</strong> {forwarder.type}</p>
                <p><strong>Specialization:</strong> {forwarder.specialization.join(', ')}</p>
                <p><strong>Cost Level:</strong> {forwarder.cost}</p>
                <p><strong>Certifications:</strong> {forwarder.certification.join(', ')}</p>
                <p><strong>Contact:</strong> {forwarder.contact}</p>
                <p><strong>Phone:</strong> {forwarder.phone}</p>
                <p className="forwarder-notes">{forwarder.notes}</p>
              </div>

              <div className="forwarder-actions">
                <button 
                  onClick={() => handleContactForwarder(forwarder)}
                  className="btn btn-primary"
                >
                  📧 Contact for Partnership
                </button>
                <a 
                  href={forwarder.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  🌐 Visit Website
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Partnership Stats */}
        <div style={{ marginTop: '3rem', padding: '2rem', background: 'white', borderRadius: '15px' }}>
          <h3>Partnership Benefits</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
            <div>
              <h4 style={{ color: 'var(--primary-green)' }}>💰 Revenue Potential</h4>
              <p>10-15% margin on freight costs</p>
              <p>Volume-based incentives</p>
              <p>Recurring business from reliable clients</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--primary-green)' }}>📈 Growth Projection</h4>
              <p>Months 1-3: 10-15 containers monthly</p>
              <p>Months 4-6: 20-30 containers monthly</p>
              <p>Months 7-12: 40-50 containers monthly</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--primary-green)' }}>🎯 Target Clients</h4>
              <p>30+ verified South African exporters</p>
              <p>International buyers from 15+ countries</p>
              <p>Premium fresh produce only</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForwarderDashboard;
