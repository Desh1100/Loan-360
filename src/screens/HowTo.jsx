import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/ui/Header';

const HowTo = () => {
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
                How to Get a Loan
              </h1>
              <p className="lead" style={{ color: colors.text }}>
                Follow these simple steps to apply for your loan in minutes
              </p>
            </div>

            {/* Process Steps */}
            <div className="card border-0 shadow-lg mb-5">
              <div className="card-body p-5">
                <h2 className="mb-5 text-center" style={{ color: colors.secondary }}>
                  The Loan Application Process
                </h2>

                {/* Step 1 */}
                <div className="row mb-5 align-items-center">
                  <div className="col-md-2 text-center">
                    <div 
                      className="mx-auto d-flex align-items-center justify-content-center rounded-circle"
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        backgroundColor: colors.accent,
                        color: colors.white,
                        fontSize: '2rem',
                        fontWeight: 'bold'
                      }}
                    >
                      1
                    </div>
                  </div>
                  <div className="col-md-10">
                    <h4 style={{ color: colors.primary }}>
                      <i className="fas fa-user-plus me-2"></i>
                      Create Your Account
                    </h4>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                      Register on Loan360 by providing your basic information. It takes less than 2 minutes! You'll need:
                    </p>
                    <ul style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                      <li>Valid email address</li>
                      <li>Phone number</li>
                      <li>Basic personal details</li>
                    </ul>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="row mb-5 align-items-center">
                  <div className="col-md-2 text-center">
                    <div 
                      className="mx-auto d-flex align-items-center justify-content-center rounded-circle"
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        backgroundColor: colors.accent,
                        color: colors.white,
                        fontSize: '2rem',
                        fontWeight: 'bold'
                      }}
                    >
                      2
                    </div>
                  </div>
                  <div className="col-md-10">
                    <h4 style={{ color: colors.primary }}>
                      <i className="fas fa-clipboard-list me-2"></i>
                      Fill Out the Application Form
                    </h4>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                      Complete our simple 3-part application form with accurate information:
                    </p>
                    <div className="row g-3 mt-2">
                      <div className="col-md-4">
                        <div className="p-3 rounded" style={{ backgroundColor: colors.background }}>
                          <h6 style={{ color: colors.primary }}>Personal Details</h6>
                          <small>Name, NIC, Address, Contact info</small>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="p-3 rounded" style={{ backgroundColor: colors.background }}>
                          <h6 style={{ color: colors.primary }}>Family & Education</h6>
                          <small>Dependents, Education level, Employment</small>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="p-3 rounded" style={{ backgroundColor: colors.background }}>
                          <h6 style={{ color: colors.primary }}>Financial Info</h6>
                          <small>Income, Assets, Loan amount needed</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="row mb-5 align-items-center">
                  <div className="col-md-2 text-center">
                    <div 
                      className="mx-auto d-flex align-items-center justify-content-center rounded-circle"
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        backgroundColor: colors.accent,
                        color: colors.white,
                        fontSize: '2rem',
                        fontWeight: 'bold'
                      }}
                    >
                      3
                    </div>
                  </div>
                  <div className="col-md-10">
                    <h4 style={{ color: colors.primary }}>
                      <i className="fas fa-robot me-2"></i>
                      Get AI-Powered Eligibility Check
                    </h4>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                      Our advanced AI system instantly analyzes your application and provides:
                    </p>
                    <ul style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                      <li>Real-time eligibility assessment</li>
                      <li>Estimated loan approval probability</li>
                      <li>Personalized recommendations to improve your chances</li>
                      <li>Suggested loan amounts and terms</li>
                    </ul>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="row mb-5 align-items-center">
                  <div className="col-md-2 text-center">
                    <div 
                      className="mx-auto d-flex align-items-center justify-content-center rounded-circle"
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        backgroundColor: colors.accent,
                        color: colors.white,
                        fontSize: '2rem',
                        fontWeight: 'bold'
                      }}
                    >
                      4
                    </div>
                  </div>
                  <div className="col-md-10">
                    <h4 style={{ color: colors.primary }}>
                      <i className="fas fa-check-circle me-2"></i>
                      Submit Your Application
                    </h4>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                      Once you're satisfied with the eligibility results, submit your application. Our team will:
                    </p>
                    <ul style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                      <li>Review your application within 24-48 hours</li>
                      <li>Verify the information provided</li>
                      <li>Contact you if additional documents are needed</li>
                      <li>Send you the final approval decision</li>
                    </ul>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="row mb-4 align-items-center">
                  <div className="col-md-2 text-center">
                    <div 
                      className="mx-auto d-flex align-items-center justify-content-center rounded-circle"
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        backgroundColor: colors.accent,
                        color: colors.white,
                        fontSize: '2rem',
                        fontWeight: 'bold'
                      }}
                    >
                      5
                    </div>
                  </div>
                  <div className="col-md-10">
                    <h4 style={{ color: colors.primary }}>
                      <i className="fas fa-money-check-alt me-2"></i>
                      Receive Your Funds
                    </h4>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                      Once approved, the loan amount will be transferred directly to your bank account within 1-2 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Requirements Section */}
            <div className="card border-0 shadow-lg mb-5">
              <div className="card-body p-5">
                <h2 className="mb-4" style={{ color: colors.secondary }}>
                  <i className="fas fa-list-check me-2"></i>
                  Eligibility Requirements
                </h2>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ 
                          width: '40px', 
                          height: '40px', 
                          backgroundColor: colors.accent,
                          color: colors.white,
                          flexShrink: 0
                        }}
                      >
                        <i className="fas fa-calendar"></i>
                      </div>
                      <div>
                        <h5 style={{ color: colors.primary }}>Age Requirement</h5>
                        <p>Must be between 22 and 60 years old</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ 
                          width: '40px', 
                          height: '40px', 
                          backgroundColor: colors.accent,
                          color: colors.white,
                          flexShrink: 0
                        }}
                      >
                        <i className="fas fa-id-card"></i>
                      </div>
                      <div>
                        <h5 style={{ color: colors.primary }}>Valid NIC</h5>
                        <p>Sri Lankan National Identity Card required</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ 
                          width: '40px', 
                          height: '40px', 
                          backgroundColor: colors.accent,
                          color: colors.white,
                          flexShrink: 0
                        }}
                      >
                        <i className="fas fa-briefcase"></i>
                      </div>
                      <div>
                        <h5 style={{ color: colors.primary }}>Stable Income</h5>
                        <p>Regular employment or business income</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ 
                          width: '40px', 
                          height: '40px', 
                          backgroundColor: colors.accent,
                          color: colors.white,
                          flexShrink: 0
                        }}
                      >
                        <i className="fas fa-chart-line"></i>
                      </div>
                      <div>
                        <h5 style={{ color: colors.primary }}>Credit History</h5>
                        <p>Good credit score improves approval chances</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center p-5 rounded" style={{ backgroundColor: colors.primary }}>
              <h3 className="mb-4" style={{ color: colors.white }}>
                Ready to Get Started?
              </h3>
              <button 
                onClick={() => navigate('/register')}
                className="btn btn-lg px-5 py-3 fw-bold me-3"
                style={{ 
                  backgroundColor: colors.accent,
                  borderColor: colors.accent,
                  color: colors.white
                }}
              >
                Create Account
                <i className="fas fa-arrow-right ms-2"></i>
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="btn btn-lg btn-outline-light px-5 py-3 fw-bold"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowTo;
