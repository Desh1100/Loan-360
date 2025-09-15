// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './screens/Register'; 
import LoanLandingPage from './screens/LoanLandingPage';
import Login from './screens/Login';
import PersonalInfo from './screens/PersonalInfo';
import FamilyInfo from './screens/FamilyInfo';
import EligibilityCheck from './screens/EligibilityCheck';
import EligibilityResult from './screens/EligibilityResult';

// Import Admin components
import DashBoard from './components/Admin/DashBoard';
import AutoFeedback from './components/Admin/DashBoard/AutoFeedback';
import Signup from './components/Admin/Singup';
import AdminLogin from './components/Admin/Login';
import ManageAdmins from './components/Admin/ManageAdmins';

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
          <Route path="/admin/app" element={<DashBoard />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/admin/signup" element={<Signup />} />
          <Route path="/admin/auto-feedback" element={<AutoFeedback />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/manage-admins" element={<ManageAdmins />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
