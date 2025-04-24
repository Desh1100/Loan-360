// src/components/FeaturesSection.jsx
import React from 'react';
import { CreditCard, ShieldCheck, BriefcaseMedical, TrendingUp } from 'lucide-react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon } from 'mdb-react-ui-kit';
import '../../../src/LoanLandingPage.css';

// Banking theme colors
const colors = {
  primary: '#015b59', // Cyan/teal
  secondary: '#005a76', // Darker teal
  accent: '#ff7300', // Orange
  text: '#333333', // Dark text
  highlight: '#ff7300', // Orange highlight (same as accent)
  cardBg: '#ffffff', // White card background
  lightBg: '#e9f8fb', // Light background
};

const features = [
  {
    icon: "credit-card",
    title: "Competitive Interest Rates",
    description: "We offer some of the most competitive rates in the industry, helping you save money over the life of your loan."
  },
  {
    icon: "shield",
    title: "Secure Banking",
    description: "Your financial data is protected by advanced encryption and multi-factor authentication systems."
  },
  {
    icon: "bolt",
    title: "Quick Approval Process",
    description: "Our streamlined approval process gets you funded within days, not weeks."
  },
  {
    icon: "chart-line",
    title: "Financial Planning Tools",
    description: "Access to comprehensive financial planning tools to help you make informed decisions."
  }
];

const FeaturesSection = () => (
  <MDBContainer fluid className="py-5" style={{ backgroundColor: colors.lightBg }}>
    <MDBContainer>
      <h2 className="text-center mb-5 fw-bold" style={{ color: colors.primary }}>
        Why Choose Loan 360
      </h2>
      
      <MDBRow className="g-4">
        {features.map((feature, index) => (
          <MDBCol lg="3" md="6" key={index}>
            <MDBCard className="h-100 shadow-sm" style={{ border: 'none', transition: 'all 0.3s ease' }}>
              <MDBCardBody className="text-center p-4">
                <div 
                  className="mb-4 d-inline-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: `rgba(10, 46, 82, 0.1)`,
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%'
                  }}
                >
                  <MDBIcon 
                    fas 
                    icon={feature.icon} 
                    size="2x" 
                    style={{ color: colors.primary }}
                  />
                </div>
                <h4 className="fw-bold mb-3" style={{ color: colors.primary }}>{feature.title}</h4>
                <p className="text-muted">{feature.description}</p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
      
      <MDBRow className="mt-5 py-4">
        <MDBCol md="6" className="mb-4 mb-md-0">
          <MDBCard style={{ border: 'none', backgroundColor: colors.primary, color: colors.text }}>
            <MDBCardBody className="p-4 d-flex flex-column">
              <h3 className="text-white mb-3 fw-bold">Loan Calculator</h3>
              <p className="text-white-50 mb-4">
                Calculate your monthly payments, total interest costs, and more with our easy-to-use loan calculator.
              </p>
              <div className="mt-auto">
                <button 
                  className="btn" 
                  style={{ 
                    backgroundColor: colors.highlight, 
                    color: colors.primary,
                    fontWeight: 'bold',
                    padding: '10px 20px',
                    borderRadius: '30px'
                  }}
                >
                  <MDBIcon fas icon="calculator" className="me-2" /> Open Calculator
                </button>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        
        <MDBCol md="6">
          <MDBCard style={{ border: 'none', backgroundColor: colors.accent, color: colors.text }}>
            <MDBCardBody className="p-4 d-flex flex-column">
              <h3 className="text-white mb-3 fw-bold">Schedule a Consultation</h3>
              <p className="text-white-50 mb-4">
                Speak with a loan officer to discuss your specific needs and get personalized recommendations.
              </p>
              <div className="mt-auto">
                <button 
                  className="btn" 
                  style={{ 
                    backgroundColor: colors.text, 
                    color: colors.primary,
                    fontWeight: 'bold',
                    padding: '10px 20px',
                    borderRadius: '30px'
                  }}
                >
                  <MDBIcon fas icon="calendar-alt" className="me-2" /> Book Appointment
                </button>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </MDBContainer>
);

export default FeaturesSection;
