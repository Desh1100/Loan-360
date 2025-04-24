// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import Register from './screens/Register'; 
import LoanLandingPage from './screens/LoanLandingPage';

import PersonalInfo from './screens/PersonalInfo';
import FamilyInfo from './screens/FamilyInfo';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoanLandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Landing" element={<LoanLandingPage />} />

          <Route path="/PersonalInfo" element={<PersonalInfo />} />
          <Route path="/family-info" element={<FamilyInfo />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
