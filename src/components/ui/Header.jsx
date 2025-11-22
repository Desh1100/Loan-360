// src/components/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../../src/LoanLandingPage.css';

const Header = () => {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false);
  
  // Check if user is logged in by checking for token
  const isLoggedIn = localStorage.getItem('jwt_token') ? true : false;

  // Enhanced logout function to clear all session data
  const handleLogout = () => {
    // Clear all user session data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_id');
    
    // Navigate to the login page
    navigate('/');
  };

  // New modern design color theme
  const colors = {
    primary: '#015b59', // Cyan/teal
    secondary: '#005a76', // Darker teal
    accent: '#ff7300', // Orange
    background: '#e9f8fb', // Light cyan background
    text: '#333333', // Dark text
    white: '#ffffff', // White
  };

  return (
    <header className="custom-header" style={{ 
      backgroundColor: colors.white, 
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      padding: '12px 0'
    }}>
      <div className="header-container">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <img src="/logo.jpeg" alt="Loan 360 Logo" style={{ width: '50px', height: 'auto' }} />
          </div>
          <div className="logo-text">
            <span className="logo-title" style={{ color: colors.primary, fontWeight: '700' }}>Loan 360</span>
            <span className="logo-subtitle" style={{ color: colors.secondary, fontSize: '0.7rem' }}>Banking Solutions</span>
          </div>
        </Link>

        <button 
          className="menu-toggle" 
          aria-expanded={showNav ? 'true' : 'false'} 
          aria-label='Toggle navigation'
          onClick={() => setShowNav(!showNav)}
          style={{ color: colors.text }}
        >
          <i className="fas fa-bars"></i>
        </button>

        <nav className={`main-nav ${showNav ? 'show' : ''}`}>
          <ul className="nav-links" style={{ gap: '30px' }}>
            <li className="nav-item">
              <Link to="/about" className="nav-link" style={{ color: colors.text, fontWeight: '500' }}>About</Link>
            </li>
           
            <li className="nav-item">
              <Link to="/how-to" className="nav-link" style={{ color: colors.text, fontWeight: '500' }}>How to</Link>
            </li>
            <li className="nav-item">
              <Link to="/faqs" className="nav-link" style={{ color: colors.text, fontWeight: '500' }}>FAQs</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link" style={{ color: colors.text, fontWeight: '500' }}>Contact us</Link>
            </li>
            
            {isLoggedIn ? (
              <li className="nav-item">
                <button 
                  onClick={handleLogout} 
                  className="auth-button logout-button"
                  style={{
                    backgroundColor: colors.accent,
                    color: colors.white,
                    borderRadius: '5px',
                    padding: '8px 16px',
                    fontWeight: '600',
                    border: 'none'
                  }}
                >
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link 
                  to="/login" 
                  className="auth-button login-button"
                  style={{
                    backgroundColor: colors.accent,
                    color: colors.white,
                    borderRadius: '5px',
                    padding: '8px 16px',
                    fontWeight: '600',
                    textDecoration: 'none'
                  }}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
