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
} from 'mdb-react-ui-kit';

function Register() {
  const navigate = useNavigate(); // For navigation
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

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(''); // Clear errors on input change
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation checks
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.gender ||
      !formData.email ||
      !formData.mobile ||
      !formData.dob ||
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('Please fill in all fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      setError('Mobile number must be 10 digits.');
      return;
    }

    setLoading(true); // Show loading animation

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
          text: 'You have successfully registered! Redirecting to login page...',
          showConfirmButton: false,
          timer: 3000, // Show for 3 seconds
        });

        setTimeout(() => {
          navigate('/'); // Navigate to login page
        }, 3000);
      } else {
        setError(data.error || 'Registration failed.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false); // Hide loading animation
    }
  };

  return (
    <MDBContainer className="my-5" style={{ width: '80%', height: '70%' }}>
      <MDBCard>
        <form onSubmit={handleSubmit}>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img2.webp"
                alt="register form"
                className="rounded-start w-100"
              />
            </MDBCol>

            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">
              {/* <MDBIcon icon="user-plus" size="3x" className="me-3" style={{ color: '#ff6219' }} /> */}
              <img src="/logo.jpeg" alt="Logo" style={{ height: '45px', marginRight: '10px' }} />
                  <span className="h1 fw-bold mb-0">Register</span>
                </div>

                <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
                  Create your account
                </h5>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                {loading && (
                  <div className="text-center my-3">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}

                <MDBInput
                  wrapperClass="mb-4"
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  type="text"
                  size="lg"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  type="text"
                  size="lg"
                />

                <div className="mb-4">
                  <h6 className="fw-normal mb-2">Gender</h6>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === 'Male'}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === 'Female'}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Female</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value="Other"
                        checked={formData.gender === 'Other'}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Other</label>
                    </div>
                  </div>
                </div>

                <MDBInput
                  wrapperClass="mb-4"
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  size="lg"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Mobile Number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  type="text"
                  size="lg"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Date of Birth"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  type="date"
                  size="lg"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  type="text"
                  size="lg"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  type="password"
                  size="lg"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  type="password"
                  size="lg"
                />

                <MDBBtn className="mb-4 px-5" color="dark" size="lg" type="submit" disabled={loading}>
                  Register
                </MDBBtn>
                <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                  Already have an account?{' '}
                  <Link to="/login" style={{ color: '#393f81' }}>
                    Login here
                  </Link>
                </p>

                <div className="d-flex flex-row justify-content-start">
                  <a href="#!" className="small text-muted me-1">
                    Terms of use
                  </a>
                  <a href="#!" className="small text-muted">
                    Privacy policy
                  </a>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;
