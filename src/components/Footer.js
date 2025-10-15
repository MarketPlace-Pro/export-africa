import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>AfriTrade Global</h3>
            <p>South Africa's premier digital fresh produce export platform connecting verified exporters with international buyers.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/products">Fresh Produce Catalog</Link>
            <Link to="/suppliers">Become a Supplier</Link>
            <Link to="/blog">Export Insights</Link>
            <Link to="/about">About Us</Link>
            <Link to="/buyer-request">Buyer Request Form</Link>
          </div>
          
          <div className="footer-section">
            <h4>Products</h4>
            <span>Citrus Fruits</span>
            <span>Table Grapes</span>
            <span>Avocados</span>
            <span>Stone Fruits</span>
            <span>Berries</span>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <span>Email: info@afritrade.com</span>
            <span>Phone: +27 XXX XXX XXXX</span>
            <span>South Africa</span>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 AfriTrade Global. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
