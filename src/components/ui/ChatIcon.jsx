// src/components/ChatIcon.jsx
import React from 'react';
import '../../LoanLandingPage.css';

const ChatIcon = ({ onClick }) => (
  <button
    onClick={onClick}
    className="chat-button"
    aria-label="Chat with support"
  >
    {/* New modern chat bubble SVG */}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="currentColor">
      <path d="M16 4C8.82 4 3 8.77 3 14.25c0 2.61 1.36 5.01 3.7 6.85-.18.7-.7 2.7-.9 3.51-.14.54.37.99.89.82 1.1-.36 3.13-1.13 4.13-1.51C12.98 24.8 14.46 25 16 25c7.18 0 13-4.77 13-10.25S23.18 4 16 4zm0 18c-1.41 0-2.8-.18-4.12-.54-.23-.06-.47-.05-.68.04-.6.25-2.09.77-3.18 1.14.23-.87.56-2.13.62-2.36.07-.27-.03-.56-.26-.73C5.6 17.5 5 15.92 5 14.25 5 9.4 10.03 6 16 6s11 3.4 11 8.25S21.97 22 16 22z"/>
      <circle cx="11" cy="14" r="1.5" />
      <circle cx="16" cy="14" r="1.5" />
      <circle cx="21" cy="14" r="1.5" />
    </svg>
  </button>
);

export default ChatIcon;
