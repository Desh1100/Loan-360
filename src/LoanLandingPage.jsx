// src/components/LoanLandingPage.jsx
import React, { useState } from 'react';
import Header from './components/ui/Header';
import HeroSection from './components/ui/HeroSection';
import FeaturesSection from './components/ui/FeaturesSection';
import ChatIcon from './components/ui/ChatIcon';
import ChatWindow from './components/ui/ChatWindow';
import './LoanLandingPage.css';

const LoanLandingPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="loan-landing-page">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ChatIcon onClick={() => setIsChatOpen(!isChatOpen)} />
      {isChatOpen && <ChatWindow onClose={() => setIsChatOpen(false)} />}
    </div>
  );
};

export default LoanLandingPage;
