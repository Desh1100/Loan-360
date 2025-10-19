import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [userLoans, setUserLoans] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedLoan, setSelectedLoan] = useState(null);
  const navigate = useNavigate();

  // Color theme consistent with LoanLandingPage
  const colors = {
    primary: '#015b59',
    secondary: '#005a76',
    accent: '#ff7300',
    background: '#e9f8fb',
    text: '#333333',
    white: '#ffffff',
    lightGray: '#f8f9fa',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107'
  };

  // Fetch user data and loan applications
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('jwt_token');
        const userId = localStorage.getItem('user_id');
        
        console.log('Token:', token ? 'Present' : 'Missing');
        console.log('User ID:', userId);
        
        if (!token || !userId) {
          console.log('Missing authentication data, redirecting to login');
          navigate('/login');
          return;
        }

        setLoading(true);
        setError(''); // Clear any previous errors

        console.log('Fetching user profile...');
        // Fetch user profile data
        const userResponse = await axios.get('http://localhost:8001/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('User profile response:', userResponse.data);
        setUserData(userResponse.data);
        setEditedData({
          first_name: userResponse.data.first_name,
          last_name: userResponse.data.last_name,
          email: userResponse.data.email,
          phone: userResponse.data.phone || userResponse.data.mobile // Try both phone and mobile
        });

        console.log('Fetching user loans...');
        // Fetch user's loan applications
        try {
          const loansResponse = await axios.get(`http://localhost:8001/api/loans/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log('User loans response:', loansResponse.data);
          setUserLoans(loansResponse.data);
        } catch (loanError) {
          console.warn('Error fetching loans (non-critical):', loanError);
          // Don't fail the whole component if loans can't be fetched
          setUserLoans([]);
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
        console.error('Error response:', error.response?.data);
        console.error('Error status:', error.response?.status);
        
        let errorMessage = 'Failed to load user data. Please try again.';
        
        if (error.response?.status === 401) {
          errorMessage = 'Your session has expired. Please login again.';
          localStorage.clear();
          navigate('/login');
          return;
        } else if (error.response?.status === 404) {
          errorMessage = 'User profile not found. Please contact support.';
        } else if (error.response?.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
          errorMessage = 'Cannot connect to server. Please check if the backend is running.';
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Handle profile update
  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('jwt_token');
      
      await axios.put('http://localhost:8001/api/auth/profile', editedData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUserData({ ...userData, ...editedData });
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);

    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get loan status color
  const getLoanStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': return colors.success;
      case 'rejected': return colors.danger;
      case 'pending': return colors.warning;
      default: return colors.accent;
    }
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: colors.background, minHeight: '100vh' }}>
        <Header />
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card shadow-sm" style={{ border: 'none', borderRadius: '12px' }}>
                <div className="card-body text-center py-5">
                  <div className="spinner-border" style={{ color: colors.primary }} role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3" style={{ color: colors.text }}>Loading your profile...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: colors.background, minHeight: '100vh' }}>
      <Header />
      
      <div className="container py-5">
        {/* Success/Error Messages */}
        {successMessage && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <i className="fas fa-check-circle me-2"></i>
            {successMessage}
          </div>
        )}
        
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <i className="fas fa-exclamation-circle me-2"></i>
            {error}
            <button
              className="btn btn-outline-danger btn-sm ms-3"
              onClick={() => window.location.reload()}
            >
              <i className="fas fa-redo me-2"></i>
              Retry
            </button>
          </div>
        )}

        <div className="row">
          {/* Profile Information Card */}
          <div className="col-lg-4 mb-4">
            <div className="card shadow-sm h-100" style={{ border: 'none', borderRadius: '12px' }}>
              <div className="card-body text-center">
                {/* Profile Avatar */}
                <div 
                  className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: '120px',
                    height: '120px',
                    backgroundColor: colors.primary,
                    color: colors.white,
                    fontSize: '3rem'
                  }}
                >
                  <i className="fas fa-user"></i>
                </div>

                {/* User Basic Info */}
                <h4 style={{ color: colors.text }}>
                  {userData?.first_name} {userData?.last_name}
                </h4>
                <p className="text-muted">{userData?.email}</p>
                <p className="text-muted">
                  <i className="fas fa-phone me-2"></i>
                  {userData?.phone}
                </p>
                <p className="text-muted">
                  <i className="fas fa-calendar-alt me-2"></i>
                  Member since {formatDate(userData?.created_at)}
                </p>

                {/* Action Buttons */}
                <div className="d-grid gap-2">
                  <button
                    className="btn"
                    style={{
                      backgroundColor: colors.primary,
                      borderColor: colors.primary,
                      color: colors.white
                    }}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <i className="fas fa-edit me-2"></i>
                    {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                  </button>
                  
                  <button
                    className="btn"
                    style={{
                      backgroundColor: colors.accent,
                      borderColor: colors.accent,
                      color: colors.white
                    }}
                    onClick={() => navigate('/PersonalInfo')}
                  >
                    <i className="fas fa-plus me-2"></i>
                    Apply for New Loan
                  </button>
                  
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out-alt me-2"></i>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details and Loan Applications */}
          <div className="col-lg-8">
            {/* Profile Details Card */}
            <div className="card shadow-sm mb-4" style={{ border: 'none', borderRadius: '12px' }}>
              <div className="card-header" style={{ backgroundColor: colors.white, borderBottom: `2px solid ${colors.primary}` }}>
                <h5 className="mb-0" style={{ color: colors.primary }}>
                  <i className="fas fa-user-circle me-2"></i>
                  Profile Information
                </h5>
              </div>
              <div className="card-body">
                {isEditing ? (
                  /* Edit Form */
                  <div>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={editedData.first_name || ''}
                          onChange={(e) => setEditedData({...editedData, first_name: e.target.value})}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={editedData.last_name || ''}
                          onChange={(e) => setEditedData({...editedData, last_name: e.target.value})}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={editedData.email || ''}
                          onChange={(e) => setEditedData({...editedData, email: e.target.value})}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Phone</label>
                        <input
                          type="text"
                          className="form-control"
                          value={editedData.phone || ''}
                          onChange={(e) => setEditedData({...editedData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <button
                        className="btn me-2"
                        style={{
                          backgroundColor: colors.success,
                          borderColor: colors.success,
                          color: colors.white
                        }}
                        onClick={handleUpdateProfile}
                      >
                        <i className="fas fa-save me-2"></i>
                        Save Changes
                      </button>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          setIsEditing(false);
                          setEditedData({
                            first_name: userData.first_name,
                            last_name: userData.last_name,
                            email: userData.email,
                            phone: userData.phone
                          });
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Display Mode */
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">First Name</label>
                      <p className="form-control-plaintext">{userData?.first_name}</p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Last Name</label>
                      <p className="form-control-plaintext">{userData?.last_name}</p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Email</label>
                      <p className="form-control-plaintext">{userData?.email}</p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Phone</label>
                      <p className="form-control-plaintext">{userData?.phone}</p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">User ID</label>
                      <p className="form-control-plaintext">{userData?.id}</p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Account Created</label>
                      <p className="form-control-plaintext">{formatDate(userData?.created_at)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Loan Applications Card */}
            <div className="card shadow-sm" style={{ border: 'none', borderRadius: '12px' }}>
              <div className="card-header" style={{ backgroundColor: colors.white, borderBottom: `2px solid ${colors.primary}` }}>
                <h5 className="mb-0" style={{ color: colors.primary }}>
                  <i className="fas fa-file-alt me-2"></i>
                  Loan Applications ({userLoans.length})
                </h5>
              </div>
              <div className="card-body">
                {userLoans.length === 0 ? (
                  <div className="text-center py-4">
                    <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                    <h6 className="text-muted">No loan applications found</h6>
                    <p className="text-muted">Start your loan application journey today!</p>
                    <button
                      className="btn"
                      style={{
                        backgroundColor: colors.accent,
                        borderColor: colors.accent,
                        color: colors.white
                      }}
                      onClick={() => navigate('/PersonalInfo')}
                    >
                      Apply for Loan
                    </button>
                  </div>
                ) : (
                  <div className="row g-3">
                    {userLoans.map((loan, index) => (
                      <div key={loan.id || index} className="col-12">
                        <div 
                          className="card"
                          style={{ 
                            border: `1px solid ${getLoanStatusColor(loan.eligibility_status)}`,
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'transform 0.2s'
                          }}
                          onClick={() => setSelectedLoan(selectedLoan?.id === loan.id ? null : loan)}
                          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                        >
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start">
                              <div>
                                <h6 className="card-title mb-2">
                                  Loan Application #{loan.id}
                                </h6>
                                <p className="card-text mb-1">
                                  <strong>Amount:</strong> LKR {loan.financial_details?.loan_amount?.toLocaleString()}
                                </p>
                                <p className="card-text mb-1">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <strong>Applied:</strong> {formatDate(loan.application_date)}
                                  <button
                                    className="btn btn-sm"
                                    style={{
                                      backgroundColor: colors.accent,
                                      borderColor: colors.accent,
                                      color: colors.white,
                                      fontSize: '0.75rem'
                                    }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      localStorage.setItem('recentLoanId', loan.id);
                                      navigate('/eligibility-checker');
                                    }}
                                  >
                                    <i className="fas fa-search me-1"></i>
                                    Check Status
                                  </button>
                                </div>
                                </p>
                              </div>
                              <div className="text-end">
                                <span
                                  className="badge px-3 py-2"
                                  style={{
                                    backgroundColor: getLoanStatusColor(loan.eligibility_status),
                                    color: colors.white
                                  }}
                                >
                                  {loan.eligibility_status || 'Pending'}
                                </span>
                              </div>
                            </div>
                            
                            {/* Expanded Details */}
                            {selectedLoan?.id === loan.id && (
                              <div className="mt-3 pt-3 border-top">
                                <div className="row g-2">
                                  <div className="col-md-6">
                                    <small className="text-muted">Full Name:</small>
                                    <div>{loan.personal_details?.full_name}</div>
                                  </div>
                                  <div className="col-md-6">
                                    <small className="text-muted">NIC:</small>
                                    <div>{loan.personal_details?.nic}</div>
                                  </div>
                                  <div className="col-md-6">
                                    <small className="text-muted">Loan Term:</small>
                                    <div>{loan.financial_details?.loan_term} months</div>
                                  </div>
                                  <div className="col-md-6">
                                    <small className="text-muted">CIBIL Score:</small>
                                    <div>{loan.financial_details?.cibil_score}</div>
                                  </div>
                                  <div className="col-md-6">
                                    <small className="text-muted">Annual Income:</small>
                                    <div>LKR {loan.financial_details?.annual_income?.toLocaleString()}</div>
                                  </div>
                                  <div className="col-md-6">
                                    <small className="text-muted">Occupation:</small>
                                    <div>{loan.financial_details?.occupation}</div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;