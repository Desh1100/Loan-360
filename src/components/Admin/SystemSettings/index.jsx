import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const SystemSettings = () => {
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState(null);
    const [systemStats, setSystemStats] = useState({
        totalUsers: 0,
        totalAdmins: 0,
        totalLoans: 0,
        systemUptime: 0,
        lastBackup: null,
        serverStatus: 'Active'
    });

    useEffect(() => {
        // Get admin data from localStorage
        const adminUser = localStorage.getItem('adminUser');
        if (adminUser) {
            try {
                const user = JSON.parse(adminUser);
                setAdminData(user);
            } catch (error) {
                console.error('Error parsing admin user data:', error);
            }
        }

        // Mock system statistics - In real app, fetch from API
        setSystemStats({
            totalUsers: 1245,
            totalAdmins: 5,
            totalLoans: 245,
            systemUptime: 99.8,
            lastBackup: new Date().toLocaleString(),
            serverStatus: 'Active'
        });
    }, []);

    const handleBackToDashboard = () => {
        navigate('/admin/app');
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        sessionStorage.clear();
        navigate('/admin/login');
    };

    // Check if current user is super admin
    const isSuperAdmin = () => {
        if (adminData) {
            return adminData.email === 'superadmin@gmail.com';
        }
        return false;
    };

    return (
        <div className={styles.settings_container}>
            {/* Header Section */}
            <div className={styles.header_section}>
                <div className={styles.header_content}>
                    <button className={styles.back_btn} onClick={handleBackToDashboard}>
                        <span className={styles.back_icon}>←</span>
                        <span>Back to Dashboard</span>
                    </button>
                    <div className={styles.title_section}>
                        <h1 className={styles.page_title}>System Settings</h1>
                        <p className={styles.page_subtitle}>Manage system configuration and view statistics</p>
                    </div>
                </div>
                <div className={styles.admin_info}>
                    <div className={styles.admin_profile}>
                        <div className={styles.admin_avatar}>
                            <span>{adminData?.name ? adminData.name.charAt(0).toUpperCase() : 'AD'}</span>
                        </div>
                        <div className={styles.admin_details}>
                            <h4>{adminData?.name || 'Admin User'}</h4>
                            <p>{isSuperAdmin() ? 'Super Administrator' : 'System Administrator'}</p>
                            <span className={styles.admin_email}>{adminData?.email || 'admin@system.com'}</span>
                        </div>
                    </div>
                    <button className={styles.logout_btn} onClick={handleLogout}>
                        <span className={styles.logout_icon}>🚪</span>
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Admin Information Section */}
            <div className={styles.admin_section}>
                <h3 className={styles.section_title}>Administrator Information</h3>
                <div className={styles.admin_card}>
                    <div className={styles.admin_info_grid}>
                        <div className={styles.info_item}>
                            <label>Full Name</label>
                            <span>{adminData?.name || 'Admin User'}</span>
                        </div>
                        <div className={styles.info_item}>
                            <label>Email Address</label>
                            <span>{adminData?.email || 'admin@system.com'}</span>
                        </div>
                        <div className={styles.info_item}>
                            <label>Role</label>
                            <span className={isSuperAdmin() ? styles.super_admin : styles.admin_role}>
                                {isSuperAdmin() ? 'Super Administrator' : 'Administrator'}
                            </span>
                        </div>
                        <div className={styles.info_item}>
                            <label>Status</label>
                            <span className={styles.active_status}>Active</span>
                        </div>
                        <div className={styles.info_item}>
                            <label>Last Login</label>
                            <span>{new Date().toLocaleString()}</span>
                        </div>
                        <div className={styles.info_item}>
                            <label>Account Created</label>
                            <span>{adminData?.createdAt ? new Date(adminData.createdAt).toLocaleDateString() : 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </div>

         
            
            {/* System Information Section */}
            <div className={styles.system_section}>
                <h3 className={styles.section_title}>System Information</h3>
                <div className={styles.system_card}>
                    <div className={styles.system_info_grid}>
                        <div className={styles.info_item}>
                            <label>Server Status</label>
                            <span className={styles.server_active}>
                                <span className={styles.status_dot}></span>
                                {systemStats.serverStatus}
                            </span>
                        </div>
                        <div className={styles.info_item}>
                            <label>Last Backup</label>
                            <span>{systemStats.lastBackup}</span>
                        </div>
                        <div className={styles.info_item}>
                            <label>Database Status</label>
                            <span className={styles.db_connected}>
                                <span className={styles.status_dot}></span>
                                Connected
                            </span>
                        </div>
                        <div className={styles.info_item}>
                            <label>Application Version</label>
                            <span>v2.1.0</span>
                        </div>
                        <div className={styles.info_item}>
                            <label>Environment</label>
                            <span>Production</span>
                        </div>
                        <div className={styles.info_item}>
                            <label>Maintenance Mode</label>
                            <span className={styles.maintenance_off}>Disabled</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions Section (Super Admin Only) */}
            {isSuperAdmin() && (
                <div className={styles.actions_section}>
                    <h3 className={styles.section_title}>System Actions</h3>
                    <div className={styles.actions_grid}>
                        <button className={`${styles.action_btn} ${styles.backup_btn}`}>
                            <span className={styles.action_icon}>💾</span>
                            <div className={styles.action_content}>
                                <span className={styles.action_title}>Create Backup</span>
                                <span className={styles.action_desc}>Generate system backup</span>
                            </div>
                        </button>
                        <button className={`${styles.action_btn} ${styles.maintenance_btn}`}>
                            <span className={styles.action_icon}>🔧</span>
                            <div className={styles.action_content}>
                                <span className={styles.action_title}>Maintenance Mode</span>
                                <span className={styles.action_desc}>Toggle maintenance</span>
                            </div>
                        </button>
                        <button className={`${styles.action_btn} ${styles.logs_btn}`}>
                            <span className={styles.action_icon}>📋</span>
                            <div className={styles.action_content}>
                                <span className={styles.action_title}>System Logs</span>
                                <span className={styles.action_desc}>View system logs</span>
                            </div>
                        </button>
                        <button className={`${styles.action_btn} ${styles.config_btn}`}>
                            <span className={styles.action_icon}>⚙️</span>
                            <div className={styles.action_content}>
                                <span className={styles.action_title}>Configuration</span>
                                <span className={styles.action_desc}>System settings</span>
                            </div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SystemSettings;