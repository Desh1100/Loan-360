import React, { useState } from 'react';
import styles from '../styles.module.css';

const TopPerformers = ({ data }) => {
  const [sortField, setSortField] = useState('loanAmount');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
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

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Approved': { backgroundColor: '#28a745', color: 'white' },
      'Pending': { backgroundColor: '#ffc107', color: '#212529' },
      'Rejected': { backgroundColor: '#dc3545', color: 'white' },
      'Not Eligible': { backgroundColor: '#6c757d', color: 'white' }
    };

    return (
      <span 
        className={styles.statusBadge}
        style={statusStyles[status] || statusStyles['Pending']}
      >
        {status}
      </span>
    );
  };

  const getCibilScoreColor = (score) => {
    if (score >= 800) return '#28a745'; // Green
    if (score >= 700) return '#ffc107'; // Yellow
    if (score >= 600) return '#fd7e14'; // Orange
    return '#dc3545'; // Red
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>🏆 Top Performers</h3>
        <div className={styles.cardSubtitle}>
          <p>Highest performing loan applications</p>
          <span className={styles.recordCount}>{data.length} records</span>
        </div>
      </div>
      
      <div className={styles.tableContainer}>
        <table className={styles.performersTable}>
          <thead>
            <tr>
              <th>Rank</th>
              <th 
                onClick={() => handleSort('name')}
                className={styles.sortableHeader}
              >
                Applicant Name {getSortIcon('name')}
              </th>
              <th 
                onClick={() => handleSort('loanAmount')}
                className={styles.sortableHeader}
              >
                Loan Amount {getSortIcon('loanAmount')}
              </th>
              <th 
                onClick={() => handleSort('ciblScore')}
                className={styles.sortableHeader}
              >
                CIBIL Score {getSortIcon('ciblScore')}
              </th>
              <th 
                onClick={() => handleSort('totalAssets')}
                className={styles.sortableHeader}
              >
                Total Assets {getSortIcon('totalAssets')}
              </th>
              <th>Status</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((performer, index) => {
              const performanceScore = (
                (performer.ciblScore / 850) * 40 +
                (performer.loanAmount / 5000000) * 30 +
                (performer.totalAssets / 10000000) * 30
              ).toFixed(1);

              return (
                <tr key={index} className={styles.tableRow}>
                  <td className={styles.rankCell}>
                    <div className={styles.rank}>
                      {index < 3 ? (
                        <span className={styles.medalIcon}>
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                        </span>
                      ) : (
                        <span className={styles.rankNumber}>#{index + 1}</span>
                      )}
                    </div>
                  </td>
                  <td className={styles.nameCell}>
                    <div className={styles.applicantInfo}>
                      <div className={styles.avatar}>
                        {performer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <div className={styles.nameDetails}>
                        <span className={styles.fullName}>{performer.name}</span>
                        <span className={styles.applicantId}>ID: {1000 + index}</span>
                      </div>
                    </div>
                  </td>
                  <td className={styles.amountCell}>
                    <div className={styles.amount}>
                      <span className={styles.amountValue}>{formatCurrency(performer.loanAmount)}</span>
                      <span className={styles.amountLabel}>Requested</span>
                    </div>
                  </td>
                  <td className={styles.ciblCell}>
                    <div className={styles.ciblScore}>
                      <span 
                        className={styles.ciblValue}
                        style={{ color: getCibilScoreColor(performer.ciblScore) }}
                      >
                        {performer.ciblScore}
                      </span>
                      <div className={styles.ciblBar}>
                        <div 
                          className={styles.ciblProgress}
                          style={{ 
                            width: `${(performer.ciblScore / 850) * 100}%`,
                            backgroundColor: getCibilScoreColor(performer.ciblScore)
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.assetsCell}>
                    <div className={styles.assets}>
                      <span className={styles.assetsValue}>{formatCurrency(performer.totalAssets)}</span>
                      <span className={styles.assetsLabel}>Net Worth</span>
                    </div>
                  </td>
                  <td className={styles.statusCell}>
                    {getStatusBadge(performer.status)}
                  </td>
                  <td className={styles.scoreCell}>
                    <div className={styles.performanceScore}>
                      <span className={styles.scoreValue}>{performanceScore}/100</span>
                      <div className={styles.scoreBar}>
                        <div 
                          className={styles.scoreProgress}
                          style={{ 
                            width: `${performanceScore}%`,
                            backgroundColor: performanceScore >= 80 ? '#28a745' : 
                                           performanceScore >= 60 ? '#ffc107' : '#dc3545'
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Performance Metrics */}
      <div className={styles.performanceMetrics}>
        <h4>📊 Performance Insights</h4>
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricIcon}>💰</div>
            <div className={styles.metricContent}>
              <span className={styles.metricValue}>
                {formatCurrency(data.reduce((sum, item) => sum + item.loanAmount, 0) / data.length)}
              </span>
              <span className={styles.metricLabel}>Avg Loan Amount</span>
            </div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricIcon}>🎯</div>
            <div className={styles.metricContent}>
              <span className={styles.metricValue}>
                {Math.round(data.reduce((sum, item) => sum + item.ciblScore, 0) / data.length)}
              </span>
              <span className={styles.metricLabel}>Avg CIBIL Score</span>
            </div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricIcon}>💎</div>
            <div className={styles.metricContent}>
              <span className={styles.metricValue}>
                {formatCurrency(data.reduce((sum, item) => sum + item.totalAssets, 0) / data.length)}
              </span>
              <span className={styles.metricLabel}>Avg Net Worth</span>
            </div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricIcon}>✅</div>
            <div className={styles.metricContent}>
              <span className={styles.metricValue}>
                {((data.filter(item => item.status === 'Approved').length / data.length) * 100).toFixed(1)}%
              </span>
              <span className={styles.metricLabel}>Approval Rate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPerformers;