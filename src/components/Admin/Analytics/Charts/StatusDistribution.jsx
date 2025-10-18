import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import styles from '../styles.module.css';

const StatusDistribution = ({ data }) => {
  // Check if data exists and is an array
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className={styles.chartsGrid}>
        <div className={styles.noDataCard}>
          <h3>📊 No Status Data Available</h3>
          <p>No application status data found. This could be because:</p>
          <ul>
            <li>No loan applications have been submitted yet</li>
            <li>Data is still being loaded</li>
            <li>Backend connection issue</li>
          </ul>
        </div>
      </div>
    );
  }

  const COLORS = {
    'Approved': '#28a745',
    'Pending': '#ffc107',
    'Rejected': '#dc3545',
    'Not Eligible': '#6c757d'
  };

  // Custom label for pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null; // Don't show labels for very small slices
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className={styles.customTooltip}>
          <p className={styles.tooltipLabel}>{data.name}</p>
          <p style={{ color: data.payload.color }}>
            Count: {data.value}
          </p>
          <p style={{ color: data.payload.color }}>
            Percentage: {((data.value / data.payload.total) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  // Calculate total for percentage
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithTotal = data.map(item => ({ ...item, total }));

  // Mock historical data for comparison
  const historicalData = [
    { month: 'Jan', Approved: 45, Pending: 15, Rejected: 12 },
    { month: 'Feb', Approved: 52, Pending: 18, Rejected: 8 },
    { month: 'Mar', Approved: 48, Pending: 20, Rejected: 15 },
    { month: 'Apr', Approved: 61, Pending: 12, Rejected: 10 },
    { month: 'May', Approved: 55, Pending: 25, Rejected: 18 },
    { month: 'Jun', Approved: 67, Pending: 22, Rejected: 14 }
  ];

  return (
    <div className={styles.statusDistributionContainer}>
      {/* Pie Chart */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>🥧 Current Status Distribution</h3>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataWithTotal}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {dataWithTotal.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name] || entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="circle"
                wrapperStyle={{ fontSize: '14px', color: '#654321' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status Summary Cards */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>📊 Status Summary</h3>
        <div className={styles.statusSummary}>
          {dataWithTotal.map((item, index) => (
            <div key={index} className={styles.statusCard}>
              <div 
                className={styles.statusIndicator}
                style={{ backgroundColor: COLORS[item.name] || item.color }}
              ></div>
              <div className={styles.statusInfo}>
                <h4 className={styles.statusValue}>{item.value}</h4>
                <p className={styles.statusLabel}>{item.name}</p>
                <span className={styles.statusPercentage}>
                  {((item.value / total) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Comparison */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>📈 6-Month Status Trend</h3>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={historicalData}>
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
              <Tooltip />
              <Legend />
              <Bar dataKey="Approved" stackId="a" fill="#28a745" radius={[0, 0, 0, 0]} />
              <Bar dataKey="Pending" stackId="a" fill="#ffc107" radius={[0, 0, 0, 0]} />
              <Bar dataKey="Rejected" stackId="a" fill="#dc3545" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Metrics */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>🎯 Key Metrics</h3>
        <div className={styles.metricsGrid}>
          <div className={styles.metric}>
            <div className={styles.metricIcon}>✅</div>
            <div className={styles.metricContent}>
              <h4>{total > 0 ? ((dataWithTotal.find(item => item.name === 'Approved')?.value || 0) / total * 100).toFixed(1) : 0}%</h4>
              <p>Success Rate</p>
            </div>
          </div>
          <div className={styles.metric}>
            <div className={styles.metricIcon}>⏱️</div>
            <div className={styles.metricContent}>
              <h4>5.2 days</h4>
              <p>Avg. Processing Time</p>
            </div>
          </div>
          <div className={styles.metric}>
            <div className={styles.metricIcon}>🔄</div>
            <div className={styles.metricContent}>
              <h4>{dataWithTotal.find(item => item.name === 'Pending')?.value || 0}</h4>
              <p>In Queue</p>
            </div>
          </div>
          <div className={styles.metric}>
            <div className={styles.metricIcon}>📈</div>
            <div className={styles.metricContent}>
              <h4>+12.5%</h4>
              <p>Monthly Growth</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusDistribution;