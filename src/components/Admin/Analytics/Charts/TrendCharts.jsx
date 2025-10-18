import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import styles from '../styles.module.css';

const TrendCharts = ({ data }) => {
  // Check if data exists and is an array
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className={styles.trendsContainer}>
        <div className={styles.noDataCard}>
          <h3>📈 No Trend Data Available</h3>
          <p>No trend data found. This could be because:</p>
          <ul>
            <li>No loan applications have been submitted yet</li>
            <li>Data is still being processed</li>
            <li>There's a connection issue with the backend</li>
          </ul>
        </div>
      </div>
    );
  }

  // Custom tooltip for better formatting
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.customTooltip}>
          <p className={styles.tooltipLabel}>{`Month: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value || 0}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for financial data
  const FinancialTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.customTooltip}>
          <p className={styles.tooltipLabel}>{`Month: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: LKR ${(entry.value || 0).toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.trendsContainer}>
      {/* Application Trends Line Chart */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>📈 Application Trends</h3>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F5DEB3" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#654321', fontSize: 12 }}
                axisLine={{ stroke: '#D2B48C' }}
              />
              <YAxis 
                tick={{ fill: '#654321', fontSize: 12 }}
                axisLine={{ stroke: '#D2B48C' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="applications" 
                stroke="#8B4513" 
                strokeWidth={3}
                dot={{ fill: '#8B4513', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#8B4513', strokeWidth: 2 }}
                name="Total Applications"
              />
              <Line 
                type="monotone" 
                dataKey="approved" 
                stroke="#28a745" 
                strokeWidth={2}
                dot={{ fill: '#28a745', strokeWidth: 2, r: 3 }}
                name="Approved"
              />
              <Line 
                type="monotone" 
                dataKey="rejected" 
                stroke="#dc3545" 
                strokeWidth={2}
                dot={{ fill: '#dc3545', strokeWidth: 2, r: 3 }}
                name="Rejected"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Loan Amount Trends Area Chart */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>💰 Loan Amount Trends</h3>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F5DEB3" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#654321', fontSize: 12 }}
                axisLine={{ stroke: '#D2B48C' }}
              />
              <YAxis 
                tick={{ fill: '#654321', fontSize: 12 }}
                axisLine={{ stroke: '#D2B48C' }}
                tickFormatter={(value) => `LKR ${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip content={<FinancialTooltip />} />
              <Area 
                type="monotone" 
                dataKey="totalAmount" 
                stroke="#D2691E" 
                fill="#D2691E"
                fillOpacity={0.3}
                strokeWidth={2}
                name="Total Loan Amount"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Comparison Bar Chart */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>📊 Monthly Status Comparison</h3>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F5DEB3" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#654321', fontSize: 12 }}
                axisLine={{ stroke: '#D2B48C' }}
              />
              <YAxis 
                tick={{ fill: '#654321', fontSize: 12 }}
                axisLine={{ stroke: '#D2B48C' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="approved" fill="#28a745" name="Approved" radius={[2, 2, 0, 0]} />
              <Bar dataKey="pending" fill="#ffc107" name="Pending" radius={[2, 2, 0, 0]} />
              <Bar dataKey="rejected" fill="#dc3545" name="Rejected" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Approval Rate Trend */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>📈 Approval Rate Trend</h3>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.map(item => ({
              ...item,
              approvalRate: item.applications > 0 ? ((item.approved / item.applications) * 100).toFixed(1) : 0
            }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F5DEB3" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#654321', fontSize: 12 }}
                axisLine={{ stroke: '#D2B48C' }}
              />
              <YAxis 
                tick={{ fill: '#654321', fontSize: 12 }}
                axisLine={{ stroke: '#D2B48C' }}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                content={<CustomTooltip />}
                formatter={(value) => [`${value}%`, 'Approval Rate']}
              />
              <Line 
                type="monotone" 
                dataKey="approvalRate" 
                stroke="#8B4513" 
                strokeWidth={3}
                dot={{ fill: '#8B4513', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#8B4513', strokeWidth: 2 }}
                name="Approval Rate (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TrendCharts;