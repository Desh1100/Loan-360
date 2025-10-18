import React from "react";
import styles from "./styles.module.css";
import LoanApplicationsTable from "./LoanapplicationTable";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
      navigate("./AutoFeedback");
    };

    const handleManageAdmins = () => {
      navigate("/admin/manage-admins");
    };

    const handleSystemSettings = () => {
      navigate("/admin/system-settings");
    };

    const handleLogout = () => {
      // Clear any stored authentication data
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      sessionStorage.clear();
      
      // Navigate to admin login page
      navigate('/admin/login');
    };

    // Check if current user is super admin
    const isSuperAdmin = () => {
      const adminUser = localStorage.getItem('adminUser');
      console.log('Admin user from localStorage:', adminUser); // Debug log
      
      if (adminUser) {
        try {
          const user = JSON.parse(adminUser);
          console.log('Parsed admin user:', user); // Debug log
          console.log('User email:', user.email); // Debug log
          console.log('Is super admin?', user.email === 'superadmin@gmail.com'); // Debug log
          
          return user.email === 'superadmin@gmail.com';
        } catch (error) {
          console.error('Error parsing admin user data:', error);
          return false;
        }
      }
      
      // Fallback: also check if email is directly stored or in token
      const token = localStorage.getItem('adminToken');
      if (token) {
        try {
          // Decode JWT token to get email (basic decode, not secure verification)
          const payload = JSON.parse(atob(token.split('.')[1]));
          console.log('Token payload:', payload); // Debug log
          return payload.email === 'superadmin@gmail.com';
        } catch (error) {
          console.error('Error parsing token:', error);
        }
      }
      
      return false;
    };

    // Mock data - in real app this would come from API
    const dashboardStats = {
        totalApplications: 245,
        approvedLoans: 156,
        pendingApprovals: 43,
        rejectedLoans: 46
    };
  
  return (
    <div className={styles.dashboard_container}>
      <div className={styles.header_section}>
        <div className={styles.header_content}>
          <h1 className={styles.dashboard_title}>Admin Dashboard</h1>
          <p className={styles.dashboard_subtitle}>Loan Management System</p>
        </div>
        <div className={styles.admin_info}>
          <div className={styles.admin_profile}>
            <div className={styles.admin_avatar}>
              <span>AD</span>
            </div>
            <div className={styles.admin_details}>
              <h4>Admin User</h4>
              <p>System Administrator</p>
            </div>
          </div>
          <button className={styles.logout_btn} onClick={handleLogout}>
            <span className={styles.logout_icon}>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className={styles.stats_container}>
        <div className={`${styles.card} ${styles.total_card}`}>
          <div className={styles.card_icon}>📊</div>
          <div className={styles.card_content}>
            <h3>Total Applications</h3>
            <p className={styles.stat_number}>{dashboardStats.totalApplications}</p>
            <span className={styles.stat_label}>All time</span>
          </div>
        </div>
        <div className={`${styles.card} ${styles.approved_card}`}>
          <div className={styles.card_icon}>✅</div>
          <div className={styles.card_content}>
            <h3>Approved Loans</h3>
            <p className={styles.stat_number}>{dashboardStats.approvedLoans}</p>
            <span className={styles.stat_label}>63.7% approval rate</span>
          </div>
        </div>
        <div className={`${styles.card} ${styles.pending_card}`}>
          <div className={styles.card_icon}>⏳</div>
          <div className={styles.card_content}>
            <h3>Pending Reviews</h3>
            <p className={styles.stat_number}>{dashboardStats.pendingApprovals}</p>
            <span className={styles.stat_label}>Awaiting decision</span>
          </div>
        </div>
        <div className={`${styles.card} ${styles.rejected_card}`}>
          <div className={styles.card_icon}>❌</div>
          <div className={styles.card_content}>
            <h3>Rejected Loans</h3>
            <p className={styles.stat_number}>{dashboardStats.rejectedLoans}</p>
            <span className={styles.stat_label}>18.8% rejection rate</span>
          </div>
        </div>
      </div>

      <div className={styles.actions_section}>
        <div className={styles.actions_header}>
          <h3>Quick Actions</h3>
          <p>Manage loan applications and system operations</p>
        </div>
        <div className={styles.actions_grid}>
          <button className={`${styles.action_btn} ${styles.primary_action}`} onClick={handleNavigation}>
            <span className={styles.btn_icon}>🤖</span>
            <div className={styles.btn_content}>
              <span className={styles.btn_title}>Generate Auto Feedback</span>
              <span className={styles.btn_desc}>AI-powered loan analysis</span>
            </div>
          </button>
          <button className={`${styles.action_btn} ${styles.secondary_action}`}>
            <span className={styles.btn_icon}>📈</span>
            <div className={styles.btn_content}>
              <span className={styles.btn_title}>View Reports</span>
              <span className={styles.btn_desc}>Analytics & insights</span>
            </div>
          </button>
          <button className={`${styles.action_btn} ${styles.secondary_action}`} onClick={handleSystemSettings}>
            <span className={styles.btn_icon}>⚙️</span>
            <div className={styles.btn_content}>
              <span className={styles.btn_title}>System Settings</span>
              <span className={styles.btn_desc}>Configure parameters</span>
            </div>
          </button>
          {isSuperAdmin() && (
            <button className={`${styles.action_btn} ${styles.secondary_action}`} onClick={handleManageAdmins}>
              <span className={styles.btn_icon}>👥</span>
              <div className={styles.btn_content}>
                <span className={styles.btn_title}>Manage Admins</span>
                <span className={styles.btn_desc}>Administration</span>
              </div>
            </button>
          )}
        </div>
      </div>

      <div className={styles.table_section}>
        <div className={styles.table_header}>
          <h3>Recent Loan Applications</h3>
          <p>Monitor and manage loan application status</p>
        </div>
        <div className={styles.table_container}>
          <LoanApplicationsTable/>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
