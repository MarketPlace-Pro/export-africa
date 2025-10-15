import React, { useState, useEffect } from 'react';
import { exporters } from '../data/exporters';
import { buyers } from '../data/buyers';
import { deals } from '../data/deals';
import ForwarderDashboard from './ForwarderDashboard';
import BulkEmailDashboard from './BulkEmailDashboard';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalExporters: 0,
    totalBuyers: 0,
    activeDeals: 0,
    totalValue: 0
  });

  useEffect(() => {
    // Calculate stats
    const totalExporters = exporters.length;
    const totalBuyers = buyers.length;
    const activeDeals = deals.filter(deal => deal.status === 'Active' || deal.status === 'Pending').length;
    const totalValue = deals.reduce((sum, deal) => sum + (deal.value || 0), 0);

    setStats({
      totalExporters,
      totalBuyers,
      activeDeals,
      totalValue
    });
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="overview-section">
            <h2>📊 Business Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>👥 Exporters</h3>
                <p className="stat-number">{stats.totalExporters}</p>
                <p className="stat-label">Verified Partners</p>
              </div>
              <div className="stat-card">
                <h3>🌍 Buyers</h3>
                <p className="stat-number">{stats.totalBuyers}</p>
                <p className="stat-label">International</p>
              </div>
              <div className="stat-card">
                <h3>🤝 Active Deals</h3>
                <p className="stat-number">{stats.activeDeals}</p>
                <p className="stat-label">In Progress</p>
              </div>
              <div className="stat-card">
                <h3>💰 Total Value</h3>
                <p className="stat-number">${stats.totalValue.toLocaleString()}</p>
                <p className="stat-label">Pipeline Value</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {deals.slice(0, 5).map((deal, index) => (
                  <div key={index} className="activity-item">
                    <span className="activity-badge">{deal.status}</span>
                    <span className="activity-text">
                      {deal.product} - {deal.quantity} to {deal.destination}
                    </span>
                    <span className="activity-value">${deal.value?.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'exporters':
        return (
          <div className="exporters-section">
            <h2>👥 Verified Exporters</h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Products</th>
                    <th>Location</th>
                    <th>Certifications</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {exporters.map((exporter, index) => (
                    <tr key={index}>
                      <td>
                        <strong>{exporter.companyName}</strong>
                        <br />
                        <small>{exporter.contactPerson}</small>
                      </td>
                      <td>{exporter.products.join(', ')}</td>
                      <td>{exporter.location}</td>
                      <td>{exporter.certifications?.join(', ') || 'N/A'}</td>
                      <td>
                        <span className={`status-badge status-${exporter.status?.toLowerCase() || 'active'}`}>
                          {exporter.status || 'Active'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'buyers':
        return (
          <div className="buyers-section">
            <h2>🌍 International Buyers</h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Country</th>
                    <th>Products Required</th>
                    <th>Contact</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {buyers.map((buyer, index) => (
                    <tr key={index}>
                      <td>
                        <strong>{buyer.companyName}</strong>
                        <br />
                        <small>{buyer.contactPerson}</small>
                      </td>
                      <td>
                        <span className="flag">🇰🇼</span> {buyer.country}
                      </td>
                      <td>{buyer.productsRequired.join(', ')}</td>
                      <td>{buyer.email}</td>
                      <td>
                        <span className={`status-badge status-${buyer.status?.toLowerCase() || 'active'}`}>
                          {buyer.status || 'Active'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'deals':
        return (
          <div className="deals-section">
            <h2>🤝 Active Deals</h2>
            <div className="deals-grid">
              {deals.map((deal, index) => (
                <div key={index} className="deal-card">
                  <div className="deal-header">
                    <h4>{deal.product}</h4>
                    <span className={`status-badge status-${deal.status.toLowerCase()}`}>
                      {deal.status}
                    </span>
                  </div>
                  <div className="deal-details">
                    <p><strong>Quantity:</strong> {deal.quantity}</p>
                    <p><strong>Destination:</strong> {deal.destination}</p>
                    <p><strong>Value:</strong> ${deal.value?.toLocaleString()}</p>
                    <p><strong>Timeline:</strong> {deal.timeline}</p>
                  </div>
                  <div className="deal-parties">
                    <div>
                      <strong>Exporter:</strong> {deal.exporter}
                    </div>
                    <div>
                      <strong>Buyer:</strong> {deal.buyer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'forwarders':
        return (
          <div className="forwarders-section">
            <ForwarderDashboard />
          </div>
        );

      case 'bulk-email':
        return (
          <div className="bulk-email-section">
            <BulkEmailDashboard />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <header className="admin-header">
          <h1>🚀 AfriTrade Global - Admin Dashboard</h1>
          <p>Manage your export business efficiently</p>
        </header>

        {/* Navigation Tabs */}
        <nav className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button
            className={`tab-btn ${activeTab === 'exporters' ? 'active' : ''}`}
            onClick={() => setActiveTab('exporters')}
          >
            👥 Exporters
          </button>
          <button
            className={`tab-btn ${activeTab === 'buyers' ? 'active' : ''}`}
            onClick={() => setActiveTab('buyers')}
          >
            🌍 Buyers
          </button>
          <button
            className={`tab-btn ${activeTab === 'deals' ? 'active' : ''}`}
            onClick={() => setActiveTab('deals')}
          >
            🤝 Deals
          </button>
          <button
            className={`tab-btn ${activeTab === 'forwarders' ? 'active' : ''}`}
            onClick={() => setActiveTab('forwarders')}
          >
            🚢 Freight Partners
          </button>
          <button
            className={`tab-btn ${activeTab === 'bulk-email' ? 'active' : ''}`}
            onClick={() => setActiveTab('bulk-email')}
          >
            📧 Bulk Email
          </button>
        </nav>

        {/* Tab Content */}
        <div className="tab-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
