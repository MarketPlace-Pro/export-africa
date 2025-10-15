import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import './Header.css'
import Login from './Login'
import Register from './Register'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const { user, userProfile, signOut } = useAuth()
  const location = useLocation()

  const toggleMenu = () => {
    console.log('🍔 Hamburger clicked! Current state:', isMenuOpen)
    setIsMenuOpen(!isMenuOpen)
  }

  const handleAuthClick = () => {
    setShowAuthModal(true)
    setAuthMode('login')
    setIsMenuOpen(false) // Close mobile menu when auth opens
  }

  const handleSignUpClick = () => {
    setShowAuthModal(true)
    setAuthMode('register')
    setIsMenuOpen(false)
  }

  const handleCloseAuth = () => {
    setShowAuthModal(false)
  }

  const handleSwitchAuth = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login')
  }

  const handleLogout = async () => {
    try {
      await signOut()
      setIsMenuOpen(false)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const isActiveLink = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  // Close menu when clicking outside (for mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      const nav = document.querySelector('.nav')
      const menuToggle = document.querySelector('.menu-toggle')
      
      if (isMenuOpen && 
          nav && 
          menuToggle && 
          !nav.contains(event.target) && 
          !menuToggle.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <Link to="/" className="logo">
              <span className="logo-icon">🌍</span>
              <span className="logo-text">AfriTrade Export</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
              <Link to="/" className={`nav-link ${isActiveLink('/')}`} onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/products" className={`nav-link ${isActiveLink('/products')}`} onClick={() => setIsMenuOpen(false)}>
                Products
              </Link>
              <Link to="/suppliers" className={`nav-link ${isActiveLink('/suppliers')}`} onClick={() => setIsMenuOpen(false)}>
                Suppliers
              </Link>
              <Link to="/buyer-request" className={`nav-link ${isActiveLink('/buyer-request')}`} onClick={() => setIsMenuOpen(false)}>
                Buyer Request
              </Link>
              <Link to="/blog" className={`nav-link ${isActiveLink('/blog')}`} onClick={() => setIsMenuOpen(false)}>
                Blog
              </Link>
              <Link to="/about" className={`nav-link ${isActiveLink('/about')}`} onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              
              {/* Auth Section */}
              <div className="auth-section">
                {user ? (
                  <div className="user-menu">
                    <span className="user-greeting">
                      👋 Hello, {userProfile?.company_name || user.email}
                    </span>
                    <div className="user-dropdown">
                      <Link 
                        to={userProfile?.type === 'supplier' ? '/supplier-dashboard' : '/buyer-dashboard'} 
                        className="dropdown-link"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Dashboard
                      </Link>
                      <button onClick={handleLogout} className="dropdown-link logout-btn">
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="auth-buttons">
                    <button onClick={handleAuthClick} className="auth-btn login-btn">
                      Sign In
                    </button>
                    <button onClick={handleSignUpClick} className="auth-btn signup-btn">
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile Menu Button - FIXED */}
            <button 
              className={`menu-toggle ${isMenuOpen ? 'menu-open' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Auth Modals */}
      {showAuthModal && (
        <>
          {authMode === 'login' ? (
            <Login 
              onClose={handleCloseAuth}
              onSwitchToRegister={() => setAuthMode('register')}
            />
          ) : (
            <Register 
              onClose={handleCloseAuth}
              onSwitchToLogin={() => setAuthMode('login')}
            />
          )}
        </>
      )}
    </>
  )
}

export default Header
