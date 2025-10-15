import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="nav-container">
        <Link to="/" className="logo">
          AfriTrade
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <Link to="/products">Products</Link>
          <Link to="/suppliers">Suppliers</Link>
          <Link to="/buy-requests">Buy Requests</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/about">About</Link>
          <Link to="/cart">Cart</Link>
          
          <div className="auth-buttons">
            <button className="login-btn">Login</button>
            <button className="register-btn">Register</button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : 'hidden'}`}>
          <Link to="/products" onClick={toggleMobileMenu}>Products</Link>
          <Link to="/suppliers" onClick={toggleMobileMenu}>Suppliers</Link>
          <Link to="/buy-requests" onClick={toggleMobileMenu}>Buy Requests</Link>
          <Link to="/blog" onClick={toggleMobileMenu}>Blog</Link>
          <Link to="/about" onClick={toggleMobileMenu}>About</Link>
          <Link to="/cart" onClick={toggleMobileMenu}>Cart</Link>
          
          <div className="mobile-auth-buttons">
            <button className="login-btn">Login</button>
            <button className="register-btn">Register</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
