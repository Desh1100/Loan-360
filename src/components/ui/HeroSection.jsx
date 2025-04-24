// src/components/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBTypography,
  MDBAnimation
} from 'mdb-react-ui-kit';

const HeroSection = () => {
  return (
    <div className="hero-section" 
      style={{ 
        background: 'linear-gradient(to right, rgba(18, 102, 241, 0.9), rgba(13, 71, 161, 0.85)), url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1752&q=80) no-repeat center/cover',
        padding: '100px 0',
        color: 'white',
      }}
    >
      <MDBContainer>
        <MDBRow className="align-items-center">
          <MDBCol md="6" className="mb-5 mb-md-0">
            <MDBAnimation animation="fade-in-left" duration="1000ms">
              <MDBTypography tag="h1" className="display-3 fw-bold mb-4">
                Financial Solutions <br />Tailored for You
              </MDBTypography>
              <MDBTypography tag="p" className="lead mb-4 opacity-90">
                Discover personalized loan options with competitive rates and flexible terms.
                Our streamlined application process gets you funded quickly.
              </MDBTypography>
              <div className="d-flex flex-wrap gap-3">
                <MDBBtn 
                  tag={Link} 
                  to="/PersonalInfo"
                  size="lg"
                  className="shadow-5"
                  style={{
                    backgroundColor: 'white',
                    color: '#0a58ca',
                    borderRadius: '30px',
                    padding: '12px 30px',
                    fontWeight: '600'
                  }}
                >
                  <MDBIcon fas icon="file-signature" className="me-2" />
                  Apply Now
                </MDBBtn>
                <MDBBtn 
                  outline
                  color="light"
                  tag={Link}
                  to="#loan-calculator"
                  size="lg"
                  style={{
                    borderRadius: '30px',
                    padding: '12px 30px',
                    fontWeight: '600'
                  }}
                >
                  <MDBIcon fas icon="calculator" className="me-2" />
                  Loan Calculator
                </MDBBtn>
              </div>
            </MDBAnimation>
          </MDBCol>
          <MDBCol md="6" className="d-flex justify-content-center">
            <MDBAnimation animation="fade-in-right" duration="1000ms">
              <div className="d-none d-md-block position-relative" style={{ maxWidth: '450px' }}>
                <div className="card-stack">
                  <div className="credit-card" 
                    style={{ 
                      transform: 'rotate(-5deg) translateY(20px)', 
                      backgroundColor: '#0c4baa',
                      zIndex: '1' 
                    }}
                  >
                    <div className="card-logo">
                      <MDBIcon fas icon="landmark" size="2x" />
                    </div>
                    <div className="card-number">
                      •••• •••• •••• 4921
                    </div>
                    <div className="card-name">LOAN 360 PLATINUM</div>
                  </div>
                  <div className="credit-card" 
                    style={{ 
                      transform: 'rotate(3deg) translateY(-30px)', 
                      backgroundColor: '#103e83',
                      zIndex: '2' 
                    }}
                  >
                    <div className="card-logo">
                      <MDBIcon fas icon="landmark" size="2x" />
                    </div>
                    <div className="card-number">
                      •••• •••• •••• 7634
                    </div>
                    <div className="card-name">LOAN 360 GOLD</div>
                  </div>
                </div>
              </div>
            </MDBAnimation>
          </MDBCol>
        </MDBRow>

        {/* Trust Indicators */}
        <MDBRow className="mt-5 pt-4 border-top border-light">
          <MDBCol size="12" className="text-center mb-4">
            <MDBTypography tag="p" className="text-uppercase mb-0" style={{ letterSpacing: '1px', opacity: '0.8' }}>
              Trusted by thousands of customers nationwide
            </MDBTypography>
          </MDBCol>
          <MDBCol md="3" sm="6" className="mb-4 text-center">
            <MDBIcon fas icon="shield-alt" size="2x" className="mb-3" />
            <MDBTypography tag="h6" className="mb-0">Bank-Grade Security</MDBTypography>
          </MDBCol>
          <MDBCol md="3" sm="6" className="mb-4 text-center">
            <MDBIcon fas icon="bolt" size="2x" className="mb-3" />
            <MDBTypography tag="h6" className="mb-0">Quick Approval</MDBTypography>
          </MDBCol>
          <MDBCol md="3" sm="6" className="mb-4 text-center">
            <MDBIcon fas icon="percentage" size="2x" className="mb-3" />
            <MDBTypography tag="h6" className="mb-0">Competitive Rates</MDBTypography>
          </MDBCol>
          <MDBCol md="3" sm="6" className="mb-4 text-center">
            <MDBIcon fas icon="headset" size="2x" className="mb-3" />
            <MDBTypography tag="h6" className="mb-0">24/7 Support</MDBTypography>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {/* Add this CSS to the same file */}
      <style>
        {`
          .credit-card {
            width: 320px;
            height: 200px;
            border-radius: 15px;
            padding: 20px;
            color: white;
            position: absolute;
            box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
            background-image: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: all 0.3s ease;
          }
          
          .card-stack {
            position: relative;
            height: 240px;
            width: 340px;
          }
          
          .card-logo {
            display: flex;
            align-items: center;
            justify-content: flex-end;
          }
          
          .card-number {
            font-size: 1.4rem;
            letter-spacing: 2px;
            font-weight: 500;
          }
          
          .card-name {
            letter-spacing: 2px;
            font-size: 0.9rem;
            font-weight: 300;
            opacity: 0.8;
          }
        `}
      </style>
    </div>
  );
};

export default HeroSection;
