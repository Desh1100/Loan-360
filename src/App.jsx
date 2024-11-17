// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import Register from './screens/Register'; 
import LoanLandingPage from './screens/LoanLandingPage';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Landing" element={<LoanLandingPage />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
