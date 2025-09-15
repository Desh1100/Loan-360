import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatIcon from '../components/ui/ChatIcon';
import ChatWindow from '../components/ui/ChatWindow';
import '../LoanLandingPage.css';
import Header from '../components/ui/Header';

function LoanLandingPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loanAmount, setLoanAmount] = useState(25000);
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  // New modern design color theme
  const colors = {
    primary: '#015b59', // Cyan/teal
    secondary: '#005a76', // Darker teal
    accent: '#ff7300', // Orange
    background: '#e9f8fb', // Light cyan background
    text: '#333333', // Dark text
    white: '#ffffff', // White
  };

  // Check if user is logged in when component mounts
  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      setIsLoggedIn(true);
      // Try to get user data from localStorage
      try {
        // First check for the direct username key we just added
        const directUsername = localStorage.getItem('username');
        if (directUsername) {
          setUserName(directUsername);
        } else {
          // Fall back to the old methods if directUsername is not available
          const rememberedUsername = localStorage.getItem('rememberedUsername');
          if (rememberedUsername) {
            setUserName(rememberedUsername);
          } else {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
              const userData = JSON.parse(storedUser);
              setUserName(userData.username || 'User');
            } else {
              setUserName('User'); // Default if no username is found
            }
          }
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
        setUserName('User'); // Default fallback
      }
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  }, []);

  // Handle apply loan click - redirect to login if not logged in
  const handleApplyLoan = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate('/login');
    } else {
      navigate('/eligibility-check');
    }
  };

  return (
    <div style={{ backgroundColor: colors.background }}>
      <Header />
      
      {/* Hero Section with 0% Interest Banner */}
      <div style={{ backgroundColor: colors.primary, position: 'relative', overflow: 'hidden', padding: '40px 0' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7 text-white pe-5">
              {isLoggedIn && (
                <div className="mb-3 p-3 rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <h4 style={{ color: colors.white }}>Hi, {userName}! 👋</h4>
                  <p className="mb-0" style={{ color: colors.white }}>Welcome back to Loan 360</p>
                </div>
              )}
              
              <div className="mb-4">
                <h1 className="display-1 fw-bold" style={{ color: colors.accent }}>0%</h1>
                <h2 className="display-5 fw-bold text-uppercase" style={{ color: colors.accent }}>WITH INTEREST</h2>
              </div>
              
              <h3 className="h3 fw-bold mb-3" style={{ color: colors.white }}>First loan up to</h3>
              <h2 className="display-6 fw-bold mb-4" style={{ color: colors.white }}>Rs. 20,000</h2>
              
              <div style={{ maxWidth: '400px' }}>
                <div className="mb-4">
                  <p className="mb-1 fw-semibold">Fill out the application in 5 minutes.</p>
                  <p className="mb-0 fw-semibold">Get the money </p>
                </div>
                
                <button 
                  onClick={handleApplyLoan}
                  className="btn rounded-pill px-5 py-3 fw-bold"
                  style={{ 
                    backgroundColor: colors.accent,
                    borderColor: colors.accent,
                    fontSize: '1.1rem',
                    color: colors.white
                  }}
                >
                  Apply now
                </button>
              </div>
            </div>
            
            <div className="col-md-5">
              <div className="position-relative">
                <img 
                  src="https://img.freepik.com/free-vector/bank-loan-concept-illustration_114360-21880.jpg?t=st=1745552897~exp=1745556497~hmac=bfd86adad312199497eadd71f4674134b6d804cde39b28e56f4f915b907f22b6&w=900" 
                  alt="Happy couple using financial app"
                  className="img-fluid rounded"
                  style={{ maxWidth: '90%' }}
                />
                
                {/* Loan Calculator Card */}
                <div 
                  className="card position-absolute shadow"
                  style={{ 
                    right: '10px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    maxWidth: '280px',
                    border: 'none',
                    borderRadius: '12px'
                  }}
                >
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Customer Satisfaction Section */}
      <div className="py-3" style={{ backgroundColor: colors.white }}>
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <span className="fw-bold">98%</span> of Customers are <span className="fw-bold">very satisfied</span> with <span className="fw-bold">Loan 360</span> services
          </div>
          <div>
            {/* Custom star rating instead of MDBRating */}
            <div className="star-rating d-flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <i key={star} className="fas fa-star" style={{ color: colors.accent, marginRight: '5px' }}></i>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Advantages Section */}
      <div style={{ backgroundColor: colors.secondary, padding: '40px 0' }}>
        <div className="container">
          <h2 className="text-center text-white mb-5">
            The advantages of using <span style={{ color: colors.accent }}>Loan 360</span> services
          </h2>
          
          <div className="row g-4">
            {[
              {
                icon: "https://img.freepik.com/free-vector/hourglass-concept-illustration_114360-3208.jpg?size=338&ext=jpg&ga=GA1.1.1395880969.1709078400&semt=ais",
                text: "Get a loan within a few minutes"
              },
              {
                icon: "https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?size=338&ext=jpg&ga=GA1.1.1395880969.1709078400&semt=ais",
                text: "No guarantor or income proof documents are required"
              },
              {
                icon: "https://img.freepik.com/free-vector/work-time-concept-illustration_114360-1474.jpg?size=338&ext=jpg&ga=GA1.1.1395880969.1709078400&semt=ais",
                text: "Short, convenient and easy 24/7 registration"
              }
            ].map((advantage, index) => (
              <div className="col-md-4" key={index}>
                <div className="card h-100 shadow-sm" style={{ border: 'none', borderRadius: '10px' }}>
                  <div className="card-body text-center p-4">
                    <div className="mb-4" style={{ height: '150px' }}>
                      <img
                        src={advantage.icon}
                        alt={advantage.text}
                        style={{ maxHeight: '100%', maxWidth: '100%' }}
                      />
                    </div>
                    <p className="text-center">{advantage.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Easy and Fast Service Section */}
      <div style={{ padding: '60px 0', backgroundColor: colors.white }}>
        <div className="container text-center">
          <h2 className="mb-5" style={{ color: colors.secondary }}>Easy and fast service!</h2>
          
          <div className="row g-4 justify-content-center">
            {[
              {
                icon: "hand-pointer",
                title: "Select the desired loan amount and fill out the application form"
              },
              {
                icon: "clipboard-check",
                title: "Get it approved within a few minutes"
              },
              {
                icon: "university",
                title: "The money will be transferred to your bank account"
              }
            ].map((step, index) => (
              <div className="col-md-4" key={index}>
                <div className="text-center mb-4">
                  <div 
                    className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle"
                    style={{ 
                      width: '150px', 
                      height: '150px', 
                      backgroundColor: colors.accent,
                      color: colors.white
                    }}
                  >
                    <i className={`fas fa-${step.icon} fa-4x`}></i>
                  </div>
                  <p>{step.title}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={handleApplyLoan}
            className="btn mt-4 rounded-pill px-5 py-3 fw-bold"
            style={{ 
              backgroundColor: colors.accent,
              borderColor: colors.accent,
              fontSize: '1.1rem',
              color: colors.white
            }}
          >
            {isLoggedIn ? 'Apply now' : 'Login to apply'}
          </button>
        </div>
      </div>

      {/* Who Can Use Section */}
      <div style={{ backgroundColor: colors.background, padding: '60px 0' }}>
        <div className="container">
          <h2 className="mb-5 text-center" style={{ color: colors.secondary }}>
            Who can use <span>our service?</span>
          </h2>
          
          <div className="row align-items-center">
            <div className="col-md-6 text-center mb-4 mb-md-0">
              <img 
                src="/logo.jpeg" 
                alt="Loan 360 Logo" 
                className="img-fluid" 
                style={{ maxWidth: '250px' }} 
              />
            </div>
            
            <div className="col-md-6">
              <div className="row g-4">
                {[
                  {
                    icon: "calendar-alt",
                    title: "Age",
                    description: "22 - 60 years old"
                  },
                  {
                    icon: "map-marker-alt",
                    title: "Location",
                    description: "Nationwide"
                  },
                  {
                    icon: "briefcase",
                    title: "Occupation",
                    description: "Have stable income"
                  }
                ].map((requirement, index) => (
                  <div className="col-md-12" key={index}>
                    <div className="d-flex align-items-center mb-3">
                      <div 
                        className="d-flex align-items-center justify-content-center rounded-circle me-2"
                        style={{ 
                          width: '50px', 
                          height: '50px', 
                          backgroundColor: colors.accent,
                          color: colors.white,
                          flexShrink: 0
                        }}
                      >
                        <i className={`fas fa-${requirement.icon}`}></i>
                      </div>
                      <div className="ms-0">
                        <h6 className="fw-bold mb-0">{requirement.title}</h6>
                        <p className="mb-0">{requirement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: colors.secondary, color: colors.white, padding: '48px 0 0', fontSize: '1rem', letterSpacing: '0.01em' }}>
  <div className="container">
    <div className="row mb-4">
      {/* Contact Us */}
      <div className="col-lg-3 col-md-6 mb-4 mb-md-0" style={{ textAlign: 'left' }}>
        <h5 className="mb-4 text-start" style={{ fontWeight: 700 }}>Contact Us</h5>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <i className="fas fa-phone-alt" style={{ fontSize: '1.2rem', minWidth: '32px', color: colors.accent,  }}></i>
          <span style={{ color: '#fff' }}>117750300</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <i className="fas fa-envelope" style={{ fontSize: '1.2rem', minWidth: '32px', color: colors.accent, marginRight: '12px' }}></i>
          <span style={{ color: '#fff' }}>support@loan360.lk</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <i className="fas fa-clock" style={{ fontSize: '1.2rem', minWidth: '32px', color: colors.accent, marginRight: '12px' }}></i>
          <span style={{ color: '#fff' }}>Mon - Sun: 8.30am<br />to 5.30pm</span>
        </div>
      </div>
      {/* Company */}
      <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
        <h5 className="mb-4 text-start" style={{ fontWeight: 700 }}>Company</h5>
        <ul className="list-unstyled text-start">
          <li className="mb-2"><a href="#" className="footer-link">About</a></li>
          <li className="mb-2"><a href="#" className="footer-link">Documents</a></li>
          <li className="mb-2"><a href="#" className="footer-link">Contacts</a></li>
        </ul>
      </div>
      {/* Customer */}
      <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
        <h5 className="mb-4 text-start" style={{ fontWeight: 700 }}>Customer</h5>
        <ul className="list-unstyled text-start">
          <li className="mb-2"><a href="#" className="footer-link">Upload your payment</a></li>
          <li className="mb-2"><a href="#" className="footer-link">FAQs</a></li>
          <li className="mb-2"><a href="#" className="footer-link">How to get a loan</a></li>
          <li className="mb-2"><a href="#" className="footer-link">How to repay a loan</a></li>
        </ul>
      </div>
      {/* Social */}
      <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
        <h5 className="mb-4 text-start" style={{ fontWeight: 700 }}>Social</h5>
        <ul className="list-unstyled text-start">
          <li className="mb-2"><a href="#" className="footer-link">Facebook</a></li>
          <li className="mb-2"><a href="#" className="footer-link">Instagram</a></li>
          <li className="mb-2"><a href="#" className="footer-link">Twitter</a></li>
        </ul>
      </div>
    </div>
    <hr style={{ backgroundColor: colors.white, opacity: 0.15 }} />
    <div className="row py-3">
      <div className="col-12 text-start">
        <p className="small mb-0" style={{ color: '#e0e0e0' }}>
          © {new Date().getFullYear()} All rights reserved
        </p>
        <p className="small mb-0" style={{ color: '#e0e0e0' }}>
          <span 
            onClick={() => navigate('/admin/login')} 
            style={{ 
              cursor: 'pointer', 
              textDecoration: 'underline',
              color: '#e0e0e0'
            }}
            onMouseEnter={(e) => e.target.style.color = colors.accent}
            onMouseLeave={(e) => e.target.style.color = '#e0e0e0'}
          >
            admin
          </span>
        </p>
      </div>
    </div>
  </div>
</footer>
{/* Footer link hover effect */}
<style>{`
  .footer-link {
    color: #fff;
    text-decoration: none;
    transition: color 0.2s;
  }
  .footer-link:hover {
    color: ${colors.accent};
    text-decoration: underline;
  }
`}</style>

      {/* Chat Icon */}
      <div className="chat-icon">
        <ChatIcon onClick={() => setIsChatOpen(!isChatOpen)} />
        {isChatOpen && <ChatWindow onClose={() => setIsChatOpen(false)} />}
      </div>
    </div>
  );
}

export default LoanLandingPage;