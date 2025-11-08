import React, { useState, useEffect } from "react";
import styles from "./AutoFeedback.module.css";

const AutoFeedback = () => {
  const [loans, setLoans] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [selectedLoanId, setSelectedLoanId] = useState("");
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [analysisResult, setAnalysisResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  // Fetch loans list on component mount
  useEffect(() => {
    fetchLoans();
  }, []);

  // Get AI analysis from Flask backend (Gemini AI)
  const getAIAnalysis = async (loan) => {
    try {
      // Check if Flask backend is available
      const healthResponse = await fetch('http://localhost:5002/api/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!healthResponse.ok) {
        console.log('Flask backend not available, using fallback analysis');
        return null;
      }

      // Prepare loan data for analysis
      const loanData = JSON.stringify(loan);
      
      const response = await fetch('http://localhost:5002/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          document_data: loanData
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.analysis) {
          return `🤖 AI-POWERED LOAN ANALYSIS (Powered by Google Gemini)
=====================================================

${data.analysis}

=====================================================
⚡ Analysis generated using advanced AI algorithms
🔒 Confidential assessment for internal use only
📊 Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`;
        }
      }
      
      console.log('Flask analysis failed, using fallback');
      return null;
    } catch (error) {
      console.error('Error getting AI analysis:', error);
      return null;
    }
  };

  // Test function to check API directly
  const testAPI = async () => {
    const token = localStorage.getItem('adminToken');
    console.log('Admin Token:', token ? 'Present' : 'Missing');
    
    try {
      // Test main backend
      const response = await fetch('http://localhost:8001/api/loans/admin/all?limit=5', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Main Backend Response Status:', response.status);
      const data = await response.json();
      console.log('Main Backend Response:', data);

      // Test Flask AI backend
      const flaskResponse = await fetch('http://localhost:5002/api/health');
      console.log('Flask Backend Status:', flaskResponse.status);
      const flaskData = await flaskResponse.json();
      console.log('Flask Backend Health:', flaskData);

    } catch (error) {
      console.error('API Test Error:', error);
    }
  };

  const fetchLoans = async () => {
    setInitialLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('No authentication token found');
        setInitialLoading(false);
        return;
      }

      console.log('Fetching loans with token:', token ? 'Present' : 'Missing');

      // Get all loans without pagination
      const response = await fetch('http://localhost:8001/api/loans/admin/all?limit=1000', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Fetch response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Full API Response:', data);
        console.log('Loans array:', data.loans);
        console.log('Number of loans:', data.loans ? data.loans.length : 0);
        
        // Get full loan details for each loan
        if (data.loans && data.loans.length > 0) {
          console.log('Fetching full details for', data.loans.length, 'loans...');
          
          const fullLoans = [];
          for (const loanSummary of data.loans) {
            try {
              console.log('Fetching details for loan ID:', loanSummary.id);
              const loanDetailResponse = await fetch(`http://localhost:8001/api/loans/admin/${loanSummary.id}`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              });
              
              if (loanDetailResponse.ok) {
                const loanDetailData = await loanDetailResponse.json();
                console.log('Loan detail response for', loanSummary.id, ':', loanDetailData);
                
                // The API returns the loan object directly, not wrapped in a 'loan' property
                if (loanDetailData && loanDetailData._id) {
                  fullLoans.push(loanDetailData);
                } else {
                  console.warn('Invalid loan data in detail response for', loanSummary.id);
                  // Fallback to summary data
                  fullLoans.push({
                    _id: loanSummary.id,
                    personal_details: { full_name: loanSummary.name },
                    financial_details: { loan_amount: parseInt(loanSummary.amount.replace(/[^0-9]/g, '')) },
                    status: loanSummary.status,
                    application_date: loanSummary.date
                  });
                }
              } else {
                console.error('Failed to fetch loan detail for', loanSummary.id, loanDetailResponse.status);
                // Add summary data as fallback
                fullLoans.push({
                  _id: loanSummary.id,
                  personal_details: { full_name: loanSummary.name },
                  financial_details: { loan_amount: parseInt(loanSummary.amount.replace(/[^0-9]/g, '')) },
                  status: loanSummary.status,
                  application_date: loanSummary.date
                });
              }
            } catch (err) {
              console.error('Error fetching loan detail for', loanSummary.id, ':', err);
              // Add summary data as fallback
              fullLoans.push({
                _id: loanSummary.id,
                personal_details: { full_name: loanSummary.name },
                financial_details: { loan_amount: parseInt(loanSummary.amount.replace(/[^0-9]/g, '')) },
                status: loanSummary.status,
                application_date: loanSummary.date
              });
            }
          }
          
          console.log('Final loans with full details:', fullLoans);
          setLoans(fullLoans);
        } else {
          console.log('No loans in response');
          setLoans([]);
        }
        setError(null);
      } else {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching loans:', error);
      setError('Failed to fetch loans: ' + error.message);
    } finally {
      setInitialLoading(false);
    }
  };

  const searchLoanById = async (loanId) => {
    if (!loanId.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('No authentication token found');
        return;
      }

      // Search in the existing loans array first
      const filteredLoans = loans.filter(loan => {
        const loanIdStr = (loan._id || loan.id || '').toString().toLowerCase();
        const userIdStr = (loan.user_id || '').toString().toLowerCase();
        const nicStr = (loan.personal_details?.nic || '').toString().toLowerCase();
        const nameStr = (loan.personal_details?.full_name || '').toString().toLowerCase();
        const searchStr = loanId.toLowerCase();
        return loanIdStr.includes(searchStr) || 
               userIdStr.includes(searchStr) || 
               nicStr.includes(searchStr) ||
               nameStr.includes(searchStr);
      });

      setSearchResults(filteredLoans);

      // If no results in current list, try fetching specific loan
      if (filteredLoans.length === 0) {
        try {
          const response = await fetch(`http://localhost:8001/api/loans/admin/${loanId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (data.loan) {
              setSearchResults([data.loan]);
            }
          }
        } catch (err) {
          console.log('Specific loan search failed:', err.message);
        }
      }
    } catch (error) {
      console.error('Error searching loans:', error);
      setError('Failed to search loans: ' + error.message);
    } finally {
      setSearchLoading(false);
    }
  };

  const analyzeDocument = async () => {
    if (!selectedLoan) return;
    
    setLoading(true);
    setAnalysisResult("");
    
    try {
      // First try to get AI analysis from Flask backend (Gemini AI)
      const aiAnalysisResult = await getAIAnalysis(selectedLoan);
      
      if (aiAnalysisResult) {
        setAnalysisResult(aiAnalysisResult);
        return;
      }

      // Fallback to local analysis if Flask backend is not available
      const loan = selectedLoan;
      const personalDetails = loan.personal_details || {};
      const financialDetails = loan.financial_details || {};
      const assetDetails = loan.asset_details || {};
      
      // Calculate total asset value
      const totalAssets = (assetDetails.residential_asset_value || 0) +
                         (assetDetails.commercial_asset_value || 0) +
                         (assetDetails.luxury_asset_value || 0) +
                         (assetDetails.bank_asset_value || 0);
      
      // Calculate loan-to-asset ratio
      const loanToAssetRatio = financialDetails.loan_amount ? 
        ((financialDetails.loan_amount / totalAssets) * 100).toFixed(2) : 'N/A';
      
      // Calculate income-to-loan ratio
      const incomeToLoanRatio = financialDetails.annual_income && financialDetails.loan_amount ?
        ((financialDetails.annual_income / financialDetails.loan_amount) * 100).toFixed(2) : 'N/A';
      
      // Generate comprehensive eligibility assessment
      let eligibilityStatus = 'UNDER REVIEW';
      let riskLevel = 'MEDIUM';
      let recommendations = [];
      let strengths = [];
      let concerns = [];
      let actionItems = [];

      // Assess CIBIL Score
      if (financialDetails.cibil_score >= 750) {
        strengths.push('Excellent credit score (750+) indicates strong credit management');
      } else if (financialDetails.cibil_score >= 650) {
        strengths.push('Good credit score indicates reliable payment history');
      } else if (financialDetails.cibil_score >= 600) {
        concerns.push('Average credit score may indicate some past payment issues');
      } else {
        concerns.push('Low credit score (below 600) indicates significant credit risk');
      }

      // Assess Asset Coverage
      const assetCoverageRatio = totalAssets / (financialDetails.loan_amount || 1);
      if (assetCoverageRatio >= 2) {
        strengths.push(`Strong asset coverage (${assetCoverageRatio.toFixed(1)}x) provides excellent security`);
      } else if (assetCoverageRatio >= 1) {
        strengths.push(`Adequate asset coverage (${assetCoverageRatio.toFixed(1)}x) secures the loan amount`);
      } else {
        concerns.push(`Low asset coverage (${assetCoverageRatio.toFixed(1)}x) may not fully secure the loan`);
      }

      // Assess Income vs Loan Amount
      const incomeRatio = (financialDetails.annual_income || 0) / (financialDetails.loan_amount || 1);
      if (incomeRatio >= 2) {
        strengths.push('Strong income-to-loan ratio indicates comfortable repayment capacity');
      } else if (incomeRatio >= 1) {
        strengths.push('Adequate income matches loan amount for manageable repayment');
      } else if (incomeRatio >= 0.5) {
        concerns.push('Income-to-loan ratio suggests tight repayment schedule');
      } else {
        concerns.push('Low income relative to loan amount may strain repayment ability');
      }

      // Final Eligibility Assessment
      const ciblScore = financialDetails.cibil_score || 0;
      const hasStrongAssets = assetCoverageRatio >= 1.5;
      const hasAdequateIncome = incomeRatio >= 0.8;

      if (ciblScore >= 750 && hasStrongAssets && hasAdequateIncome) {
        eligibilityStatus = 'HIGHLY RECOMMENDED';
        riskLevel = 'LOW';
        recommendations.push('Approve with standard terms and competitive interest rate');
        recommendations.push('Fast-track processing due to excellent profile');
        actionItems.push('Proceed with loan documentation');
      } else if (ciblScore >= 650 && hasStrongAssets) {
        eligibilityStatus = 'RECOMMENDED';
        riskLevel = 'LOW';
        recommendations.push('Approve with standard terms');
        recommendations.push('Consider slightly higher interest rate if income is marginal');
        actionItems.push('Complete income verification and proceed');
      } else if (ciblScore >= 600 && totalAssets >= financialDetails.loan_amount) {
        eligibilityStatus = 'CONDITIONAL APPROVAL';
        riskLevel = 'MEDIUM';
        recommendations.push('Approve with enhanced monitoring');
        recommendations.push('Consider higher interest rate to offset risk');
        recommendations.push('Require additional guarantors or collateral documentation');
        actionItems.push('Detailed financial review required');
        actionItems.push('Consider shorter loan term for better risk management');
      } else {
        eligibilityStatus = 'REQUIRES DETAILED REVIEW';
        riskLevel = 'HIGH';
        recommendations.push('Thorough manual review required before decision');
        recommendations.push('Consider alternative loan products or terms');
        recommendations.push('May require co-applicant or additional security');
        actionItems.push('Schedule detailed financial counseling session');
        actionItems.push('Review credit history and improvement plan');
      }

      // Additional smart recommendations based on data
      if (assetDetails.residential_asset_value > 0) {
        recommendations.push('Residential property provides strong collateral base');
      }
      if (assetDetails.bank_asset_value >= (financialDetails.loan_amount * 0.2)) {
        strengths.push('Substantial bank assets demonstrate financial stability');
      }
      if (financialDetails.employment_type === 'Government') {
        strengths.push('Government employment provides stable income source');
      }

      const recommendationText = `
ELIGIBILITY ASSESSMENT: ${eligibilityStatus}
RISK LEVEL: ${riskLevel}

✅ KEY STRENGTHS:
${strengths.map(s => `• ${s}`).join('\n')}

${concerns.length > 0 ? `⚠️ AREAS OF CONCERN:
${concerns.map(c => `• ${c}`).join('\n')}` : ''}

💡 RECOMMENDATIONS:
${recommendations.map(r => `• ${r}`).join('\n')}

📋 ACTION ITEMS:
${actionItems.map(a => `• ${a}`).join('\n')}

📊 DETAILED RISK ANALYSIS:
• Loan-to-Asset Ratio: ${loanToAssetRatio}% ${parseFloat(loanToAssetRatio) <= 50 ? '(Excellent)' : parseFloat(loanToAssetRatio) <= 80 ? '(Good)' : '(Needs Review)'}
• Income Coverage: ${incomeToLoanRatio}% ${parseFloat(incomeToLoanRatio) >= 150 ? '(Excellent)' : parseFloat(incomeToLoanRatio) >= 100 ? '(Good)' : '(Marginal)'}
• Asset Diversification: ${Object.values(assetDetails).filter(v => v > 0).length} asset categories
• Credit Score Band: ${ciblScore >= 750 ? 'Excellent (750+)' : ciblScore >= 700 ? 'Very Good (700-749)' : ciblScore >= 650 ? 'Good (650-699)' : ciblScore >= 600 ? 'Fair (600-649)' : 'Poor (<600)'}

🎯 SUGGESTED LOAN TERMS:
• Interest Rate: ${ciblScore >= 750 ? '8.5-9.5%' : ciblScore >= 650 ? '9.5-11%' : ciblScore >= 600 ? '11-13%' : '13-15%'} (based on risk profile)
• Loan Term: ${riskLevel === 'LOW' ? 'Up to 20 years' : riskLevel === 'MEDIUM' ? 'Up to 15 years' : 'Up to 10 years'}
• Processing Fee: ${riskLevel === 'LOW' ? 'Standard (1%)' : riskLevel === 'MEDIUM' ? '1.5%' : '2%'}
• Required Documentation: ${riskLevel === 'HIGH' ? 'Enhanced verification required' : 'Standard documentation sufficient'}`;

      const finalRecommendation = recommendationText;

      const analysisText = `🏦 AI LOAN ELIGIBILITY ANALYSIS
============================================

👤 APPLICANT PROFILE:
• Name: ${personalDetails.full_name || 'N/A'}
• NIC: ${personalDetails.nic || 'N/A'}
• Loan Amount Requested: ${formatCurrency(financialDetails.loan_amount)}
• Annual Income: ${formatCurrency(financialDetails.annual_income)}
• Monthly Salary: ${formatCurrency(financialDetails.basic_salary)}
• Credit Score: ${financialDetails.cibil_score || 'N/A'}
• Current Status: ${loan.status || 'N/A'}

💰 FINANCIAL SNAPSHOT:
• Total Asset Portfolio: ${formatCurrency(totalAssets)}
  - Residential Property: ${formatCurrency(assetDetails.residential_asset_value)}
  - Commercial Assets: ${formatCurrency(assetDetails.commercial_asset_value)}
  - Luxury Assets: ${formatCurrency(assetDetails.luxury_asset_value)}
  - Bank/Liquid Assets: ${formatCurrency(assetDetails.bank_asset_value)}

============================================
${finalRecommendation}

⏰ Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
🤖 Analysis powered by AI Risk Assessment Engine v2.0`;

      setAnalysisResult(analysisText);
      
    } catch (error) {
      setAnalysisResult(`Analysis Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchId(value);
    searchLoanById(value);
  };

  const handleLoanSelect = (loan) => {
    setSelectedLoan(loan);
    setSelectedLoanId(loan._id || loan.id);
    setAnalysisResult("");
  };

  const handleDropdownChange = (e) => {
    const loanId = e.target.value;
    setSelectedLoanId(loanId);
    setAnalysisResult("");
    
    if (loanId) {
      const loan = loans.find(l => (l._id || l.id) === loanId);
      if (loan) {
        setSelectedLoan(loan);
      }
    } else {
      setSelectedLoan(null);
    }
  };

  const formatCurrency = (amount) => {
    return amount ? `LKR ${amount.toLocaleString()}` : 'N/A';
  };

  // Show error state if authentication failed
  if (error && error.includes('authentication')) {
    return (
      <div style={{ padding: "50px", textAlign: "center", color: "#dc3545" }}>
        <h2>Authentication Error</h2>
        <p>{error}</p>
        <button 
          onClick={() => window.location.href = '/admin/login'}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.header_title}>
          🤖 AI Loan Eligibility Advisor
        </h1>
      </div>
      <div className={styles.container}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          {error && !error.includes('authentication') && (
            <div className={styles.error_message}>
              ⚠️ {error}
            </div>
          )}

          {initialLoading && (
            <div className={styles.loading_message}>
              ℹ️ Loading loan data...
            </div>
          )}

          {loans.length === 0 && !error && !initialLoading && (
            <div className={styles.error_message}>
              ⚠️ No loans found. Please check if there are loan applications in the system.
            </div>
          )}
          
          <h2 className={styles.section_header}>Search Loans</h2>
          
          <label className={styles.label}>
            <strong>Select from Dropdown</strong>
          </label>
          <select
            className={styles.dropdown}
            value={selectedLoanId}
            onChange={handleDropdownChange}
          >
            <option value="">Choose a loan...</option>
            {loans.map((loan) => (
              <option key={loan._id || loan.id || Math.random()} value={loan._id || loan.id}>
                {loan.personal_details?.full_name || 'Unknown'} - NIC: {loan.personal_details?.nic || 'N/A'} - {formatCurrency(loan.financial_details?.loan_amount)}
              </option>
            ))}
          </select>

          <div className={styles.divider}>
            <span className={styles.divider_text}>OR</span>
          </div>

          <label className={styles.label}>
            <strong>Search by Loan ID, User ID, NIC, or Name</strong>
          </label>
          <input
            type="text"
            className={styles.search_input}
            placeholder="Enter Loan ID, User ID, NIC, or Applicant Name..."
            value={searchId}
            onChange={handleSearchChange}
          />
          
          {searchLoading && (
            <p className={styles.search_loading}>🔍 Searching...</p>
          )}
          
          {searchResults.length > 0 && (
            <div className={styles.search_results}>
              <h4 className={styles.search_results_header}>Search Results</h4>
              {searchResults.map((loan) => (
                <div
                  key={loan._id}
                  className={selectedLoan?._id === loan._id ? styles.selected_loan : styles.loan_item}
                  onClick={() => handleLoanSelect(loan)}
                >
                  <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    {loan.personal_details?.full_name || 'N/A'}
                  </div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    Loan ID: {loan._id ? loan._id.slice(-8) : (loan.id || 'No ID')}<br/>
                    NIC: {loan.personal_details?.nic || 'N/A'}<br/>
                    Amount: {formatCurrency(loan.financial_details?.loan_amount)}<br/>
                    Status: {loan.status}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {searchId && searchResults.length === 0 && !searchLoading && (
            <p className={styles.no_results_message}>
              No loans found for "{searchId}"
            </p>
          )}
          
          <button 
            className={styles.analyze_button}
            onClick={analyzeDocument}
            disabled={!selectedLoan || loading}
          >
            {loading ? "Analyzing..." : "Analyze Loan Eligibility"}
          </button>


        </div>

        {/* Main Content */}
        <div className={styles.content}>
          {selectedLoan && (
            <div>
              <h2 className={styles.section_header}>Application Details</h2>
              <div className={styles.document_details}>
                <h4 className={`${styles.info_section_header} ${styles.personal_info}`}>
                  👤 Personal Information
                </h4>
                {selectedLoan.personal_details && (
                  <>
                    <div className={styles.field_row}>
                      <span className={styles.field_label}>Full Name:</span>
                      <span className={styles.field_value}>{selectedLoan.personal_details.full_name || 'N/A'}</span>
                    </div>
                    <div className={styles.field_row}>
                      <span className={styles.field_label}>NIC:</span>
                      <span className={styles.field_value}>{selectedLoan.personal_details.nic || 'N/A'}</span>
                    </div>
                    <div className={styles.field_row}>
                      <span className={styles.field_label}>Title:</span>
                      <span className={styles.field_value}>{selectedLoan.personal_details.title || 'N/A'}</span>
                    </div>
                    <div className={styles.field_row}>
                      <span className={styles.field_label}>Home Town:</span>
                      <span className={styles.field_value}>{selectedLoan.personal_details.home_town || 'N/A'}</span>
                    </div>
                  </>
                )}

                <h4 className={`${styles.info_section_header} ${styles.financial_info}`}>
                  💰 Financial Information
                </h4>
                {selectedLoan.financial_details && (
                  <>
                    <div className={styles.field_row}>
                      <span className={styles.field_label}>Requested Amount:</span>
                      <span className={styles.field_value}>{formatCurrency(selectedLoan.financial_details.loan_amount)}</span>
                    </div>
                    <div className={styles.field_row}>
                      <span className={styles.field_label}>Annual Income:</span>
                      <span className={styles.field_value}>{formatCurrency(selectedLoan.financial_details.annual_income)}</span>
                    </div>
                    <div className={styles.field_row}>
                      <span className={styles.field_label}>Basic Salary:</span>
                      <span className={styles.field_value}>{formatCurrency(selectedLoan.financial_details.basic_salary)}</span>
                    </div>
                    <div className={styles.field_row}>
                      <span className={styles.field_label}>CIBIL Score:</span>
                      <span className={styles.field_value}>{selectedLoan.financial_details.cibil_score || 'N/A'}</span>
                    </div>
                    <div className={styles.field_row}>
                      <span className={styles.field_label}>Employment Type:</span>
                      <span className={styles.field_value}>{selectedLoan.financial_details.employment_type || 'N/A'}</span>
                    </div>
                    <div className={styles.field_row}>
                      <span className={styles.field_label}>Loan Term:</span>
                      <span className={styles.field_value}>{selectedLoan.financial_details.loan_term ? `${selectedLoan.financial_details.loan_term} months` : 'N/A'}</span>
                    </div>
                  </>
                )}

                <h4 className={`${styles.info_section_header} ${styles.asset_info}`}>
                  🏠 Asset Portfolio
                </h4>
                {selectedLoan.asset_details && (
                  <>
                    <div className={styles.field_row}>
                      <span className={styles.field_label}>Residential Assets:</span>
                      <span className={styles.field_value}>{formatCurrency(selectedLoan.asset_details.residential_asset_value)}</span>
                    </div>
                    <div className={styles.field_row}>
                      <span className={styles.field_label}>Commercial Assets:</span>
                      <span className={styles.field_value}>{formatCurrency(selectedLoan.asset_details.commercial_asset_value)}</span>
                    </div>
                    <div className={styles.field_row}>
                      <span className={styles.field_label}>Luxury Assets:</span>
                      <span className={styles.field_value}>{formatCurrency(selectedLoan.asset_details.luxury_asset_value)}</span>
                    </div>
                    <div className={styles.field_row}>
                      <span className={styles.field_label}>Bank Assets:</span>
                      <span className={styles.field_value}>{formatCurrency(selectedLoan.asset_details.bank_asset_value)}</span>
                    </div>
                  </>
                )}

                {selectedLoan.family_details && (
                  <>
                    <h4 className={`${styles.info_section_header} ${styles.family_info}`}>
                      👨‍👩‍👧‍👦 Family Information
                    </h4>
                    <div className={styles.field_row}>
                      <span className={styles.field_label}>Dependents:</span>
                      <span className={styles.field_value}>{selectedLoan.family_details.dependents || 'N/A'}</span>
                    </div>
                    <div className={styles.field_row}>
                      <span className={styles.field_label}>Education:</span>
                      <span className={styles.field_value}>{selectedLoan.family_details.education || 'N/A'}</span>
                    </div>
                    <div className={styles.field_row}>
                      <span className={styles.field_label}>Self Employed:</span>
                      <span className={styles.field_value}>{selectedLoan.family_details.self_employed ? 'Yes' : 'No'}</span>
                    </div>
                  </>
                )}

                <div className={styles.field_row}>
                  <span className={styles.field_label}>Current Status:</span>
                  <span className={`${styles.status_badge} ${
                    selectedLoan.status === 'Approved' ? styles.status_approved : 
                    selectedLoan.status === 'Rejected' || selectedLoan.status === 'Not Eligible' ? styles.status_rejected : 
                    styles.status_pending
                  }`}>
                    {selectedLoan.status || 'N/A'}
                  </span>
                </div>
                
                <div className={styles.field_row}>
                  <span className={styles.field_label}>Application Date:</span>
                  <span className={styles.field_value}>
                    {selectedLoan.application_date ? new Date(selectedLoan.application_date).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {analysisResult && (
            <div>
              <h2 className={styles.section_header}>AI Analysis & Recommendations</h2>
              <div className={styles.analysis_result}>
                {analysisResult}
              </div>
            </div>
          )}

          {!selectedLoan && !analysisResult && (
            <div className={styles.empty_state}>
              <div className={styles.empty_state_icon}>🔍</div>
              <h3 className={styles.empty_state_title}>
                Search for a loan application to view details and get AI analysis
              </h3>
              <p className={styles.empty_state_desc}>
                Use the search bar to find loan applications by ID and get detailed eligibility analysis.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AutoFeedback;
