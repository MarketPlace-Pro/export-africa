import React, { useState, useEffect } from 'react';
import { inquiryService, productService } from '../supabaseClient';
import './SupplierDashboard.css';

function SupplierDashboard() {
  const [inquiries, setInquiries] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [inquiriesResult, productsResult] = await Promise.all([
        inquiryService.getInquiries(),
        productService.getProducts()
      ]);

      if (inquiriesResult.success) {
        setInquiries(inquiriesResult.data);
      }

      if (productsResult.success) {
        // Filter products for this supplier (in real app, would filter by supplier ID)
        setProducts(productsResult.data.slice(0, 5)); // Show first 5 as example
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (inquiryId, newStatus) => {
    try {
      const result = await inquiryService.updateInquiryStatus(inquiryId, newStatus);
      if (result.success) {
        setInquiries(prev => prev.map(inq => 
          inq.id === inquiryId ? { ...inq, status: newStatus } : inq
        ));
      }
    } catch (error) {
      console.error('Error updating inquiry status:', error);
    }
  };

  const getStats = () => {
    const totalInquiries = inquiries.length;
    const newInquiries = inquiries.filter(inq => inq.status === 'new').length;
    const inProgress = inquiries.filter(inq => inq.status === 'in_progress').length;
    const completed = inquiries.filter(inq => inq.status === 'completed').length;

    return { totalInquiries, newInquiries, inProgress, completed };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="supplier-dashboard">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="supplier-dashboard">
      <header className="dashboard-header">
        <h1>👨‍🌾 Supplier Dashboard</h1>
        <p>Manage your products and buyer inquiries</p>
      </header>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon">📥</div>
          <div className="stat-info">
            <h3>{stats.totalInquiries}</h3>
            <p>Total Inquiries</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🆕</div>
          <div className="stat-info">
            <h3>{stats.newInquiries}</h3>
            <p>New Inquiries</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div className="stat-info">
            <h3>{stats.inProgress}</h3>
            <p>In Progress</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{stats.completed}</h3>
            <p>Completed</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
          onClick={() => setActiveTab('inquiries')}
        >
          📥 Inquiries
        </button>
        <button
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          🍊 Products
        </button>
      </nav>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="recent-inquiries">
              <h3>Recent Inquiries</h3>
              {inquiries.slice(0, 5).map(inquiry => (
                <div key={inquiry.id} className="inquiry-item">
                  <div className="inquiry-info">
                    <strong>{inquiry.product_name}</strong>
                    <span>From: {inquiry.buyer_company}</span>
                    <span className={`status-badge status-${inquiry.status}`}>
                      {inquiry.status}
                    </span>
                  </div>
                  <div className="inquiry-actions">
                    <button
                      onClick={() => handleStatusUpdate(inquiry.id, 'in_progress')}
                      className="btn btn-primary"
                    >
                      Respond
                    </button>
                  </div>
                </div>
              ))}
              {inquiries.length === 0 && (
                <p className="no-data">No inquiries yet</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div className="inquiries-tab">
            <h3>All Buyer Inquiries</h3>
            <div className="inquiries-list">
              {inquiries.map(inquiry => (
                <div key={inquiry.id} className="inquiry-card">
                  <div className="inquiry-header">
                    <h3>{inquiry.product_name}</h3>
                    <span className={`status-badge status-${inquiry.status}`}>
                      {inquiry.status}
                    </span>
                  </div>
                  <div className="inquiry-details">
                    <p><strong>Buyer:</strong> {inquiry.buyer_company}</p>
                    <p><strong>Contact:</strong> {inquiry.buyer_email}</p>
                    <p><strong>Quantity:</strong> {inquiry.quantity}</p>
                    <p><strong>Timeline:</strong> {inquiry.timeline}</p>
                    <p><strong>Submitted:</strong> {new Date(inquiry.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="inquiry-actions">
                    <select
                      value={inquiry.status}
                      onChange={(e) => handleStatusUpdate(inquiry.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="new">New</option>
                      <option value="in_progress">In Progress</option>
                      <option value="quoted">Quoted</option>
                      <option value="completed">Completed</option>
                    </select>
                    <button className="btn btn-primary">View Details</button>
                  </div>
                </div>
              ))}
              {inquiries.length === 0 && (
                <p className="no-data">No buyer inquiries yet</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="products-tab">
            <div className="products-header">
              <h3>Your Products</h3>
              <button className="btn btn-primary">Add New Product</button>
            </div>
            <div className="products-list">
              {products.map(product => (
                <div key={product.id} className="product-item">
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.category}</p>
                    <span className="product-price">{product.price}</span>
                  </div>
                  <div className="product-actions">
                    <button className="btn btn-secondary">Edit</button>
                    <button className="btn btn-danger">Delete</button>
                  </div>
                </div>
              ))}
              {products.length === 0 && (
                <p className="no-data">No products listed yet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SupplierDashboard;
