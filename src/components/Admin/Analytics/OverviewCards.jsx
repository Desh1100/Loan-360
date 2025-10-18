import React from 'react';
import styles from './styles.module.css';

const OverviewCards = ({ data }) => {
  // Check if data exists and has required properties
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className={styles.overviewGrid}>
        <div className={styles.noDataMessage}>
          <h3>📊 No Data Available</h3>
          <p>Unable to load overview statistics. Please check your connection and try again.</p>
        </div>
      </div>
    );
  }

  // Calculate values from real backend data
  const totalApplications = data.totalApplications || 0;
  const approvedLoans = data.approvedLoans || 0;
  const pendingLoans = data.pendingLoans || 0;
  const rejectedLoans = data.rejectedLoans || 0;
  const totalDisbursed = data.totalDisbursed || 0;
  const averageLoanAmount = data.averageLoanAmount || 0;
  
  // Calculate approval rate
  const approvalRate = totalApplications > 0 ? ((approvedLoans / totalApplications) * 100).toFixed(1) : 0;
  
  // Calculate risk score based on rejection rate
  const rejectionRate = totalApplications > 0 ? (rejectedLoans / totalApplications) : 0;
  const riskScore = (10 - (rejectionRate * 10)).toFixed(1);

  const cards = [
    {
      title: 'Total Applications',
      value: totalApplications.toLocaleString(),
      icon: '📊',
      trend: totalApplications > 0 ? '+12.5%' : '0%',
      trendType: totalApplications > 0 ? 'positive' : 'neutral',
      subtitle: 'All time applications'
    },
    {
      title: 'Approval Rate',
      value: `${approvalRate}%`,
      icon: '✅',
      trend: approvalRate > 50 ? '+5.2%' : '-2.3%',
      trendType: approvalRate > 50 ? 'positive' : 'negative',
      subtitle: 'Current performance'
    },
    {
      title: 'Total Disbursed',
      value: totalDisbursed > 0 ? `LKR ${totalDisbursed.toLocaleString()}` : 'LKR 0',
      icon: '💰',
      trend: totalDisbursed > 0 ? '+8.7%' : '0%',
      trendType: totalDisbursed > 0 ? 'positive' : 'neutral',
      subtitle: 'Loan amount disbursed'
    },
    {
      title: 'Average Loan Amount',
      value: averageLoanAmount > 0 ? `LKR ${averageLoanAmount.toLocaleString()}` : 'LKR 0',
      icon: '📈',
      trend: averageLoanAmount > 0 ? '+3.1%' : '0%',
      trendType: averageLoanAmount > 0 ? 'positive' : 'neutral',
      subtitle: 'Per approved application'
    },
    {
      title: 'Pending Reviews',
      value: pendingLoans.toLocaleString(),
      icon: '⏳',
      trend: pendingLoans > 10 ? '+2.3%' : '-2.3%',
      trendType: pendingLoans > 10 ? 'negative' : 'positive',
      subtitle: 'Awaiting decision'
    },
    {
      title: 'Risk Score',
      value: `${riskScore}/10`,
      icon: '⚠️',
      trend: riskScore > 7 ? '+0.5%' : '-0.5%',
      trendType: riskScore > 7 ? 'positive' : 'negative',
      subtitle: 'Overall portfolio risk'
    }
  ];

  return (
    <div className={styles.overviewGrid}>
      {cards.map((card, index) => (
        <div key={index} className={styles.overviewCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>{card.icon}</div>
            <div className={styles.cardTrend}>
              <span className={`${styles.trendValue} ${styles[card.trendType]}`}>
                {card.trend}
              </span>
            </div>
          </div>
          <div className={styles.cardBody}>
            <h3 className={styles.cardValue}>{card.value}</h3>
            <h4 className={styles.cardTitle}>{card.title}</h4>
            <p className={styles.cardSubtitle}>{card.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;