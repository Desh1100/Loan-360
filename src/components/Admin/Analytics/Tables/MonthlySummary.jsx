import React, { useState } from 'react';
import styles from '../styles.module.css';

const MonthlySummary = ({ data }) => {
  const [sortField, setSortField] = useState('month');
  const [sortDirection, setSortDirection] = useState('desc');
  const [viewType, setViewType] = useState('table'); // 'table' or 'cards'

  // Check if data exists and is an array
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className={styles.summaryContainer}>
        <div className={styles.noDataCard}>
          <h3>📊 No Monthly Summary Data Available</h3>
          <p>No monthly summary data found. This could be because:</p>
          <ul>
            <li>No loan applications have been submitted in recent months</li>
            <li>Monthly data is still being aggregated</li>
            <li>Backend connection issue</li>
          </ul>
        </div>
      </div>
    );
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Process data to add calculated fields
  const processedData = data.map(item => ({
    ...item,
    total: (item.approved || 0) + (item.rejected || 0) + (item.pending || 0),
    approvalRate: (item.applications && item.applications > 0) ? 
      (((item.approved || 0) / item.applications) * 100).toFixed(1) : '0',
    rejectionRate: (item.applications && item.applications > 0) ? 
      (((item.rejected || 0) / item.applications) * 100).toFixed(1) : '0',
    avgProcessingTime: Math.floor(Math.random() * 10) + 3, // Mock data - replace with real data when available
    avgLoanAmount: (item.totalAmount && item.approved && item.approved > 0) ? 
      (item.totalAmount / item.approved) : 0
  }));

  const sortedData = [...processedData].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getSortIcon = (field) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '⬆️' : '⬇️';
  };

  const formatCurrency = (amount) => {
    return `LKR ${(amount / 1000000).toFixed(1)}M`;
  };

  const getStatusColor = (status) => {
    const colors = {
      approved: '#28a745',
      pending: '#ffc107',
      rejected: '#dc3545'
    };
    return colors[status] || '#6c757d';
  };

  const getTrendIcon = (current, previous) => {
    if (!previous) return '📊';
    if (current > previous) return '📈';
    if (current < previous) return '📉';
    return '➡️';
  };

  // Calculate totals
  const totals = processedData.reduce((acc, item) => ({
    applications: acc.applications + item.applications,
    approved: acc.approved + item.approved,
    rejected: acc.rejected + item.rejected,
    pending: acc.pending + item.pending,
    totalAmount: acc.totalAmount + item.totalAmount
  }), { applications: 0, approved: 0, rejected: 0, pending: 0, totalAmount: 0 });

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>📅 Monthly Summary</h3>
        <div className={styles.cardSubtitle}>
          <p>Month-by-month performance analysis</p>
          <div className={styles.viewToggle}>
            <button 
              className={`${styles.toggleBtn} ${viewType === 'table' ? styles.active : ''}`}
              onClick={() => setViewType('table')}
            >
              📋 Table
            </button>
            <button 
              className={`${styles.toggleBtn} ${viewType === 'cards' ? styles.active : ''}`}
              onClick={() => setViewType('cards')}
            >
              📊 Cards
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className={styles.summaryCards}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>📊</div>
          <div className={styles.summaryContent}>
            <h4>{totals.applications}</h4>
            <p>Total Applications</p>
            <span className={styles.summaryTrend}>+12.5% vs last period</span>
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>✅</div>
          <div className={styles.summaryContent}>
            <h4>{totals.approved}</h4>
            <p>Total Approved</p>
            <span className={styles.summaryTrend}>
              {((totals.approved / totals.applications) * 100).toFixed(1)}% rate
            </span>
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>💰</div>
          <div className={styles.summaryContent}>
            <h4>{formatCurrency(totals.totalAmount)}</h4>
            <p>Total Disbursed</p>
            <span className={styles.summaryTrend}>+8.3% vs last period</span>
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>⏱️</div>
          <div className={styles.summaryContent}>
            <h4>5.2 days</h4>
            <p>Avg Processing</p>
            <span className={styles.summaryTrend}>-0.8 days improvement</span>
          </div>
        </div>
      </div>

      {viewType === 'table' ? (
        <div className={styles.tableContainer}>
          <table className={styles.summaryTable}>
            <thead>
              <tr>
                <th 
                  onClick={() => handleSort('month')}
                  className={styles.sortableHeader}
                >
                  Month {getSortIcon('month')}
                </th>
                <th 
                  onClick={() => handleSort('applications')}
                  className={styles.sortableHeader}
                >
                  Applications {getSortIcon('applications')}
                </th>
                <th 
                  onClick={() => handleSort('approved')}
                  className={styles.sortableHeader}
                >
                  Approved {getSortIcon('approved')}
                </th>
                <th 
                  onClick={() => handleSort('rejected')}
                  className={styles.sortableHeader}
                >
                  Rejected {getSortIcon('rejected')}
                </th>
                <th 
                  onClick={() => handleSort('pending')}
                  className={styles.sortableHeader}
                >
                  Pending {getSortIcon('pending')}
                </th>
                <th 
                  onClick={() => handleSort('approvalRate')}
                  className={styles.sortableHeader}
                >
                  Approval Rate {getSortIcon('approvalRate')}
                </th>
                <th 
                  onClick={() => handleSort('totalAmount')}
                  className={styles.sortableHeader}
                >
                  Amount Disbursed {getSortIcon('totalAmount')}
                </th>
                <th 
                  onClick={() => handleSort('avgProcessingTime')}
                  className={styles.sortableHeader}
                >
                  Avg Processing {getSortIcon('avgProcessingTime')}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item, index) => {
                const previousItem = index > 0 ? sortedData[index - 1] : null;

                return (
                  <tr key={index} className={styles.tableRow}>
                    <td className={styles.monthCell}>
                      <div className={styles.monthInfo}>
                        <span className={styles.monthName}>{item.month}</span>
                        <span className={styles.monthYear}>2024</span>
                      </div>
                    </td>
                    <td className={styles.applicationsCell}>
                      <div className={styles.applicationsInfo}>
                        <span className={styles.applicationsCount}>{item.applications}</span>
                        <span className={styles.trendIcon}>
                          {getTrendIcon(item.applications, previousItem?.applications)}
                        </span>
                      </div>
                    </td>
                    <td className={styles.statusCell}>
                      <div className={styles.statusCount} style={{ color: getStatusColor('approved') }}>
                        {item.approved}
                      </div>
                    </td>
                    <td className={styles.statusCell}>
                      <div className={styles.statusCount} style={{ color: getStatusColor('rejected') }}>
                        {item.rejected}
                      </div>
                    </td>
                    <td className={styles.statusCell}>
                      <div className={styles.statusCount} style={{ color: getStatusColor('pending') }}>
                        {item.pending}
                      </div>
                    </td>
                    <td className={styles.rateCell}>
                      <div className={styles.rateInfo}>
                        <span className={styles.rateValue}>{item.approvalRate}%</span>
                        <div className={styles.rateBar}>
                          <div 
                            className={styles.rateProgress}
                            style={{ 
                              width: `${item.approvalRate}%`,
                              backgroundColor: item.approvalRate >= 80 ? '#28a745' : 
                                             item.approvalRate >= 60 ? '#ffc107' : '#dc3545'
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className={styles.amountCell}>
                      <div className={styles.amountInfo}>
                        <span className={styles.amountValue}>{formatCurrency(item.totalAmount)}</span>
                        <span className={styles.trendIcon}>
                          {getTrendIcon(item.totalAmount, previousItem?.totalAmount)}
                        </span>
                      </div>
                    </td>
                    <td className={styles.processingCell}>
                      <div className={styles.processingInfo}>
                        <span className={styles.processingTime}>{item.avgProcessingTime} days</span>
                        <span className={styles.processingIndicator}>
                          {item.avgProcessingTime <= 5 ? '🟢' : item.avgProcessingTime <= 8 ? '🟡' : '🔴'}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles.cardsContainer}>
          {sortedData.map((item, index) => (
            <div key={index} className={styles.monthCard}>
              <div className={styles.monthCardHeader}>
                <h4 className={styles.monthCardTitle}>{item.month}</h4>
                <span className={styles.monthCardBadge}>
                  {item.approvalRate}% approval
                </span>
              </div>
              <div className={styles.monthCardContent}>
                <div className={styles.monthCardMetrics}>
                  <div className={styles.monthCardMetric}>
                    <span className={styles.metricValue}>{item.applications}</span>
                    <span className={styles.metricLabel}>Applications</span>
                  </div>
                  <div className={styles.monthCardMetric}>
                    <span className={styles.metricValue} style={{ color: '#28a745' }}>
                      {item.approved}
                    </span>
                    <span className={styles.metricLabel}>Approved</span>
                  </div>
                  <div className={styles.monthCardMetric}>
                    <span className={styles.metricValue} style={{ color: '#dc3545' }}>
                      {item.rejected}
                    </span>
                    <span className={styles.metricLabel}>Rejected</span>
                  </div>
                </div>
                <div className={styles.monthCardAmount}>
                  <span className={styles.amountLabel}>Amount Disbursed</span>
                  <span className={styles.amountValue}>{formatCurrency(item.totalAmount)}</span>
                </div>
                <div className={styles.monthCardFooter}>
                  <span className={styles.processingTime}>
                    ⏱️ {item.avgProcessingTime} days avg processing
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MonthlySummary;