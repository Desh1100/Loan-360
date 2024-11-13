// src/components/Header.jsx
import React from 'react';
import { DollarSign } from 'lucide-react';
import Button from '../ui/button';
import '../../../src/LoanLandingPage.css';
const Header = () => (
  <header className="header">
    <nav className="navbar">
      <div className="logo">
        <DollarSign className="icon" />
        <span>QuickLoan</span>
      </div>
      <div className="nav-links">
        <Button variant="ghost">About</Button>
        <Button variant="ghost">Services</Button>
        <Button variant="ghost">Contact</Button>
        <Button>Login</Button>
      </div>
    </nav>
  </header>
);

export default Header;
