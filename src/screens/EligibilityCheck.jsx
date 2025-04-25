import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBTypography,
  MDBInputGroup,
  MDBAlert
} from 'mdb-react-ui-kit';
import Header from '../components/ui/Header';
import Loader from '../components/ui/Loader';

function EligibilityCheck() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nameWithInitials: '',
    nationalIdNumber: '',
    dateOfBirth: '',
    contactNo: '',
    monthlyIncome: '',
    monthlyExpenses: '',
    requiredLoanAmount: ''
  });
  
  // Add validation errors state
  const [errors, setErrors] = useState({});
  // Add form submission attempt state
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  // Add alert message state
  const [alertMessage, setAlertMessage] = useState(null);

  // Modern design color theme (matching with LoanLandingPage)
  const colors = {
    primary: '#015b59', // Cyan/teal
    secondary: '#005a76', // Darker teal
    accent: '#ff7300', // Orange
    background: '#e9f8fb', // Light cyan background
    text: '#333333', // Dark text
    white: '#ffffff', // White
    error: '#dc3545', // Error red
  };

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'nameWithInitials':
        return value.trim() === '' ? 'Name is required' : 
               !/^[A-Za-z\s.]{2,}$/.test(value) ? 'Please enter a valid name with initials' : '';
        
      case 'nationalIdNumber':
        return value.trim() === '' ? 'NIC is required' : 
               !/^(\d{9}[vVxX]|\d{12})$/.test(value) ? 'Please enter a valid Sri Lankan NIC number' : '';
        
      case 'dateOfBirth':
        if (value === '') return 'Date of Birth is required';
        const dob = new Date(value);
        const today = new Date();
        const age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
        return age < 18 ? 'You must be at least 18 years old' : 
               age > 60 ? 'Maximum age is 60 years' : '';
        
      case 'contactNo':
        return value.trim() === '' ? 'Contact number is required' : 
               !/^0[0-9]{9}$/.test(value) ? 'Please enter a valid 10-digit mobile number starting with 0' : '';
        
      case 'monthlyIncome':
        return value === '' ? 'Monthly income is required' : 
               isNaN(value) || Number(value) < 25000 ? 'Monthly income should be at least Rs. 25,000' : '';
        
      case 'monthlyExpenses':
        return value === '' ? 'Monthly expenses is required' : 
               isNaN(value) ? 'Please enter a valid amount' : 
               Number(value) > Number(formData.monthlyIncome) ? 'Expenses cannot exceed income' : '';
        
      case 'requiredLoanAmount':
        return value === '' ? 'Loan amount is required' : 
               isNaN(value) || Number(value) < 10000 ? 'Minimum loan amount is Rs. 10,000' : 
               Number(value) > 1000000 ? 'Maximum loan amount is Rs. 1,000,000' : '';
        
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // If user has attempted to submit once, validate on change
    if (attemptedSubmit) {
      const errorMessage = validateField(name, value);
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: errorMessage
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    // Validate all fields
    Object.entries(formData).forEach(([key, value]) => {
      const errorMessage = validateField(key, value);
      if (errorMessage) {
        newErrors[key] = errorMessage;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAttemptedSubmit(true);
    
    // Clear any previous alerts
    setAlertMessage(null);
    
    // Validate the form
    const isValid = validateForm();
    
    if (isValid) {
      setIsLoading(true);

      // For demo purposes: If the form is valid, the user is eligible
      setTimeout(() => {
        setIsLoading(false);
        navigate('/eligibility-result');
      }, 1500);
    } else {
      // Show error message
      setAlertMessage({
        type: 'danger',
        text: 'Please correct the errors in the form before submitting.'
      });
      window.scrollTo(0, 0);
    }
  };

  // Helper function to determine if a field has an error
  const hasError = (fieldName) => {
    return errors[fieldName] && errors[fieldName].length > 0;
  };

  if (isLoading) {
    return (
      <div style={{ backgroundColor: colors.background, minHeight: '100vh' }}>
        <Header />
        <MDBContainer className="d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 80px)' }}>
          <div className="text-center">
            <Loader />
            <MDBTypography tag="h4" className="mt-4" style={{ color: colors.secondary }}>
              Checking your eligibility...
            </MDBTypography>
            <p className="text-muted">Please wait while we process your information.</p>
          </div>
        </MDBContainer>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: colors.background, minHeight: '100vh' }}>
      <Header />
      
      <MDBContainer className="py-5">
        <MDBRow className="justify-content-center">
          <MDBCol md="10" lg="8">
            {/* Alert Message */}
            {alertMessage && (
              <div className={`alert alert-${alertMessage.type} mb-4`} role="alert">
                <MDBIcon 
                  fas 
                  icon={alertMessage.type === 'danger' ? 'exclamation-triangle' : 'exclamation-circle'} 
                  className="me-2"
                />
                {alertMessage.text}
              </div>
            )}
            
            <MDBCard className="shadow-5 border-0 rounded-4">
              <MDBCardHeader className="bg-transparent border-0 text-center pt-4 pb-1">
                {/* Top illustration */}
                <div className="d-flex justify-content-center mb-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{ 
                      width: '90px', 
                      height: '90px', 
                      backgroundColor: `rgba(1, 91, 89, 0.1)`,
                    }}
                  >
                    <MDBIcon fas icon="search-dollar" size="3x" style={{ color: colors.primary }} />
                  </div>
                </div>
                
                <MDBTypography tag="h2" className="fw-bold" style={{ color: colors.secondary }}>
                  Loan Eligibility Check
                </MDBTypography>
                <p className="text-muted mb-1">
                  Please fill in your details to check your eligibility
                </p>
                
                {/* Progress indicator */}
                <div className="d-flex justify-content-center mt-3 mb-3">
                  <div style={{ width: '80%', maxWidth: '400px' }}>
                    <div className="progress" style={{ height: '6px', backgroundColor: '#e9ecef' }}>
                      <div 
                        className="progress-bar" 
                        style={{ 
                          width: '100%', 
                          backgroundColor: colors.accent 
                        }}
                      ></div>
                    </div>
                    <div className="d-flex justify-content-between mt-1">
                      <small className="text-muted">Start</small>
                      <small className="fw-bold" style={{ color: colors.accent }}>Step 1</small>
                    </div>
                  </div>
                </div>
              </MDBCardHeader>
              
              <MDBCardBody className="p-4 p-md-5">
                <form onSubmit={handleSubmit} noValidate>
                  {/* Personal Information Section */}
                  <div className="mb-4">
                    <h5 className="fw-bold mb-3" style={{ color: colors.primary }}>
                      <MDBIcon fas icon="user-circle" className="me-2" /> Personal Information
                    </h5>
                    
                    <MDBRow className="mb-4">
                      <MDBCol md="6">
                        <MDBInput
                          label="Name with Initials"
                          id="nameWithInitials"
                          name="nameWithInitials"
                          type="text"
                          value={formData.nameWithInitials}
                          onChange={handleChange}
                          placeholder="e.g. A.B.C. Perera"
                          required
                          className={`mb-4 mb-md-0 ${hasError('nameWithInitials') ? 'is-invalid' : ''}`}
                        />
                        {hasError('nameWithInitials') && (
                          <div className="invalid-feedback">{errors.nameWithInitials}</div>
                        )}
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput
                          label="National ID Card Number"
                          id="nationalIdNumber"
                          name="nationalIdNumber"
                          type="text"
                          value={formData.nationalIdNumber}
                          onChange={handleChange}
                          placeholder="e.g. 991234567V"
                          required
                          className={hasError('nationalIdNumber') ? 'is-invalid' : ''}
                        />
                        {hasError('nationalIdNumber') && (
                          <div className="invalid-feedback">{errors.nationalIdNumber}</div>
                        )}
                      </MDBCol>
                    </MDBRow>
                    
                    <MDBRow className="mb-4">
                      <MDBCol md="6">
                        <MDBInput
                          label="Date of Birth"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          required
                          className={`mb-4 mb-md-0 ${hasError('dateOfBirth') ? 'is-invalid' : ''}`}
                        />
                        {hasError('dateOfBirth') && (
                          <div className="invalid-feedback">{errors.dateOfBirth}</div>
                        )}
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput
                          label="Contact Number"
                          id="contactNo"
                          name="contactNo"
                          type="tel"
                          value={formData.contactNo}
                          onChange={handleChange}
                          placeholder="e.g. 0771234567"
                          required
                          className={hasError('contactNo') ? 'is-invalid' : ''}
                        />
                        {hasError('contactNo') && (
                          <div className="invalid-feedback">{errors.contactNo}</div>
                        )}
                      </MDBCol>
                    </MDBRow>
                  </div>
                  
                  {/* Financial Information Section */}
                  <div className="mb-4">
                    <h5 className="fw-bold mb-3" style={{ color: colors.primary }}>
                      <MDBIcon fas icon="money-bill-wave" className="me-2" /> Financial Information
                    </h5>
                    
                    <MDBRow className="mb-4">
                      <MDBCol md="6">
                        <div className="mb-4 mb-md-0">
                          <label className="form-label fw-bold mb-2">Monthly Income</label>
                          <MDBInputGroup textBefore="Rs." className="mb-3">
                            <input
                              type="number"
                              className={`form-control form-control-lg ${hasError('monthlyIncome') ? 'is-invalid' : ''}`}
                              id="monthlyIncome"
                              name="monthlyIncome"
                              value={formData.monthlyIncome}
                              onChange={handleChange}
                              placeholder="Enter amount"
                              required
                              style={{ 
                                height: "58px", 
                                border: "1px solid #bdbdbd",
                                borderRadius: "0.25rem" 
                              }}
                            />
                          </MDBInputGroup>
                          {hasError('monthlyIncome') && (
                            <div className="text-danger small mt-1">{errors.monthlyIncome}</div>
                          )}
                        </div>
                      </MDBCol>
                      <MDBCol md="6">
                        <div>
                          <label className="form-label fw-bold mb-2">Monthly Expenses</label>
                          <MDBInputGroup textBefore="Rs." className="mb-3">
                            <input
                              type="number"
                              className={`form-control form-control-lg ${hasError('monthlyExpenses') ? 'is-invalid' : ''}`}
                              id="monthlyExpenses"
                              name="monthlyExpenses"
                              value={formData.monthlyExpenses}
                              onChange={handleChange}
                              placeholder="Enter amount"
                              required
                              style={{ 
                                height: "58px", 
                                border: "1px solid #bdbdbd",
                                borderRadius: "0.25rem" 
                              }}
                            />
                          </MDBInputGroup>
                          {hasError('monthlyExpenses') && (
                            <div className="text-danger small mt-1">{errors.monthlyExpenses}</div>
                          )}
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </div>
                  
                  {/* Loan Details Section */}
                  <div className="mb-4">
                    <h5 className="fw-bold mb-3" style={{ color: colors.primary }}>
                      <MDBIcon fas icon="hand-holding-usd" className="me-2" /> Loan Request
                    </h5>
                    
                    <div className="mb-4">
                      <label className="form-label fw-bold mb-2">Required Loan Amount</label>
                      <MDBInputGroup textBefore="Rs." className="mb-3">
                        <input
                          type="number"
                          className={`form-control form-control-lg ${hasError('requiredLoanAmount') ? 'is-invalid' : ''}`}
                          id="requiredLoanAmount"
                          name="requiredLoanAmount"
                          value={formData.requiredLoanAmount}
                          onChange={handleChange}
                          placeholder="Enter loan amount"
                          required
                          style={{ 
                            height: "58px", 
                            border: "1px solid #bdbdbd",
                            borderRadius: "0.25rem" 
                          }}
                        />
                      </MDBInputGroup>
                      {hasError('requiredLoanAmount') && (
                        <div className="text-danger small mt-1">{errors.requiredLoanAmount}</div>
                      )}
                    </div>
                  </div>
                  
                  {/* Validation Guidelines */}
                  <div className="mb-4 p-3 rounded-3" style={{ backgroundColor: `rgba(1, 91, 89, 0.05)` }}>
                    <h6 className="fw-bold" style={{ color: colors.primary }}>
                      <MDBIcon fas icon="clipboard-check" className="me-2" /> Eligibility Requirements
                    </h6>
                    <ul className="mb-0 ps-3 text-muted" style={{ fontSize: '0.9rem' }}>
                      <li>Age between 18 and 60 years</li>
                      <li>Monthly income of at least Rs. 25,000</li>
                      <li>Disposable income (Income - Expenses) should be sufficient to cover loan repayments</li>
                      <li>Loan amounts between Rs. 10,000 and Rs. 1,000,000</li>
                    </ul>
                  </div>
                  
                  {/* Information Notice */}
                  <div className="mb-4 p-3 rounded-3" style={{ backgroundColor: `rgba(1, 91, 89, 0.05)` }}>
                    <div className="d-flex">
                      <MDBIcon fas icon="info-circle" className="me-2 mt-1" style={{ color: colors.primary }} />
                      <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                        Your information is secure and will only be used to check your loan eligibility. No credit check will be performed at this stage.
                      </p>
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <div className="d-grid gap-2">
                    <MDBBtn
                      type="submit"
                      className="btn-lg rounded-pill py-3"
                      style={{ 
                        backgroundColor: colors.accent,
                        borderColor: colors.accent,
                        boxShadow: '0 4px 9px -4px rgba(255, 115, 0, 0.35)'
                      }}
                    >
                      <MDBIcon fas icon="check-circle" className="me-2" /> Check Eligibility
                    </MDBBtn>
                    
                    <MDBBtn 
                      color="light"
                      className="rounded-pill py-2 mt-2"
                      onClick={() => navigate('/')}
                    >
                      <MDBIcon fas icon="arrow-left" className="me-2" /> Back to Home
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default EligibilityCheck;