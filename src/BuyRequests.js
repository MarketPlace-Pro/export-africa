import React, { useState } from 'react';

const BuyRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      product: 'Fresh Avocados',
      quantity: '1000 boxes',
      buyer: 'Germany Import Co.',
      deadline: '2024-11-15',
      budget: '$45,000 - $55,000',
      status: 'Urgent',
      description: 'Looking for premium Hass avocados with GlobalGAP certification. Regular monthly orders available.'
    },
    {
      id: 2,
      product: 'Arabica Coffee Beans',
      quantity: '5000 kg',
      buyer: 'USA Beverages Inc.',
      deadline: '2024-11-30',
      budget: '$125,000 - $150,000',
      status: 'Active',
      description: 'Specialty grade Arabica coffee beans for premium coffee brand. Direct trade preferred.'
    },
    {
      id: 3,
      product: 'Macadamia Nuts',
      quantity: '2000 kg',
      buyer: 'Japan Healthy Foods',
      deadline: '2024-12-10',
      budget: '$75,000 - $90,000',
      status: 'Active',
      description: 'Organic macadamia nuts for health food products. Requires organic certification.'
    }
  ]);

  const handleSubmitQuote = (requestId) => {
    const request = requests.find(r => r.id === requestId);
    if (request) {
      alert(`Submitting quote for: ${request.product}\n\nBuyer: ${request.buyer}\nQuantity: ${request.quantity}\nBudget: ${request.budget}\n\nYou will be redirected to the quote form.`);
      // In a real app, this would open a quote submission form
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '10px' }}>
          Live Buyer Requests
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
          Real-time export opportunities from international buyers seeking African products.
        </p>
      </div>

      {/* Buyer Requests Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '30px'
      }}>
        {requests.map(request => (
          <div key={request.id} style={{
            background: 'white',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            border: `2px solid ${request.status === 'Urgent' ? '#ff4444' : '#4CAF50'}`,
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
                {request.product}
              </h3>
              <div style={{
                background: request.status === 'Urgent' ? '#ff4444' : '#4CAF50',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                {request.status}
              </div>
            </div>

            <div style={{ color: '#666', marginBottom: '10px' }}>
              <strong>Buyer:</strong> {request.buyer}
            </div>

            <div style={{ color: '#666', marginBottom: '10px' }}>
              <strong>Quantity:</strong> {request.quantity}
            </div>

            <div style={{ color: '#666', marginBottom: '10px' }}>
              <strong>Budget:</strong> {request.budget}
            </div>

            <div style={{ color: '#666', marginBottom: '15px' }}>
              <strong>Deadline:</strong> {request.deadline}
            </div>

            <div style={{ 
              background: '#f8f9fa', 
              padding: '15px', 
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <p style={{ margin: 0, color: '#666', fontSize: '0.9rem', lineHeight: '1.5' }}>
                {request.description}
              </p>
            </div>

            <button 
              onClick={() => handleSubmitQuote(request.id)}
              style={{
                width: '100%',
                padding: '12px',
                background: '#2E8B57',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#228B22';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#2E8B57';
              }}
            >
              Submit Quote
            </button>
          </div>
        ))}
      </div>

      {/* No Requests Message */}
      {requests.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📋</div>
          <h3 style={{ color: '#666', marginBottom: '10px' }}>No active buyer requests</h3>
          <p style={{ color: '#888' }}>Check back later for new export opportunities</p>
        </div>
      )}
    </div>
  );
};

export default BuyRequests;
