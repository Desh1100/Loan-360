import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OverviewCards from './OverviewCards';
import TrendCharts from './Charts/TrendCharts';
import StatusDistribution from './Charts/StatusDistribution';
import FinancialAnalysis from './Charts/FinancialAnalysis';
import DemographicCharts from './Charts/DemographicCharts';
import TopPerformers from './Tables/TopPerformers';
import RiskAnalysis from './Tables/RiskAnalysis';
import MonthlySummary from './Tables/MonthlySummary';
import styles from './styles.module.css';

const Analytics = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  
  // Data state
  const [analyticsData, setAnalyticsData] = useState({
    overview: {},
    trends: [],
    statusDistribution: [],
    financialData: [],
    demographicData: [],
    topPerformers: [],
    riskData: [],
    monthlySummary: []
  });

  // Active section state for navigation
  const [activeSection, setActiveSection] = useState('overview');

  // Fetch analytics data
  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Fetch overview statistics
      const statsResponse = await fetch('http://localhost:8001/api/loans/admin/statistics', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!statsResponse.ok) {
        throw new Error('Failed to fetch statistics');
      }
      
      const statsData = await statsResponse.json();

      // Fetch detailed analytics data
      const analyticsResponse = await fetch('http://localhost:8001/api/loans/admin/analytics', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      let detailedData = {};
      if (analyticsResponse.ok) {
        detailedData = await analyticsResponse.json();
      } else {
        // Fallback to basic data if analytics endpoint doesn't exist
        console.log('Advanced analytics endpoint not available, using basic data');
        detailedData = await generateMockAnalyticsData(statsData);
      }

      setAnalyticsData({
        overview: statsData,
        ...detailedData
      });

    } catch (err) {
      console.error('Error fetching analytics data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Generate mock analytics data based on available statistics
  const generateMockAnalyticsData = async (statsData) => {
    const monthlyData = [];
    const currentDate = new Date();
    
    // Generate last 12 months of data
    for (let i = 11; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      monthlyData.push({
        month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        applications: Math.floor(Math.random() * 50) + 10,
        approved: Math.floor(Math.random() * 30) + 5,
        rejected: Math.floor(Math.random() * 15) + 2,
        pending: Math.floor(Math.random() * 10) + 1,
        totalAmount: Math.floor(Math.random() * 5000000) + 1000000
      });
    }

    return {
      trends: monthlyData,
      statusDistribution: [
        { name: 'Approved', value: statsData.approvedLoans, color: '#28a745' },
        { name: 'Pending', value: statsData.pendingLoans, color: '#ffc107' },
        { name: 'Rejected', value: statsData.rejectedLoans, color: '#dc3545' }
      ],
      financialData: generateMockFinancialData(),
      demographicData: generateMockDemographicData(),
      topPerformers: generateMockTopPerformers(),
      riskData: generateMockRiskData(),
      monthlySummary: monthlyData
    };
  };

  const generateMockFinancialData = () => {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        loanAmount: Math.floor(Math.random() * 5000000) + 100000,
        ciblScore: Math.floor(Math.random() * 600) + 300,
        annualIncome: Math.floor(Math.random() * 3000000) + 200000,
        status: ['Approved', 'Rejected', 'Pending'][Math.floor(Math.random() * 3)]
      });
    }
    return data;
  };

  const generateMockDemographicData = () => ({
    education: [
      { name: 'Graduate', value: 45, color: '#8B4513' },
      { name: 'Post Graduate', value: 30, color: '#D2691E' },
      { name: 'Diploma', value: 15, color: '#DEB887' },
      { name: 'Others', value: 10, color: '#F4A460' }
    ],
    employment: [
      { name: 'Salaried', value: 70, color: '#8B4513' },
      { name: 'Self Employed', value: 30, color: '#D2691E' }
    ],
    occupation: [
      { occupation: 'Software Engineer', applications: 25, approvalRate: 85 },
      { occupation: 'Doctor', applications: 20, approvalRate: 90 },
      { occupation: 'Teacher', applications: 15, approvalRate: 75 },
      { occupation: 'Business Owner', applications: 18, approvalRate: 70 },
      { occupation: 'Banker', applications: 12, approvalRate: 88 }
    ]
  });

  const generateMockTopPerformers = () => [
    { name: 'John Doe', loanAmount: 5000000, ciblScore: 850, totalAssets: 10000000, status: 'Approved' },
    { name: 'Jane Smith', loanAmount: 4500000, ciblScore: 820, totalAssets: 8500000, status: 'Approved' },
    { name: 'Mike Johnson', loanAmount: 4000000, ciblScore: 800, totalAssets: 7500000, status: 'Approved' },
    { name: 'Sarah Wilson', loanAmount: 3800000, ciblScore: 790, totalAssets: 7000000, status: 'Approved' },
    { name: 'David Brown', loanAmount: 3500000, ciblScore: 780, totalAssets: 6500000, status: 'Approved' }
  ];

  const generateMockRiskData = () => [
    { name: 'Robert Lee', loanAmount: 2000000, ciblScore: 420, loanToIncomeRatio: 8.5, riskLevel: 'High' },
    { name: 'Lisa Chen', loanAmount: 1800000, ciblScore: 450, loanToIncomeRatio: 7.2, riskLevel: 'High' },
    { name: 'Tom Wilson', loanAmount: 1500000, ciblScore: 480, loanToIncomeRatio: 6.8, riskLevel: 'Medium' },
    { name: 'Amy Davis', loanAmount: 1200000, ciblScore: 500, loanToIncomeRatio: 6.0, riskLevel: 'Medium' },
    { name: 'Chris Taylor', loanAmount: 1000000, ciblScore: 520, loanToIncomeRatio: 5.5, riskLevel: 'Medium' }
  ];

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true);
    fetchAnalyticsData();
  };

  // Handle back to dashboard
  const handleBackToDashboard = () => {
    window.location.href = 'http://localhost:3000/admin/app';
  };

  useEffect(() => {
    fetchAnalyticsData();
    
    // Set up auto-refresh every 5 minutes
    const interval = setInterval(() => {
      if (!refreshing) {
        setRefreshing(true);
        fetchAnalyticsData();
      }
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [refreshing]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}>
          <div className={styles.spinnerBorder}></div>
          <p>Loading Analytics Dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <h3>Error Loading Analytics</h3>
          <p>{error}</p>
          <button onClick={fetchAnalyticsData} className={styles.retryButton}>
            Retry
          </button>
          <button onClick={handleBackToDashboard} className={styles.backButton}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.analyticsContainer}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <button onClick={handleBackToDashboard} className={styles.backBtn}>
            ← Back to Dashboard
          </button>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>Analytics & Insights</h1>
            <p className={styles.subtitle}>Comprehensive loan application analytics and reporting</p>
          </div>
          <div className={styles.headerActions}>
            <button 
              onClick={handleRefresh} 
              className={`${styles.refreshBtn} ${refreshing ? styles.refreshing : ''}`}
              disabled={refreshing}
            >
              🔄 {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
           
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className={styles.navigation}>
        <button 
          className={`${styles.navTab} ${activeSection === 'overview' ? styles.active : ''}`}
          onClick={() => setActiveSection('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={`${styles.navTab} ${activeSection === 'trends' ? styles.active : ''}`}
          onClick={() => setActiveSection('trends')}
        >
          📈 Trends
        </button>
        <button 
          className={`${styles.navTab} ${activeSection === 'demographics' ? styles.active : ''}`}
          onClick={() => setActiveSection('demographics')}
        >
          👥 Demographics
        </button>
      </div>

      {/* Content Sections */}
      <div className={styles.content}>
        {activeSection === 'overview' && (
          <div className={styles.section}>
            <OverviewCards data={analyticsData.overview} />
            <div className={styles.chartsGrid}>
              <div data-chart="status-distribution">
                <StatusDistribution data={analyticsData.statusDistribution} />
              </div>
              <div data-chart="financial-analysis">
                <FinancialAnalysis data={analyticsData.financialData} />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'trends' && (
          <div className={styles.section}>
            <div data-chart="trend-charts">
              <TrendCharts data={analyticsData.trends} />
            </div>
            <MonthlySummary data={analyticsData.monthlySummary} />
          </div>
        )}

        {activeSection === 'demographics' && (
          <div className={styles.section}>
            <div data-chart="demographic-charts">
              <DemographicCharts data={analyticsData.demographicData} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Analytics;