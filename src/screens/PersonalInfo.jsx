import React, { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio,
  MDBFile,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/ui/Header';
import Loader from '../components/ui/Loader'; // Assuming the loader is placed in the components folder

function LoanApplicationForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false); // State for loader
  const navigate = useNavigate(); // Hook for navigation
  const [formData, setFormData] = useState({
    fullName: '',
    nic: '',
    title: '',
    homeTown: '',
    residentialAddress: '',
    dependents: '',
    education: '',
    selfEmployed: '',
    basicSalary: '',
    annualIncome: '',
    occupation: '',
    loanAmount: '',
    loanTerm: '',
    cibilScore: '',
    residentialAssetValue: '',
    commercialAssetValue: '',
    luxuryAssetValue: '',
    bankAssetValue: '',
    application_date: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error on change
  };



  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      // Personal Information & Family & Education Information
      if (!formData.fullName) newErrors.fullName = 'Full Name is required';
      if (!formData.nic) newErrors.nic = 'NIC is required';
      if (!formData.title) newErrors.title = 'Title is required';
      if (!formData.homeTown) newErrors.homeTown = 'Home Town is required';
      if (!formData.residentialAddress)
        newErrors.residentialAddress = 'Residential Address is required';
      if (!formData.dependents)
        newErrors.dependents = 'Number of Dependents is required';
      if (!formData.education) newErrors.education = 'Education is required';
      if (!formData.selfEmployed) newErrors.selfEmployed = 'Self Employed status is required';
      if (!formData.occupation) newErrors.occupation = 'Occupation is required';
    }

    if (step === 2) {
      // Financial Information & Asset Information
      if (!formData.basicSalary) newErrors.basicSalary = 'Basic Salary is required';
      if (!formData.annualIncome) newErrors.annualIncome = 'Annual Income is required';
      if (!formData.loanAmount) newErrors.loanAmount = 'Loan Amount is required';
      if (!formData.loanTerm) newErrors.loanTerm = 'Loan Term is required';
      if (!formData.cibilScore) newErrors.cibilScore = 'CIBIL Score is required';
      else if (formData.cibilScore < 300 || formData.cibilScore > 900)
        newErrors.cibilScore = 'CIBIL Score must be between 300 and 900';
      if (!formData.residentialAssetValue) 
        newErrors.residentialAssetValue = 'Residential Asset Value is required';
      if (!formData.commercialAssetValue) 
        newErrors.commercialAssetValue = 'Commercial Asset Value is required';
      if (!formData.luxuryAssetValue) 
        newErrors.luxuryAssetValue = 'Luxury Asset Value is required';
      if (!formData.bankAssetValue) 
        newErrors.bankAssetValue = 'Bank Asset Value is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  //loan application submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      // Retrieve user_id dynamically from localStorage
      const userId = localStorage.getItem('user_id');

      if (!userId) {
        alert('User ID not found. Please log in again.');
        return;
      }

      const loanData = {
        user_id: userId, // Set user_id from localStorage
        personal_details: {
          full_name: formData.fullName,
          nic: formData.nic,
          title: formData.title,
          home_town: formData.homeTown,
          residential_address: formData.residentialAddress,
        },
        family_details: {
          dependents: parseInt(formData.dependents, 10),
          education: formData.education,
          self_employed: formData.selfEmployed === 'Yes',
        },
        financial_details: {
          employment_type: formData.selfEmployed === 'Yes' ? 'Self-Employed' : 'Salaried',
          basic_salary: parseFloat(formData.basicSalary),
          annual_income: parseFloat(formData.annualIncome),
          occupation: formData.occupation,
          loan_amount: parseFloat(formData.loanAmount),
          loan_term: parseInt(formData.loanTerm, 10),
          cibil_score: parseInt(formData.cibilScore, 10),
        },
        asset_details: {
          residential_asset_value: parseFloat(formData.residentialAssetValue),
          commercial_asset_value: parseFloat(formData.commercialAssetValue),
          luxury_asset_value: parseFloat(formData.luxuryAssetValue),
          bank_asset_value: parseFloat(formData.bankAssetValue),
        },
        application_date:
          formData.application_date || new Date().toISOString(),
      };
      try {
        const token = localStorage.getItem('jwt_token');
        const response = await axios.post(
          'http://localhost:8001/api/loans/apply',
          loanData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        alert('Loan application submitted successfully!');
        setLoading(true); // Show loader
        setTimeout(() => {
          setLoading(false); // Hide loader
          navigate('/landing'); // Navigate to /landing
        }, 2000); // Simulate loading for 2 seconds
        console.log('Backend response:', response.data);
      } catch (error) {
        console.error('Error submitting loan application:', error.response || error);
        alert('Error submitting loan application');
      }
    }


    
  };
  return (
    <MDBContainer style={{ paddingTop: '80px' }}>
      <Header /> 
      {loading ? ( // Show loader if loading
        <Loader />
      ) : (
        <>
      <div
        className="text-center bg-image"
        style={{
          backgroundImage:
            "url('https://www.pentucketbank.com/assets/files/YD8ONdom/certificate-of-deposit-piggy-bank-growth.jpg')",
          height: '200px',
        }}
      >
        <div className="mask" style={{ backgroundColor: 'rgba(1, 91, 89, 0.7)' }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">
                <b>Loan Application Form</b>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <MDBCard style={{ marginTop: 50 }}>
        <MDBCardBody>
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information & Family & Education Information */}
            {step === 1 && (
              <>
                <h4 className="mb-4 text-center" style={{ color: '#005a76' }}>
                  Personal Information & Family Details
                </h4>
                
                {/* Personal Information Section */}
                <h5 className="mb-3" style={{ color: '#015b59' }}>Personal Information</h5>
                
                <MDBRow className="mb-4">
                  <MDBCol md="6">
                    <MDBInput
                      label="Full Name"
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                    {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput
                      label="NIC"
                      id="nic"
                      name="nic"
                      type="text"
                      value={formData.nic}
                      onChange={handleChange}
                      required
                    />
                    {errors.nic && <small className="text-danger">{errors.nic}</small>}
                  </MDBCol>
                </MDBRow>

                <MDBRow className="mb-4">
                  <MDBCol md="6">
                    <select
                      className="form-select"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Title</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Miss">Miss</option>
                      <option value="Mrs.">Mrs.</option>
                    </select>
                    {errors.title && <small className="text-danger">{errors.title}</small>}
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput
                      label="Home Town"
                      id="homeTown"
                      name="homeTown"
                      type="text"
                      value={formData.homeTown}
                      onChange={handleChange}
                      required
                    />
                    {errors.homeTown && <small className="text-danger">{errors.homeTown}</small>}
                  </MDBCol>
                </MDBRow>

                <MDBRow className="mb-4">
                  <MDBCol>
                    <MDBInput
                      label="Residential Address"
                      id="residentialAddress"
                      name="residentialAddress"
                      type="textarea"
                      rows="3"
                      value={formData.residentialAddress}
                      onChange={handleChange}
                      required
                    />
                    {errors.residentialAddress && <small className="text-danger">{errors.residentialAddress}</small>}
                  </MDBCol>
                </MDBRow>

                {/* Family & Education Information Section */}
                <hr className="my-4" />
                <h5 className="mb-3" style={{ color: '#015b59' }}>Family & Education Information</h5>

                <MDBRow className="mb-4">
                  <MDBCol md="6">
                    <select
                      className="form-select"
                      id="dependents"
                      name="dependents"
                      value={formData.dependents}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Number of Dependents</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5+</option>
                    </select>
                    {errors.dependents && <small className="text-danger">{errors.dependents}</small>}
                  </MDBCol>
                  <MDBCol md="6">
                    <select
                      className="form-select"
                      id="education"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Education</option>
                      <option value="Graduate">Graduate</option>
                      <option value="Not Graduate">Not Graduate</option>
                    </select>
                    {errors.education && <small className="text-danger">{errors.education}</small>}
                  </MDBCol>
                </MDBRow>

                <MDBRow className="mb-4">
                  <MDBCol md="6">
                    <label className="form-label">Self Employed?</label>
                    <div>
                      <MDBRadio
                        name="selfEmployed"
                        id="selfEmployedYes"
                        label="Yes"
                        value="Yes"
                        checked={formData.selfEmployed === 'Yes'}
                        onChange={handleChange}
                      />
                      <MDBRadio
                        name="selfEmployed"
                        id="selfEmployedNo"
                        label="No"
                        value="No"
                        checked={formData.selfEmployed === 'No'}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.selfEmployed && <small className="text-danger">{errors.selfEmployed}</small>}
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput
                      label="Occupation"
                      id="occupation"
                      name="occupation"
                      type="text"
                      value={formData.occupation}
                      onChange={handleChange}
                      required
                    />
                    {errors.occupation && <small className="text-danger">{errors.occupation}</small>}
                  </MDBCol>
                </MDBRow>
              </>
            )}

            {/* Step 2: Financial Information & Asset Information */}
            {step === 2 && (
              <>
                <h4 className="mb-4 text-center" style={{ color: '#005a76' }}>
                  Financial Information & Asset Details
                </h4>

                {/* Financial Information Section */}
                <h5 className="mb-3" style={{ color: '#015b59' }}>Financial Information</h5>

                <MDBRow className="mb-4">
                  <MDBCol md="6">
                    <MDBInput
                      label="Basic Salary (LKR)"
                      id="basicSalary"
                      name="basicSalary"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.basicSalary}
                      onChange={handleChange}
                      required
                    />
                    {errors.basicSalary && <small className="text-danger">{errors.basicSalary}</small>}
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput
                      label="Annual Income (LKR)"
                      id="annualIncome"
                      name="annualIncome"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.annualIncome}
                      onChange={handleChange}
                      required
                    />
                    {errors.annualIncome && <small className="text-danger">{errors.annualIncome}</small>}
                  </MDBCol>
                </MDBRow>

                <MDBRow className="mb-4">
                  <MDBCol md="6">
                    <MDBInput
                      label="Loan Amount (LKR)"
                      id="loanAmount"
                      name="loanAmount"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.loanAmount}
                      onChange={handleChange}
                      required
                    />
                    {errors.loanAmount && <small className="text-danger">{errors.loanAmount}</small>}
                  </MDBCol>
                  <MDBCol md="6">
                    <select
                      className="form-select"
                      id="loanTerm"
                      name="loanTerm"
                      value={formData.loanTerm}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Loan Term</option>
                      <option value="12">12 months</option>
                      <option value="24">24 months</option>
                      <option value="36">36 months</option>
                      <option value="60">60 months</option>
                    </select>
                    {errors.loanTerm && <small className="text-danger">{errors.loanTerm}</small>}
                  </MDBCol>
                </MDBRow>

                <MDBRow className="mb-4">
                  <MDBCol>
                    <MDBInput
                      label="CIBIL Score (300-900)"
                      id="cibilScore"
                      name="cibilScore"
                      type="number"
                      min="300"
                      max="900"
                      value={formData.cibilScore}
                      onChange={handleChange}
                      required
                    />
                    {errors.cibilScore && <small className="text-danger">{errors.cibilScore}</small>}
                    <small className="text-muted">Enter your CIBIL score between 300 and 900</small>
                  </MDBCol>
                </MDBRow>

                {/* Asset Information Section */}
                <hr className="my-4" />
                <h5 className="mb-3" style={{ color: '#015b59' }}>Asset Information</h5>

                <MDBRow className="mb-4">
                  <MDBCol md="6">
                    <MDBInput
                      label="Residential Asset Value (LKR)"
                      id="residentialAssetValue"
                      name="residentialAssetValue"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.residentialAssetValue}
                      onChange={handleChange}
                      required
                    />
                    {errors.residentialAssetValue && <small className="text-danger">{errors.residentialAssetValue}</small>}
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput
                      label="Commercial Asset Value (LKR)"
                      id="commercialAssetValue"
                      name="commercialAssetValue"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.commercialAssetValue}
                      onChange={handleChange}
                      required
                    />
                    {errors.commercialAssetValue && <small className="text-danger">{errors.commercialAssetValue}</small>}
                  </MDBCol>
                </MDBRow>

                <MDBRow className="mb-4">
                  <MDBCol md="6">
                    <MDBInput
                      label="Luxury Asset Value (LKR)"
                      id="luxuryAssetValue"
                      name="luxuryAssetValue"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.luxuryAssetValue}
                      onChange={handleChange}
                      required
                    />
                    {errors.luxuryAssetValue && <small className="text-danger">{errors.luxuryAssetValue}</small>}
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput
                      label="Bank Asset Value (LKR)"
                      id="bankAssetValue"
                      name="bankAssetValue"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.bankAssetValue}
                      onChange={handleChange}
                      required
                    />
                    {errors.bankAssetValue && <small className="text-danger">{errors.bankAssetValue}</small>}
                  </MDBCol>
                </MDBRow>

                {/* Application metadata */}
                <MDBRow className="mb-4">
                  <MDBCol>
                    <MDBInput
                      label="Application Date"
                      id="application_date"
                      name="application_date"
                      type="date"
                      value={formData.application_date}
                      onChange={handleChange}
                      disabled
                    />
                  </MDBCol>
                </MDBRow>
              </>
            )}

            {/* Progress indicator */}
            <div className="mb-4">
              <div className="progress" style={{ height: '5px' }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ 
                    width: `${(step / 2) * 100}%`,
                    backgroundColor: '#005a76'
                  }}
                ></div>
              </div>
              <small className="text-muted">Step {step} of 2</small>
            </div>

            {/* Navigation buttons */}
            <div className="d-flex justify-content-between">
              {step > 1 && (
                <MDBBtn 
                  style={{ backgroundColor: '#015b59' }} 
                  onClick={prevStep}
                >
                  Previous
                </MDBBtn>
              )}
              {step < 2 && (
                <MDBBtn 
                  style={{ backgroundColor: '#005a76' }} 
                  onClick={nextStep}
                  className="ms-auto"
                >
                  Next
                </MDBBtn>
              )}
              {step === 2 && (
                <MDBBtn 
                  style={{ backgroundColor: '#ff7300' }} 
                  type="submit"
                  className="ms-auto"
                >
                  Submit Application
                </MDBBtn>
              )}
            </div>
          </form>
        </MDBCardBody>
      </MDBCard>
      </>
      )}
    </MDBContainer>
  );
}

export default LoanApplicationForm;
