import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
} from 'mdb-react-ui-kit';

function FamilyInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dependents: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/financial-info');
  };

  return (
    <MDBContainer className="py-5">
      <h2 className="text-center mb-4">Family Information</h2>
      <form onSubmit={handleSubmit}>
        <MDBRow className="mb-4">
          <MDBCol md="6" className="offset-md-3">
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

        <MDBRow className="text-center">
          <MDBCol>
            <MDBBtn type="submit" color="primary" size="lg">
              Next
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </form>
    </MDBContainer>
  );
}

export default FamilyInfo;
