// src/components/ChatIcon.jsx
import React from 'react';
import { MessageCircle } from 'lucide-react';
import '../../../src/LoanLandingPage.css';

const ChatIcon = ({ onClick }) => (
  <div className="chat-icon" onClick={onClick}>
    <MessageCircle className="icon" />
  </div>
);

export default ChatIcon;
