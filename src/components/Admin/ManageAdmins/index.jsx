import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const ManageAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // all, pending, active, inactive
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      console.log('Using token:', token); // Debug log
      
      const response = await axios.get('http://localhost:8001/admin/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAdmins(response.data);
      setError("");
    } catch (error) {
      console.error('Error fetching admins:', error);
      setError("Failed to fetch admin data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateAdminStatus = async (adminId, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.put(
        `http://localhost:8001/admin/update-status/${adminId}`,
        { status },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      setSuccess(`Admin status updated successfully!`);
      fetchAdmins(); // Refresh the list
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error('Error updating admin status:', error);
      setError(error.response?.data?.message || "Failed to update admin status.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const deleteAdmin = async (adminId) => {
    if (!window.confirm('Are you sure you want to delete this admin? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:8001/admin/delete/${adminId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setSuccess("Admin deleted successfully!");
      fetchAdmins(); // Refresh the list
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error('Error deleting admin:', error);
      setError(error.response?.data?.message || "Failed to delete admin.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const getFilteredAdmins = () => {
    // First filter out the super admin from all results
    const nonSuperAdmins = admins.filter(admin => admin.email !== 'superadmin@gmail.com');
    
    switch (activeTab) {
      case 'pending':
        return nonSuperAdmins.filter(admin => admin.status === 'pending');
      case 'active':
        return nonSuperAdmins.filter(admin => admin.status === 'approved' && admin.isActive);
      case 'inactive':
        return nonSuperAdmins.filter(admin => !admin.isActive || admin.status === 'rejected');
      default:
        return nonSuperAdmins;
    }
  };

  const getStatusBadge = (admin) => {
    if (admin.status === 'pending') {
      return <span className={`${styles.status_badge} ${styles.pending}`}>Pending</span>;
    } else if (admin.status === 'approved' && admin.isActive) {
      return <span className={`${styles.status_badge} ${styles.active}`}>Active</span>;
    } else if (admin.status === 'approved' && !admin.isActive) {
      return <span className={`${styles.status_badge} ${styles.inactive}`}>Inactive</span>;
    } else if (admin.status === 'rejected') {
      return <span className={`${styles.status_badge} ${styles.rejected}`}>Rejected</span>;
    }
    return <span className={`${styles.status_badge} ${styles.unknown}`}>Unknown</span>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredAdmins = getFilteredAdmins();

  return (
    <div className={styles.manage_container}>
      <div className={styles.header_section}>
        <div className={styles.header_content}>
          <button className={styles.back_btn} onClick={() => navigate(-1)}>
            ← Back to Dashboard
          </button>
          <h1 className={styles.page_title}>Manage Administrators</h1>
          <p className={styles.page_subtitle}>Control admin access and permissions</p>
        </div>
      </div>

      {error && (
        <div className={styles.error_message}>
          <span className={styles.error_icon}>❌</span>
          {error}
        </div>
      )}

      {success && (
        <div className={styles.success_message}>
          <span className={styles.success_icon}>✅</span>
          {success}
        </div>
      )}

      <div className={styles.tabs_container}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'all' ? styles.active_tab : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Admins ({admins.filter(a => a.email !== 'superadmin@gmail.com').length})
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'pending' ? styles.active_tab : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending ({admins.filter(a => a.status === 'pending' && a.email !== 'superadmin@gmail.com').length})
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'active' ? styles.active_tab : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Active ({admins.filter(a => a.status === 'approved' && a.isActive && a.email !== 'superadmin@gmail.com').length})
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'inactive' ? styles.active_tab : ''}`}
            onClick={() => setActiveTab('inactive')}
          >
            Inactive ({admins.filter(a => ((!a.isActive || a.status === 'rejected') && a.email !== 'superadmin@gmail.com')).length})
          </button>
        </div>
      </div>

      <div className={styles.table_container}>
        {loading ? (
          <div className={styles.loading_container}>
            <div className={styles.loader}></div>
            <p>Loading administrators...</p>
          </div>
        ) : filteredAdmins.length === 0 ? (
          <div className={styles.empty_state}>
            <div className={styles.empty_icon}>👥</div>
            <h3>No administrators found</h3>
            <p>There are no administrators matching the current filter.</p>
          </div>
        ) : (
          <table className={styles.admin_table}>
            <thead>
              <tr>
                <th>Admin Details</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Registered</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.map((admin) => (
                <tr key={admin._id}>
                  <td>
                    <div className={styles.admin_info}>
                      <div className={styles.admin_avatar}>
                        {(admin.firstName?.charAt(0) || '') + (admin.lastName?.charAt(0) || '')}
                      </div>
                      <div className={styles.admin_details}>
                        <div className={styles.admin_name}>
                          {admin.firstName} {admin.lastName}
                        </div>
                        <div className={styles.admin_id}>ID: {admin._id.slice(-8)}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={styles.admin_email}>{admin.email}</span>
                  </td>
                  <td>
                    <span className={styles.role_badge}>{admin.role || 'admin'}</span>
                  </td>
                  <td>
                    {getStatusBadge(admin)}
                  </td>
                  <td>
                    <span className={styles.date_text}>
                      {formatDate(admin.registered_at || admin.createdAt)}
                    </span>
                  </td>
                  <td>
                    <div className={styles.action_buttons}>
                      {admin.status === 'pending' && (
                        <>
                          <button
                            className={`${styles.action_btn} ${styles.approve_btn}`}
                            onClick={() => updateAdminStatus(admin._id, 'approved')}
                          >
                            Approve
                          </button>
                          <button
                            className={`${styles.action_btn} ${styles.reject_btn}`}
                            onClick={() => updateAdminStatus(admin._id, 'rejected')}
                          >
                            Reject
                          </button>
                        </>
                      )}
                      
                      {admin.status === 'approved' && (
                        <button
                          className={`${styles.action_btn} ${admin.isActive ? styles.deactivate_btn : styles.activate_btn}`}
                          onClick={() => updateAdminStatus(admin._id, admin.isActive ? 'inactive' : 'active')}
                        >
                          {admin.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      )}

                      {admin.email !== 'superadmin@gmail.com' && (
                        <button
                          className={`${styles.action_btn} ${styles.delete_btn}`}
                          onClick={() => deleteAdmin(admin._id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageAdmins;
