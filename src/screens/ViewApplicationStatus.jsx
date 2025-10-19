import React, { useState, useEffect } from 'react';
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
  MDBBadge,
  MDBSpinner,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter
} from 'mdb-react-ui-kit';
import Header from '../components/ui/Header';
import axios from 'axios';

function ViewApplicationStatus() {
  const navigate = useNavigate();
  const [userLoans, setUserLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState(null);

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
    info: '#17a2b8', // Blue for info
  };

  useEffect(() => {
    fetchUserData();
    fetchUserLoans();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('jwt_token');
      const response = await axios.get(`http://localhost:8001/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchUserLoans = async () => {
    try {
      const token = localStorage.getItem('jwt_token');
      const userId = localStorage.getItem('user_id');
      
      if (!token || !userId) {
        setError('Please log in to view your applications');
        setLoading(false);
        return;
      }

      const response = await axios.get(`http://localhost:8001/api/loans/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUserLoans(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user loans:', error);
      setError('Unable to fetch your loan applications');
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
        return colors.info;
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return `LKR ${Number(amount).toLocaleString()}`;
  };

  const handleViewDetails = (loan) => {
    console.log('Opening modal for loan:', loan); // Debug log
    setSelectedLoan(loan);
    setShowModal(true);
  };

  const handleCheckEligibility = async (loanId) => {
    try {
      // Navigate to system eligibility result with the loan ID
      navigate('/system-eligibility-result', { state: { loanId } });
    } catch (error) {
      console.error('Error checking eligibility:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: colors.background, minHeight: '100vh', paddingTop: '80px' }}>
        <Header />
        <MDBContainer className="d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 80px)' }}>
          <div className="text-center">
            <MDBSpinner size="lg" style={{ color: colors.primary }} />
            <MDBTypography tag="h4" className="mt-4" style={{ color: colors.secondary }}>
              Loading your applications...
            </MDBTypography>
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
                    onClick={() => navigate('/login')}
                    className="me-2"
                  >
                    Login
                  </MDBBtn>
                  <MDBBtn 
                    color="light"
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

  return (
    <div style={{ backgroundColor: colors.background, minHeight: '100vh', paddingTop: '80px' }}>
      <Header />
      
      <MDBContainer className="py-5">
        {/* Header Section */}
        <MDBRow className="justify-content-center mb-5">
          <MDBCol md="10" lg="8">
            <div className="text-center">
              <MDBIcon fas icon="file-alt" size="3x" style={{ color: colors.primary }} className="mb-3" />
              <MDBTypography tag="h2" className="fw-bold mb-2" style={{ color: colors.secondary }}>
                My Loan Applications
              </MDBTypography>
              {userData && (
                <p className="text-muted mb-4">
                  Welcome back, {userData.first_name} {userData.last_name}! Here are your loan applications.
                </p>
              )}
            </div>
          </MDBCol>
        </MDBRow>

        {/* Applications List */}
        <MDBRow className="justify-content-center">
          <MDBCol md="10" lg="8">
            {userLoans.length === 0 ? (
              // No Applications Found
              <MDBCard className="shadow-5 border-0 rounded-4">
                <MDBCardBody className="p-5 text-center">
                  <MDBIcon fas icon="inbox" size="5x" style={{ color: colors.secondary, opacity: 0.3 }} className="mb-4" />
                  <MDBTypography tag="h4" className="fw-bold mb-3" style={{ color: colors.secondary }}>
                    No Loan Applications Found
                  </MDBTypography>
                  <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                    You haven't applied for any loans yet. Start your journey to financial freedom today!
                  </p>
                  
                  {/* Benefits Section */}
                  <div className="mb-4 p-4 rounded-3" style={{ backgroundColor: 'rgba(1, 91, 89, 0.05)' }}>
                    <h6 className="fw-bold mb-3" style={{ color: colors.primary }}>
                      Why Choose Loan 360?
                    </h6>
                    <MDBRow className="g-3">
                      <MDBCol md="4">
                        <div className="text-center">
                          <MDBIcon fas icon="tachometer-alt" size="2x" style={{ color: colors.accent }} className="mb-2" />
                          <p className="small mb-0">Quick Approval</p>
                        </div>
                      </MDBCol>
                      <MDBCol md="4">
                        <div className="text-center">
                          <MDBIcon fas icon="percent" size="2x" style={{ color: colors.accent }} className="mb-2" />
                          <p className="small mb-0">Competitive Rates</p>
                        </div>
                      </MDBCol>
                      <MDBCol md="4">
                        <div className="text-center">
                          <MDBIcon fas icon="shield-alt" size="2x" style={{ color: colors.accent }} className="mb-2" />
                          <p className="small mb-0">Secure Process</p>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </div>

                  <MDBBtn 
                    size="lg"
                    className="rounded-pill px-5 py-3 me-3"
                    style={{ 
                      backgroundColor: colors.accent,
                      borderColor: colors.accent
                    }}
                    onClick={() => navigate('/PersonalInfo')}
                  >
                    <MDBIcon fas icon="plus-circle" className="me-2" />
                    Apply for Loan Now
                  </MDBBtn>
                  
                  <MDBBtn 
                    color="light"
                    size="lg"
                    className="rounded-pill px-4 py-3"
                    onClick={() => navigate('/landing')}
                  >
                    <MDBIcon fas icon="home" className="me-2" />
                    Back to Home
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            ) : (
              // Applications List
              <div>
                {userLoans.map((loan, index) => (
                  <MDBCard key={loan._id || index} className="shadow-3 border-0 rounded-4 mb-4">
                    <MDBCardBody className="p-4">
                      <MDBRow className="align-items-center">
                        <MDBCol md="8">
                          <div className="d-flex align-items-start">
                            <div 
                              className="rounded-circle d-flex align-items-center justify-content-center me-3"
                              style={{ 
                                width: '60px', 
                                height: '60px', 
                                backgroundColor: `${getStatusColor(loan.status)}20`,
                                color: getStatusColor(loan.status)
                              }}
                            >
                              <MDBIcon fas icon={getStatusIcon(loan.status)} size="lg" />
                            </div>
                            <div>
                              <h5 className="fw-bold mb-2" style={{ color: colors.secondary }}>
                                {formatCurrency(loan.financial_details?.loan_amount)}
                              </h5>
                              <div className="mb-2">
                                <MDBBadge 
                                  pill 
                                  className="px-3 py-2 me-2"
                                  style={{ 
                                    backgroundColor: getStatusColor(loan.status),
                                    fontSize: '0.8rem'
                                  }}
                                >
                                  <MDBIcon fas icon="info-circle" className="me-1" />
                                  {loan.status || 'Pending'}
                                </MDBBadge>
                                <small className="text-muted">
                                  Applied on {formatDate(loan.application_date)}
                                </small>
                              </div>
                              <div className="text-muted small">
                                <MDBIcon fas icon="calendar" className="me-1" />
                                Term: {loan.financial_details?.loan_term} months
                                <span className="mx-2">|</span>
                                <MDBIcon fas icon="chart-line" className="me-1" />
                                CIBIL: {loan.financial_details?.cibil_score}
                              </div>
                            </div>
                          </div>
                        </MDBCol>
                        <MDBCol md="4" className="text-end">
                          <div className="d-grid gap-2">
                            <MDBBtn 
                              size="sm"
                              style={{ backgroundColor: colors.primary }}
                              onClick={() => handleViewDetails(loan)}
                            >
                              <MDBIcon fas icon="eye" className="me-1" />
                              View Details
                            </MDBBtn>
                            <MDBBtn 
                              size="sm"
                              color="warning"
                              onClick={() => handleCheckEligibility(loan._id)}
                            >
                              <MDBIcon fas icon="search" className="me-1" />
                              Check Status
                            </MDBBtn>
                          </div>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                ))}

                {/* Summary Card */}
                <MDBCard className="shadow-3 border-0 rounded-4 mb-4" style={{ backgroundColor: 'rgba(1, 91, 89, 0.05)' }}>
                  <MDBCardBody className="p-4">
                    <MDBRow className="text-center">
                      <MDBCol md="3">
                        <div className="mb-2">
                          <MDBIcon fas icon="file-alt" size="2x" style={{ color: colors.primary }} />
                        </div>
                        <h4 className="fw-bold mb-1" style={{ color: colors.secondary }}>
                          {userLoans.length}
                        </h4>
                        <p className="small text-muted mb-0">Total Applications</p>
                      </MDBCol>
                      <MDBCol md="3">
                        <div className="mb-2">
                          <MDBIcon fas icon="check-circle" size="2x" style={{ color: colors.success }} />
                        </div>
                        <h4 className="fw-bold mb-1" style={{ color: colors.success }}>
                          {userLoans.filter(loan => loan.status === 'Approved').length}
                        </h4>
                        <p className="small text-muted mb-0">Approved</p>
                      </MDBCol>
                      <MDBCol md="3">
                        <div className="mb-2">
                          <MDBIcon fas icon="clock" size="2x" style={{ color: colors.warning }} />
                        </div>
                        <h4 className="fw-bold mb-1" style={{ color: colors.warning }}>
                          {userLoans.filter(loan => loan.status === 'Pending').length}
                        </h4>
                        <p className="small text-muted mb-0">Pending</p>
                      </MDBCol>
                      <MDBCol md="3">
                        <div className="mb-2">
                          <MDBIcon fas icon="calculator" size="2x" style={{ color: colors.accent }} />
                        </div>
                        <h4 className="fw-bold mb-1" style={{ color: colors.accent }}>
                          {formatCurrency(userLoans.reduce((total, loan) => total + (loan.financial_details?.loan_amount || 0), 0))}
                        </h4>
                        <p className="small text-muted mb-0">Total Requested</p>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>

                {/* Action Buttons */}
                <div className="text-center">
                  <MDBBtn 
                    className="rounded-pill px-4 py-2 me-3"
                    style={{ backgroundColor: colors.accent }}
                    onClick={() => navigate('/PersonalInfo')}
                  >
                    <MDBIcon fas icon="plus" className="me-2" />
                    Apply for Another Loan
                  </MDBBtn>
                  <MDBBtn 
                    color="light"
                    className="rounded-pill px-4 py-2"
                    onClick={() => navigate('/landing')}
                  >
                    <MDBIcon fas icon="home" className="me-2" />
                    Back to Home
                  </MDBBtn>
                </div>
              </div>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {/* Loan Details Modal */}
      {showModal && (
        <>
          {/* Modal Backdrop */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 9998,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => setShowModal(false)}
          >
            {/* Modal Content */}
            <div
              style={{
                backgroundColor: colors.white,
                borderRadius: '10px',
                maxWidth: '900px',
                width: '90%',
                maxHeight: '90vh',
                overflow: 'auto',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                margin: '20px'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div style={{ 
                padding: '20px', 
                borderBottom: '1px solid #dee2e6',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h5 style={{ margin: 0, color: colors.primary }}>
                  <MDBIcon fas icon="file-alt" className="me-2" />
                  Loan Application Details
                </h5>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: colors.text
                  }}
                  onClick={() => setShowModal(false)}
                >
                  ×
                </button>
              </div>

              {/* Modal Body */}
              <div style={{ padding: '20px' }}>
                {selectedLoan && (
                  <div>
                    {/* Status Header */}
                    <div className="text-center mb-4 p-3 rounded-3" style={{ backgroundColor: `${getStatusColor(selectedLoan.status)}20` }}>
                      <MDBIcon 
                        fas 
                        icon={getStatusIcon(selectedLoan.status)} 
                        size="3x" 
                        style={{ color: getStatusColor(selectedLoan.status) }} 
                        className="mb-2"
                      />
                      <h4 className="fw-bold" style={{ color: getStatusColor(selectedLoan.status) }}>
                        {selectedLoan.status || 'Pending'}
                      </h4>
                      <small className="text-muted">
                        Applied on {formatDate(selectedLoan.application_date)}
                      </small>
                    </div>

                    {/* Personal Details */}
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3" style={{ color: colors.primary }}>
                        <MDBIcon fas icon="user" className="me-2" />
                        Personal Information
                      </h6>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <strong>Full Name:</strong>
                          <p className="mb-0">{selectedLoan.personal_details?.full_name}</p>
                        </div>
                        <div className="col-md-6">
                          <strong>NIC:</strong>
                          <p className="mb-0">{selectedLoan.personal_details?.nic}</p>
                        </div>
                        <div className="col-md-6">
                          <strong>Title:</strong>
                          <p className="mb-0">{selectedLoan.personal_details?.title}</p>
                        </div>
                        <div className="col-md-6">
                          <strong>Home Town:</strong>
                          <p className="mb-0">{selectedLoan.personal_details?.home_town}</p>
                        </div>
                        <div className="col-12">
                          <strong>Address:</strong>
                          <p className="mb-0">{selectedLoan.personal_details?.residential_address}</p>
                        </div>
                      </div>
                    </div>

                    {/* Financial Details */}
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3" style={{ color: colors.primary }}>
                        <MDBIcon fas icon="money-bill-wave" className="me-2" />
                        Financial Information
                      </h6>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <strong>Loan Amount:</strong>
                          <p className="mb-0 fw-bold" style={{ color: colors.accent }}>
                            {formatCurrency(selectedLoan.financial_details?.loan_amount)}
                          </p>
                        </div>
                        <div className="col-md-6">
                          <strong>Loan Term:</strong>
                          <p className="mb-0">{selectedLoan.financial_details?.loan_term} months</p>
                        </div>
                        <div className="col-md-6">
                          <strong>Annual Income:</strong>
                          <p className="mb-0">{formatCurrency(selectedLoan.financial_details?.annual_income)}</p>
                        </div>
                        <div className="col-md-6">
                          <strong>Basic Salary:</strong>
                          <p className="mb-0">{formatCurrency(selectedLoan.financial_details?.basic_salary)}</p>
                        </div>
                        <div className="col-md-6">
                          <strong>CIBIL Score:</strong>
                          <p className="mb-0">{selectedLoan.financial_details?.cibil_score}</p>
                        </div>
                        <div className="col-md-6">
                          <strong>Occupation:</strong>
                          <p className="mb-0">{selectedLoan.financial_details?.occupation}</p>
                        </div>
                      </div>
                    </div>

                    {/* Family Details */}
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3" style={{ color: colors.primary }}>
                        <MDBIcon fas icon="users" className="me-2" />
                        Family Information
                      </h6>
                      <div className="row g-3">
                        <div className="col-md-4">
                          <strong>Dependents:</strong>
                          <p className="mb-0">{selectedLoan.family_details?.dependents}</p>
                        </div>
                        <div className="col-md-4">
                          <strong>Education:</strong>
                          <p className="mb-0">{selectedLoan.family_details?.education}</p>
                        </div>
                        <div className="col-md-4">
                          <strong>Self Employed:</strong>
                          <p className="mb-0">{selectedLoan.family_details?.self_employed ? 'Yes' : 'No'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Asset Details */}
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3" style={{ color: colors.primary }}>
                        <MDBIcon fas icon="building" className="me-2" />
                        Asset Information
                      </h6>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <strong>Residential Assets:</strong>
                          <p className="mb-0">{formatCurrency(selectedLoan.asset_details?.residential_asset_value)}</p>
                        </div>
                        <div className="col-md-6">
                          <strong>Commercial Assets:</strong>
                          <p className="mb-0">{formatCurrency(selectedLoan.asset_details?.commercial_asset_value)}</p>
                        </div>
                        <div className="col-md-6">
                          <strong>Luxury Assets:</strong>
                          <p className="mb-0">{formatCurrency(selectedLoan.asset_details?.luxury_asset_value)}</p>
                        </div>
                        <div className="col-md-6">
                          <strong>Bank Assets:</strong>
                          <p className="mb-0">{formatCurrency(selectedLoan.asset_details?.bank_asset_value)}</p>
                        </div>
                      </div>
                    </div>

                    {/* ML Prediction Results */}
                    {selectedLoan.eligibility_details && (
                      <div className="mb-4 p-3 rounded-3" style={{ backgroundColor: 'rgba(1, 91, 89, 0.05)' }}>
                        <h6 className="fw-bold mb-3" style={{ color: colors.primary }}>
                          <MDBIcon fas icon="robot" className="me-2" />
                          ML Pre-Assessment Results
                        </h6>
                        <div className="row g-3">
                          <div className="col-md-4">
                            <strong>ML Prediction:</strong>
                            <p className="mb-0">
                              <span 
                                className="badge px-2 py-1"
                                style={{
                                  backgroundColor: selectedLoan.eligibility_details.ml_prediction === 'Approved' ? '#28a745' : '#dc3545',
                                  color: 'white'
                                }}
                              >
                                {selectedLoan.eligibility_details.ml_prediction}
                              </span>
                            </p>
                          </div>
                          <div className="col-md-4">
                            <strong>Confidence Score:</strong>
                            <p className="mb-0">
                              {(selectedLoan.eligibility_details.confidence_score * 100).toFixed(1)}%
                            </p>
                          </div>
                          <div className="col-md-4">
                            <strong>Prediction Date:</strong>
                            <p className="mb-0 small">
                              {selectedLoan.eligibility_details.prediction_timestamp ? 
                                new Date(selectedLoan.eligibility_details.prediction_timestamp).toLocaleDateString() : 'N/A'}
                            </p>
                          </div>
                        </div>
                        <div className="row g-3 mt-2">
                          <div className="col-12">
                            <small className="text-muted">
                              <MDBIcon fas icon="info-circle" className="me-1" />
                              This is an automated pre-assessment based on your financial profile. 
                              The final decision will be made by our loan officers.
                            </small>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Admin Final Decision */}
                    <div className="mb-4 p-3 rounded-3" style={{ backgroundColor: 'rgba(255, 115, 0, 0.05)' }}>
                      <h6 className="fw-bold mb-3" style={{ color: colors.accent }}>
                        <MDBIcon fas icon="user-tie" className="me-2" />
                        Admin Final Decision
                      </h6>
                      <div className="row g-3">
                        <div className="col-md-4">
                          <strong>Final Status:</strong>
                          <p className="mb-0">
                            <span 
                              className="badge px-3 py-2"
                              style={{
                                backgroundColor: getStatusColor(selectedLoan.status),
                                color: 'white',
                                fontSize: '0.9rem'
                              }}
                            >
                              {selectedLoan.status || 'Pending Review'}
                            </span>
                          </p>
                        </div>
                        <div className="col-md-4">
                          <strong>Assigned Officer:</strong>
                          <p className="mb-0">
                            {selectedLoan.assignedAdmin?.name || 'Not Assigned'}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <strong>Manual Override:</strong>
                          <p className="mb-0">
                            <span 
                              className="badge px-2 py-1"
                              style={{
                                backgroundColor: selectedLoan.eligibility_details?.manual_override ? '#ffc107' : '#6c757d',
                                color: selectedLoan.eligibility_details?.manual_override ? '#000' : 'white'
                              }}
                            >
                              {selectedLoan.eligibility_details?.manual_override ? 'Yes' : 'No'}
                            </span>
                          </p>
                        </div>
                      </div>
                      {selectedLoan.eligibility_details?.admin_notes && (
                        <div className="row g-3 mt-2">
                          <div className="col-12">
                            <strong>Admin Notes:</strong>
                            <p className="mb-0 mt-1 p-2 rounded" style={{ backgroundColor: 'rgba(255, 115, 0, 0.1)' }}>
                              {selectedLoan.eligibility_details.admin_notes}
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="row g-3 mt-2">
                        <div className="col-12">
                          <small className="text-muted">
                            <MDBIcon fas icon="shield-alt" className="me-1" />
                            This is the final decision made by our loan officers after reviewing your application.
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div style={{ 
                padding: '20px', 
                borderTop: '1px solid #dee2e6',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px'
              }}>
                <MDBBtn 
                  color="secondary" 
                  onClick={() => setShowModal(false)}
                >
                  Close
                </MDBBtn>
                {selectedLoan && (
                  <MDBBtn 
                    style={{ backgroundColor: colors.accent }}
                    onClick={() => {
                      setShowModal(false);
                      handleCheckEligibility(selectedLoan._id);
                    }}
                  >
                    <MDBIcon fas icon="search" className="me-1" />
                    Check Current Status
                  </MDBBtn>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ViewApplicationStatus;