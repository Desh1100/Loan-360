import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const AIChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initial welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: Date.now(),
      type: 'bot',
      message: `👋 Hello! I'm your AI Loan Assistant. I can help you with:

📋 **Search loan applications by:**
• Application ID
• NIC (National Identity Card)
• Applicant Name

💡 **What you can ask:**
• "Show me loan application for NIC 123456789V"
• "Find application ID 64f7b2c3a1b2c3d4e5f6g7h8"
• "Search for John Doe's application"
• "Show pending loan applications"
• "What's the status of loan ID xyz123"

How can I assist you today?`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    checkConnection();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Check if chatbot server is running
  const checkConnection = async () => {
    try {
      const response = await fetch('http://localhost:5005/', {
        method: 'GET',
        mode: 'cors'
      });
      if (response.ok) {
        setIsConnected(true);
      }
    } catch (error) {
      console.log('Chatbot server not available:', error);
      setIsConnected(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      if (!isConnected) {
        // Fallback response when server is not available
        const fallbackMessage = {
          id: Date.now() + 1,
          type: 'bot',
          message: `⚠️ **AI Assistant Currently Unavailable**
          
The AI chatbot server is not running on port 5005. To enable full functionality:

1. **Start the chatbot server:**
   \`\`\`
   cd "d:\\G Final YR\\chatbot"
   python app.py
   \`\`\`

2. **Ensure the server is running on:** http://localhost:5005

**Mock Response for "${inputMessage}":**

<div class="loan-info-table">
<h3>🏦 Sample Loan Application</h3>
<table class="info-table">
<tr><th colspan="2">📋 PERSONAL INFORMATION</th></tr>
<tr><td>Full Name</td><td>John Doe</td></tr>
<tr><td>NIC</td><td>123456789V</td></tr>
<tr><td>Title</td><td>Mr.</td></tr>
<tr><td>Home Town</td><td>Colombo</td></tr>
<tr><td>Address</td><td>123 Main Street, Colombo 01</td></tr>

<tr><th colspan="2">💰 FINANCIAL INFORMATION</th></tr>
<tr><td>Basic Salary</td><td>Rs. 75,000</td></tr>
<tr><td>Annual Income</td><td>Rs. 900,000</td></tr>
<tr><td>Loan Amount</td><td>Rs. 500,000</td></tr>
<tr><td>Loan Term</td><td>36 months</td></tr>
<tr><td>CIBIL Score</td><td>720</td></tr>

<tr><th colspan="2">✅ APPLICATION STATUS</th></tr>
<tr><td>Current Status</td><td><span class="status-badge">Pending</span></td></tr>
<tr><td>Application Date</td><td>2024-11-15</td></tr>
</table>
</div>

Please start the chatbot server to get real loan data.`,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, fallbackMessage]);
        setIsLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5005/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: inputMessage }),
        mode: 'cors'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: `❌ **Error connecting to AI Assistant**

There was an issue processing your request: ${error.message}

**Troubleshooting:**
1. Ensure the chatbot server is running on port 5005
2. Check your internet connection
3. Verify the server URL is correct

Please try again or contact system administrator.`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const clearChat = () => {
    const welcomeMessage = {
      id: Date.now(),
      type: 'bot',
      message: `🔄 **Chat Cleared**

Ready for new queries! How can I help you find loan application information?`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  const formatMessage = (message) => {
    // Handle HTML content and preserve formatting
    if (message.includes('<table') || message.includes('<div class="loan-info-table">')) {
      return <div dangerouslySetInnerHTML={{ __html: message }} />;
    }
    
    // Convert markdown-like formatting to HTML
    let formatted = message
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/```([\s\S]*?)```/g, '<pre class="code-block">$1</pre>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');

    return <div dangerouslySetInnerHTML={{ __html: formatted }} />;
  };

  return (
    <div className={styles.chat_container}>
      {/* Header */}
      <div className={styles.chat_header}>
        <div className={styles.header_left}>
          <button className={styles.back_btn} onClick={handleBack}>
            <span>←</span>
          </button>
          <div className={styles.header_info}>
            <h2>🤖 AI Loan Assistant</h2>
            <p className={styles.connection_status}>
              <span className={`${styles.status_dot} ${isConnected ? styles.connected : styles.disconnected}`}></span>
              {isConnected ? 'Connected to AI Server' : 'Server Unavailable - Mock Mode'}
            </p>
          </div>
        </div>
        <div className={styles.header_actions}>
          <button className={styles.action_btn} onClick={checkConnection}>
            🔄 Refresh
          </button>
          <button className={styles.action_btn} onClick={clearChat}>
            🗑️ Clear
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className={styles.messages_container}>
        <div className={styles.messages_list}>
          {messages.map((message) => (
            <div key={message.id} className={`${styles.message} ${styles[message.type + '_message']}`}>
              <div className={styles.message_content}>
                {formatMessage(message.message)}
              </div>
              <div className={styles.message_timestamp}>
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className={`${styles.message} ${styles.bot_message} ${styles.loading_message}`}>
              <div className={styles.message_content}>
                <div className={styles.typing_indicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span>AI is thinking...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className={styles.input_container}>
        <div className={styles.input_wrapper}>
          <textarea
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about loan applications... (e.g., 'Show NIC 123456789V' or 'Find loan ID abc123')"
            className={styles.message_input}
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className={styles.send_btn}
          >
            {isLoading ? '⏳' : '📤'}
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.quick_actions}>
        <button 
          className={styles.quick_btn}
          onClick={() => setInputMessage("Show me all pending loan applications")}
        >
          📋 Pending Loans
        </button>
        <button 
          className={styles.quick_btn}
          onClick={() => setInputMessage("Show loan statistics")}
        >
          📊 Statistics
        </button>
        <button 
          className={styles.quick_btn}
          onClick={() => setInputMessage("Help me search by NIC")}
        >
          🔍 Search Help
        </button>
      </div>
    </div>
  );
};

export default AIChat;