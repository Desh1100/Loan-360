import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from 'recharts';
import styles from '../styles.module.css';

const DemographicCharts = ({ data }) => {
  // Check if data exists and has required properties
  if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
    return (
      <div className={styles.demographicsContainer}>
        <div className={styles.noDataCard}>
          <h3>👥 No Demographic Data Available</h3>
          <p>No demographic analysis data found. This could be because:</p>
          <ul>
            <li>No loan applications with demographic details exist</li>
            <li>Demographic data is still being processed</li>
            <li>Backend connection issue</li>
          </ul>
        </div>
      </div>
    );
  }

  const COLORS = ['#8B4513', '#D2691E', '#DEB887', '#F4A460', '#CD853F'];

  // Custom label for pie charts
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.customTooltip}>
          <p className={styles.tooltipLabel}>{label || payload[0].name}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey || 'Value'}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Prepare data with colors
  const educationData = data?.education?.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length]
  })) || [];

  const employmentData = data?.employment?.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length]
  })) || [];

  const occupationData = data?.occupation || [];

  // Generate age distribution mock data
  const ageDistribution = [
    { ageGroup: '18-25', count: 15, approvalRate: 65 },
    { ageGroup: '26-35', count: 45, approvalRate: 78 },
    { ageGroup: '36-45', count: 35, approvalRate: 82 },
    { ageGroup: '46-55', count: 20, approvalRate: 75 },
    { ageGroup: '55+', count: 10, approvalRate: 70 }
  ];

  // Generate location-based data
  const locationData = [
    { city: 'Mumbai', applications: 45, approvalRate: 85 },
    { city: 'Delhi', applications: 38, approvalRate: 78 },
    { city: 'Bangalore', applications: 42, approvalRate: 82 },
    { city: 'Chennai', applications: 28, approvalRate: 76 },
    { city: 'Pune', applications: 25, approvalRate: 80 },
    { city: 'Hyderabad', applications: 22, approvalRate: 79 }
  ];

  return (
    <div className={styles.demographicChartsContainer}>
      {/* Education Distribution */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>🎓 Education Level Distribution</h3>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={educationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {educationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
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

      {/* Employment Type Distribution */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>💼 Employment Type Distribution</h3>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={employmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                innerRadius={40}
              >
                {employmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
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

    
      

      {/* Age Distribution */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>🎂 Age Distribution & Approval Rates</h3>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F5DEB3" />
              <XAxis 
                dataKey="ageGroup" 
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
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                yAxisId="left"
                dataKey="count" 
                fill="#D2B48C" 
                radius={[4, 4, 0, 0]}
                name="Applications Count"
              />
              <Bar 
                yAxisId="right"
                dataKey="approvalRate" 
                fill="#8B4513" 
                radius={[4, 4, 0, 0]}
                name="Approval Rate (%)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      
       
  
    </div>
  );
};

export default DemographicCharts;