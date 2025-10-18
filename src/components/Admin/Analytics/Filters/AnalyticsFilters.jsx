import React, { useState } from 'react';
import styles from '../styles.module.css';

const AnalyticsFilters = ({ filters, onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleDateChange = (field, value) => {
    const newFilters = {
      ...localFilters,
      dateRange: {
        ...localFilters.dateRange,
        [field]: new Date(value)
      }
    };
    setLocalFilters(newFilters);
  };

  const handleRangeChange = (field, type, value) => {
    const newFilters = {
      ...localFilters,
      [field]: {
        ...localFilters[field],
        [type]: parseInt(value)
      }
    };
    setLocalFilters(newFilters);
  };

  const handleSelectChange = (field, value) => {
    const newFilters = {
      ...localFilters,
      [field]: value
    };
    setLocalFilters(newFilters);
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      dateRange: {
        startDate: new Date(new Date().getFullYear(), 0, 1),
        endDate: new Date()
      },
      status: 'All',
      loanAmountRange: { min: 0, max: 10000000 },
      ciblScoreRange: { min: 300, max: 900 },
      occupation: 'All',
      education: 'All'
    };
    setLocalFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const formatCurrency = (amount) => {
    return (amount / 100000).toFixed(1) + 'L';
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersHeader}>
        <div className={styles.filtersTitle}>
          <h3>🔍 Filters & Controls</h3>
          <p>Customize your analytics view</p>
        </div>
        <div className={styles.filtersActions}>
          <button 
            className={styles.toggleButton}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '▼ Hide Filters' : '▶ Show Filters'}
          </button>
          <button className={styles.resetButton} onClick={resetFilters}>
            🔄 Reset
          </button>
          <button className={styles.applyButton} onClick={applyFilters}>
            ✓ Apply Filters
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className={styles.filtersContent}>
          <div className={styles.filtersGrid}>
            {/* Date Range */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>📅 Date Range</label>
              <div className={styles.dateRangeGroup}>
                <div className={styles.dateInput}>
                  <label>From:</label>
                  <input
                    type="date"
                    value={formatDate(localFilters.dateRange.startDate)}
                    onChange={(e) => handleDateChange('startDate', e.target.value)}
                    className={styles.input}
                  />
                </div>
                <div className={styles.dateInput}>
                  <label>To:</label>
                  <input
                    type="date"
                    value={formatDate(localFilters.dateRange.endDate)}
                    onChange={(e) => handleDateChange('endDate', e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>
            </div>

            {/* Status Filter */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>📊 Application Status</label>
              <select
                value={localFilters.status}
                onChange={(e) => handleSelectChange('status', e.target.value)}
                className={styles.select}
              >
                <option value="All">All Statuses</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Not Eligible">Not Eligible</option>
              </select>
            </div>

            {/* Loan Amount Range */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                💰 Loan Amount Range: LKR {formatCurrency(localFilters.loanAmountRange.min)} - LKR {formatCurrency(localFilters.loanAmountRange.max)}
              </label>
              <div className={styles.rangeGroup}>
                <div className={styles.rangeInput}>
                  <label>Min (LKR):</label>
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="100000"
                    value={localFilters.loanAmountRange.min}
                    onChange={(e) => handleRangeChange('loanAmountRange', 'min', e.target.value)}
                    className={styles.range}
                  />
                  <span className={styles.rangeValue}>LKR {formatCurrency(localFilters.loanAmountRange.min)}</span>
                </div>
                <div className={styles.rangeInput}>
                  <label>Max (LKR):</label>
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="100000"
                    value={localFilters.loanAmountRange.max}
                    onChange={(e) => handleRangeChange('loanAmountRange', 'max', e.target.value)}
                    className={styles.range}
                  />
                  <span className={styles.rangeValue}>LKR {formatCurrency(localFilters.loanAmountRange.max)}</span>
                </div>
              </div>
            </div>

            {/* CIBIL Score Range */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                🎯 CIBIL Score Range: {localFilters.ciblScoreRange.min} - {localFilters.ciblScoreRange.max}
              </label>
              <div className={styles.rangeGroup}>
                <div className={styles.rangeInput}>
                  <label>Min Score:</label>
                  <input
                    type="range"
                    min="300"
                    max="900"
                    step="10"
                    value={localFilters.ciblScoreRange.min}
                    onChange={(e) => handleRangeChange('ciblScoreRange', 'min', e.target.value)}
                    className={styles.range}
                  />
                  <span className={styles.rangeValue}>{localFilters.ciblScoreRange.min}</span>
                </div>
                <div className={styles.rangeInput}>
                  <label>Max Score:</label>
                  <input
                    type="range"
                    min="300"
                    max="900"
                    step="10"
                    value={localFilters.ciblScoreRange.max}
                    onChange={(e) => handleRangeChange('ciblScoreRange', 'max', e.target.value)}
                    className={styles.range}
                  />
                  <span className={styles.rangeValue}>{localFilters.ciblScoreRange.max}</span>
                </div>
              </div>
            </div>

            {/* Occupation Filter */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>👔 Occupation</label>
              <select
                value={localFilters.occupation}
                onChange={(e) => handleSelectChange('occupation', e.target.value)}
                className={styles.select}
              >
                <option value="All">All Occupations</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Doctor">Doctor</option>
                <option value="Teacher">Teacher</option>
                <option value="Business Owner">Business Owner</option>
                <option value="Banker">Banker</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Education Filter */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>🎓 Education Level</label>
              <select
                value={localFilters.education}
                onChange={(e) => handleSelectChange('education', e.target.value)}
                className={styles.select}
              >
                <option value="All">All Education Levels</option>
                <option value="Graduate">Graduate</option>
                <option value="Post Graduate">Post Graduate</option>
                <option value="Diploma">Diploma</option>
                <option value="High School">High School</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Quick Filter Presets */}
          <div className={styles.quickFilters}>
            <h4 className={styles.quickFiltersTitle}>⚡ Quick Filters</h4>
            <div className={styles.quickFilterButtons}>
              <button 
                className={styles.quickFilterBtn}
                onClick={() => {
                  const newFilters = { ...localFilters, status: 'Approved' };
                  setLocalFilters(newFilters);
                  onFilterChange(newFilters);
                }}
              >
                ✅ Approved Only
              </button>
              <button 
                className={styles.quickFilterBtn}
                onClick={() => {
                  const newFilters = { 
                    ...localFilters, 
                    ciblScoreRange: { min: 750, max: 900 } 
                  };
                  setLocalFilters(newFilters);
                  onFilterChange(newFilters);
                }}
              >
                🎯 High CIBIL (750+)
              </button>
              <button 
                className={styles.quickFilterBtn}
                onClick={() => {
                  const newFilters = { 
                    ...localFilters, 
                    loanAmountRange: { min: 2000000, max: 10000000 } 
                  };
                  setLocalFilters(newFilters);
                  onFilterChange(newFilters);
                }}
              >
                💰 High Value (LKR 20L+)
              </button>
              <button 
                className={styles.quickFilterBtn}
                onClick={() => {
                  const thirtyDaysAgo = new Date();
                  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                  const newFilters = { 
                    ...localFilters, 
                    dateRange: { 
                      startDate: thirtyDaysAgo, 
                      endDate: new Date() 
                    } 
                  };
                  setLocalFilters(newFilters);
                  onFilterChange(newFilters);
                }}
              >
                📅 Last 30 Days
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsFilters;