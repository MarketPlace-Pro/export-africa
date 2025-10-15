import React, { useState, useEffect } from 'react';
import './BulkEmailDashboard.css';

function BulkEmailDashboard() {
  const [buyers, setBuyers] = useState([]);
  const [selectedBuyers, setSelectedBuyers] = useState([]);
  const [activeTab, setActiveTab] = useState('buyers');
  const [loading, setLoading] = useState(false);

  // Sample buyer data for testing
  const sampleBuyers = [
    {
      id: 1,
      companyName: "Kuwait Fresh Markets",
      contactPerson: "Ahmed Al-Mansour",
      email: "purchasing@kfm.com.kw",
      country: "Kuwait",
      productsRequired: ["Citrus Fruits", "Table Grapes"]
    },
    {
      id: 2,
      companyName: "Qatar Food Distributors", 
      contactPerson: "Mohammed Al-Thani",
      email: "imports@qfd.qa",
      country: "Qatar",
      productsRequired: ["Oranges", "Grapefruit"]
    },
    {
      id: 3,
      companyName: "Dubai Fruit Importers",
      contactPerson: "Fatima Al-Maktoum", 
      email: "orders@dfi.ae",
      country: "UAE",
      productsRequired: ["Table Grapes", "Peaches"]
    }
  ];

  useEffect(() => {
    loadBuyers();
  }, []);

  const loadBuyers = async () => {
    setLoading(true);
    try {
      // Try to load from localStorage first
      const stored = localStorage.getItem('buyer_requests');
      if (stored) {
        const parsed = JSON.parse(stored);
        setBuyers(parsed);
      } else {
        // Use sample data if no buyers in localStorage
        setBuyers(sampleBuyers);
      }
    } catch (error) {
      console.error('Error loading buyers:', error);
      // Fallback to sample data
      setBuyers(sampleBuyers);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectBuyer = (buyerId) => {
    setSelectedBuyers(prev => {
      if (prev.includes(buyerId)) {
        return prev.filter(id => id !== buyerId);
      } else {
        return [...prev, buyerId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedBuyers.length === buyers.length) {
      setSelectedBuyers([]);
    } else {
      setSelectedBuyers(buyers.map(b => b.id));
    }
  };

  const sendBulkEmails = () => {
    if (selectedBuyers.length === 0) {
      alert('Please select at least one buyer');
      return;
    }

    const selected = buyers.filter(b => selectedBuyers.includes(b.id));
    
    selected.forEach((buyer, index) => {
      setTimeout(() => {
        const subject = `Premium South African Fresh Produce - AfriTrade Global`;
        const body = `Dear ${buyer.contactPerson},

We have premium South African fresh produce available for export to ${buyer.country}.

Available products matching your requirements:
${buyer.productsRequired.join(', ')}

Contact us for competitive pricing and availability:
Email: Afritradexport@outlook.com
Phone: +27 XXX XXX XXXX

Best regards,
Lucky Masilo
Founder - AfriTrade Global`;

        window.open(`mailto:${buyer.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
      }, index * 2000); // 2 second delay between emails
    });

    alert(`📧 Opening email client for ${selected.length} buyers with 2-second delays`);
  };

  if (loading) {
    return (
      <div className="bulk-email-dashboard">
        <div className="loading">Loading buyers...</div>
      </div>
    );
  }

  return (
    <div className="bulk-email-dashboard">
      <header className="dashboard-header">
        <h1>📧 Bulk Email Marketing</h1>
        <p>Contact multiple buyers efficiently with personalized emails</p>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === 'buyers' ? 'active' : ''}`}
          onClick={() => setActiveTab('buyers')}
        >
          👥 Buyers ({buyers.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'send' ? 'active' : ''}`}
          onClick={() => setActiveTab('send')}
        >
          🚀 Send Emails
        </button>
      </nav>

      {/* Buyers Tab */}
      {activeTab === 'buyers' && (
        <div className="tab-content">
          <div className="section-header">
            <h3>Buyer Database</h3>
            <div className="buyer-stats">
              <span>Total: {buyers.length} buyers</span>
              <span>Selected: {selectedBuyers.length}</span>
            </div>
          </div>

          <div className="buyers-list">
            <div className="list-header">
              <label className="select-all">
                <input 
                  type="checkbox" 
                  checked={selectedBuyers.length === buyers.length && buyers.length > 0}
                  onChange={handleSelectAll}
                />
                Select All
              </label>
            </div>

            {buyers.map(buyer => (
              <div key={buyer.id} className="buyer-item">
                <label className="buyer-select">
                  <input 
                    type="checkbox"
                    checked={selectedBuyers.includes(buyer.id)}
                    onChange={() => handleSelectBuyer(buyer.id)}
                  />
                </label>
                <div className="buyer-info">
                  <strong>{buyer.companyName}</strong>
                  <span>👤 {buyer.contactPerson}</span>
                  <span>📧 {buyer.email}</span>
                  <span>🌍 {buyer.country}</span>
                  <span>🛒 {Array.isArray(buyer.productsRequired) ? buyer.productsRequired.join(', ') : buyer.productsRequired}</span>
                </div>
              </div>
            ))}

            {buyers.length === 0 && (
              <div className="empty-state">
                <p>No buyers found. Sample data should be showing.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Send Emails Tab */}
      {activeTab === 'send' && (
        <div className="tab-content">
          <div className="section-header">
            <h3>Send Bulk Emails</h3>
            <p>Ready to contact {selectedBuyers.length} selected buyers</p>
          </div>

          <div className="email-preview">
            <h4>Email Preview</h4>
            <div className="preview-content">
              <strong>Subject:</strong> Premium South African Fresh Produce - AfriTrade Global
              <br /><br />
              <strong>Body:</strong><br />
              Dear [Buyer Name],<br /><br />
              We have premium South African fresh produce available for export to [Country].<br /><br />
              Available products matching your requirements:<br />
              [Product List]<br /><br />
              Contact us for competitive pricing and availability...
            </div>
          </div>

          <div className="send-actions">
            <button 
              onClick={sendBulkEmails}
              disabled={selectedBuyers.length === 0}
              className="btn btn-primary"
            >
              📧 Send to {selectedBuyers.length} Buyers
            </button>
            <p className="help-text">
              This will open your email client {selectedBuyers.length} times with pre-filled emails.
              Each email opens with a 2-second delay to avoid spam filters.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BulkEmailDashboard;
