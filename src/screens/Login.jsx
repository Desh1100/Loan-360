import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
  MDBSpinner,
  MDBTypography,
  MDBCheckbox
} from 'mdb-react-ui-kit';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '', rememberMe: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError('Both username and password are required');
      return;
    }
    setError(''); // Clear previous errors
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8001/api/users/login', 
        { 
          username: formData.username, 
          password: formData.password 
        }, 
        { withCredentials: true }
      );

      if (response.status === 200) {
        const { token, user } = response.data;

        // Store token and user ID in localStorage
        localStorage.setItem('jwt_token', token);
        localStorage.setItem('user_id', user._id);
        
        // Always store username, regardless of remember me
        localStorage.setItem('username', formData.username);
        
        // If remember me is checked, store rememberedUsername for login form persistence
        if (formData.rememberMe) {
          localStorage.setItem('rememberedUsername', formData.username);
        } else {
          localStorage.removeItem('rememberedUsername');
        }

        setLoading(false);
        navigate('/Landing'); // Navigate to Landing page
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <MDBContainer className="my-5" style={{ maxWidth: '1000px' }}>
      <MDBCard className="border-0">
        <MDBRow className="g-0">
          <MDBCol md="6">
            <div className="h-100 d-flex flex-column" 
              style={{ 
                background: `linear-gradient(135deg, #015b59, #005a76)`,
                borderRadius: '0.5rem 0 0 0.5rem' 
              }}>
              <MDBCardImage
                src="https://img.freepik.com/free-vector/login-concept-illustration_114360-757.jpg?t=st=1745510253~exp=1745513853~hmac=396a6f66a48d20350dab91711825a0f0547eacdfe849e9ee38f454fbdabf1e26&w=740"
                alt="Login"
                className="p-4 img-fluid"
                style={{ objectFit: 'contain', maxHeight: '60%' }}
              />
              <div className="text-white px-4 pb-4 d-flex flex-column justify-content-end h-100">
                <MDBTypography tag='h4' className="fw-bold mb-3">Loan 360 - Banking Solutions - Gayani</MDBTypography>
                <p className="mb-4">
                  Welcome back to our secure banking platform. Log in to access your loan applications, 
                  check your status, and manage your financial future.
                </p>
                <div className="d-flex">
                  <MDBIcon fas icon="shield-alt" size="2x" className="me-3" />
                  <div>
                    <p className="small mb-0">Bank-grade security</p>
                    <p className="small mb-0">256-bit encryption</p>
                  </div>
                </div>
              </div>
            </div>
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column p-5">
              <div className="d-flex justify-content-start mb-3">
                <MDBBtn 
                  color="light"
                  className="shadow-0"
                  onClick={() => navigate('/')}
                  style={{ padding: '8px 16px' }}
                >
                  <MDBIcon fas icon="arrow-left" className="me-2" />
                  Back to Home
                </MDBBtn>
              </div>
              
              <div className="text-center mb-4">
              <img 
                src="/logo.jpeg" 
                alt="Loan 360 Logo" 
                style={{ 
                  height: "80px", 
                  width: "auto", 
                  display: "block", 
                  margin: "0 auto" 
                }} 
              />
                <MDBTypography tag="h4" className="mt-3 fw-bold">Sign In to Your Account</MDBTypography>
                <p className="text-muted">Enter your credentials to continue</p>
              </div>

              <form onSubmit={handleLogin}>
                <MDBInput
                  wrapperClass='mb-4'
                  label='Username'
                  id='username'
                  name='username'
                  type='text'
                  size="lg"
                  value={formData.username}
                  onChange={handleInputChange}
                  autoComplete="username"
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Password'
                  id='password'
                  name='password'
                  type='password'
                  size="lg"
                  value={formData.password}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                />

                <div className='d-flex justify-content-between mx-1 mb-4'>
                  <MDBCheckbox 
                    name='rememberMe' 
                    id='rememberMe' 
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    label='Remember me' 
                  />
                  <Link to="#!" style={{ color: '#0a58ca' }}>Forgot password?</Link>
                </div>

                {error && (
                  <div className="alert alert-danger py-2 mb-4" role="alert">
                    <MDBIcon fas icon="exclamation-circle" className="me-2" />
                    {error}
                  </div>
                )}

                <MDBBtn 
                  type="submit"
                  disabled={loading}
                  className="w-100 mb-4" 
                  size="lg" 
                  style={{ 
                    background: 'linear-gradient(to right, #0a58ca, #0d6efd)',
                    boxShadow: '0 4px 8px rgba(10, 88, 202, 0.2)',
                  }}
                >
                  {loading ? (
                    <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
                  ) : (
                    <MDBIcon fas icon="sign-in-alt" className="me-2" />
                  )}
                  Sign In
                </MDBBtn>
              </form>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center mx-2 mb-0">OR</p>
              </div>

              <p className="text-center mb-5">
                Don't have an account?{' '}
                <Link to="/register" style={{ color: '#0a58ca', fontWeight: 'bold' }}>
                  Register
                </Link>
              </p>

              <div className="mt-auto text-center">
                <p className="text-muted small mb-0">
                  By signing in, you agree to our{' '}
                  <a href="#!" className="text-muted fw-bold">Terms of Service</a> and{' '}
                  <a href="#!" className="text-muted fw-bold">Privacy Policy</a>
                </p>
                <p className="text-muted small mt-2 mb-0">
                  © {new Date().getFullYear()} Loan 360. All rights reserved.
                </p>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;
