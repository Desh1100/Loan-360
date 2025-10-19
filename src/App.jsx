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
import SystemEligibilityResult from './screens/SystemEligibilityResult';
import EligibilityChecker from './screens/EligibilityChecker';
import ViewApplicationStatus from './screens/ViewApplicationStatus';
import UserProfile from './components/ui/UserProfile';

// Import Admin components
import DashBoard from './components/Admin/DashBoard';
import AutoFeedback from './components/Admin/DashBoard/AutoFeedback';
import Analytics from './components/Admin/Analytics';
import Signup from './components/Admin/Singup';
import AdminLogin from './components/Admin/Login';
import ManageAdmins from './components/Admin/ManageAdmins';
import SystemSettings from './components/Admin/SystemSettings';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoanLandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Landing" element={<LoanLandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/eligibility-check" element={<EligibilityCheck />} />
          <Route path="/eligibility-result" element={<EligibilityResult />} />
          <Route path="/system-eligibility-result" element={<SystemEligibilityResult />} />
          <Route path="/eligibility-checker" element={<EligibilityChecker />} />
          <Route path="/view-applications" element={<ViewApplicationStatus />} />
          <Route path="/PersonalInfo" element={<PersonalInfo />} />
          <Route path="/family-info" element={<FamilyInfo />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/admin/app" element={<DashBoard />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/admin/signup" element={<Signup />} />
          <Route path="/admin/auto-feedback" element={<AutoFeedback />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/manage-admins" element={<ManageAdmins />} />
          <Route path="/admin/system-settings" element={<SystemSettings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
