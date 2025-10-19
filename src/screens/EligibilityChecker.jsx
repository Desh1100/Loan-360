import React, { useState } from 'react';
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
  MDBSpinner
} from 'mdb-react-ui-kit';
import Header from '../components/ui/Header';
import axios from 'axios';

function EligibilityChecker({ loanId }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Modern design color theme
  const colors = {
    primary: '#015b59',
    secondary: '#005a76',
    accent: '#ff7300',
    background: '#e9f8fb',
    text: '#333333',
    white: '#ffffff',
  };

  const checkEligibility = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('jwt_token');
      const storedLoanId = loanId || localStorage.getItem('recentLoanId');
      
      if (!storedLoanId) {
        throw new Error('No loan application found to check');
      }

      // Wait for 2 seconds to simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Navigate to system eligibility result
      navigate('/system-eligibility-result', { state: { loanId: storedLoanId } });
      
    } catch (error) {
      console.error('Error checking eligibility:', error);
      setError(error.message || 'Unable to check eligibility at this time');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: colors.background, minHeight: '100vh', paddingTop: '80px' }}>
      <Header />
      
      <MDBContainer className="py-5">
        <MDBRow className="justify-content-center">
          <MDBCol md="8" lg="6">
            <MDBCard className="shadow-5 border-0 rounded-4">
              <MDBCardBody className="p-5 text-center">
                {/* AI Icon */}
                <div 
                  className="mx-auto rounded-circle d-flex align-items-center justify-content-center mb-4"
                  style={{ 
                    width: '120px', 
                    height: '120px', 
                    backgroundColor: `rgba(1, 91, 89, 0.1)`,
                  }}
                >
                  <MDBIcon fas icon="robot" size="5x" style={{ color: colors.primary }} />
                </div>
                
                <MDBTypography tag="h2" className="fw-bold mb-3" style={{ color: colors.secondary }}>
                  AI Eligibility Check
                </MDBTypography>
                
                <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                  Our advanced AI system will analyze your application and provide instant eligibility results. 
                  This process is confidential and secure.
                </p>

                {/* Features */}
                <div className="mb-4 p-3 rounded-3" style={{ backgroundColor: 'rgba(1, 91, 89, 0.05)' }}>
                  <h6 className="fw-bold mb-3" style={{ color: colors.primary }}>
                    <MDBIcon fas icon="shield-alt" className="me-2" /> What We Analyze
                  </h6>
                  <ul className="list-unstyled mb-0 text-start" style={{ fontSize: '0.9rem' }}>
                    <li className="mb-2">
                      <MDBIcon fas icon="check" className="me-2" style={{ color: colors.accent }} />
                      Credit score and financial history
                    </li>
                    <li className="mb-2">
                      <MDBIcon fas icon="check" className="me-2" style={{ color: colors.accent }} />
                      Income and expense ratio
                    </li>
                    <li className="mb-2">
                      <MDBIcon fas icon="check" className="me-2" style={{ color: colors.accent }} />
                      Asset valuation and collateral
                    </li>
                    <li>
                      <MDBIcon fas icon="check" className="me-2" style={{ color: colors.accent }} />
                      Risk assessment and loan capacity
                    </li>
                  </ul>
                </div>

                {/* Confidentiality Notice */}
                <div className="mb-4 p-3 rounded-3" style={{ backgroundColor: 'rgba(255, 115, 0, 0.05)' }}>
                  <MDBIcon fas icon="user-shield" className="me-2" style={{ color: colors.accent }} />
                  <small className="text-muted">
                    <strong>Confidential & Secure:</strong> Your information is processed using bank-grade security. 
                    Results are preliminary and will be reviewed by our loan officers.
                  </small>
                </div>

                {error && (
                  <div className="alert alert-danger mb-4" role="alert">
                    <MDBIcon fas icon="exclamation-triangle" className="me-2" />
                    {error}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="d-grid gap-2">
                  <MDBBtn 
                    onClick={checkEligibility}
                    disabled={loading}
                    className="btn-lg rounded-pill py-3"
                    style={{ 
                      backgroundColor: loading ? '#cccccc' : colors.accent,
                      borderColor: loading ? '#cccccc' : colors.accent,
                      boxShadow: loading ? 'none' : '0 4px 9px -4px rgba(255, 115, 0, 0.35)'
                    }}
                  >
                    {loading ? (
                      <>
                        <MDBSpinner size="sm" className="me-2" />
                        Processing Application...
                      </>
                    ) : (
                      <>
                        <MDBIcon fas icon="search" className="me-2" /> 
                        Check My Eligibility
                      </>
                    )}
                  </MDBBtn>
                  
                  <MDBBtn 
                    color="light"
                    className="rounded-pill py-2 mt-2"
                    onClick={() => navigate('/landing')}
                    disabled={loading}
                  >
                    <MDBIcon fas icon="home" className="me-2" /> Back to Home
                  </MDBBtn>
                </div>

                {/* Processing Info */}
                {loading && (
                  <div className="mt-4 p-3 rounded-3" style={{ backgroundColor: 'rgba(1, 91, 89, 0.05)' }}>
                    <h6 className="fw-bold mb-2" style={{ color: colors.primary }}>
                      <MDBIcon fas icon="cogs" className="me-2" /> Processing Steps
                    </h6>
                    <div className="text-start">
                      <small className="text-muted d-block mb-1">
                        <MDBIcon fas icon="spinner" className="fa-spin me-2" style={{ color: colors.accent }} />
                        Analyzing financial data...
                      </small>
                      <small className="text-muted d-block mb-1">
                        <MDBIcon fas icon="calculator" className="me-2" style={{ color: colors.primary }} />
                        Calculating risk assessment...
                      </small>
                      <small className="text-muted d-block">
                        <MDBIcon fas icon="chart-line" className="me-2" style={{ color: colors.secondary }} />
                        Generating eligibility report...
                      </small>
                    </div>
                  </div>
                )}

                {/* Support Information */}
                <div className="mt-4 pt-3 border-top">
                  <p className="text-muted small mb-0">
                    Need assistance? Contact us at <strong>117 750 300</strong>
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

export default EligibilityChecker;