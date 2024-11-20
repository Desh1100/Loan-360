// src/components/Header.jsx
import React from 'react';
import Button from '../ui/button';
import '../../../src/LoanLandingPage.css';

import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import {
  MDBIcon,
} from 'mdb-react-ui-kit';

const Header = () => {
  const navigate = useNavigate();  // Initialize navigate function from react-router-dom
  
  // Logout function to clear session data and navigate to login page
  const handleLogout = () => {
    // Clear user session data (assuming 'user' is saved in localStorage)
    localStorage.removeItem('user');
    
    // Navigate the user to the login page
    navigate('/');  // Navigate to login page
  };

  return (
    <header className="header" style={{ width: "100%" }}>
      <nav className="navbar">
        <div className="logo">
          <Link to="/Landing">
            <MDBIcon fas icon="cubes fa-2x me-3" style={{ color: '#ff6219' }} />
            <span>QuickLoan</span>
          </Link>
        </div>
        <div className="nav-links">
        <Link to="/Landing">
           
          </Link>
        </div>
        <div className="nav-links">
          <Link
            to="#"
          
            
          >
            About
          </Link>
          <Link
            to="#"
          
          >
            Services
          </Link>
          <Link
            to="#"
           
           
          >
            Contact
          </Link>
          {/* Add the Logout button if the user is logged in */}
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
