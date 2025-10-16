#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// AI Runner for Export Africa Platform
console.log('🚀 AI Runner - Export Africa Platform');

const command = process.argv[2];
const componentName = process.argv[3];
const features = process.argv.slice(4);

console.log(`Command: ${command}`);
console.log(`Component: ${componentName}`);
console.log(`Features: ${features.join(', ')}`);

function generateComponent() {
  const componentFile = `src/components/${componentName}.js`;
  const cssFile = `src/components/${componentName}.css`;
  
  let componentCode = '';
  
  // Generate based on features
  if (features.includes('--hamburger-fixed')) {
    componentCode = `import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './${componentName}.css';

const ${componentName} = () => {
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
          className={\`hamburger \${isMenuOpen ? 'active' : ''}\`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Navigation */}
        <nav className={\`mobile-nav \${isMenuOpen ? 'active' : ''}\`}>
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

export default ${componentName};`;
  }

  // Create component file
  fs.writeFileSync(componentFile, componentCode);
  console.log(`✅ Generated: ${componentFile}`);

  // Generate CSS file
  const cssCode = `.professional-header {
  background: linear-gradient(135deg, #2d5016 0%, #4a7c2a 100%);
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo a {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}

/* Desktop Navigation */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.desktop-nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.desktop-nav a:hover {
  color: #ffd700;
}

.cart-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cart-count {
  background: #ff6b6b;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
}

.login-btn, .signup-btn {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.login-btn {
  border: 2px solid white;
  color: white;
}

.signup-btn {
  background: white;
  color: #2d5016;
  font-weight: bold;
}

/* Mobile Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  gap: 4px;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background: white;
  transition: all 0.3s ease;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Mobile Navigation */
.mobile-nav {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #2d5016;
  flex-direction: column;
  padding: 1rem;
  box-shadow: 0 5px 10px rgba(0,0,0,0.1);
  transform: translateY(-10px);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.mobile-nav.active {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

.mobile-nav a {
  color: white;
  text-decoration: none;
  padding: 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  transition: background 0.3s ease;
}

.mobile-nav a:hover {
  background: rgba(255,255,255,0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  
  .hamburger {
    display: flex;
  }
  
  .mobile-nav {
    display: flex;
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 0 1rem;
  }
  
  .logo a {
    font-size: 1.2rem;
  }
}`;

  fs.writeFileSync(cssFile, cssCode);
  console.log(`✅ Generated: ${cssFile}`);
}

// Execute based on command
switch (command) {
  case 'code':
    generateComponent();
    break;
  default:
    console.log('Available commands:');
    console.log('  node ai-runner.js code ComponentName --features');
    console.log('  Features: --hamburger-fixed, --responsive, --all-buttons');
}
