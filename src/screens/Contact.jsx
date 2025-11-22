import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/ui/Header';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  
  const colors = {
    primary: '#015b59',
    secondary: '#005a76',
    accent: '#ff7300',
    background: '#e9f8fb',
    text: '#333333',
    white: '#ffffff',
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div style={{ backgroundColor: colors.background, minHeight: '100vh', paddingTop: '80px' }}>
      <Header />
      
      {/* Hero Banner */}
      <div style={{ 
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        padding: '80px 0 60px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="row">
            <div className="col-lg-10 mx-auto text-center">
              <button 
                onClick={() => navigate('/')}
                className="btn btn-light mb-4"
                style={{ 
                  borderRadius: '25px',
                  padding: '10px 25px',
                  fontWeight: '600'
                }}
              >
                <i className="fas fa-arrow-left me-2"></i>
                Back to Home
              </button>
              <h1 className="display-3 fw-bold mb-3" style={{ color: colors.white }}>
                Get In Touch
              </h1>
              <p className="lead mb-0" style={{ color: colors.white, fontSize: '1.3rem' }}>
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5" style={{ marginTop: '-40px', position: 'relative', zIndex: 2 }}>
        <div className="row">
          <div className="col-lg-11 mx-auto">
            <div className="row g-4">
              {/* Contact Information Cards */}
              <div className="col-lg-4">
                {/* Phone Card */}
                <div 
                  className="card border-0 shadow-lg mb-4"
                  style={{ 
                    borderRadius: '20px',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                  }}
                >
                  <div className="card-body p-5 text-center">
                    <div 
                      className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle"
                      style={{ 
                        width: '90px', 
                        height: '90px', 
                        background: `linear-gradient(135deg, ${colors.accent} 0%, #ff9f40 100%)`,
                        color: colors.white,
                        boxShadow: '0 10px 25px rgba(255, 115, 0, 0.3)'
                      }}
                    >
                      <i className="fas fa-phone-alt fa-2x"></i>
                    </div>
                    <h4 className="fw-bold mb-3" style={{ color: colors.primary }}>Call Us</h4>
                    <p style={{ color: colors.text, marginBottom: '20px' }}>
                      Available Monday - Sunday<br />
                      <strong>8:30 AM - 5:30 PM</strong>
                    </p>
                    <a 
                      href="tel:117750300" 
                      className="btn btn-lg"
                      style={{ 
                        backgroundColor: colors.primary,
                        borderColor: colors.primary,
                        color: colors.white,
                        borderRadius: '25px',
                        padding: '12px 35px',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = colors.accent;
                        e.target.style.borderColor = colors.accent;
                        e.target.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = colors.primary;
                        e.target.style.borderColor = colors.primary;
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      <i className="fas fa-phone me-2"></i>
                      117750300
                    </a>
                  </div>
                </div>

                {/* Email Card */}
                <div 
                  className="card border-0 shadow-lg mb-4"
                  style={{ 
                    borderRadius: '20px',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                  }}
                >
                  <div className="card-body p-5 text-center">
                    <div 
                      className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle"
                      style={{ 
                        width: '90px', 
                        height: '90px', 
                        background: `linear-gradient(135deg, ${colors.accent} 0%, #ff9f40 100%)`,
                        color: colors.white,
                        boxShadow: '0 10px 25px rgba(255, 115, 0, 0.3)'
                      }}
                    >
                      <i className="fas fa-envelope fa-2x"></i>
                    </div>
                    <h4 className="fw-bold mb-3" style={{ color: colors.primary }}>Email Us</h4>
                    <p style={{ color: colors.text, marginBottom: '20px' }}>
                      Send us an email anytime<br />
                      <strong>24-hour response time</strong>
                    </p>
                    <a 
                      href="mailto:support@loan360.lk" 
                      className="btn btn-lg"
                      style={{ 
                        backgroundColor: colors.primary,
                        borderColor: colors.primary,
                        color: colors.white,
                        borderRadius: '25px',
                        padding: '12px 25px',
                        fontWeight: '600',
                        fontSize: '0.95rem',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = colors.accent;
                        e.target.style.borderColor = colors.accent;
                        e.target.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = colors.primary;
                        e.target.style.borderColor = colors.primary;
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      <i className="fas fa-envelope me-2"></i>
                      support@loan360.lk
                    </a>
                  </div>
                </div>

                {/* Location Card */}
                <div 
                  className="card border-0 shadow-lg"
                  style={{ 
                    borderRadius: '20px',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                  }}
                >
                  <div className="card-body p-5 text-center">
                    <div 
                      className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle"
                      style={{ 
                        width: '90px', 
                        height: '90px', 
                        background: `linear-gradient(135deg, ${colors.accent} 0%, #ff9f40 100%)`,
                        color: colors.white,
                        boxShadow: '0 10px 25px rgba(255, 115, 0, 0.3)'
                      }}
                    >
                      <i className="fas fa-map-marker-alt fa-2x"></i>
                    </div>
                    <h4 className="fw-bold mb-3" style={{ color: colors.primary }}>Visit Us</h4>
                    <p style={{ color: colors.text, fontSize: '1rem', lineHeight: '1.6' }}>
                      <strong>Loan360 Headquarters</strong><br />
                      Colombo, Sri Lanka<br />
                      <span style={{ color: colors.accent, fontWeight: '600' }}>Serving nationwide</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="col-lg-8">
                <div className="card border-0 shadow-lg" style={{ borderRadius: '20px' }}>
                  <div className="card-body p-5">
                    <div className="d-flex align-items-center mb-4">
                      <div 
                        className="d-flex align-items-center justify-content-center rounded-circle me-3"
                        style={{ 
                          width: '50px', 
                          height: '50px', 
                          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                          color: colors.white
                        }}
                      >
                        <i className="fas fa-paper-plane"></i>
                      </div>
                      <div>
                        <h2 className="mb-1" style={{ color: colors.primary, fontWeight: '700' }}>
                          Send Us a Message
                        </h2>
                        <p className="mb-0 text-muted">Fill out the form and we'll be in touch soon</p>
                      </div>
                    </div>

                    {submitted && (
                      <div 
                        className="alert mb-4" 
                        role="alert"
                        style={{
                          backgroundColor: '#d4edda',
                          border: '2px solid #28a745',
                          borderRadius: '15px',
                          color: '#155724',
                          padding: '20px'
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <i className="fas fa-check-circle me-3" style={{ fontSize: '2rem' }}></i>
                          <div>
                            <h5 className="mb-1">Message Sent Successfully!</h5>
                            <p className="mb-0">Thank you for contacting us. We'll get back to you soon.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <div className="row g-4">
                        <div className="col-md-6">
                          <label className="form-label fw-bold" style={{ color: colors.text, fontSize: '0.95rem' }}>
                            Full Name *
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                            style={{ 
                              borderColor: '#e0e0e0',
                              borderRadius: '12px',
                              padding: '15px 20px',
                              fontSize: '1rem',
                              transition: 'border-color 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = colors.primary}
                            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold" style={{ color: colors.text, fontSize: '0.95rem' }}>
                            Email Address *
                          </label>
                          <input
                            type="email"
                            className="form-control form-control-lg"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="john.doe@example.com"
                            style={{ 
                              borderColor: '#e0e0e0',
                              borderRadius: '12px',
                              padding: '15px 20px',
                              fontSize: '1rem',
                              transition: 'border-color 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = colors.primary}
                            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold" style={{ color: colors.text, fontSize: '0.95rem' }}>
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            className="form-control form-control-lg"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+94 XX XXX XXXX"
                            style={{ 
                              borderColor: '#e0e0e0',
                              borderRadius: '12px',
                              padding: '15px 20px',
                              fontSize: '1rem',
                              transition: 'border-color 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = colors.primary}
                            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold" style={{ color: colors.text, fontSize: '0.95rem' }}>
                            Subject *
                          </label>
                          <select
                            className="form-select form-select-lg"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            style={{ 
                              borderColor: '#e0e0e0',
                              borderRadius: '12px',
                              padding: '15px 20px',
                              fontSize: '1rem',
                              transition: 'border-color 0.3s ease',
                              cursor: 'pointer'
                            }}
                            onFocus={(e) => e.target.style.borderColor = colors.primary}
                            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                          >
                            <option value="">Select a subject</option>
                            <option value="general">💬 General Inquiry</option>
                            <option value="application">📝 Loan Application Help</option>
                            <option value="technical">🔧 Technical Support</option>
                            <option value="feedback">⭐ Feedback</option>
                            <option value="complaint">⚠️ Complaint</option>
                            <option value="other">📌 Other</option>
                          </select>
                        </div>

                        <div className="col-12">
                          <label className="form-label fw-bold" style={{ color: colors.text, fontSize: '0.95rem' }}>
                            Message *
                          </label>
                          <textarea
                            className="form-control form-control-lg"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="6"
                            placeholder="Tell us how we can help you..."
                            style={{ 
                              borderColor: '#e0e0e0',
                              borderRadius: '12px',
                              padding: '15px 20px',
                              fontSize: '1rem',
                              transition: 'border-color 0.3s ease',
                              resize: 'vertical'
                            }}
                            onFocus={(e) => e.target.style.borderColor = colors.primary}
                            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                          ></textarea>
                        </div>

                        <div className="col-12">
                          <button
                            type="submit"
                            className="btn btn-lg px-5 py-3 fw-bold"
                            style={{ 
                              background: `linear-gradient(135deg, ${colors.accent} 0%, #ff9f40 100%)`,
                              border: 'none',
                              color: colors.white,
                              borderRadius: '15px',
                              fontSize: '1.1rem',
                              boxShadow: '0 10px 25px rgba(255, 115, 0, 0.3)',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.transform = 'translateY(-3px)';
                              e.target.style.boxShadow = '0 15px 35px rgba(255, 115, 0, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = 'translateY(0)';
                              e.target.style.boxShadow = '0 10px 25px rgba(255, 115, 0, 0.3)';
                            }}
                          >
                            <i className="fas fa-paper-plane me-2"></i>
                            Send Message
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hours Section */}
            <div className="card border-0 shadow-lg mt-5" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <div 
                className="card-header text-center py-4"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                  border: 'none'
                }}
              >
                <h3 className="mb-0" style={{ color: colors.white }}>
                  <i className="fas fa-clock me-2"></i>
                  Office Hours
                </h3>
              </div>
              <div className="card-body p-5">
                <div className="row g-4 text-center">
                  <div className="col-md-4">
                    <div 
                      className="p-4 rounded"
                      style={{ 
                        background: `linear-gradient(135deg, ${colors.background} 0%, #ffffff 100%)`,
                        border: `2px solid ${colors.primary}20`,
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.borderColor = colors.accent;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.borderColor = `${colors.primary}20`;
                      }}
                    >
                      <div 
                        className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                        style={{ 
                          width: '70px', 
                          height: '70px', 
                          background: `linear-gradient(135deg, ${colors.accent} 0%, #ff9f40 100%)`,
                          color: colors.white
                        }}
                      >
                        <i className="fas fa-calendar-day fa-2x"></i>
                      </div>
                      <h5 className="fw-bold mb-2" style={{ color: colors.primary }}>Weekdays</h5>
                      <p className="mb-0" style={{ color: colors.text }}>
                        Monday - Friday<br />
                        <strong style={{ color: colors.accent, fontSize: '1.1rem' }}>8:30 AM - 5:30 PM</strong>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div 
                      className="p-4 rounded"
                      style={{ 
                        background: `linear-gradient(135deg, ${colors.background} 0%, #ffffff 100%)`,
                        border: `2px solid ${colors.primary}20`,
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.borderColor = colors.accent;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.borderColor = `${colors.primary}20`;
                      }}
                    >
                      <div 
                        className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                        style={{ 
                          width: '70px', 
                          height: '70px', 
                          background: `linear-gradient(135deg, ${colors.accent} 0%, #ff9f40 100%)`,
                          color: colors.white
                        }}
                      >
                        <i className="fas fa-calendar-week fa-2x"></i>
                      </div>
                      <h5 className="fw-bold mb-2" style={{ color: colors.primary }}>Weekends</h5>
                      <p className="mb-0" style={{ color: colors.text }}>
                        Saturday - Sunday<br />
                        <strong style={{ color: colors.accent, fontSize: '1.1rem' }}>8:30 AM - 5:30 PM</strong>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div 
                      className="p-4 rounded"
                      style={{ 
                        background: `linear-gradient(135deg, ${colors.background} 0%, #ffffff 100%)`,
                        border: `2px solid ${colors.primary}20`,
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.borderColor = colors.accent;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.borderColor = `${colors.primary}20`;
                      }}
                    >
                      <div 
                        className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                        style={{ 
                          width: '70px', 
                          height: '70px', 
                          background: `linear-gradient(135deg, ${colors.accent} 0%, #ff9f40 100%)`,
                          color: colors.white
                        }}
                      >
                        <i className="fas fa-headset fa-2x"></i>
                      </div>
                      <h5 className="fw-bold mb-2" style={{ color: colors.primary }}>AI Support</h5>
                      <p className="mb-0" style={{ color: colors.text }}>
                        24/7 Chat Support<br />
                        <strong style={{ color: colors.accent, fontSize: '1.1rem' }}>Always Available</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="card border-0 shadow-lg mt-5" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <div className="card-body p-5 text-center">
                <h3 className="mb-2" style={{ color: colors.primary, fontWeight: '700' }}>
                  <i className="fas fa-share-alt me-2"></i>
                  Connect With Us
                </h3>
                <p className="text-muted mb-4">Follow us on social media for updates and news</p>
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <a 
                    href="#" 
                    className="btn btn-lg rounded-circle"
                    style={{ 
                      width: '70px', 
                      height: '70px', 
                      background: 'linear-gradient(135deg, #1877f2 0%, #0c63d4 100%)',
                      color: colors.white,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 20px rgba(24, 119, 242, 0.3)',
                      transition: 'all 0.3s ease',
                      border: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-8px) scale(1.1)';
                      e.target.style.boxShadow = '0 12px 30px rgba(24, 119, 242, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0) scale(1)';
                      e.target.style.boxShadow = '0 8px 20px rgba(24, 119, 242, 0.3)';
                    }}
                  >
                    <i className="fab fa-facebook-f fa-lg"></i>
                  </a>
                  <a 
                    href="#" 
                    className="btn btn-lg rounded-circle"
                    style={{ 
                      width: '70px', 
                      height: '70px', 
                      background: 'linear-gradient(135deg, #e4405f 0%, #d31e40 100%)',
                      color: colors.white,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 20px rgba(228, 64, 95, 0.3)',
                      transition: 'all 0.3s ease',
                      border: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-8px) scale(1.1)';
                      e.target.style.boxShadow = '0 12px 30px rgba(228, 64, 95, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0) scale(1)';
                      e.target.style.boxShadow = '0 8px 20px rgba(228, 64, 95, 0.3)';
                    }}
                  >
                    <i className="fab fa-instagram fa-lg"></i>
                  </a>
                  <a 
                    href="#" 
                    className="btn btn-lg rounded-circle"
                    style={{ 
                      width: '70px', 
                      height: '70px', 
                      background: 'linear-gradient(135deg, #1da1f2 0%, #0c85d0 100%)',
                      color: colors.white,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 20px rgba(29, 161, 242, 0.3)',
                      transition: 'all 0.3s ease',
                      border: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-8px) scale(1.1)';
                      e.target.style.boxShadow = '0 12px 30px rgba(29, 161, 242, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0) scale(1)';
                      e.target.style.boxShadow = '0 8px 20px rgba(29, 161, 242, 0.3)';
                    }}
                  >
                    <i className="fab fa-twitter fa-lg"></i>
                  </a>
                  <a 
                    href="#" 
                    className="btn btn-lg rounded-circle"
                    style={{ 
                      width: '70px', 
                      height: '70px', 
                      background: 'linear-gradient(135deg, #0a66c2 0%, #084a8a 100%)',
                      color: colors.white,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 20px rgba(10, 102, 194, 0.3)',
                      transition: 'all 0.3s ease',
                      border: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-8px) scale(1.1)';
                      e.target.style.boxShadow = '0 12px 30px rgba(10, 102, 194, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0) scale(1)';
                      e.target.style.boxShadow = '0 8px 20px rgba(10, 102, 194, 0.3)';
                    }}
                  >
                    <i className="fab fa-linkedin-in fa-lg"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
