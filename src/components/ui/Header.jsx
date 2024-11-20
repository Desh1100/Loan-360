// src/components/Header.jsx
import React from 'react';
import { DollarSign } from 'lucide-react';
import Button from '../ui/button';
import '../../../src/LoanLandingPage.css';
import { Link } from 'react-router-dom';
import {
  MDBIcon,

} from 'mdb-react-ui-kit';

const Header = () => (
  <header className="header" style={{width:"100%"}}>
    <nav className="navbar">
      <div className="logo">
       <Link to="/Landing">
         <MDBIcon fas icon="cubes fa-2x me-3" style={{ color: '#ff6219' }} />
         <span>QuickLoan</span>
       </Link>
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
