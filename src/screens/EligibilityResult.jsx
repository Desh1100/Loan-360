import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
  MDBTypography,
  MDBProgress,
  MDBProgressBar,
  MDBBadge
} from 'mdb-react-ui-kit';
import Header from '../components/ui/Header';

function EligibilityResult() {
  const navigate = useNavigate();

  // Modern design color theme (matching with LoanLandingPage)
  const colors = {
    primary: '#015b59', // Cyan/teal
    secondary: '#005a76', // Darker teal
    accent: '#ff7300', // Orange
    background: '#e9f8fb', // Light cyan background
    text: '#333333', // Dark text
    white: '#ffffff', // White
    success: '#28a745', // Green for success messages
  };

  const handleProceed = () => {
    navigate('/PersonalInfo');
  };

  return (
    <div style={{ backgroundColor: colors.background, minHeight: '100vh', paddingTop: '80px' }}>
      <Header />
      
      <MDBContainer className="py-5">
        <MDBRow className="justify-content-center">
          <MDBCol md="10" lg="8">
            <MDBCard className="shadow-5 border-0 rounded-4">
              <MDBCardBody className="p-4 p-md-5 text-center">
                {/* Progress indicator */}
                <div className="d-flex justify-content-center mb-4">
                  <div style={{ width: '80%', maxWidth: '400px' }}>
                    <MDBProgress height="6">
                      <MDBProgressBar 
                        width='100' 
                        valuemin={0} 
                        valuemax={100} 
                        style={{ backgroundColor: colors.accent }}
                      />
                    </MDBProgress>
                    <div className="d-flex justify-content-between mt-1">
                      <small className="text-muted">Eligibility</small>
                      <small className="fw-bold" style={{ color: colors.accent }}>Results</small>
                    </div>
                  </div>
                </div>
                
                {/* Success Icon */}
                <div 
                  className="mx-auto rounded-circle d-flex align-items-center justify-content-center mb-4"
                  style={{ 
                    width: '120px', 
                    height: '120px', 
                    backgroundColor: colors.success,
                    color: colors.white
                  }}
                >
                  <MDBIcon fas icon="check" size="5x" />
                </div>
                
                {/* Status Badge */}
                <MDBBadge className="mb-3 px-3 py-2" style={{ backgroundColor: colors.success }}>
                  <MDBIcon fas icon="shield-alt" className="me-2" /> Pre-Approved
                </MDBBadge>
                
                <MDBTypography tag="h2" className="fw-bold mb-3" style={{ color: colors.secondary }}>
                  Congratulations! You're Eligible
                </MDBTypography>
                
                <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                  Based on the information provided, you are eligible for a loan with Loan 360.
                  Please proceed to complete your loan application.
                </p>
                
                {/* Loan Details Card */}
                <MDBCard className="mb-4 border-0" style={{ backgroundColor: 'rgba(1, 91, 89, 0.05)' }}>
                  <MDBCardBody className="py-4">
                    <MDBTypography tag="h4" className="fw-bold mb-4" style={{ color: colors.primary }}>
                      <MDBIcon fas icon="file-invoice-dollar" className="me-2" /> Loan Details
                    </MDBTypography>
                    
                    <MDBRow className="g-4">
                      <MDBCol md="6" className="mb-3">
                        <div className="p-3 rounded-3" style={{ backgroundColor: colors.white }}>
                          <p className="mb-1 text-muted">Maximum Eligible Amount</p>
                          <h4 className="mb-0 fw-bold" style={{ color: colors.secondary }}>Rs. 200,000</h4>
                        </div>
                      </MDBCol>
                      
                      <MDBCol md="6" className="mb-3">
                        <div className="p-3 rounded-3" style={{ backgroundColor: colors.white }}>
                          <p className="mb-1 text-muted">Interest Rate</p>
                          <h4 className="mb-0 fw-bold" style={{ color: colors.accent }}>12%</h4>
                        </div>
                      </MDBCol>
                      
                      <MDBCol md="6" className="mb-3 mb-md-0">
                        <div className="p-3 rounded-3" style={{ backgroundColor: colors.white }}>
                          <p className="mb-1 text-muted">Maximum Term</p>
                          <h4 className="mb-0 fw-bold" style={{ color: colors.secondary }}>24 months</h4>
                        </div>
                      </MDBCol>
                      
                      <MDBCol md="6">
                        <div className="p-3 rounded-3" style={{ backgroundColor: colors.white }}>
                          <p className="mb-1 text-muted">Monthly Installment</p>
                          <h4 className="mb-0 fw-bold" style={{ color: colors.secondary }}>Rs. 9,388</h4>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
                
                {/* Timeline Steps */}
                <div className="position-relative pb-5 mb-4">
                  <div className="timeline-line" style={{ 
                    position: 'absolute', 
                    top: '24px', 
                    left: '50%', 
                    height: '80%', 
                    width: '2px', 
                    backgroundColor: colors.accent,
                    transform: 'translateX(-50%)'
                  }}></div>
                  
                  <MDBRow className="text-start g-3">
                    <MDBCol xs="12">
                      <div className="d-flex align-items-center">
                        <div className="timeline-icon d-flex align-items-center justify-content-center rounded-circle"
                          style={{ 
                            width: '48px', 
                            height: '48px', 
                            backgroundColor: colors.accent,
                            color: colors.white,
                            zIndex: 1
                          }}>
                          <MDBIcon fas icon="check" />
                        </div>
                        <div className="ms-3">
                          <h6 className="fw-bold mb-0" style={{ color: colors.secondary }}>Eligibility Check</h6>
                          <p className="text-muted mb-0">Completed</p>
                        </div>
                      </div>
                    </MDBCol>
                    
                    <MDBCol xs="12">
                      <div className="d-flex align-items-center">
                        <div className="timeline-icon d-flex align-items-center justify-content-center rounded-circle"
                          style={{ 
                            width: '48px', 
                            height: '48px', 
                            backgroundColor: colors.primary,
                            color: colors.white,
                            zIndex: 1
                          }}>
                          <MDBIcon fas icon="user" />
                        </div>
                        <div className="ms-3">
                          <h6 className="fw-bold mb-0" style={{ color: colors.secondary }}>Personal Details</h6>
                          <p className="text-muted mb-0">Next Step</p>
                        </div>
                      </div>
                    </MDBCol>
                    
                    <MDBCol xs="12">
                      <div className="d-flex align-items-center">
                        <div className="timeline-icon d-flex align-items-center justify-content-center rounded-circle"
                          style={{ 
                            width: '48px', 
                            height: '48px', 
                            backgroundColor: '#e0e0e0',
                            color: '#757575',
                            zIndex: 1
                          }}>
                          <MDBIcon fas icon="file-alt" />
                        </div>
                        <div className="ms-3">
                          <h6 className="fw-bold mb-0" style={{ color: '#757575' }}>Loan Approval</h6>
                          <p className="text-muted mb-0">Final Step</p>
                        </div>
                      </div>
                    </MDBCol>
                  </MDBRow>
                </div>

                {/* Action Buttons */}
                <div className="d-grid gap-2">
                  <MDBBtn 
                    onClick={handleProceed}
                    className="btn-lg rounded-pill py-3"
                    style={{ 
                      backgroundColor: colors.accent,
                      boxShadow: '0 4px 9px -4px rgba(255, 115, 0, 0.35)'
                    }}
                  >
                    <MDBIcon fas icon="arrow-right" className="me-2" /> Continue Application
                  </MDBBtn>
                  
                  <MDBBtn 
                    color="light"
                    className="rounded-pill py-2 mt-2"
                    onClick={() => navigate('/')}
                  >
                    <MDBIcon fas icon="home" className="me-2" /> Back to Home
                  </MDBBtn>
                </div>

                {/* Helpline */}
                <div className="mt-4 pt-3 border-top">
                  <p className="text-muted small mb-0">
                    Need help? Call our customer service at <strong>117 750 300</strong>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default EligibilityResult;