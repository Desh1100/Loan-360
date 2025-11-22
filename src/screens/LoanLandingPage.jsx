import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatIcon from '../components/ui/ChatIcon';
import ChatWindow from '../components/ui/ChatWindow';
import '../LoanLandingPage.css';
import Header from '../components/ui/Header';

function LoanLandingPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loanAmount, setLoanAmount] = useState(25000);
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userLoans, setUserLoans] = useState([]);
  const [isLoanPanelOpen, setIsLoanPanelOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const aboutSectionRef = useRef(null);
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

  // Slider data
  const slides = [
    {
      title: "Smarter Loans. Faster Decisions.",
      subtitle: "Experience the future of lending with AI-powered decisions",
      image: "/2.1.jpeg"
    },
    {
      title: "Your Intelligent Path to Financial Confidence.",
      subtitle: "Navigate your financial journey with confidence and clarity",
      image: "/1.jpeg"
    },
    {
      title: "AI-Powered Lending for a Smarter Tomorrow.",
      subtitle: "Revolutionary technology meeting your financial needs",
      image: "/4.2.jpeg"
    },
    {
      title: "Transforming Loan Decisions Through Intelligence.",
      subtitle: "Data-driven insights for better financial outcomes",
      image: "/4.1.jpeg"
    }
  ];

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Fetch user data and loan applications
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('jwt_token');
      const userId = localStorage.getItem('user_id');
      
      if (token && userId) {
        // Fetch user profile data
        const userResponse = await axios.get(`http://localhost:8001/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(userResponse.data);

        // Fetch user's loan applications
        const loansResponse = await axios.get(`http://localhost:8001/api/loans/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserLoans(loansResponse.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLoanDetailsClick = (loan) => {
    setSelectedLoan(loan);
    setIsLoanPanelOpen(true);
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
      
      // Fetch user data and loan applications
      fetchUserData();
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest('.position-relative')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  // Handle apply loan click - redirect to login if not logged in
  const handleApplyLoan = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate('/login');
    } else {
      navigate('/PersonalInfo');
    }
  };

  // Handle scroll to about section
  const scrollToAbout = () => {
    if (aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div style={{ backgroundColor: colors.background, paddingTop: '80px' }}>
      <Header />
      
      {/* AI-Powered Slider Section */}
      <div style={{ 
        backgroundColor: '#e3f2fd', 
        padding: '60px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container">
          <div className="position-relative" style={{ height: '500px' }}>
            {slides.map((slide, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: currentSlide === index ? 1 : 0,
                  transform: currentSlide === index ? 'translateX(0)' : 'translateX(100%)',
                  transition: 'opacity 1.2s ease-in-out, transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  display: 'flex',
                  alignItems: 'center',
                  pointerEvents: currentSlide === index ? 'auto' : 'none'
                }}
              >
                <div className="row align-items-center w-100">
                  <div className="col-md-6" style={{
                    animation: currentSlide === index ? 'slideInLeft 1s ease-out' : 'none'
                  }}>
                    <div style={{ paddingRight: '40px' }}>
                      <h1 className="display-4 fw-bold mb-4" style={{ 
                        color: colors.primary,
                        lineHeight: '1.2'
                      }}>
                        {slide.title}
                      </h1>
                      <p className="lead mb-4" style={{ 
                        color: colors.text,
                        fontSize: '1.3rem'
                      }}>
                        {slide.subtitle}
                      </p>
                      <div className="d-flex gap-3">
                        <button 
                          onClick={handleApplyLoan}
                          className="btn rounded-pill px-4 py-3 fw-bold"
                          style={{ 
                            backgroundColor: colors.accent,
                            borderColor: colors.accent,
                            fontSize: '1.1rem',
                            color: colors.white,
                            boxShadow: '0 4px 15px rgba(255, 115, 0, 0.3)'
                          }}
                        >
                          Get Started
                          <i className="fas fa-arrow-right ms-2"></i>
                        </button>
                        <button 
                          className="btn btn-outline-primary rounded-pill px-4 py-3 fw-bold"
                          style={{ 
                            borderColor: colors.primary,
                            color: colors.primary,
                            fontSize: '1.1rem'
                          }}
                          onClick={() => {
                            document.getElementById('advantages-section')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6" style={{
                    animation: currentSlide === index ? 'slideInRight 1s ease-out' : 'none'
                  }}>
                    <div style={{ 
                      position: 'relative',
                      padding: '20px',
                      height: '400px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        width: '100%',
                        height: '100%',
                        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
                        borderRadius: '20px',
                        opacity: 0.1,
                        zIndex: 0
                      }}></div>
                      <img 
                        src={slide.image} 
                        alt={slide.title}
                        style={{ 
                          width: '100%',
                          height: '380px',
                          objectFit: 'cover',
                          borderRadius: '20px',
                          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                          position: 'relative',
                          zIndex: 1
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Slider Controls */}
          <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
            {/* Previous Button */}
            <button
              className="btn btn-sm"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: colors.primary,
                color: colors.white,
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            
            {/* Dot Indicators */}
            <div className="d-flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    width: currentSlide === index ? '40px' : '12px',
                    height: '12px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: currentSlide === index ? colors.accent : colors.primary,
                    opacity: currentSlide === index ? 1 : 0.4,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                ></button>
              ))}
            </div>
            
            {/* Next Button */}
            <button
              className="btn btn-sm"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: colors.primary,
                color: colors.white,
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
      
      {/* User Profile Icon - positioned absolutely */}
      {isLoggedIn && (
        <div style={{ 
          position: 'fixed', 
          top: '90px', 
          right: '20px', 
          zIndex: 9999 
        }}>
          <div className="position-relative">
            <button
              className="btn rounded-circle p-0"
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: colors.accent,
                border: 'none',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              }}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <i className="fas fa-user" style={{ color: colors.white, fontSize: '1.2rem' }}></i>
            </button>
            
            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div
                className="position-absolute shadow-lg rounded"
                style={{
                  top: '60px',
                  right: '0',
                  width: '300px',
                  backgroundColor: colors.white,
                  border: `1px solid ${colors.primary}`,
                  zIndex: 10000
                }}
              >
                <div className="p-3">
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: colors.primary,
                        color: colors.white
                      }}
                    >
                      <i className="fas fa-user"></i>
                    </div>
                    <div>
                      <h6 className="mb-0" style={{ color: colors.text }}>{userName}</h6>
                      <small className="text-muted">
                        {userData?.email || 'Loading...'}
                      </small>
                    </div>
                  </div>
                  
                  {userData && (
                    <div className="mb-3">
                      <small className="text-muted">User Details:</small>
                      <div style={{ fontSize: '0.85rem', color: colors.text }}>
                        <div><strong>First Name:</strong> {userData.first_name}</div>
                        <div><strong>Last Name:</strong> {userData.last_name}</div>
                        <div><strong>Phone:</strong> {userData.phone}</div>
                        <div><strong>Joined:</strong> {new Date(userData.created_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                  )}
                  
                  {/* Loan Application Status */}
                  {userLoans.length > 0 ? (
                    <div className="mb-3">
                      <button
                        className="btn w-100"
                        style={{
                          backgroundColor: colors.primary,
                          color: colors.white,
                          fontSize: '0.9rem'
                        }}
                        onClick={() => handleLoanDetailsClick(userLoans[0])}
                      >
                        <i className="fas fa-file-alt me-2"></i>
                        Loan Application Submitted
                      </button>
                      <small className="text-muted">
                        Status: {userLoans[0].status || 'Pending'}
                      </small>
                    </div>
                  ) : (
                    <div className="mb-3">
                      <button
                        className="btn w-100"
                        style={{
                          backgroundColor: colors.accent,
                          color: colors.white,
                          fontSize: '0.9rem'
                        }}
                        onClick={handleApplyLoan}
                      >
                        <i className="fas fa-plus me-2"></i>
                        Apply for Loan
                      </button>
                    </div>
                  )}
                  
                  <hr />
                  <button
                    className="btn btn-outline-primary btn-sm w-100 mb-2"
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate('/view-applications');
                    }}
                  >
                    <i className="fas fa-list-alt me-2"></i>
                    View Applications
                  </button>
                  {/* <button
                    className="btn btn-outline-primary btn-sm w-100 mb-2"
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate('/profile');
                    }}
                  >
                    <i className="fas fa-user-cog me-2"></i>
                    View Profile
                  </button> */}
                  <button
                    className="btn btn-outline-danger btn-sm w-100"
                    onClick={() => {
                      localStorage.clear();
                      setIsLoggedIn(false);
                      setUserName('');
                      setUserData(null);
                      setUserLoans([]);
                      setIsProfileOpen(false);
                      navigate('/');
                    }}
                  >
                    <i className="fas fa-sign-out-alt me-2"></i>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Hero Section with 0% Interest Banner */}
      <div ref={aboutSectionRef} style={{ backgroundColor: colors.primary, position: 'relative', overflow: 'hidden', padding: '40px 0' }}>
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
                <h1 className="display-3 fw-bold mb-3" style={{ color: colors.white }}>Loan 360</h1>
                <p className="lead mb-4" style={{ color: colors.white, fontSize: '1.2rem', lineHeight: '1.8' }}>
                  Loan360 is an AI-powered loan assessment and advisory platform designed to make borrowing simple, fast, and transparent. 
                  Using advanced Machine Learning and Large Language Models, Loan360 delivers instant eligibility insights, personalized advice, 
                  and seamless digital loan applications. Whether you're a customer looking for clarity or a banker seeking smarter decisions, 
                  Loan360 brings intelligence, speed, and trust to every step of the lending journey.
                </p>
              </div>
              
              <h3 className="h4 fw-bold mb-4" style={{ color: colors.accent }}>
                Let's Start Your Journey with Loan360!
              </h3>
              
              <div style={{ maxWidth: '400px' }}>
                <button 
                  onClick={handleApplyLoan}
                  className="btn rounded-pill px-5 py-3 fw-bold me-3"
                  style={{ 
                    backgroundColor: colors.accent,
                    borderColor: colors.accent,
                    fontSize: '1.1rem',
                    color: colors.white
                  }}
                >
                  Apply now
                </button>
                
                {isLoggedIn && (
                  <button 
                    onClick={() => navigate('/view-applications')}
                    className="btn rounded-pill px-5 py-3 fw-bold mt-3"
                    style={{ 
                      backgroundColor: colors.primary,
                      borderColor: colors.primary,
                      fontSize: '1.1rem',
                      color: colors.white
                    }}
                  >
                    <i className="fas fa-list-alt me-2"></i>
                    View Applications
                  </button>
                )}
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
      <div id="advantages-section" style={{ backgroundColor: colors.secondary, padding: '40px 0' }}>
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
          
          <div className="d-flex flex-wrap gap-3 justify-content-center">
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
              {isLoggedIn ? 'Apply now' : 'Login to apply'}
            </button>
            
            {isLoggedIn && (
              <button 
                onClick={() => navigate('/view-applications')}
                className="btn rounded-pill px-5 py-3 fw-bold"
                style={{ 
                  backgroundColor: colors.primary,
                  borderColor: colors.primary,
                  fontSize: '1.1rem',
                  color: colors.white
                }}
              >
                <i className="fas fa-list-alt me-2"></i>
                View My Applications
              </button>
            )}
          </div>
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
          <li className="mb-2">
            <a 
              href="#" 
              className="footer-link"
              onClick={(e) => {
                e.preventDefault();
                navigate('/about');
              }}
            >
              About
            </a>
          </li>
          <li className="mb-2">
            <a 
              href="#" 
              className="footer-link"
              onClick={(e) => {
                e.preventDefault();
                navigate('/contact');
              }}
            >
              Documents
            </a>
          </li>
          <li className="mb-2">
            <a 
              href="#" 
              className="footer-link"
              onClick={(e) => {
                e.preventDefault();
                navigate('/contact');
              }}
            >
              Contacts
            </a>
          </li>
        </ul>
      </div>
      {/* Customer */}
      <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
        <h5 className="mb-4 text-start" style={{ fontWeight: 700 }}>Customer</h5>
        <ul className="list-unstyled text-start">
          <li className="mb-2">
            <a 
              href="#" 
              className="footer-link"
              onClick={(e) => {
                e.preventDefault();
                navigate('/contact');
              }}
            >
              Upload your payment
            </a>
          </li>
          <li className="mb-2">
            <a 
              href="#" 
              className="footer-link"
              onClick={(e) => {
                e.preventDefault();
                navigate('/faqs');
              }}
            >
              FAQs
            </a>
          </li>
          <li className="mb-2">
            <a 
              href="#" 
              className="footer-link"
              onClick={(e) => {
                e.preventDefault();
                navigate('/how-to');
              }}
            >
              How to get a loan
            </a>
          </li>
          <li className="mb-2">
            <a 
              href="#" 
              className="footer-link"
              onClick={(e) => {
                e.preventDefault();
                navigate('/faqs');
              }}
            >
              How to repay a loan
            </a>
          </li>
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

      {/* Loan Details Side Panel */}
      {isLoanPanelOpen && selectedLoan && (
        <>
          {/* Overlay */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 9998
            }}
            onClick={() => setIsLoanPanelOpen(false)}
          ></div>
          
          {/* Side Panel */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '400px',
              height: '100%',
              backgroundColor: colors.white,
              boxShadow: '-4px 0 20px rgba(0,0,0,0.3)',
              zIndex: 9999,
              overflow: 'auto'
            }}
          >
            <div className="p-4">
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 style={{ color: colors.primary, margin: 0 }}>
                  <i className="fas fa-file-alt me-2"></i>
                  Loan Application Details
                </h5>
                <button
                  className="btn btn-sm"
                  style={{ color: colors.text }}
                  onClick={() => setIsLoanPanelOpen(false)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              {/* Application Status */}
              <div className="mb-4 p-3 rounded" style={{ backgroundColor: colors.background }}>
                <div className="d-flex align-items-center justify-content-between">
                  <span style={{ color: colors.text }}>Status:</span>
                  <span
                    className="badge px-3 py-2"
                    style={{
                      backgroundColor: selectedLoan.status === 'Approved' ? '#28a745' : 
                                     selectedLoan.status === 'Rejected' ? '#dc3545' : colors.accent,
                      color: colors.white
                    }}
                  >
                    {selectedLoan.status || 'Pending'}
                  </span>
                </div>
              </div>
              
              {/* Personal Details */}
              <div className="mb-4">
                <h6 style={{ color: colors.secondary }}>Personal Information</h6>
                <div className="border rounded p-3">
                  <div className="row g-2">
                    <div className="col-12">
                      <small className="text-muted">Full Name:</small>
                      <div>{selectedLoan.personal_details?.full_name}</div>
                    </div>
                    <div className="col-12">
                      <small className="text-muted">NIC:</small>
                      <div>{selectedLoan.personal_details?.nic}</div>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Title:</small>
                      <div>{selectedLoan.personal_details?.title}</div>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Home Town:</small>
                      <div>{selectedLoan.personal_details?.home_town}</div>
                    </div>
                    <div className="col-12">
                      <small className="text-muted">Address:</small>
                      <div>{selectedLoan.personal_details?.residential_address}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Family Details */}
              <div className="mb-4">
                <h6 style={{ color: colors.secondary }}>Family & Education</h6>
                <div className="border rounded p-3">
                  <div className="row g-2">
                    <div className="col-6">
                      <small className="text-muted">Dependents:</small>
                      <div>{selectedLoan.family_details?.dependents}</div>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Education:</small>
                      <div>{selectedLoan.family_details?.education}</div>
                    </div>
                    <div className="col-12">
                      <small className="text-muted">Self Employed:</small>
                      <div>{selectedLoan.family_details?.self_employed ? 'Yes' : 'No'}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Financial Details */}
              <div className="mb-4">
                <h6 style={{ color: colors.secondary }}>Financial Information</h6>
                <div className="border rounded p-3">
                  <div className="row g-2">
                    <div className="col-6">
                      <small className="text-muted">Basic Salary:</small>
                      <div>LKR {selectedLoan.financial_details?.basic_salary?.toLocaleString()}</div>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Annual Income:</small>
                      <div>LKR {selectedLoan.financial_details?.annual_income?.toLocaleString()}</div>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Loan Amount:</small>
                      <div>LKR {selectedLoan.financial_details?.loan_amount?.toLocaleString()}</div>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Loan Term:</small>
                      <div>{selectedLoan.financial_details?.loan_term} months</div>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">CIBIL Score:</small>
                      <div>{selectedLoan.financial_details?.cibil_score}</div>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Occupation:</small>
                      <div>{selectedLoan.financial_details?.occupation}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Asset Details */}
              <div className="mb-4">
                <h6 style={{ color: colors.secondary }}>Asset Information</h6>
                <div className="border rounded p-3">
                  <div className="row g-2">
                    <div className="col-6">
                      <small className="text-muted">Residential:</small>
                      <div>LKR {selectedLoan.asset_details?.residential_asset_value?.toLocaleString()}</div>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Commercial:</small>
                      <div>LKR {selectedLoan.asset_details?.commercial_asset_value?.toLocaleString()}</div>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Luxury:</small>
                      <div>LKR {selectedLoan.asset_details?.luxury_asset_value?.toLocaleString()}</div>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Bank:</small>
                      <div>LKR {selectedLoan.asset_details?.bank_asset_value?.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Application Date */}
              <div className="mb-4">
                <small className="text-muted">Application Date:</small>
                <div>{new Date(selectedLoan.application_date).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LoanLandingPage;