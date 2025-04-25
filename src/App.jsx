// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import Register from './screens/Register'; 
import LoanLandingPage from './screens/LoanLandingPage';

import PersonalInfo from './screens/PersonalInfo';
import FamilyInfo from './screens/FamilyInfo';
import EligibilityCheck from './screens/EligibilityCheck';
import EligibilityResult from './screens/EligibilityResult';


// Add this style to push content below the fixed header
const HEADER_HEIGHT = 80; // px, adjust if your header is taller/shorter

function App() {
  return (
    <Router>
      <div className="App">
        <div style={{ height: HEADER_HEIGHT }} />
        <Routes>
          <Route path="/" element={<LoanLandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Landing" element={<LoanLandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/eligibility-check" element={<EligibilityCheck />} />
          <Route path="/eligibility-result" element={<EligibilityResult />} />
          <Route path="/PersonalInfo" element={<PersonalInfo />} />
          <Route path="/family-info" element={<FamilyInfo />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
