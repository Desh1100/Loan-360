import React from 'react';
import { Link } from 'react-router-dom';
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
  return (
    <MDBContainer className="my-5" style={{width:"80%",height:"70%"}}>
      <MDBCard>
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <MDBCardImage
              src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img2.webp'
              alt="register form"
              className='rounded-start w-100'
            />
          </MDBCol>

          <MDBCol md='6' >
            <MDBCardBody className='d-flex flex-column' style={{}}>

              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="user-plus fa-3x me-3" style={{ color: '#ff6219' }} />
                <span className="h1 fw-bold mb-0">Register</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
                Create your account
              </h5>

              <MDBInput wrapperClass='mb-4' label='First Name' id='firstName' type='text' size="lg" />
              <MDBInput wrapperClass='mb-4' label='Last Name' id='lastName' type='text' size="lg" />

              
                
                <div className="mb-4">
                <h6 className="fw-normal mb-2">Gender</h6>
                <div>
                    <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="male"
                        value="Male"
                    />
                    <label className="form-check-label" htmlFor="male">
                        Male
                    </label>
                    </div>
                    <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="female"
                        value="Female"
                    />
                    <label className="form-check-label" htmlFor="female">
                        Female
                    </label>
                    </div>
                    <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="other"
                        value="Other"
                    />
                    <label className="form-check-label" htmlFor="other">
                        Other
                    </label>
                    </div>
                </div>
                </div>

          

              <MDBInput wrapperClass='mb-4' label='Email Address' id='email' type='email' size="lg" />
              <MDBInput wrapperClass='mb-4' label='Mobile Number' id='mobile' type='text' size="lg" />
              <MDBInput wrapperClass='mb-4' label='Date of Birth' id='dob' type='date' size="lg" />
              <MDBInput wrapperClass='mb-4' label='Username' id='username' type='text' size="lg" />
              <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' size="lg" />
              <MDBInput wrapperClass='mb-4' label='Confirm Password' id='confirmPassword' type='password' size="lg" />

              <MDBBtn className="mb-4 px-5" color='dark' size='lg'>Register</MDBBtn>
              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                Already have an account? <Link to="/" style={{ color: '#393f81' }}>Login here</Link>
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

export default Register;
