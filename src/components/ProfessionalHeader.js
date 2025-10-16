import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProfessionalHeader.css';

const ProfessionalHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="professional-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">AfriTrade Export</Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <Link to="/products">Products</Link>
          <Link to="/suppliers">Suppliers</Link>
          <Link to="/buyer-requests">Buyer Requests</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/about">About</Link>
          <Link to="/cart" className="cart-link">
            Cart <span className="cart-count">0</span>
          </Link>
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
        </nav>

        {/* Mobile Hamburger */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Navigation */}
        <nav className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/products" onClick={toggleMenu}>Products</Link>
          <Link to="/suppliers" onClick={toggleMenu}>Suppliers</Link>
          <Link to="/buyer-requests" onClick={toggleMenu}>Buyer Requests</Link>
          <Link to="/blog" onClick={toggleMenu}>Blog</Link>
          <Link to="/about" onClick={toggleMenu}>About</Link>
          <Link to="/cart" onClick={toggleMenu} className="cart-link">
            Cart <span className="cart-count">0</span>
          </Link>
          <Link to="/login" onClick={toggleMenu} className="login-btn">Login</Link>
          <Link to="/signup" onClick={toggleMenu} className="signup-btn">Sign Up</Link>
        </nav>
      </div>
    </header>
  );
};

export default ProfessionalHeader;