import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBTypography,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBSpinner
} from 'mdb-react-ui-kit';

function Register() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    mobile: '',
    dob: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle tab change
  const handleTabClick = (tab) => {
    if (activeTab !== tab) {
      if (tab === 'account' && !validatePersonalInfo()) {
        // Don't switch tabs if personal info validation fails
        return;
      }
      setActiveTab(tab);
    }
  };

  // Validate personal information
  const validatePersonalInfo = () => {
    let newErrors = {};
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.gender) newErrors.gender = 'Gender selection is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }
    if (!formData.dob) newErrors.dob = 'Date of birth is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate account information
  const validateAccountInfo = () => {
    let newErrors = {};
    
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear the specific error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Handle next button click
  const handleNextClick = () => {
    if (validatePersonalInfo()) {
      setActiveTab('account');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (activeTab === 'personal') {
      handleNextClick();
      return;
    }
    
    if (!validateAccountInfo()) {
      return;
    }

    setLoading(true);

    try {
      // Send data to the backend
      const response = await fetch('http://localhost:8001/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          gender: formData.gender,
          email: formData.email,
          mobile: formData.mobile,
          dob: formData.dob,
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'Your account has been created successfully!',
          confirmButtonColor: '#0a58ca',
          timer: 3000,
        });

        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setErrors({ 
          submit: data.error || 'Registration failed. Please try again.' 
        });
      }
    } catch (err) {
      setErrors({ 
        submit: 'An error occurred. Please try again later.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer className="my-5" style={{ maxWidth: '1000px' }}>
      <MDBCard className="border-0 shadow-sm">
        <MDBRow className='g-0'>
          <MDBCol md='5'>
            <div className="h-100 d-flex flex-column" 
              style={{ 
                background: 'linear-gradient(135deg, #0a58ca, #0d6efd)',
                borderRadius: '0.5rem 0 0 0.5rem' 
              }}>
              <MDBCardImage
                src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg"
                alt="Registration"
                className="p-4 img-fluid"
                style={{ objectFit: 'contain', maxHeight: '50%' }}
              />
              <div className="text-white px-4 pb-5 d-flex flex-column justify-content-end h-100">
                <MDBTypography tag='h4' className="fw-bold mb-3">Join Loan 360 Today</MDBTypography>
                <p className="mb-4">
                  Create your account to access our full range of banking services, 
                  apply for loans, and manage your financial journey.
                </p>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <MDBIcon fas icon="check-circle" className="me-2" /> Quick application process
                  </li>
                  <li className="mb-2">
                    <MDBIcon fas icon="check-circle" className="me-2" /> Competitive interest rates
                  </li>
                  <li>
                    <MDBIcon fas icon="check-circle" className="me-2" /> 24/7 online account management
                  </li>
                </ul>
              </div>
            </div>
          </MDBCol>

          <MDBCol md='7'>
            <MDBCardBody className="p-5">
              <div className="d-flex align-items-center mb-4">
                <MDBIcon fas icon="user-plus fa-2x me-3" style={{ color: '#0a58ca' }} />
                <MDBTypography tag='h3' className="fw-bold mb-0">Create an Account</MDBTypography>
              </div>

              <MDBTabs pills justify className='mb-4'>
                <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleTabClick('personal')} active={activeTab === 'personal'}>
                    <MDBIcon fas icon="user-circle" className="me-2" /> Personal Details
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleTabClick('account')} active={activeTab === 'account'}>
                    <MDBIcon fas icon="lock" className="me-2" /> Account Setup
                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>

              <form onSubmit={handleSubmit}>
                {errors.submit && (
                  <div className="alert alert-danger" role="alert">
                    <MDBIcon fas icon="exclamation-circle" className="me-2" />
                    {errors.submit}
                  </div>
                )}

                <MDBTabsContent>
                  <MDBTabsPane show={activeTab === 'personal'}>
                    <MDBRow className="g-3">
                      <MDBCol md="6">
                        <MDBInput
                          label="First Name"
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className={errors.firstName ? 'is-invalid' : ''}
                        />
                        {errors.firstName && (
                          <div className="invalid-feedback">{errors.firstName}</div>
                        )}
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput
                          label="Last Name"
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className={errors.lastName ? 'is-invalid' : ''}
                        />
                        {errors.lastName && (
                          <div className="invalid-feedback">{errors.lastName}</div>
                        )}
                      </MDBCol>

                      <MDBCol md="12">
                        <div className="mt-3 mb-2">
                          <label className="form-label">Gender</label>
                          <div className="d-flex gap-4">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="male"
                                value="Male"
                                checked={formData.gender === 'Male'}
                                onChange={handleInputChange}
                              />
                              <label className="form-check-label" htmlFor="male">
                                Male
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="female"
                                value="Female"
                                checked={formData.gender === 'Female'}
                                onChange={handleInputChange}
                              />
                              <label className="form-check-label" htmlFor="female">
                                Female
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="other"
                                value="Other"
                                checked={formData.gender === 'Other'}
                                onChange={handleInputChange}
                              />
                              <label className="form-check-label" htmlFor="other">
                                Other
                              </label>
                            </div>
                          </div>
                          {errors.gender && (
                            <div className="text-danger small">{errors.gender}</div>
                          )}
                        </div>
                      </MDBCol>

                      <MDBCol md="6">
                        <MDBInput
                          label="Email Address"
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className={errors.email ? 'is-invalid' : ''}
                        />
                        {errors.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                        )}
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput
                          label="Mobile Number"
                          id="mobile"
                          name="mobile"
                          type="tel"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          required
                          className={errors.mobile ? 'is-invalid' : ''}
                        />
                        {errors.mobile && (
                          <div className="invalid-feedback">{errors.mobile}</div>
                        )}
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput
                          label="Date of Birth"
                          id="dob"
                          name="dob"
                          type="date"
                          value={formData.dob}
                          onChange={handleInputChange}
                          required
                          className={errors.dob ? 'is-invalid' : ''}
                        />
                        {errors.dob && (
                          <div className="invalid-feedback">{errors.dob}</div>
                        )}
                      </MDBCol>
                    </MDBRow>

                    <div className="d-flex justify-content-end mt-4">
                      <MDBBtn 
                        onClick={handleNextClick}
                        style={{ 
                          background: 'linear-gradient(to right, #0a58ca, #0d6efd)',
                          boxShadow: '0 4px 8px rgba(10, 88, 202, 0.2)',
                        }}
                      >
                        Next <MDBIcon fas icon="arrow-right" className="ms-2" />
                      </MDBBtn>
                    </div>
                  </MDBTabsPane>

                  <MDBTabsPane show={activeTab === 'account'}>
                    <MDBRow className="g-3">
                      <MDBCol md="12">
                        <MDBInput
                          label="Username"
                          id="username"
                          name="username"
                          type="text"
                          value={formData.username}
                          onChange={handleInputChange}
                          required
                          className={errors.username ? 'is-invalid' : ''}
                        />
                        {errors.username && (
                          <div className="invalid-feedback">{errors.username}</div>
                        )}
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput
                          label="Password"
                          id="password"
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className={errors.password ? 'is-invalid' : ''}
                        />
                        {errors.password && (
                          <div className="invalid-feedback">{errors.password}</div>
                        )}
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput
                          label="Confirm Password"
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          className={errors.confirmPassword ? 'is-invalid' : ''}
                        />
                        {errors.confirmPassword && (
                          <div className="invalid-feedback">{errors.confirmPassword}</div>
                        )}
                      </MDBCol>
                    </MDBRow>

                    <div className="d-flex mt-4">
                      <MDBBtn 
                        color="light"
                        className="me-2"
                        onClick={() => setActiveTab('personal')}
                      >
                        <MDBIcon fas icon="arrow-left" className="me-2" /> Back
                      </MDBBtn>
                      <MDBBtn 
                        type="submit" 
                        disabled={loading}
                        style={{ 
                          background: 'linear-gradient(to right, #0a58ca, #0d6efd)',
                          boxShadow: '0 4px 8px rgba(10, 88, 202, 0.2)',
                        }}
                      >
                        {loading ? (
                          <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
                        ) : (
                          <MDBIcon fas icon="user-plus" className="me-2" />
                        )}
                        Register
                      </MDBBtn>
                    </div>
                  </MDBTabsPane>
                </MDBTabsContent>
              </form>

              <div className="mt-4 text-center">
                <p>
                  Already have an account?{' '}
                  <Link to="/" style={{ color: '#0a58ca', fontWeight: 'bold' }}>
                    Sign In
                  </Link>
                </p>
                <p className="text-muted small mt-3">
                  By registering, you agree to our{' '}
                  <a href="#!" className="text-muted fw-bold">Terms of Service</a> and{' '}
                  <a href="#!" className="text-muted fw-bold">Privacy Policy</a>
                </p>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;
