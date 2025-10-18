import React, { useState, useEffect } from "react";

const LoanApplicationsTable = ({ initialApplications }) => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [loanApplications, setLoanApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalLoans: 0
  });

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
      setError(null);
    } catch (err) {
      console.error('Error fetching loan data:', err);
      console.error('Token exists:', !!localStorage.getItem('adminToken'));
      setError(err.message);
      // Fallback to sample data if API fails
      setLoanApplications([
        {
          id: "LA001",
          name: "Ruwan Perera",
          amount: "Rs. 30,000",
          status: "Not Eligible",
          date: "2025-04-17",
        },
        {
          id: "LA002",
          name: "Kumari Wijesuriya",
          amount: "Rs. 20,000",
          status: "Pending",
          date: "2025-04-17",
        },
        {
          id: "LA003",
          name: "Pradeep Kumar",
          amount: "Rs. 15,000",
          status: "Rejected",
          date: "2025-04-18",
        },
        {
          id: "LA004",
          name: "Saman Perera",
          amount: "Rs. 100,000",
          status: "Approved",
          date: "2025-04-20",
        },
        {
          id: "LA005",
          name: "Nadeesha Jayasinghe",
          amount: "Rs. 70,000",
          status: "Not Eligible",
          date: "2025-04-20",
        }
      ]);
    } finally {
      setLoading(false);
    }
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
                    >
                      View
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
    </div>
  );
};

export default LoanApplicationsTable;
