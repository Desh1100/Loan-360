import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  ComposedChart,
  Line,
  LineChart,
  Area,
  AreaChart
} from 'recharts';
import styles from '../styles.module.css';

const FinancialAnalysis = ({ data }) => {
  // Check if data exists and is an array
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className={styles.financialContainer}>
        <div className={styles.noDataCard}>
          <h3>💰 No Financial Data Available</h3>
          <p>No financial analysis data found. This could be because:</p>
          <ul>
            <li>No loan applications with financial details exist</li>
            <li>Financial data is still being processed</li>
            <li>Backend connection issue</li>
          </ul>
        </div>
      </div>
    );
  }

  // Process data for different visualizations
  const processLoanAmountDistribution = () => {
    const ranges = [
      { range: '0-5L', min: 0, max: 500000, count: 0 },
      { range: '5-10L', min: 500000, max: 1000000, count: 0 },
      { range: '10-20L', min: 1000000, max: 2000000, count: 0 },
      { range: '20-50L', min: 2000000, max: 5000000, count: 0 },
      { range: '50L+', min: 5000000, max: Infinity, count: 0 }
    ];

    data.forEach(item => {
      if (item.loanAmount && typeof item.loanAmount === 'number') {
        const range = ranges.find(r => item.loanAmount >= r.min && item.loanAmount < r.max);
        if (range) range.count++;
      }
    });

    return ranges.filter(range => range.count > 0); // Only return ranges with data
  };

  const processCibilVsApproval = () => {
    const ranges = {};
    data.forEach(item => {
      if (item.ciblScore && typeof item.ciblScore === 'number') {
        const cibilRange = Math.floor(item.ciblScore / 50) * 50;
        const key = `${cibilRange}-${cibilRange + 49}`;
        
        if (!ranges[key]) {
          ranges[key] = { range: key, total: 0, approved: 0 };
        }
        
        ranges[key].total++;
        if (item.status === 'Approved') {
          ranges[key].approved++;
        }
      }
    });

    return Object.values(ranges).map(item => ({
      ...item,
      approvalRate: item.total > 0 ? (item.approved / item.total * 100).toFixed(1) : 0
    }));
  };

  const processIncomeDistribution = () => {
    const approved = data.filter(item => item.status === 'Approved').map(item => item.annualIncome);
    const rejected = data.filter(item => item.status === 'Rejected').map(item => item.annualIncome);
    
    const ranges = [
      { range: '0-5L', min: 0, max: 500000, approved: 0, rejected: 0 },
      { range: '5-10L', min: 500000, max: 1000000, approved: 0, rejected: 0 },
      { range: '10-20L', min: 1000000, max: 2000000, approved: 0, rejected: 0 },
      { range: '20-50L', min: 2000000, max: 5000000, approved: 0, rejected: 0 },
      { range: '50L+', min: 5000000, max: Infinity, approved: 0, rejected: 0 }
    ];

    approved.forEach(income => {
      const range = ranges.find(r => income >= r.min && income < r.max);
      if (range) range.approved++;
    });

    rejected.forEach(income => {
      const range = ranges.find(r => income >= r.min && income < r.max);
      if (range) range.rejected++;
    });

    return ranges;
  };

  // Generate sample risk vs loan amount data
  const riskAnalysisData = data.slice(0, 50).map(item => ({
    loanAmount: item.loanAmount / 1000000, // Convert to millions
    ciblScore: item.ciblScore,
    riskScore: 900 - item.ciblScore + Math.random() * 100, // Mock risk calculation
    status: item.status
  }));

  const loanAmountDistribution = processLoanAmountDistribution();
  const cibilVsApproval = processCibilVsApproval();
  const incomeDistribution = processIncomeDistribution();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.customTooltip}>
          <p className={styles.tooltipLabel}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.financialAnalysisContainer}>
      {/* Loan Amount Distribution */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>💰 Loan Amount Distribution</h3>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={loanAmountDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F5DEB3" />
              <XAxis 
                dataKey="range" 
                tick={{ fill: '#654321', fontSize: 12 }}
                axisLine={{ stroke: '#D2B48C' }}
              />
              <YAxis 
                tick={{ fill: '#654321', fontSize: 12 }}
                axisLine={{ stroke: '#D2B48C' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="count" 
                fill="#8B4513" 
                radius={[4, 4, 0, 0]}
                name="Applications"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CIBIL Score vs Approval Rate */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>📊 CIBIL Score vs Approval Rate</h3>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={cibilVsApproval}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F5DEB3" />
              <XAxis 
                dataKey="range" 
                tick={{ fill: '#654321', fontSize: 12 }}
                axisLine={{ stroke: '#D2B48C' }}
              />
              <YAxis 
                yAxisId="left"
                tick={{ fill: '#654321', fontSize: 12 }}
                axisLine={{ stroke: '#D2B48C' }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right"
                tick={{ fill: '#654321', fontSize: 12 }}
                axisLine={{ stroke: '#D2B48C' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                yAxisId="left"
                dataKey="total" 
                fill="#D2B48C" 
                radius={[2, 2, 0, 0]}
                name="Total Applications"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="approvalRate" 
                stroke="#8B4513" 
                strokeWidth={3}
                dot={{ fill: '#8B4513', strokeWidth: 2, r: 4 }}
                name="Approval Rate (%)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Income Distribution by Status */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>💼 Income Distribution by Status</h3>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={incomeDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F5DEB3" />
              <XAxis 
                dataKey="range" 
                tick={{ fill: '#654321', fontSize: 12 }}
                axisLine={{ stroke: '#D2B48C' }}
              />
              <YAxis 
                tick={{ fill: '#654321', fontSize: 12 }}
                axisLine={{ stroke: '#D2B48C' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="approved" 
                fill="#28a745" 
                radius={[2, 2, 0, 0]}
                name="Approved"
              />
              <Bar 
                dataKey="rejected" 
                fill="#dc3545" 
                radius={[2, 2, 0, 0]}
                name="Rejected"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Risk Analysis Scatter Plot */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>⚠️ Risk Analysis: CIBIL vs Loan Amount</h3>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#F5DEB3" />
              <XAxis 
                type="number"
                dataKey="ciblScore"
                name="CIBIL Score"
                domain={[300, 900]}
                tick={{ fill: '#654321', fontSize: 12 }}
                axisLine={{ stroke: '#D2B48C' }}
              />
              <YAxis 
                type="number"
                dataKey="loanAmount"
                name="Loan Amount (LKR M)"
                tick={{ fill: '#654321', fontSize: 12 }}
                axisLine={{ stroke: '#D2B48C' }}
                tickFormatter={(value) => `LKR ${value.toFixed(1)}M`}
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                formatter={(value, name) => [
                  name === 'loanAmount' ? `LKR ${value.toFixed(2)}M` : value,
                  name === 'loanAmount' ? 'Loan Amount' : 'CIBIL Score'
                ]}
              />
              <Scatter 
                name="Approved" 
                data={riskAnalysisData.filter(item => item.status === 'Approved')} 
                fill="#28a745" 
              />
              <Scatter 
                name="Rejected" 
                data={riskAnalysisData.filter(item => item.status === 'Rejected')} 
                fill="#dc3545" 
              />
              <Scatter 
                name="Pending" 
                data={riskAnalysisData.filter(item => item.status === 'Pending')} 
                fill="#ffc107" 
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default FinancialAnalysis;