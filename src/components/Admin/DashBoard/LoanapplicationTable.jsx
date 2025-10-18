import React, { useState, useEffect } from "react";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const LoanApplicationsTable = ({ initialApplications }) => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [loanApplications, setLoanApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [availableAdmins, setAvailableAdmins] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalLoans: 0
  });
  
  // Drawer state for loan details
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [loanDetailsLoading, setLoanDetailsLoading] = useState(false);

  // Fetch available admins for assignment (super admin only)
  const fetchAvailableAdmins = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return;

      const response = await fetch('http://localhost:8001/api/loans/admin/assignment/admins', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const admins = await response.json();
        setAvailableAdmins(admins);
      }
    } catch (err) {
      console.error('Error fetching admins:', err);
    }
  };

  // Fetch loan data from API
  const fetchLoanData = async (page = 1, status = "All", search = "") => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const queryParams = new URLSearchParams({
        page: page,
        limit: 10,
        ...(status !== "All" && { status }),
        ...(search && { search })
      });

      console.log('Fetching loans with params:', { page, status, search }); // Debug log

      const response = await fetch(`http://localhost:8001/api/loans/admin/all?${queryParams}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Received loan data:', data); // Debug log
      setLoanApplications(data.loans || []);
      setPagination(data.pagination || {});
      setIsSuperAdmin(data.isSuperAdmin || false);
      setError(null);

      // Fetch available admins if user is super admin
      if (data.isSuperAdmin) {
        fetchAvailableAdmins();
      }
    } catch (err) {
      console.error('Error fetching loan data:', err);
      console.error('Token exists:', !!localStorage.getItem('adminToken'));
      setError(err.message);
      // Fallback to sample data if API fails
      setLoanApplications([
        {
          id: "LA001",
          name: "Ruwan Perera",
          amount: "LKR 30,000",
          status: "Not Eligible",
          date: "2025-04-17",
        },
        {
          id: "LA002",
          name: "Kumari Wijesuriya",
          amount: "LKR 20,000",
          status: "Pending",
          date: "2025-04-17",
        },
        {
          id: "LA003",
          name: "Pradeep Kumar",
          amount: "LKR 15,000",
          status: "Rejected",
          date: "2025-04-18",
        },
        {
          id: "LA004",
          name: "Saman Perera",
          amount: "LKR 100,000",
          status: "Approved",
          date: "2025-04-20",
        },
        {
          id: "LA005",
          name: "Nadeesha Jayasinghe",
          amount: "LKR 70,000",
          status: "Not Eligible",
          date: "2025-04-20",
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch detailed loan information
  const fetchLoanDetails = async (loanId) => {
    setLoanDetailsLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`http://localhost:8001/api/loans/admin/${loanId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const loanDetails = await response.json();
      setSelectedLoan(loanDetails);
      setIsDrawerOpen(true);
    } catch (err) {
      console.error('Error fetching loan details:', err);
      alert('Failed to load loan details. Please try again.');
    } finally {
      setLoanDetailsLoading(false);
    }
  };

  // Handle view button click
  const handleViewLoan = (loanId) => {
    fetchLoanDetails(loanId);
  };

  // Close drawer
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedLoan(null);
  };

  // Assign admin to loan
  const assignAdminToLoan = async (loanId, adminId) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`http://localhost:8001/api/loans/admin/${loanId}/assign`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ adminId })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Refresh the loan data to show updated assignment
      fetchLoanData(pagination.currentPage, statusFilter, searchTerm);
      
      alert(`Admin assigned successfully!`);
    } catch (err) {
      console.error('Error assigning admin:', err);
      alert('Failed to assign admin. Please try again.');
    }
  };

  // Generate PDF report
  const generatePDFReport = () => {
    if (!selectedLoan) return;

    const doc = new jsPDF();
    
    // Set up colors
    const primaryColor = [139, 69, 19]; // #8B4513
    const secondaryColor = [210, 180, 140]; // #D2B48C
    const textColor = [101, 67, 33]; // #654321
    const accentColor = [255, 115, 0]; // #ff7300
    
    // Header section with background
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 40, 'F');
    
  
    
    // Loan 360 heading
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Loan 360', 20, 25);
    

    
    // Document title with line
    doc.setTextColor(...textColor);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('LOAN APPLICATION REPORT', 20, 60);
    
    // Decorative line
    doc.setDrawColor(...accentColor);
    doc.setLineWidth(2);
    doc.line(20, 65, 190, 65);
    
    // Report details in a styled box
    doc.setFillColor(248, 248, 248);
    doc.roundedRect(20, 75, 170, 25, 3, 3, 'F');
    doc.setDrawColor(...secondaryColor);
    doc.setLineWidth(1);
    doc.roundedRect(20, 75, 170, 25, 3, 3, 'S');
    
    // Application details
    doc.setTextColor(...textColor);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Application ID: ' + (selectedLoan._id || 'N/A'), 25, 85);
    doc.text('Application Date: ' + (selectedLoan.application_date ? new Date(selectedLoan.application_date).toLocaleDateString() : 'N/A'), 25, 92);
    doc.text('Report Generated: ' + new Date().toLocaleDateString() + ' at ' + new Date().toLocaleTimeString(), 110, 85);
    doc.text('Generated by: Admin System', 110, 92);
    
    // Status badge with better styling
    const statusY = 110;
    let statusColor = primaryColor;
    if (selectedLoan.status === 'Approved') statusColor = [40, 167, 69];
    else if (selectedLoan.status === 'Rejected') statusColor = [220, 53, 69];
    else if (selectedLoan.status === 'Pending') statusColor = [255, 193, 7];
    
    doc.setFillColor(...statusColor);
    doc.roundedRect(20, statusY - 3, 80, 12, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('APPLICATION STATUS: ' + (selectedLoan.status || 'PENDING'), 25, statusY + 3);
    
    let yPosition = 135;
    
    // Personal Information Section
    doc.setTextColor(...primaryColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('PERSONAL INFORMATION', 20, yPosition);
    yPosition += 5;
    
    // Add decorative line under section headers
    doc.setDrawColor(...secondaryColor);
    doc.setLineWidth(1);
    doc.line(20, yPosition, 100, yPosition);
    yPosition += 10;
    
    const personalData = [
      ['Full Name', selectedLoan.personal_details?.full_name || 'N/A'],
      ['National ID (NIC)', selectedLoan.personal_details?.nic || 'N/A'],
      ['Title', selectedLoan.personal_details?.title || 'N/A'],
      ['Home Town', selectedLoan.personal_details?.home_town || 'N/A'],
      ['Residential Address', selectedLoan.personal_details?.residential_address || 'N/A']
    ];
    
    autoTable(doc, {
      startY: yPosition,
      head: [['Field', 'Details']],
      body: personalData,
      theme: 'striped',
      headStyles: { 
        fillColor: primaryColor, 
        textColor: [255, 255, 255],
        fontSize: 11,
        fontStyle: 'bold'
      },
      styles: { 
        fontSize: 10, 
        cellPadding: 6,
        textColor: textColor
      },
      columnStyles: { 
        0: { fontStyle: 'bold', cellWidth: 60, fillColor: [250, 250, 250] },
        1: { cellWidth: 120 }
      },
      alternateRowStyles: { fillColor: [255, 252, 240] }
    });
    
    yPosition = doc.lastAutoTable.finalY + 15;
    
    // Add new page for Family Information
    doc.addPage();
    yPosition = 50; // Reset Y position for new page
    
    // Family Information Section
    doc.setTextColor(...primaryColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('FAMILY INFORMATION', 20, yPosition);
    yPosition += 5;
    doc.line(20, yPosition, 110, yPosition);
    yPosition += 10;
    
    const familyData = [
      ['Number of Dependents', selectedLoan.family_details?.dependents?.toString() || 'N/A'],
      ['Education Level', selectedLoan.family_details?.education || 'N/A'],
      ['Employment Type', selectedLoan.family_details?.self_employed ? 'Self Employed' : 'Salaried']
    ];
    
    autoTable(doc, {
      startY: yPosition,
      head: [['Field', 'Details']],
      body: familyData,
      theme: 'striped',
      headStyles: { 
        fillColor: primaryColor, 
        textColor: [255, 255, 255],
        fontSize: 11,
        fontStyle: 'bold'
      },
      styles: { 
        fontSize: 10, 
        cellPadding: 6,
        textColor: textColor
      },
      columnStyles: { 
        0: { fontStyle: 'bold', cellWidth: 60, fillColor: [250, 250, 250] },
        1: { cellWidth: 120 }
      },
      alternateRowStyles: { fillColor: [255, 252, 240] }
    });
    
    yPosition = doc.lastAutoTable.finalY + 15;
    
    // Check if we need a new page
    if (yPosition > 220) {
      doc.addPage();
      yPosition = 30;
    }
    
    // Financial Information Section
    doc.setTextColor(...primaryColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('FINANCIAL INFORMATION', 20, yPosition);
    yPosition += 5;
    doc.line(20, yPosition, 120, yPosition);
    yPosition += 10;
    
    const financialData = [
      ['Basic Monthly Salary', 'LKR ' + (selectedLoan.financial_details?.basic_salary?.toLocaleString() || 'N/A')],
      ['Annual Income', 'LKR ' + (selectedLoan.financial_details?.annual_income?.toLocaleString() || 'N/A')],
      ['Requested Loan Amount', 'LKR ' + (selectedLoan.financial_details?.loan_amount?.toLocaleString() || 'N/A')],
      ['Loan Term Period', (selectedLoan.financial_details?.loan_term || 'N/A') + ' months'],
      ['CIBIL Credit Score', selectedLoan.financial_details?.cibil_score?.toString() || 'N/A'],
      ['Occupation/Profession', selectedLoan.financial_details?.occupation || 'N/A']
    ];
    
    autoTable(doc, {
      startY: yPosition,
      head: [['Financial Aspect', 'Value/Details']],
      body: financialData,
      theme: 'striped',
      headStyles: { 
        fillColor: primaryColor, 
        textColor: [255, 255, 255],
        fontSize: 11,
        fontStyle: 'bold'
      },
      styles: { 
        fontSize: 10, 
        cellPadding: 6,
        textColor: textColor
      },
      columnStyles: { 
        0: { fontStyle: 'bold', cellWidth: 60, fillColor: [250, 250, 250] },
        1: { cellWidth: 120 }
      },
      alternateRowStyles: { fillColor: [255, 252, 240] }
    });
    
    yPosition = doc.lastAutoTable.finalY + 15;
    
    // Check if we need a new page for assets
    if (yPosition > 220) {
      doc.addPage();
      yPosition = 30;
    }
    
    // Asset Information Section
    doc.setTextColor(...primaryColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('ASSET INFORMATION', 20, yPosition);
    yPosition += 5;
    doc.line(20, yPosition, 110, yPosition);
    yPosition += 10;
    
    const totalAssets = (selectedLoan.asset_details?.residential_asset_value || 0) +
                       (selectedLoan.asset_details?.commercial_asset_value || 0) +
                       (selectedLoan.asset_details?.luxury_asset_value || 0) +
                       (selectedLoan.asset_details?.bank_asset_value || 0);
    
    const assetData = [
      ['Residential Property', 'LKR ' + (selectedLoan.asset_details?.residential_asset_value?.toLocaleString() || 'N/A')],
      ['Commercial Property', 'LKR ' + (selectedLoan.asset_details?.commercial_asset_value?.toLocaleString() || 'N/A')],
      ['Luxury Assets', 'LKR ' + (selectedLoan.asset_details?.luxury_asset_value?.toLocaleString() || 'N/A')],
      ['Bank Assets & Savings', 'LKR ' + (selectedLoan.asset_details?.bank_asset_value?.toLocaleString() || 'N/A')],
      ['TOTAL ASSET VALUE', 'LKR ' + totalAssets.toLocaleString()]
    ];
    
    autoTable(doc, {
      startY: yPosition,
      head: [['Asset Category', 'Market Value (LKR)']],
      body: assetData,
      theme: 'striped',
      headStyles: { 
        fillColor: primaryColor, 
        textColor: [255, 255, 255],
        fontSize: 11,
        fontStyle: 'bold'
      },
      styles: { 
        fontSize: 10, 
        cellPadding: 6,
        textColor: textColor
      },
      columnStyles: { 
        0: { fontStyle: 'bold', cellWidth: 60, fillColor: [250, 250, 250] },
        1: { cellWidth: 120 }
      },
      alternateRowStyles: { fillColor: [255, 252, 240] }
    });
    
    // Footer with professional styling
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      const pageHeight = doc.internal.pageSize.height;
      
      // Footer background
      doc.setFillColor(248, 248, 248);
      doc.rect(0, pageHeight - 25, 210, 25, 'F');
      
      // Footer content
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text('This document is confidentially generated by Loan 360 Professional System', 20, pageHeight - 15);
      doc.text('Admin: ' + (localStorage.getItem('adminEmail') || 'System Admin') + ' | Generated: ' + new Date().toLocaleString(), 20, pageHeight - 8);
      
      // Page number
      doc.text('Page ' + i + ' of ' + pageCount, 170, pageHeight - 8);
    }
    
    // Save the PDF with descriptive filename
    const applicantName = selectedLoan.personal_details?.full_name?.replace(/\s+/g, '_') || 'Unknown';
    const dateStr = new Date().toISOString().split('T')[0];
    const fileName = 'Loan360_Report_' + applicantName + '_' + dateStr + '.pdf';
    doc.save(fileName);
    
    // Show success message (you can replace this with a toast notification)
    alert('PDF report generated successfully!\nFile: ' + fileName);
  };

  useEffect(() => {
    if (!initialApplications) {
      fetchLoanData();
    } else {
      setLoanApplications(initialApplications);
      setLoading(false);
    }
  }, [initialApplications]);

  // Handle status filter change for API calls
  useEffect(() => {
    if (!initialApplications) {
      fetchLoanData(1, statusFilter, searchTerm);
    }
  }, [statusFilter, initialApplications]);

  // Handle search with debounce for API calls only
  useEffect(() => {
    if (!initialApplications) {
      const timeoutId = setTimeout(() => {
        // Only search if term is at least 2 characters or empty
        if (searchTerm.length === 0 || searchTerm.length >= 2) {
          fetchLoanData(1, statusFilter, searchTerm.trim());
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    }
    // For initialApplications (client-side), no debounce needed as filtering is instant
  }, [searchTerm, initialApplications]);

  // Memoize filtered applications to prevent unnecessary re-renders
  const filteredApplications = React.useMemo(() => {
    let filtered = loanApplications;
    
    // For API-driven data, filtering is handled server-side, so return as is
    if (!initialApplications) {
      return filtered;
    }
    
    // For initial/client-side data, apply filters locally
    if (statusFilter !== "All") {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }
    
    // Apply name search filter (client-side)
    if (searchTerm.trim()) {
      filtered = filtered.filter((app) => 
        app.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    }
    
    return filtered;
  }, [loanApplications, statusFilter, searchTerm, initialApplications]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return {
          backgroundColor: "#FFF4E6",
          color: "#D2691E",
          padding: "8px 16px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: "600",
          border: "2px solid #FFE4B5",
          display: "inline-flex",
          alignItems: "center",
          gap: "5px"
        };
      case "Approved":
        return {
          backgroundColor: "#E8F5E8",
          color: "#228B22",
          padding: "8px 16px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: "600",
          border: "2px solid #98FB98",
          display: "inline-flex",
          alignItems: "center",
          gap: "5px"
        };
      case "Rejected":
        return {
          backgroundColor: "#FFE8E8",
          color: "#CD5C5C",
          padding: "8px 16px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: "600",
          border: "2px solid #FFA07A",
          display: "inline-flex",
          alignItems: "center",
          gap: "5px"
        };
      case "Not Eligible":
        return {
          backgroundColor: "#F5E6E8",
          color: "#A0522D",
          padding: "8px 16px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: "600",
          border: "2px solid #D2B48C",
          display: "inline-flex",
          alignItems: "center",
          gap: "5px"
        };
      default:
        return {
          backgroundColor: "#F5F5DC",
          color: "#654321",
          padding: "8px 16px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: "600",
          border: "2px solid #D2B48C",
          display: "inline-flex",
          alignItems: "center",
          gap: "5px"
        };
    }
  };

  const tableStyles = {
    container: {
      width: "100%",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    filterContainer: {
      marginBottom: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "1rem"
    },
    select: {
      padding: "12px 16px",
      border: "2px solid #D2B48C",
      borderRadius: "10px",
      backgroundColor: "white",
      color: "#654321",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      outline: "none",
      transition: "all 0.3s ease"
    },
    tableContainer: {
      overflowX: "auto",
      borderRadius: "15px",
      boxShadow: "0 4px 15px rgba(139, 69, 19, 0.1)"
    },
    table: {
      width: "100%",
      textAlign: "left",
      borderCollapse: "collapse",
      backgroundColor: "white"
    },
    thead: {
      background: "linear-gradient(135deg, #8B4513, #A0522D)"
    },
    th: {
      padding: "16px",
      fontSize: "13px",
      fontWeight: "700",
      color: "white",
      textTransform: "uppercase",
      letterSpacing: "0.5px"
    },
    tbody: {
      backgroundColor: "white"
    },
    tr: {
      borderBottom: "1px solid #F5DEB3",
      cursor: "pointer",
      transition: "all 0.3s ease"
    },
    td: {
      padding: "16px",
      fontSize: "14px",
      color: "#654321",
      fontWeight: "500"
    },
    searchContainer: {
      position: "relative"
    },
    searchInput: {
      padding: "12px 16px",
      border: "2px solid #D2B48C",
      borderRadius: "10px",
      backgroundColor: "white",
      color: "#654321",
      fontSize: "14px",
      width: "250px",
      outline: "none",
      transition: "all 0.3s ease"
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px',
        fontSize: '16px',
        color: '#8B4513'
      }}>
        Loading loan applications...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px',
        fontSize: '16px',
        color: '#CD5C5C'
      }}>
        Error loading data: {error}
      </div>
    );
  }

  return (
    <div style={tableStyles.container}>
      <div style={tableStyles.filterContainer}>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={tableStyles.select}
          onFocus={(e) => e.target.style.borderColor = "#8B4513"}
          onBlur={(e) => e.target.style.borderColor = "#D2B48C"}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Not Eligible">Not Eligible</option>
        </select>
        
        <div style={tableStyles.searchContainer}>
          <input
            type="text"
            placeholder="Search by applicant name..."
            value={searchTerm}
            onChange={(e) => {
              e.preventDefault();
              setSearchTerm(e.target.value);
            }}
            style={tableStyles.searchInput}
            onFocus={(e) => e.target.style.borderColor = "#8B4513"}
            onBlur={(e) => e.target.style.borderColor = "#D2B48C"}
            autoComplete="off"
          />
        </div>
      </div>
      
      <div style={tableStyles.tableContainer}>
        <table style={tableStyles.table}>
          <thead style={tableStyles.thead}>
            <tr>
              <th style={tableStyles.th}>Loan ID</th>
              <th style={tableStyles.th}>Applicant Name</th>
              <th style={tableStyles.th}>Loan Amount</th>
              <th style={tableStyles.th}>Status</th>
              <th style={tableStyles.th}>Application Date</th>
              {isSuperAdmin && <th style={tableStyles.th}>Assigned Admin</th>}
              <th style={tableStyles.th}>Actions</th>
            </tr>
          </thead>
          <tbody style={tableStyles.tbody}>
            {filteredApplications.map((application, index) => (
              <tr
                key={application.id}
                style={{
                  ...tableStyles.tr,
                  backgroundColor: index % 2 === 0 ? "#FFF8DC" : "white"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#F5DEB3";
                  e.target.style.transform = "scale(1.002)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = index % 2 === 0 ? "#FFF8DC" : "white";
                  e.target.style.transform = "scale(1)";
                }}
              >
                <td style={{...tableStyles.td, fontWeight: "600", color: "#8B4513"}}>
                  {application.id}
                </td>
                <td style={tableStyles.td}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                        background: "linear-gradient(45deg, #D2691E, #A0522D)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "12px",
                        fontWeight: "bold"
                      }}
                    >
                      {application.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {application.name}
                  </div>
                </td>
                <td style={{...tableStyles.td, fontWeight: "600", color: "#8B4513"}}>
                  {application.amount}
                </td>
                <td style={tableStyles.td}>
                  <span style={getStatusStyle(application.status)}>
                    {application.status}
                  </span>
                </td>
                <td style={tableStyles.td}>{application.date}</td>
                {isSuperAdmin && (
                  <td style={tableStyles.td}>
                    <select
                      style={{
                        ...tableStyles.select,
                        fontSize: "12px",
                        padding: "6px 10px",
                        width: "150px"
                      }}
                      value={application.assignedAdmin?.id || ""}
                      onChange={(e) => {
                        const selectedAdminId = e.target.value || null;
                        assignAdminToLoan(application.id || application._id, selectedAdminId);
                      }}
                    >
                      <option value="">Unassigned</option>
                      {availableAdmins.map((admin) => (
                        <option key={admin.id} value={admin.id}>
                          {admin.name}
                        </option>
                      ))}
                    </select>
                  </td>
                )}
                <td style={tableStyles.td}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      style={{
                        padding: "6px 12px",
                        border: "none",
                        borderRadius: "6px",
                        backgroundColor: "#8B4513",
                        color: "white",
                        fontSize: "12px",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = "#654321"}
                      onMouseLeave={(e) => e.target.style.backgroundColor = "#8B4513"}
                      onClick={() => handleViewLoan(application.id || application._id)}
                      disabled={loanDetailsLoading}
                    >
                      {loanDetailsLoading ? "Loading..." : "View"}
                    </button>
                    <button
                      style={{
                        padding: "6px 12px",
                        border: "2px solid #D2691E",
                        borderRadius: "6px",
                        backgroundColor: "transparent",
                        color: "#D2691E",
                        fontSize: "12px",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#D2691E";
                        e.target.style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.color = "#D2691E";
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredApplications.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#8B4513',
            fontSize: '16px'
          }}>
            No loan applications found.
          </div>
        )}
      </div>

      {!initialApplications && pagination.totalPages > 1 && (
        <div style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
          backgroundColor: '#FFF8DC',
          borderRadius: '10px'
        }}>
          <div style={{ color: '#654321', fontSize: '14px' }}>
            Showing {((pagination.currentPage - 1) * 10) + 1} to {Math.min(pagination.currentPage * 10, pagination.totalLoans)} of {pagination.totalLoans} loans
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => fetchLoanData(pagination.currentPage - 1, statusFilter, searchTerm)}
              disabled={!pagination.hasPrev}
              style={{
                padding: '8px 16px',
                border: '2px solid #D2B48C',
                borderRadius: '6px',
                backgroundColor: pagination.hasPrev ? 'white' : '#F5F5DC',
                color: pagination.hasPrev ? '#8B4513' : '#999',
                cursor: pagination.hasPrev ? 'pointer' : 'not-allowed',
                fontSize: '14px'
              }}
            >
              Previous
            </button>
            <span style={{ 
              padding: '8px 16px', 
              color: '#654321',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() => fetchLoanData(pagination.currentPage + 1, statusFilter, searchTerm)}
              disabled={!pagination.hasNext}
              style={{
                padding: '8px 16px',
                border: '2px solid #D2B48C',
                borderRadius: '6px',
                backgroundColor: pagination.hasNext ? 'white' : '#F5F5DC',
                color: pagination.hasNext ? '#8B4513' : '#999',
                cursor: pagination.hasNext ? 'pointer' : 'not-allowed',
                fontSize: '14px'
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
      
      {/* Loan Details Right Drawer */}
      {isDrawerOpen && (
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
            onClick={closeDrawer}
          ></div>
          
          {/* Drawer */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '800px',
              height: '100%',
              backgroundColor: 'white',
              boxShadow: '-4px 0 20px rgba(0,0,0,0.3)',
              zIndex: 9999,
              overflow: 'auto',
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            }}
          >
            <div style={{ padding: '24px' }}>
              {/* Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '2px solid #F5DEB3'
              }}>
                <h4 style={{ 
                  color: '#8B4513', 
                  margin: 0,
                  fontWeight: '700'
                }}>
                  Loan Application Details
                </h4>
                {isSuperAdmin && selectedLoan?.assignedAdmin && (
                  <div style={{
                    padding: '8px 12px',
                    backgroundColor: '#E8F5E8',
                    color: '#228B22',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    Assigned to: {selectedLoan.assignedAdmin.name}
                  </div>
                )}
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                    color: '#8B4513',
                    padding: '4px'
                  }}
                  onClick={closeDrawer}
                >
                  ✕
                </button>
              </div>

              {selectedLoan && (
                <div>
                  {/* Status Badge */}
                  <div style={{
                    marginBottom: '24px',
                    padding: '16px',
                    backgroundColor: '#FFF8DC',
                    borderRadius: '12px',
                    border: '2px solid #F5DEB3'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ 
                        color: '#654321', 
                        fontWeight: '600',
                        fontSize: '14px'
                      }}>
                        Application Status:
                      </span>
                      <span style={getStatusStyle(selectedLoan.status)}>
                        {selectedLoan.status}
                      </span>
                    </div>
                  </div>

                  {/* Two Column Layout */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '24px',
                    marginBottom: '24px'
                  }}>
                    {/* Left Column */}
                    <div>
                      {/* Personal Details */}
                      <div style={{ marginBottom: '24px' }}>
                        <h6 style={{ 
                          color: '#8B4513', 
                          marginBottom: '12px',
                          fontWeight: '600',
                          fontSize: '16px'
                        }}>
                          Personal Information
                        </h6>
                        <div style={{
                          border: '1px solid #D2B48C',
                          borderRadius: '10px',
                          padding: '16px',
                          backgroundColor: '#FEFEFE'
                        }}>
                          <div style={{ marginBottom: '12px' }}>
                            <small style={{ color: '#8B4513', fontWeight: '600' }}>Full Name:</small>
                            <div style={{ color: '#654321', fontWeight: '500' }}>
                              {selectedLoan.personal_details?.full_name || 'N/A'}
                            </div>
                          </div>
                          <div style={{ marginBottom: '12px' }}>
                            <small style={{ color: '#8B4513', fontWeight: '600' }}>NIC:</small>
                            <div style={{ color: '#654321', fontWeight: '500' }}>
                              {selectedLoan.personal_details?.nic || 'N/A'}
                            </div>
                          </div>
                          <div style={{ marginBottom: '12px' }}>
                            <small style={{ color: '#8B4513', fontWeight: '600' }}>Title:</small>
                            <div style={{ color: '#654321', fontWeight: '500' }}>
                              {selectedLoan.personal_details?.title || 'N/A'}
                            </div>
                          </div>
                          <div style={{ marginBottom: '12px' }}>
                            <small style={{ color: '#8B4513', fontWeight: '600' }}>Home Town:</small>
                            <div style={{ color: '#654321', fontWeight: '500' }}>
                              {selectedLoan.personal_details?.home_town || 'N/A'}
                            </div>
                          </div>
                          <div>
                            <small style={{ color: '#8B4513', fontWeight: '600' }}>Address:</small>
                            <div style={{ color: '#654321', fontWeight: '500' }}>
                              {selectedLoan.personal_details?.residential_address || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Financial Details */}
                      <div style={{ marginBottom: '24px' }}>
                        <h6 style={{ 
                          color: '#8B4513', 
                          marginBottom: '12px',
                          fontWeight: '600',
                          fontSize: '16px'
                        }}>
                          Financial Information
                        </h6>
                        <div style={{
                          border: '1px solid #D2B48C',
                          borderRadius: '10px',
                          padding: '16px',
                          backgroundColor: '#FEFEFE'
                        }}>
                          <div style={{ marginBottom: '12px' }}>
                            <small style={{ color: '#8B4513', fontWeight: '600' }}>Basic Salary:</small>
                            <div style={{ color: '#654321', fontWeight: '500' }}>
                              LKR {selectedLoan.financial_details?.basic_salary?.toLocaleString() || 'N/A'}
                            </div>
                          </div>
                          <div style={{ marginBottom: '12px' }}>
                            <small style={{ color: '#8B4513', fontWeight: '600' }}>Annual Income:</small>
                            <div style={{ color: '#654321', fontWeight: '500' }}>
                              LKR {selectedLoan.financial_details?.annual_income?.toLocaleString() || 'N/A'}
                            </div>
                          </div>
                          <div style={{ marginBottom: '12px' }}>
                            <small style={{ color: '#8B4513', fontWeight: '600' }}>Loan Amount:</small>
                            <div style={{ color: '#654321', fontWeight: '500' }}>
                              LKR {selectedLoan.financial_details?.loan_amount?.toLocaleString() || 'N/A'}
                            </div>
                          </div>
                          <div style={{ marginBottom: '12px' }}>
                            <small style={{ color: '#8B4513', fontWeight: '600' }}>Loan Term:</small>
                            <div style={{ color: '#654321', fontWeight: '500' }}>
                              {selectedLoan.financial_details?.loan_term} months
                            </div>
                          </div>
                          <div style={{ marginBottom: '12px' }}>
                            <small style={{ color: '#8B4513', fontWeight: '600' }}>CIBIL Score:</small>
                            <div style={{ color: '#654321', fontWeight: '500' }}>
                              {selectedLoan.financial_details?.cibil_score || 'N/A'}
                            </div>
                          </div>
                          <div>
                            <small style={{ color: '#8B4513', fontWeight: '600' }}>Occupation:</small>
                            <div style={{ color: '#654321', fontWeight: '500' }}>
                              {selectedLoan.financial_details?.occupation || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div>
                      {/* Family Details */}
                      <div style={{ marginBottom: '24px' }}>
                        <h6 style={{ 
                          color: '#8B4513', 
                          marginBottom: '12px',
                          fontWeight: '600',
                          fontSize: '16px'
                        }}>
                          Family Information
                        </h6>
                        <div style={{
                          border: '1px solid #D2B48C',
                          borderRadius: '10px',
                          padding: '16px',
                          backgroundColor: '#FEFEFE'
                        }}>
                          <div style={{ marginBottom: '12px' }}>
                            <small style={{ color: '#8B4513', fontWeight: '600' }}>Dependents:</small>
                            <div style={{ color: '#654321', fontWeight: '500' }}>
                              {selectedLoan.family_details?.dependents || 'N/A'}
                            </div>
                          </div>
                          <div style={{ marginBottom: '12px' }}>
                            <small style={{ color: '#8B4513', fontWeight: '600' }}>Education:</small>
                            <div style={{ color: '#654321', fontWeight: '500' }}>
                              {selectedLoan.family_details?.education || 'N/A'}
                            </div>
                          </div>
                          <div>
                            <small style={{ color: '#8B4513', fontWeight: '600' }}>Employment Type:</small>
                            <div style={{ color: '#654321', fontWeight: '500' }}>
                              {selectedLoan.family_details?.self_employed ? 'Self Employed' : 'Salaried'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Asset Details */}
                      <div style={{ marginBottom: '24px' }}>
                        <h6 style={{ 
                          color: '#8B4513', 
                          marginBottom: '12px',
                          fontWeight: '600',
                          fontSize: '16px'
                        }}>
                          Asset Information
                        </h6>
                        <div style={{
                          border: '1px solid #D2B48C',
                          borderRadius: '10px',
                          padding: '16px',
                          backgroundColor: '#FEFEFE'
                        }}>
                          <div style={{ marginBottom: '12px' }}>
                            <small style={{ color: '#8B4513', fontWeight: '600' }}>Residential Assets:</small>
                            <div style={{ color: '#654321', fontWeight: '500' }}>
                              LKR {selectedLoan.asset_details?.residential_asset_value?.toLocaleString() || 'N/A'}
                            </div>
                          </div>
                          <div style={{ marginBottom: '12px' }}>
                            <small style={{ color: '#8B4513', fontWeight: '600' }}>Commercial Assets:</small>
                            <div style={{ color: '#654321', fontWeight: '500' }}>
                              LKR {selectedLoan.asset_details?.commercial_asset_value?.toLocaleString() || 'N/A'}
                            </div>
                          </div>
                          <div style={{ marginBottom: '12px' }}>
                            <small style={{ color: '#8B4513', fontWeight: '600' }}>Luxury Assets:</small>
                            <div style={{ color: '#654321', fontWeight: '500' }}>
                              LKR {selectedLoan.asset_details?.luxury_asset_value?.toLocaleString() || 'N/A'}
                            </div>
                          </div>
                          <div>
                            <small style={{ color: '#8B4513', fontWeight: '600' }}>Bank Assets:</small>
                            <div style={{ color: '#654321', fontWeight: '500' }}>
                              LKR {selectedLoan.asset_details?.bank_asset_value?.toLocaleString() || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Application Date */}
                      <div style={{ marginBottom: '24px' }}>
                        <h6 style={{ 
                          color: '#8B4513', 
                          marginBottom: '12px',
                          fontWeight: '600',
                          fontSize: '16px'
                        }}>
                          Application Information
                        </h6>
                        <div style={{
                          border: '1px solid #D2B48C',
                          borderRadius: '10px',
                          padding: '16px',
                          backgroundColor: '#FEFEFE'
                        }}>
                          <div>
                            <small style={{ color: '#8B4513', fontWeight: '600' }}>Application Date:</small>
                            <div style={{ color: '#654321', fontWeight: '500' }}>
                              {selectedLoan.application_date ? new Date(selectedLoan.application_date).toLocaleDateString() : 'N/A'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Admin Assignment Section for Super Admin */}
                  {isSuperAdmin && (
                    <div style={{
                      marginBottom: '16px',
                      padding: '16px',
                      backgroundColor: '#FFF8DC',
                      borderRadius: '10px',
                      border: '1px solid #D2B48C'
                    }}>
                      <h6 style={{ 
                        color: '#8B4513', 
                        marginBottom: '12px',
                        fontWeight: '600',
                        fontSize: '14px'
                      }}>
                        Admin Assignment
                      </h6>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <label style={{ color: '#654321', fontWeight: '500', fontSize: '14px' }}>
                          Assign to:
                        </label>
                        <select
                          style={{
                            ...tableStyles.select,
                            fontSize: "14px",
                            padding: "8px 12px",
                            flex: 1
                          }}
                          value={selectedLoan?.assignedAdmin?.id || ""}
                          onChange={(e) => {
                            const selectedAdminId = e.target.value || null;
                            assignAdminToLoan(selectedLoan._id, selectedAdminId);
                          }}
                        >
                          <option value="">Unassigned</option>
                          {availableAdmins.map((admin) => (
                            <option key={admin.id} value={admin.id}>
                              {admin.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    paddingTop: '16px',
                    borderTop: '1px solid #D2B48C'
                  }}>
                    <button
                      style={{
                        flex: 1,
                        padding: '12px',
                        border: 'none',
                        borderRadius: '8px',
                        backgroundColor: '#8B4513',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = "#654321"}
                      onMouseLeave={(e) => e.target.style.backgroundColor = "#8B4513"}
                    >
                      Update Status
                    </button>
                    <button
                      style={{
                        flex: 1,
                        padding: '12px',
                        border: '2px solid #D2691E',
                        borderRadius: '8px',
                        backgroundColor: 'transparent',
                        color: '#D2691E',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#D2691E";
                        e.target.style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.color = "#D2691E";
                      }}
                      onClick={generatePDFReport}
                    >
                      Generate Report
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LoanApplicationsTable;
