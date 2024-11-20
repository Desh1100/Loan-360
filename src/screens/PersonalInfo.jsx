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
import Header from '../components/ui/Header';


function LoanApplicationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    nic: '',
    title: '',
    homeTown: '',
    residentialAddress: '',
    permanent_address:'',
    taxPayable: '',
    addressProof: null,
    dependents: '',
    basicSalary: '',
    occupation: '',
    otherIncome: '',
    monthlyDebit: '',
    pol:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    setFormData({ ...formData, addressProof: e.target.files[0] });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Loan application submitted successfully!');
  };

  return (
    
    <MDBContainer >
      <Header/>
      <div
        className='text-center bg-image'
        style={{ backgroundImage: "url('https://www.pentucketbank.com/assets/files/YD8ONdom/certificate-of-deposit-piggy-bank-growth.jpg')", height: '200px' }}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'><b>Loan Application Form</b> </h1>
              
            </div>
          </div>
        </div>
      </div>
      <MDBCard style={{marginTop:50}}>
       
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


                <MDBRow className="mb-4" >
                  <MDBCol >
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
                    <label className="form-label">Tax Payable:</label>
                    <div>
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
                    </div>
                  </MDBCol>
                </MDBRow>

             

                <MDBRow className="mb-4">
                  
                    <MDBInput
                      label="Number of Dependents"
                      id="dependents"
                      name="dependents"
                      type="number"
                      value={formData.dependents}
                      onChange={handleChange}
                      required
                    />
                 
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
                      required
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
                      required
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mb-4">
                  <MDBCol>
                    <MDBInput
                      label="Purpose of loan"
                      id="pol"
                      name="pol"
                      type="text"
                      value={formData.pol}
                      onChange={handleChange}
                      required
                    />
                  </MDBCol>
                </MDBRow>
              </>
            )}

            {/* Navigation Buttons */}
            <MDBRow className="text-center">
              <MDBCol>
                {step > 1 && (
                  <MDBBtn
                    color="secondary"
                    size="lg"
                    onClick={prevStep}
                    className="me-2"
                  >
                    Back
                  </MDBBtn>
                )}
                {step < 2 ? (
                  <MDBBtn color="primary" size="lg" onClick={nextStep}>
                    Next
                  </MDBBtn>
                ) : (
                  <MDBBtn type="submit" color="success" size="lg">
                    Submit
                  </MDBBtn>
                )}
              </MDBCol>
            </MDBRow>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default LoanApplicationForm;