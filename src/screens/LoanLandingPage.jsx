import React, { useState } from 'react';
import {
  MDBContainer,
  MDBFooter,
  MDBBtn,
  MDBCarousel,
  MDBCarouselItem,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,

} from 'mdb-react-ui-kit';

import FeaturesSection from '../components/ui/FeaturesSection';
import ChatIcon from '../components/ui/ChatIcon';
import ChatWindow from '../components/ui/ChatWindow';
import '../LoanLandingPage.css';
import Header from '../components/ui/Header';

function LoanLandingPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const loanTypes = [
    { id: 'personal', name: 'Personal Loan', icon: 'user', rate: '8.99%' },
    { id: 'home', name: 'Home Loan', icon: 'home', rate: '6.49%' },
    { id: 'business', name: 'Business Loan', icon: 'briefcase', rate: '10.99%' }
  ];

  return (
    <div style={{ backgroundColor: '#f8f9fa' }}>
      <Header />

              {/* Enhanced Carousel Section */}
        <MDBCarousel
          showControls
          showIndicators
          fade
          interval={3000}
          style={{
            maxHeight: '600px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <MDBCarouselItem itemId={1}>
            <img
              src="https://thumbs.dreamstime.com/b/man-holding-national-currency-sri-lanka-paper-money-bills-rupee-banknotes-coins-table-devaluation-high-inflation-state-285477041.jpg"
              className="d-block w-100"
              alt="First slide"
              style={{
                objectFit: 'cover',
                height: '600px',
                width: '100%',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                zIndex: 1, // ensures text is above the image
              }}
            >
              <h2 className="display-4 fw-bold">Personal Loans Made Easy</h2>
              <p className="lead">Start your journey to financial freedom</p>
            </div>
          </MDBCarouselItem>

          <MDBCarouselItem itemId={2}>
            <img
              src="https://t4.ftcdn.net/jpg/00/91/05/77/360_F_91057716_HqQb0sbXWBQ1TZzhncrInUGl1Z5P1Co8.jpg"
              className="d-block w-100"
              alt="Second slide"
              style={{
                objectFit: 'cover',
                height: '600px',
                width: '100%',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                zIndex: 1,
              }}
            >
              <h2 className="display-4 fw-bold">Get the Loan You Need</h2>
              <p className="lead">Flexible terms and easy repayment options</p>
            </div>
          </MDBCarouselItem>

          <MDBCarouselItem itemId={3}>
            <img
              src="https://s3.ap-southeast-1.amazonaws.com/dfcc.lk/wp-content/uploads/2019/06/05095108/Personal-Loans-Landing-Page.jpg"
              className="d-block w-100"
              alt="Third slide"
              style={{
                objectFit: 'cover',
                height: '600px',
                width: '100%',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                zIndex: 1,
              }}
            >
              <h2 className="display-4 fw-bold">Achieve Your Dreams with Us</h2>
              <p className="lead">Tailored loan solutions to fit your needs</p>
            </div>
          </MDBCarouselItem>
        </MDBCarousel>


      {/* Enhanced Hero Section */}
      <MDBContainer fluid className="p-5" style={{ 
        background: 'linear-gradient(135deg, #1266f1 0%, #0d47a1 100%)',
        color: 'white'
      }}>
        <MDBRow className="justify-content-center align-items-center">
          <MDBCol md="6" className="text-center">
            <h1 className="display-4 fw-bold mb-4">Welcome to BankLoanApp</h1>
            <p className="lead mb-4">Your trusted partner for easy and reliable bank loans. Apply for a loan today and achieve your dreams with us.</p>
            <MDBBtn size="lg" style={{
              background: 'white',
              color: '#1266f1',
              padding: '15px 30px',
              borderRadius: '30px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}  href="/PersonalInfo">
              <MDBIcon fas icon="file-signature" className="me-2" /> Apply Now
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {/* Loan Types Section */}
      <MDBContainer className="py-5">
        <h2 className="text-center mb-5 fw-bold">Choose Your Loan Type</h2>
        <MDBRow className="g-4">
          {loanTypes.map((loan) => (
            <MDBCol md="4" key={loan.id}>
              <MDBCard 
                className="h-100" 
                style={{
                  cursor: 'pointer',
                  transform: activeTab === loan.id ? 'translateY(-5px)' : 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === loan.id ? '0 10px 20px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.05)'
                }}
                onClick={() => setActiveTab(loan.id)}
              >
                <MDBCardBody className="text-center">
                  <div className="mb-3">
                    <MDBIcon 
                      fas 
                      icon={loan.icon} 
                      size="2x" 
                      style={{
                        color: '#1266f1',
                        backgroundColor: '#e3f2fd',
                        padding: '20px',
                        borderRadius: '50%'
                      }}
                    />
                  </div>
                  <MDBCardTitle>{loan.name}</MDBCardTitle>
                  <MDBCardText>
                    Starting from <span className="fw-bold text-primary">{loan.rate}</span> p.a.
                  </MDBCardText>
                  <MDBBtn color="primary" outline>Learn More</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>

      {/* Features Section */}
      <FeaturesSection />

      {/* Enhanced Stats Section */}
      <MDBContainer fluid className="py-5" style={{ backgroundColor: '#e3f2fd' }}>
        <MDBRow className="justify-content-center text-center g-4">
          {[
            { number: '10K+', text: 'Happy Customers' },
            { number: '$50M+', text: 'Loans Disbursed' },
            { number: '4.9/5', text: 'Customer Rating' },
            { number: '24/7', text: 'Customer Support' }
          ].map((stat, index) => (
            <MDBCol md="3" key={index}>
              <h2 className="fw-bold text-primary mb-2">{stat.number}</h2>
              <p className="mb-0">{stat.text}</p>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>

      {/* Enhanced Footer */}
      <MDBFooter className="text-white" style={{ backgroundColor: '#0d47a1' }}>
        <MDBContainer className="p-4">
          <MDBRow>
            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h5 className="fw-bold mb-4">BankLoanApp</h5>
              <p>Your trusted partner for all loan solutions.</p>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h5 className="fw-bold mb-4">Quick Links</h5>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <a href="#!" className="text-white">About Us</a>
                </li>
                <li className="mb-2">
                  <a href="#!" className="text-white">Loan Types</a>
                </li>
                <li className="mb-2">
                  <a href="#!" className="text-white">Calculator</a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h5 className="fw-bold mb-4">Contact Us</h5>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <MDBIcon fas icon="envelope" className="me-2" />
                  support@bankloanapp.com
                </li>
                <li className="mb-2">
                  <MDBIcon fas icon="phone" className="me-2" />
                  1-800-LOAN-APP
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h5 className="fw-bold mb-4">Follow Us</h5>
              <div className="d-flex gap-3">
                {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
                  <a 
                    key={social} 
                    href={`#${social}`}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      transition: 'all 0.3s ease'
                    }}
                    className="text-white hover-overlay"
                  >
                    <MDBIcon fab icon={social} />
                  </a>
                ))}
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>

        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2024 BankLoanApp. All Rights Reserved.
        </div>
      </MDBFooter>

      {/* Chat Icon */}
      <div className="chat-icon">
        <ChatIcon onClick={() => setIsChatOpen(!isChatOpen)} />
        {isChatOpen && <ChatWindow onClose={() => setIsChatOpen(false)} />}
      </div>
    </div>
  );
}

export default LoanLandingPage;