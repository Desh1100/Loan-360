import React, { useState } from 'react';
import styles from '../styles.module.css';

const RiskAnalysis = ({ data }) => {
  const [sortField, setSortField] = useState('riskLevel');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterRisk, setFilterRisk] = useState('All');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getRiskLevel = (item) => {
    if (item.riskLevel) return item.riskLevel;
    
    // Calculate risk level based on available data
    let riskScore = 0;
    
    // CIBIL Score factor (lower score = higher risk)
    if (item.ciblScore < 600) riskScore += 3;
    else if (item.ciblScore < 700) riskScore += 2;
    else if (item.ciblScore < 750) riskScore += 1;
    
    // Loan to Income Ratio factor
    if (item.loanToIncomeRatio > 8) riskScore += 3;
    else if (item.loanToIncomeRatio > 6) riskScore += 2;
    else if (item.loanToIncomeRatio > 4) riskScore += 1;
    
    if (riskScore >= 4) return 'High';
    if (riskScore >= 2) return 'Medium';
    return 'Low';
  };

  const filteredData = data.filter(item => {
    if (filterRisk === 'All') return true;
    return getRiskLevel(item) === filterRisk;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    let aValue = sortField === 'riskLevel' ? getRiskLevel(a) : a[sortField];
    let bValue = sortField === 'riskLevel' ? getRiskLevel(b) : b[sortField];
    
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

  const getRiskBadge = (riskLevel) => {
    const riskStyles = {
      'High': { backgroundColor: '#dc3545', color: 'white', icon: '🚨' },
      'Medium': { backgroundColor: '#ffc107', color: '#212529', icon: '⚠️' },
      'Low': { backgroundColor: '#28a745', color: 'white', icon: '✅' }
    };

    const style = riskStyles[riskLevel] || riskStyles['Medium'];

    return (
      <span 
        className={styles.riskBadge}
        style={{ backgroundColor: style.backgroundColor, color: style.color }}
      >
        {style.icon} {riskLevel}
      </span>
    );
  };

  const getCibilScoreColor = (score) => {
    if (score >= 750) return '#28a745';
    if (score >= 700) return '#ffc107';
    if (score >= 650) return '#fd7e14';
    return '#dc3545';
  };

  const getRiskRecommendation = (item) => {
    const riskLevel = getRiskLevel(item);
    const ciblScore = item.ciblScore;
    const ratio = item.loanToIncomeRatio;

    if (riskLevel === 'High') {
      if (ciblScore < 600) return 'Require additional documentation and guarantor';
      if (ratio > 8) return 'Reduce loan amount or increase income proof';
      return 'Consider rejection or higher interest rate';
    }
    
    if (riskLevel === 'Medium') {
      return 'Standard processing with additional verification';
    }
    
    return 'Fast-track approval recommended';
  };

  // Calculate risk distribution
  const riskDistribution = {
    High: filteredData.filter(item => getRiskLevel(item) === 'High').length,
    Medium: filteredData.filter(item => getRiskLevel(item) === 'Medium').length,
    Low: filteredData.filter(item => getRiskLevel(item) === 'Low').length
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>⚠️ Risk Analysis</h3>
        <div className={styles.cardSubtitle}>
          <p>High-risk loan applications requiring attention</p>
          <div className={styles.riskFilter}>
            <select 
              value={filterRisk} 
              onChange={(e) => setFilterRisk(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="All">All Risk Levels</option>
              <option value="High">High Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="Low">Low Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* Risk Distribution Summary */}
      <div className={styles.riskSummary}>
        <div className={styles.riskSummaryGrid}>
          <div className={styles.riskSummaryCard}>
            <div className={styles.riskIcon}>🚨</div>
            <div className={styles.riskContent}>
              <span className={styles.riskCount}>{riskDistribution.High}</span>
              <span className={styles.riskLabel}>High Risk</span>
            </div>
          </div>
          <div className={styles.riskSummaryCard}>
            <div className={styles.riskIcon}>⚠️</div>
            <div className={styles.riskContent}>
              <span className={styles.riskCount}>{riskDistribution.Medium}</span>
              <span className={styles.riskLabel}>Medium Risk</span>
            </div>
          </div>
          <div className={styles.riskSummaryCard}>
            <div className={styles.riskIcon}>✅</div>
            <div className={styles.riskContent}>
              <span className={styles.riskCount}>{riskDistribution.Low}</span>
              <span className={styles.riskLabel}>Low Risk</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.tableContainer}>
        <table className={styles.riskTable}>
          <thead>
            <tr>
              <th 
                onClick={() => handleSort('name')}
                className={styles.sortableHeader}
              >
                Applicant {getSortIcon('name')}
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
                onClick={() => handleSort('loanToIncomeRatio')}
                className={styles.sortableHeader}
              >
                L/I Ratio {getSortIcon('loanToIncomeRatio')}
              </th>
              <th 
                onClick={() => handleSort('riskLevel')}
                className={styles.sortableHeader}
              >
                Risk Level {getSortIcon('riskLevel')}
              </th>
              <th>Recommendation</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => {
              const riskLevel = getRiskLevel(item);
              const recommendation = getRiskRecommendation(item);

              return (
                <tr key={index} className={`${styles.tableRow} ${styles[`risk${riskLevel}`]}`}>
                  <td className={styles.applicantCell}>
                    <div className={styles.applicantInfo}>
                      <div className={styles.avatar}>
                        {item.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <div className={styles.nameDetails}>
                        <span className={styles.fullName}>{item.name}</span>
                        <span className={styles.applicantId}>ID: {2000 + index}</span>
                      </div>
                    </div>
                  </td>
                  <td className={styles.amountCell}>
                    <div className={styles.amount}>
                      <span className={styles.amountValue}>{formatCurrency(item.loanAmount)}</span>
                    </div>
                  </td>
                  <td className={styles.ciblCell}>
                    <div className={styles.ciblScore}>
                      <span 
                        className={styles.ciblValue}
                        style={{ color: getCibilScoreColor(item.ciblScore) }}
                      >
                        {item.ciblScore}
                      </span>
                      <div className={styles.ciblIndicator}>
                        {item.ciblScore < 600 ? '🔴' : item.ciblScore < 700 ? '🟡' : '🟢'}
                      </div>
                    </div>
                  </td>
                  <td className={styles.ratioCell}>
                    <div className={styles.ratio}>
                      <span className={styles.ratioValue}>{item.loanToIncomeRatio}x</span>
                      <div className={styles.ratioIndicator}>
                        {item.loanToIncomeRatio > 8 ? '🔴' : item.loanToIncomeRatio > 6 ? '🟡' : '🟢'}
                      </div>
                    </div>
                  </td>
                  <td className={styles.riskCell}>
                    {getRiskBadge(riskLevel)}
                  </td>
                  <td className={styles.recommendationCell}>
                    <div className={styles.recommendation}>
                      <span className={styles.recommendationText}>{recommendation}</span>
                      <div className={styles.recommendationActions}>
                        <button className={styles.actionBtn}>📋 Review</button>
                        <button className={styles.actionBtn}>📞 Contact</button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Risk Insights */}
      <div className={styles.riskInsights}>
        <h4>🔍 Risk Insights</h4>
        <div className={styles.insightsGrid}>
          <div className={styles.insightCard}>
            <div className={styles.insightIcon}>📊</div>
            <div className={styles.insightContent}>
              <h5>Average CIBIL Score</h5>
              <span className={styles.insightValue}>
                {Math.round(filteredData.reduce((sum, item) => sum + item.ciblScore, 0) / filteredData.length || 0)}
              </span>
              <p>Among risk categories</p>
            </div>
          </div>
          <div className={styles.insightCard}>
            <div className={styles.insightIcon}>⚖️</div>
            <div className={styles.insightContent}>
              <h5>Average L/I Ratio</h5>
              <span className={styles.insightValue}>
                {(filteredData.reduce((sum, item) => sum + item.loanToIncomeRatio, 0) / filteredData.length || 0).toFixed(1)}x
              </span>
              <p>Loan to income ratio</p>
            </div>
          </div>
          <div className={styles.insightCard}>
            <div className={styles.insightIcon}>🎯</div>
            <div className={styles.insightContent}>
              <h5>High Risk %</h5>
              <span className={styles.insightValue}>
                {((riskDistribution.High / (filteredData.length || 1)) * 100).toFixed(1)}%
              </span>
              <p>Require immediate attention</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysis;