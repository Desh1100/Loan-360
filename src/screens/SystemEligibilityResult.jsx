import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  MDBBadge,
  MDBSpinner
} from 'mdb-react-ui-kit';
import Header from '../components/ui/Header';
import axios from 'axios';

function SystemEligibilityResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const [eligibilityData, setEligibilityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modern design color theme (matching with LoanLandingPage)
  const colors = {
    primary: '#015b59', // Cyan/teal
    secondary: '#005a76', // Darker teal
    accent: '#ff7300', // Orange
    background: '#e9f8fb', // Light cyan background
    text: '#333333', // Dark text
    white: '#ffffff', // White
    success: '#28a745', // Green for success messages
    danger: '#dc3545', // Red for rejected
    warning: '#ffc107', // Yellow for pending
  };

  // Get loan application ID from location state or localStorage
  const loanId = location.state?.loanId || localStorage.getItem('recentLoanId');

  useEffect(() => {
    fetchEligibilityData();
  }, []);

  const fetchEligibilityData = async () => {
    try {
      if (!loanId) {
        throw new Error('No loan application found');
      }

      const token = localStorage.getItem('jwt_token');
      const response = await axios.get(`http://localhost:8001/api/loans/${loanId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setEligibilityData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching eligibility data:', error);
      setError('Unable to fetch eligibility information');
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return colors.success;
      case 'Not Eligible':
      case 'Rejected':
        return colors.danger;
      case 'Pending':
        return colors.warning;
      default:
        return colors.primary;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved':
        return 'check-circle';
      case 'Not Eligible':
      case 'Rejected':
        return 'times-circle';
      case 'Pending':
        return 'clock';
      default:
        return 'info-circle';
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case 'Approved':
        return {
          title: 'Congratulations! Your Application is Pre-Approved',
          description: 'Your loan application has been automatically approved by our system. A bank officer will review your application for final confirmation.'
        };
      case 'Not Eligible':
        return {
          title: 'Application Not Eligible',
          description: 'Based on our assessment criteria, your application does not meet the current eligibility requirements. You may reapply after improving your financial profile.'
        };
      case 'Rejected':
        return {
          title: 'Application Rejected',
          description: 'Unfortunately, your loan application has been rejected. Please review the details and consider reapplying in the future.'
        };
      case 'Pending':
        return {
          title: 'Application Under Review',
          description: 'Your application is currently being reviewed by our system. You will be notified once the evaluation is complete.'
        };
      default:
        return {
          title: 'Application Submitted',
          description: 'Your loan application has been successfully submitted and is being processed.'
        };
    }
  };

  const calculateMonthlyPayment = (amount, interestRate, termMonths) => {
    const monthlyRate = interestRate / 100 / 12;
    const payment = (amount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
                   (Math.pow(1 + monthlyRate, termMonths) - 1);
    return payment;
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: colors.background, minHeight: '100vh', paddingTop: '80px' }}>
        <Header />
        <MDBContainer className="d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 80px)' }}>
          <div className="text-center">
            <MDBSpinner size="lg" style={{ color: colors.primary }} />
            <MDBTypography tag="h4" className="mt-4" style={{ color: colors.secondary }}>
              Processing your eligibility...
            </MDBTypography>
            <p className="text-muted">Our AI system is evaluating your application</p>
          </div>
        </MDBContainer>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ backgroundColor: colors.background, minHeight: '100vh', paddingTop: '80px' }}>
        <Header />
        <MDBContainer className="py-5">
          <MDBRow className="justify-content-center">
            <MDBCol md="8" lg="6">
              <MDBCard className="shadow-5 border-0 rounded-4">
                <MDBCardBody className="p-5 text-center">
                  <MDBIcon fas icon="exclamation-triangle" size="4x" style={{ color: colors.danger }} className="mb-4" />
                  <MDBTypography tag="h3" className="mb-3" style={{ color: colors.danger }}>
                    Error
                  </MDBTypography>
                  <p className="text-muted mb-4">{error}</p>
                  <MDBBtn 
                    style={{ backgroundColor: colors.primary }} 
                    onClick={() => navigate('/landing')}
                  >
                    Back to Home
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }

  const statusInfo = getStatusMessage(eligibilityData?.status);
  const statusColor = getStatusColor(eligibilityData?.status);
  const statusIcon = getStatusIcon(eligibilityData?.status);

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
                      <small className="text-muted">Application</small>
                      <small className="fw-bold" style={{ color: colors.accent }}>Eligibility Results</small>
                    </div>
                  </div>
                </div>
                
                {/* Status Icon */}
                <div 
                  className="mx-auto rounded-circle d-flex align-items-center justify-content-center mb-4"
                  style={{ 
                    width: '120px', 
                    height: '120px', 
                    backgroundColor: statusColor,
                    color: colors.white
                  }}
                >
                  <MDBIcon fas icon={statusIcon} size="5x" />
                </div>
                
                {/* Status Badge */}
                <MDBBadge className="mb-3 px-3 py-2" style={{ backgroundColor: statusColor }}>
                  <MDBIcon fas icon="robot" className="me-2" /> System Generated
                </MDBBadge>
                
                <MDBTypography tag="h2" className="fw-bold mb-3" style={{ color: colors.secondary }}>
                  {statusInfo.title}
                </MDBTypography>
                
                <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                  {statusInfo.description}
                </p>

                {/* Confidentiality Notice */}
                <div className="mb-4 p-3 rounded-3" style={{ backgroundColor: 'rgba(1, 91, 89, 0.05)' }}>
                  <MDBIcon fas icon="shield-alt" className="me-2" style={{ color: colors.primary }} />
                  <small className="text-muted">
                    <strong>Confidential:</strong> This result is preliminary and will be reviewed by a bank officer. 
                    All information is kept strictly confidential and secure.
                  </small>
                </div>
                
                {/* Application Details Card */}
                <MDBCard className="mb-4 border-0" style={{ backgroundColor: 'rgba(1, 91, 89, 0.05)' }}>
                  <MDBCardBody className="py-4">
                    <MDBTypography tag="h4" className="fw-bold mb-4" style={{ color: colors.primary }}>
                      <MDBIcon fas icon="file-invoice-dollar" className="me-2" /> Application Summary
                    </MDBTypography>
                    
                    <MDBRow className="g-4">
                      <MDBCol md="6" className="mb-3">
                        <div className="p-3 rounded-3" style={{ backgroundColor: colors.white }}>
                          <p className="mb-1 text-muted">Requested Amount</p>
                          <h4 className="mb-0 fw-bold" style={{ color: colors.secondary }}>
                            LKR {eligibilityData?.financial_details?.loan_amount?.toLocaleString()}
                          </h4>
                        </div>
                      </MDBCol>
                      
                      <MDBCol md="6" className="mb-3">
                        <div className="p-3 rounded-3" style={{ backgroundColor: colors.white }}>
                          <p className="mb-1 text-muted">Term Period</p>
                          <h4 className="mb-0 fw-bold" style={{ color: colors.accent }}>
                            {eligibilityData?.financial_details?.loan_term} months
                          </h4>
                        </div>
                      </MDBCol>
                      
                      <MDBCol md="6" className="mb-3 mb-md-0">
                        <div className="p-3 rounded-3" style={{ backgroundColor: colors.white }}>
                          <p className="mb-1 text-muted">Annual Income</p>
                          <h4 className="mb-0 fw-bold" style={{ color: colors.secondary }}>
                            LKR {eligibilityData?.financial_details?.annual_income?.toLocaleString()}
                          </h4>
                        </div>
                      </MDBCol>
                      
                      <MDBCol md="6">
                        <div className="p-3 rounded-3" style={{ backgroundColor: colors.white }}>
                          <p className="mb-1 text-muted">CIBIL Score</p>
                          <h4 className="mb-0 fw-bold" style={{ color: colors.secondary }}>
                            {eligibilityData?.financial_details?.cibil_score}
                          </h4>
                        </div>
                      </MDBCol>
                    </MDBRow>

                    {/* ML Prediction Details (if available) */}
                    {eligibilityData?.eligibility_details && (
                      <div className="mt-4 p-3 rounded-3" style={{ backgroundColor: colors.white }}>
                        <h6 className="fw-bold mb-2" style={{ color: colors.primary }}>
                          <MDBIcon fas icon="brain" className="me-2" /> AI Assessment
                        </h6>
                        <div className="row g-2">
                          <div className="col-6">
                            <small className="text-muted">Prediction:</small>
                            <div className="fw-bold">{eligibilityData.eligibility_details.ml_prediction}</div>
                          </div>
                          <div className="col-6">
                            <small className="text-muted">Confidence:</small>
                            <div className="fw-bold">
                              {(eligibilityData.eligibility_details.confidence_score * 100).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </MDBCardBody>
                </MDBCard>
                
                {/* Estimated Monthly Payment (for approved applications) */}
                {eligibilityData?.status === 'Approved' && (
                  <div className="mb-4 p-4 rounded-3" style={{ backgroundColor: 'rgba(40, 167, 69, 0.1)', border: `1px solid ${colors.success}` }}>
                    <h6 className="fw-bold mb-3" style={{ color: colors.success }}>
                      <MDBIcon fas icon="calculator" className="me-2" /> Estimated Monthly Payment
                    </h6>
                    <h3 className="fw-bold" style={{ color: colors.success }}>
                      LKR {calculateMonthlyPayment(
                        eligibilityData.financial_details.loan_amount, 
                        12, // Assumed interest rate
                        eligibilityData.financial_details.loan_term
                      ).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </h3>
                    <small className="text-muted">*Based on 12% annual interest rate</small>
                  </div>
                )}

                {/* Next Steps */}
                <div className="mb-4 p-3 rounded-3" style={{ backgroundColor: 'rgba(255, 115, 0, 0.05)' }}>
                  <h6 className="fw-bold mb-3" style={{ color: colors.accent }}>
                    <MDBIcon fas icon="list-check" className="me-2" /> What's Next?
                  </h6>
                  {eligibilityData?.status === 'Approved' ? (
                    <ul className="text-start mb-0 ps-3" style={{ fontSize: '0.9rem' }}>
                      <li className="mb-2">A bank officer will review your application within 24-48 hours</li>
                      <li className="mb-2">You may be contacted for additional documentation</li>
                      <li className="mb-2">Final approval and disbursement typically takes 3-5 business days</li>
                      <li>You'll receive SMS and email updates on your application status</li>
                    </ul>
                  ) : eligibilityData?.status === 'Pending' ? (
                    <ul className="text-start mb-0 ps-3" style={{ fontSize: '0.9rem' }}>
                      <li className="mb-2">Your application is under automated review</li>
                      <li className="mb-2">Additional verification may be required</li>
                      <li>You'll be notified of the decision within 2-3 business days</li>
                    </ul>
                  ) : (
                    <ul className="text-start mb-0 ps-3" style={{ fontSize: '0.9rem' }}>
                      <li className="mb-2">Review your financial profile and credit score</li>
                      <li className="mb-2">Consider increasing your income or reducing existing debts</li>
                      <li>You may reapply after 30 days with improved documentation</li>
                    </ul>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="d-grid gap-2">
                  <MDBBtn 
                    onClick={() => navigate('/profile')}
                    className="btn-lg rounded-pill py-3"
                    style={{ 
                      backgroundColor: colors.primary,
                      boxShadow: '0 4px 9px -4px rgba(1, 91, 89, 0.35)'
                    }}
                  >
                    <MDBIcon fas icon="user-circle" className="me-2" /> View Application Status
                  </MDBBtn>
                  
                  <MDBBtn 
                    color="light"
                    className="rounded-pill py-2 mt-2"
                    onClick={() => navigate('/landing')}
                  >
                    <MDBIcon fas icon="home" className="me-2" /> Back to Home
                  </MDBBtn>
                </div>

                {/* Support Information */}
                <div className="mt-4 pt-3 border-top">
                  <p className="text-muted small mb-0">
                    Questions? Call our customer service at <strong>117 750 300</strong> or email <strong>support@loan360.lk</strong>
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

export default SystemEligibilityResult;