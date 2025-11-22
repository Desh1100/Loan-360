import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/ui/Header';

const About = () => {
  const navigate = useNavigate();
  
  const colors = {
    primary: '#015b59',
    secondary: '#005a76',
    accent: '#ff7300',
    background: '#e9f8fb',
    text: '#333333',
    white: '#ffffff',
  };

  return (
    <div style={{ backgroundColor: colors.background, minHeight: '100vh', paddingTop: '80px' }}>
      <Header />
      
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            {/* Back Button */}
            <button 
              onClick={() => navigate('/')}
              className="btn btn-outline-primary mb-4"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <i className="fas fa-arrow-left me-2"></i>
              Back to Home
            </button>

            {/* Hero Section */}
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold mb-3" style={{ color: colors.primary }}>
                About Loan 360
              </h1>
              <p className="lead" style={{ color: colors.text }}>
                Revolutionizing the lending experience with AI-powered intelligence
              </p>
            </div>

            {/* Main Content */}
            <div className="card border-0 shadow-lg mb-5">
              <div className="card-body p-5">
                <h2 className="mb-4" style={{ color: colors.secondary }}>Who We Are</h2>
                <p className="mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                  Loan360 is an innovative AI-powered loan assessment and advisory platform designed to transform the way people access credit. 
                  We combine cutting-edge Machine Learning algorithms with advanced Large Language Models to deliver instant eligibility insights, 
                  personalized financial advice, and seamless digital loan applications.
                </p>

                <h2 className="mb-4 mt-5" style={{ color: colors.secondary }}>Our Mission</h2>
                <p className="mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                  Our mission is to make borrowing simple, fast, and transparent for everyone. We believe that access to credit should be 
                  straightforward and fair, powered by intelligent technology that understands your unique financial situation.
                </p>

                <h2 className="mb-4 mt-5" style={{ color: colors.secondary }}>What Makes Us Different</h2>
                <div className="row g-4 mb-4">
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ 
                          width: '50px', 
                          height: '50px', 
                          backgroundColor: colors.accent,
                          color: colors.white,
                          flexShrink: 0
                        }}
                      >
                        <i className="fas fa-brain"></i>
                      </div>
                      <div>
                        <h5 style={{ color: colors.primary }}>AI-Powered Intelligence</h5>
                        <p style={{ lineHeight: '1.6' }}>
                          Advanced algorithms analyze your financial profile to provide accurate eligibility assessments and personalized recommendations.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ 
                          width: '50px', 
                          height: '50px', 
                          backgroundColor: colors.accent,
                          color: colors.white,
                          flexShrink: 0
                        }}
                      >
                        <i className="fas fa-bolt"></i>
                      </div>
                      <div>
                        <h5 style={{ color: colors.primary }}>Lightning Fast</h5>
                        <p style={{ lineHeight: '1.6' }}>
                          Get instant decisions on your loan eligibility within minutes, not days. Our automated system works 24/7.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ 
                          width: '50px', 
                          height: '50px', 
                          backgroundColor: colors.accent,
                          color: colors.white,
                          flexShrink: 0
                        }}
                      >
                        <i className="fas fa-shield-alt"></i>
                      </div>
                      <div>
                        <h5 style={{ color: colors.primary }}>Secure & Transparent</h5>
                        <p style={{ lineHeight: '1.6' }}>
                          Your data is protected with bank-level security, and our process is completely transparent with no hidden fees.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ 
                          width: '50px', 
                          height: '50px', 
                          backgroundColor: colors.accent,
                          color: colors.white,
                          flexShrink: 0
                        }}
                      >
                        <i className="fas fa-user-friends"></i>
                      </div>
                      <div>
                        <h5 style={{ color: colors.primary }}>Customer-Centric</h5>
                        <p style={{ lineHeight: '1.6' }}>
                          We put you first with personalized advice and support throughout your entire lending journey.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="mb-4 mt-5" style={{ color: colors.secondary }}>Our Technology</h2>
                <p className="mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                  Loan360 leverages state-of-the-art artificial intelligence and machine learning technologies to deliver unparalleled service:
                </p>
                <ul style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                  <li className="mb-2">
                    <strong>Machine Learning Models:</strong> Trained on thousands of loan applications to predict eligibility with high accuracy
                  </li>
                  <li className="mb-2">
                    <strong>Natural Language Processing:</strong> Our AI chatbot understands your questions and provides intelligent, contextual responses
                  </li>
                  <li className="mb-2">
                    <strong>Real-time Analytics:</strong> Instant processing of your financial data for immediate feedback
                  </li>
                  <li className="mb-2">
                    <strong>Automated Decision Making:</strong> Streamlined approval process that eliminates unnecessary delays
                  </li>
                </ul>

                <h2 className="mb-4 mt-5" style={{ color: colors.secondary }}>Who We Serve</h2>
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <div className="p-4 rounded" style={{ backgroundColor: colors.background }}>
                      <h5 style={{ color: colors.primary }}>
                        <i className="fas fa-users me-2"></i>
                        Individual Borrowers
                      </h5>
                      <p className="mb-0">
                        Whether you need funds for personal, educational, or business purposes, Loan360 provides quick eligibility checks 
                        and personalized loan recommendations.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-4 rounded" style={{ backgroundColor: colors.background }}>
                      <h5 style={{ color: colors.primary }}>
                        <i className="fas fa-university me-2"></i>
                        Financial Institutions
                      </h5>
                      <p className="mb-0">
                        Banks and lenders can leverage our platform to make smarter, faster lending decisions with reduced risk and 
                        improved customer satisfaction.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-5 p-4 rounded" style={{ backgroundColor: colors.primary, color: colors.white }}>
                  <h4 className="mb-3">Ready to Experience the Future of Lending?</h4>
                  <button 
                    onClick={() => navigate('/PersonalInfo')}
                    className="btn btn-lg px-5 py-3 fw-bold"
                    style={{ 
                      backgroundColor: colors.accent,
                      borderColor: colors.accent,
                      color: colors.white
                    }}
                  >
                    Apply for a Loan Now
                    <i className="fas fa-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
