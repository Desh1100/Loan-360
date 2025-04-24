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

  return (
    <header className="custom-header">
      <div className="header-container">
        <Link to="/Landing" className="logo">
          <div className="logo-icon">
            <img src="/logo.jpeg" alt="Loan 360 Logo" style={{ width: '70px', height: 'auto' }} />
          </div>
          <div className="logo-text" style={{ top: '10px' }}>
            <span className="logo-title">Loan 360</span>
            <span className="logo-subtitle">Banking Solutions</span>
          </div>
        </Link>

        <button 
          className="menu-toggle" 
          aria-expanded={showNav ? 'true' : 'false'} 
          aria-label='Toggle navigation'
          onClick={() => setShowNav(!showNav)}
        >
          <i className="fas fa-bars"></i>
        </button>

        <nav className={`main-nav ${showNav ? 'show' : ''}`}>
          <ul className="nav-links">
            <li className="nav-item">
              <Link to="/Landing" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link">Products</Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link">Services</Link>
            </li>
            <li className="nav-item">
              <Link to="/PersonalInfo" className="nav-link">Apply Now</Link>
            </li>
            
            {isLoggedIn ? (
              <li className="nav-item">
                <button onClick={handleLogout} className="auth-button logout-button">
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="auth-button login-button">
                  <i className="fas fa-sign-in-alt"></i> Login
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
