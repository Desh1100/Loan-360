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
} from 'mdb-react-ui-kit';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    if (!formData.username || !formData.password) {
      setError('Both username and password are required');
      return;
    }
    setError(''); // Clear previous errors
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8001/api/users/login', formData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const { token, user } = response.data;

        // Store token and user ID in localStorage
        localStorage.setItem('jwt_token', token);
        localStorage.setItem('user_id', user._id);

        setLoading(false);
        navigate('/Landing'); // Navigate to Landing page
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <MDBCardImage
              src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp'
              alt="login form"
              className='rounded-start w-100'
            />
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>
              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                <span className="h1 fw-bold mb-0">Quick Loan1</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
                Sign into your account
              </h5>

              <MDBInput
                wrapperClass='mb-4'
                label='Username'
                id='username'
                name='username'
                type='text'
                size="lg"
                value={formData.username}
                onChange={handleInputChange}
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
              />

              {error && <p style={{ color: 'red' }}>{error}</p>}

              {loading ? (
                <MDBSpinner role="status" tag="span" size="lg" className="mx-2">
                  <span className="visually-hidden">Loading...</span>
                </MDBSpinner>
              ) : (
                <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={handleLogin}>
                  Login
                </MDBBtn>
              )}

              <a className="small text-muted" href="#!">Forgot password?</a>
              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                Don't have an account? <Link to="/register" style={{ color: '#393f81' }}>Register here</Link>
              </p>

              <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;
