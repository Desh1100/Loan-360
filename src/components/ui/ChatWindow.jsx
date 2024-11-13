import React from 'react';
import Button from '../ui/button';
import '../../../src/LoanLandingPage.css';

const ChatWindow = ({ onClose }) => (
  <div className="chat-window">
    <div className="chat-header">
      <h3>Chat Support</h3>
      <Button variant="ghost" size="sm" onClick={onClose} className="close-button">
        ×
      </Button>
    </div>
    <div className="chat-content">
      <p className="chat-welcome-text">How can we help you today?</p>
    </div>
    <div className="chat-input">
      <input type="text" placeholder="Type your message..." className="input-field" />
      <Button variant="primary" size="sm" className="send-button">
        Send
      </Button>
    </div>
  </div>
);

export default ChatWindow;
