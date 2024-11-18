import React, { useState } from 'react';
import {
  MDBContainer,

  MDBFooter,
  MDBBtn,
  MDBCarousel,
  MDBCarouselItem,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import FeaturesSection from '../components/ui/FeaturesSection';
import ChatIcon from '../components/ui/ChatIcon';
import ChatWindow from '../components/ui/ChatWindow';
import '../LoanLandingPage.css';
import Header from '../components/ui/Header'



function LoanLandingPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>


        <Header/>
           <MDBCarousel showControls>
      <MDBCarouselItem itemId={1}>
        <img src='https://cdn.prod.website-files.com/6624dafd5ec71461271eb9b5/6643d4a44587197d1d5f5457_d03003e4de2a.webp' className='d-block w-100' alt='...' />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={2}>
        <img src='https://img.freepik.com/free-vector/bank-loan-credit-mortgage-isometric-flowchart-with-financial-symbols-gradient-blue-background-3d-vector-illustration_1284-78866.jpg' className='d-block w-100' alt='...' />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={3}>
        <img src='https://visbanking.com/wp-content/uploads/2023/02/The-Ultimate-Guide-to-Bank-Loans-.jpeg' className='d-block w-100' alt='...' />
      </MDBCarouselItem>
    </MDBCarousel>
        
      {/* Hero Section */}
      <MDBContainer fluid className="text-center" style={{ backgroundColor: '#f8f9fa' }}>
      {/* <div
        className='text-center bg-image'
        style={{ backgroundImage: "url('https://media.istockphoto.com/id/1026040678/photo/real-estate-agent-and-customers-shaking-hands-together-celebrating-finished-contract-after.jpg?s=612x612&w=0&k=20&c=Ee68dE3NLOxI9OPvuBw7P22YL_QoEyIf160ehHJ85iw=')", height: '400px' }}
      > */}
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'><b>Welcome to BankLoanApp</b> </h1>
              <h5 className='mb-3'>Your trusted partner for easy and reliable bank loans. Apply for a loan today and achieve your dreams with us.</h5>
              <MDBBtn size="lg" color="success" href="/PersonalInfo">
                Apply Loan
               </MDBBtn>
            </div>
          </div>
        </div>
      {/* </div> */}
       
      </MDBContainer>

      {/* Features Section */}
      <MDBContainer className="my-5" id="features">
        <FeaturesSection />
      </MDBContainer>

      {/* Footer */}
      <MDBFooter className="text-center text-lg-start bg-light text-muted">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div>
            <span>Connect with us on social networks:</span>
          </div>
        </section>

        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">BankLoanApp</h6>
                <p>Your trusted partner for all loan solutions.</p>
              </MDBCol>
              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Quick Links</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Apply Now
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    About Us
                  </a>
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © 2024 BankLoanApp. All Rights Reserved.
        </div>
      </MDBFooter>

      {/* Chatbot */}
      <div className="chat-icon">
        <ChatIcon onClick={() => setIsChatOpen(!isChatOpen)} />
        {isChatOpen && <ChatWindow onClose={() => setIsChatOpen(false)} />}
      </div>
    </>
  );
}

export default LoanLandingPage;
