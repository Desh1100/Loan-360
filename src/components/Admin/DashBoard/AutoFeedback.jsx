import React, { useState } from "react";

const LoanEligibilityAdvisor = () => {
  const [selectedDocument, setSelectedDocument] = useState("Document 2");

  const containerStyle = {
    display: "flex",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    color: "#333",
  };

  const sidebarStyle = {
    width: "25%",
    marginRight: "20px",
    padding: "10px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const contentStyle = {
    flex: 1,
    padding: "10px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const headerStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const selectStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const resultStyle = {
    whiteSpace: "pre-line",
    lineHeight: "1.6",
  };

  return (
    <>
      <h1 style={{padding:"20px",paddingLeft:"40%"}}>Sample page</h1>
    <div style={containerStyle}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <h2 style={headerStyle}>Database Configuration</h2>
        <p>
          <strong>Database:</strong> LoanEligibilityApp
        </p>
        <p>
          <strong>Collection:</strong> Loans
        </p>
        <h2 style={headerStyle}>Input Parameters</h2>
        <label>
          <strong>Select a Document</strong>
        </label>
        <select
          style={selectStyle}
          value={selectedDocument}
          onChange={(e) => setSelectedDocument(e.target.value)}
        >
          <option value="Document 1">Document 1</option>
          <option value="Document 2">Document 2</option>
        </select>
        <button style={buttonStyle}>Analyze Loan Eligibility</button>
      </div>

      {/* Main Content */}
      <div style={contentStyle}>
        <h2 style={headerStyle}>Analysis Result</h2>
        <div style={resultStyle}>
          Loan Application of Mr. Bandara Silva (758432156V) is <strong>Not Eligible</strong>.
          {"\n\n"}
          <strong>Reasons for ineligibility:</strong>
          {"\n"}Mr. Silva's monthly debit (LKR 25,000) exceeds his total monthly income
          (LKR 21,000). This indicates a negative cash flow, making it risky to approve the loan.
          {"\n\n"}
          <strong>Collateral Options and Improvements for Reapplication:</strong>
          {"\n"}
          1. <strong>Collateral:</strong> Explore if Mr. Silva owns any assets that could
          be used as collateral, such as:
          {"\n"}- Land or property: This would significantly strengthen his application.
          {"\n"}- Vehicles: Depending on the value, this could provide some security.
          {"\n"}- Savings or investments: These could demonstrate financial stability.
          {"\n"}- Equipment related to his farming business: If applicable, this could
          be considered.
          {"\n\n"}
          2. <strong>Income Improvement:</strong> Mr. Silva needs to demonstrate a positive
          cash flow. He can achieve this by:
          {"\n"}- Increasing income: Explore options for supplemental income or expanding
          his farming business to generate more revenue.
          {"\n"}- Reducing expenses: Analyze his monthly expenses and identify areas where
          he can cut back.
          {"\n\n"}
          3. <strong>Debt Reduction:</strong> While not always immediately achievable, working
          towards reducing existing debt will improve his debt-to-income ratio.
        </div>
      </div>
    </div>
    </>
  );
};

export default LoanEligibilityAdvisor;
