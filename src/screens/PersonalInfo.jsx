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
    permanent_address: '',
    taxPayable: '',
    addressProof: null,
    dependents: '',
    basicSalary: '',
    occupation: '',
    otherIncome: '',
    monthlyDebit: '',
    eligibility_status: 'Pending',
    suggested_loan_amount: '',
    application_date: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error on change
  };

  const handleFileUpload = (e) => {
    setFormData({ ...formData, addressProof: e.target.files[0] });
    setErrors({ ...errors, addressProof: '' }); // Clear error on file upload
  };

  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.fullName) newErrors.fullName = 'Full Name is required';
      if (!formData.nic) newErrors.nic = 'NIC is required';
      if (!formData.title) newErrors.title = 'Title is required';
      if (!formData.homeTown) newErrors.homeTown = 'Home Town is required';
      if (!formData.residentialAddress)
        newErrors.residentialAddress = 'Residential Address is required';
      if (!formData.permanent_address)
        newErrors.permanent_address = 'Permanent Address is required';
      if (!formData.taxPayable)
        newErrors.taxPayable = 'Please select whether Tax is payable';
      if (!formData.addressProof)
        newErrors.addressProof = 'Proof of Address is required';
      if (!formData.dependents)
        newErrors.dependents = 'Number of Dependents is required';
    }

    if (step === 2) {
      if (!formData.basicSalary) newErrors.basicSalary = 'Basic Salary is required';
      if (!formData.occupation) newErrors.occupation = 'Occupation is required';
      if (!formData.monthlyDebit)
        newErrors.monthlyDebit = 'Monthly Debit is required';
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
          permenet_address: formData.permanent_address,
          residential_address: formData.residentialAddress,
          tax_payable: formData.taxPayable === 'Yes',
        },
        family_details: {
          dependents: parseInt(formData.dependents, 10),
        },
        financial_details: {
          employment_type: formData.employment_type || 'Salaried',
          basic_salary: parseFloat(formData.basicSalary),
          occupation: formData.occupation,
          other_income: parseFloat(formData.otherIncome || 0),
          monthly_debit: parseFloat(formData.monthlyDebit),
        },
        eligibility_status: formData.eligibility_status,
        suggested_loan_amount: parseFloat(formData.suggested_loan_amount),
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

    //PDF submit
    const handleFileSubmit = async () => {
      if (!formData.addressProof) {
      alert("Please upload a valid PDF file.");
      return;
      }
    
      const fileData = new FormData();
      const userId = localStorage.getItem("user_id"); // Retrieve user_id dynamically from localStorage
      const loanId = "1234567890"; // Replace this with the actual loan ID logic or variable if available
    
      fileData.append("document", formData.addressProof); // Append the uploaded file
      fileData.append("user_id", userId); // Include user_id
      fileData.append("loan_id", loanId); // Include loan_id
      fileData.append("document_type", "Proof of Address");
    
      try {
      const token = localStorage.getItem("jwt_token"); // Retrieve JWT token
      const response = await axios.post("http://localhost:8001/api/upload", fileData, {
        headers: {
        "Authorization": `Bearer ${token}`, // Authorization header
        "Content-Type": "multipart/form-data", // Required for file upload
        },
      });
      alert("File uploaded successfully!");
      console.log("Backend response:", response.data);
      } catch (error) {
      console.error("Error uploading file:", error.response || error);
      alert("Error uploading file. Please try again.");
      }
    };

    handleFileSubmit(); // Call the function to submit the PDF
    
  };
  return (
    <MDBContainer>
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
        <div className="mask" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
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
            {/* Step 1: Personal & Family Information */}
            {step === 1 && (
              <>
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
                  </MDBCol>
                </MDBRow>

                <MDBRow className="mb-4">
                  <MDBCol>
                    <MDBInput
                      label="Permanent Address"
                      id="permanent_address"
                      name="permanent_address"
                      type="textarea"
                      rows="3"
                      value={formData.permanent_address}
                      onChange={handleChange}
                      required
                    />
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
                  </MDBCol>
                </MDBRow>

                <MDBRow className="mb-4">
                  <MDBCol>
                    <MDBFile
                      label="Proof of Address (PDF)"
                      id="addressProof"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      required
                    />
                  </MDBCol>
                </MDBRow>

                <MDBRow className="mb-4">
                  <MDBCol>
                    <MDBRadio
                      name="taxPayable"
                      id="taxPayableYes"
                      label="Yes"
                      value="Yes"
                      checked={formData.taxPayable === 'Yes'}
                      onChange={handleChange}
                    />
                    <MDBRadio
                      name="taxPayable"
                      id="taxPayableNo"
                      label="No"
                      value="No"
                      checked={formData.taxPayable === 'No'}
                      onChange={handleChange}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBRow className="mb-4">
                  <MDBCol>
                    <MDBInput
                      label="Number of Dependents"
                      id="dependents"
                      name="dependents"
                      type="number"
                      value={formData.dependents}
                      onChange={handleChange}
                      required
                    />
                  </MDBCol>
                </MDBRow>
              </>
            )}

            {/* Step 2: Financial Information */}
            {step === 2 && (
              <>
                <MDBRow className="mb-4">
                  <MDBCol md="6">
                    <MDBInput
                      label="Basic Salary"
                      id="basicSalary"
                      name="basicSalary"
                      type="number"
                      value={formData.basicSalary}
                      onChange={handleChange}
                      required
                    />
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
                  </MDBCol>
                </MDBRow>

                <MDBRow className="mb-4">
                  <MDBCol>
                    <MDBInput
                      label="Other Income"
                      id="otherIncome"
                      name="otherIncome"
                      type="number"
                      value={formData.otherIncome}
                      onChange={handleChange}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBRow className="mb-4">
                  <MDBCol>
                    <MDBInput
                      label="Monthly Debit"
                      id="monthlyDebit"
                      name="monthlyDebit"
                      type="number"
                      value={formData.monthlyDebit}
                      onChange={handleChange}
                    />
                  </MDBCol>
                </MDBRow>

                {/* New fields */}
                <MDBRow className="mb-4">
                  <MDBCol>
                    <MDBInput
                      label="Eligibility Status"
                      id="eligibility_status"
                      name="eligibility_status"
                      type="text"
                      value={formData.eligibility_status}
                      onChange={handleChange}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBRow className="mb-4">
                  <MDBCol>
                    <MDBInput
                      label="Suggested Loan Amount"
                      id="suggested_loan_amount"
                      name="suggested_loan_amount"
                      type="number"
                      value={formData.suggested_loan_amount}
                      onChange={handleChange}
                    />
                  </MDBCol>
                </MDBRow>

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

            <div className="d-flex justify-content-between">
              {step === 1 && <MDBBtn color="primary" onClick={nextStep}>Next</MDBBtn>}
              {step === 2 && <MDBBtn color="success" type="submit">Submit</MDBBtn>}
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
