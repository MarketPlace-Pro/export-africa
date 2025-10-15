import React from 'react';
import './StatsSection.css';

const StatsSection = ({ stats }) => {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🌍</div>
            <div className="stat-content">
              <h3>{stats.totalExports}+</h3>
              <p>Successful Exports</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">😊</div>
            <div className="stat-content">
              <h3>{stats.happyClients}%</h3>
              <p>Happy Clients</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🇺🇳</div>
            <div className="stat-content">
              <h3>{stats.countriesServed}+</h3>
              <p>Countries Served</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-content">
              <h3>{stats.productsAvailable}+</h3>
              <p>Products Available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
