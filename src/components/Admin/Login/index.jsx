import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { AlertCircle, Lock, Mail, Shield, Eye, EyeOff } from "lucide-react";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");
		
		try {
			const url = "http://localhost:8001/admin/login";
			const { data: res } = await axios.post(url, data);
			
			console.log('Login response:', res); // Debug log
			
			// Store both token and admin user data
			localStorage.setItem("adminToken", res.token);
			localStorage.setItem("adminUser", JSON.stringify(res.admin));
			
			console.log('Stored admin user:', JSON.stringify(res.admin)); // Debug log
			console.log('Stored admin token:', res.token); // Debug log
			
			window.location = "/dashboard";
		} catch (error) {
			console.error('Login error:', error); // Debug log
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				console.log('Error response:', error.response.data); // Debug log
				setError(error.response.data.error || error.response.data.message || "Login failed");
			} else {
				setError("Network error. Please try again.");
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.background_pattern}></div>
			
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<div className={styles.form_container}>
						{/* Header */}
						<div className={styles.header}>
							<div className={styles.icon_container}>
								<Shield className={styles.shield_icon} />
							</div>
							<h1 className={styles.title}>Admin Portal</h1>
							<p className={styles.subtitle}>Loan Management System</p>
							<p className={styles.welcome_text}>Welcome back, Administrator</p>
						</div>

						{/* Form */}
						<form onSubmit={handleSubmit} className={styles.form}>
							{/* Email Input */}
							<div className={styles.input_group}>
								<label className={styles.label}>
									<Mail className={styles.input_icon} />
									Email Address
								</label>
								<input
									type="email"
									placeholder="admin@bank.com"
									name="email"
									onChange={handleChange}
									value={data.email}
									required
									className={styles.input}
								/>
							</div>

							{/* Password Input */}
							<div className={styles.input_group}>
								<label className={styles.label}>
									<Lock className={styles.input_icon} />
									Password
								</label>
								<div className={styles.password_container}>
									<input
										type={showPassword ? "text" : "password"}
										placeholder="Enter your secure password"
										name="password"
										onChange={handleChange}
										value={data.password}
										required
										className={styles.input}
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className={styles.password_toggle}
									>
										{showPassword ? <EyeOff className={styles.eye_icon} /> : <Eye className={styles.eye_icon} />}
									</button>
								</div>
							</div>

							{/* Error Message */}
							{error && (
								<div className={styles.error_msg}>
									<AlertCircle className={styles.error_icon} />
									{error}
								</div>
							)}

							{/* Submit Button */}
							<button type="submit" disabled={isLoading} className={styles.submit_btn}>
								{isLoading ? (
									<>
										<div className={styles.spinner}></div>
										Authenticating...
									</>
								) : (
									<>
										<Lock className={styles.btn_icon} />
										Sign In Securely
									</>
								)}
							</button>

							{/* Forgot Password */}
							<div className={styles.forgot_password}>
								<Link to="/forgot-password" className={styles.forgot_link}>
									Forgot your password?
								</Link>
							</div>

							{/* Sign Up */}
							<div className={styles.signup_section}>
								<p className={styles.signup_text}>Need administrative access?</p>
								<Link to="/admin/signup">
									<button type="button" className={styles.signup_btn}>
										Request Access
									</button>
								</Link>
							</div>
						</form>
					</div>
				</div>

				{/* Right Side */}
				<div className={styles.right}>
					<div className={styles.right_background}></div>
					<div className={styles.right_content}>
						<div className={styles.right_header}>
							<div className={styles.right_icon_container}>
								<Shield className={styles.right_shield_icon} />
							</div>
							<h2 className={styles.right_title}>Loan 360°</h2>
							<p className={styles.right_description}>
								Comprehensive loan management system with advanced analytics, automated decision-making, and secure administrative controls.
							</p>
						</div>

						{/* Features */}
						<div className={styles.features_list}>
							<div className={styles.feature_item}>
								<Shield className={styles.feature_icon} />
								<span>Secure Admin Access</span>
							</div>
							<div className={styles.feature_item}>
								<Lock className={styles.feature_icon} />
								<span>Advanced Authentication</span>
							</div>
							<div className={styles.feature_item}>
								<AlertCircle className={styles.feature_icon} />
								<span>Real-time Monitoring</span>
							</div>
						</div>
					</div>
					<div className={styles.decorative_elements}>
						<div className={styles.decorative_circle_1}></div>
						<div className={styles.decorative_circle_2}></div>
						<div className={styles.decorative_circle_3}></div>
					</div>
				</div>
			</div>

			{/* Footer */}
			<div className={styles.footer}>
				<p>© 2025 Loan 360° Management System. All rights reserved.</p>
			</div>

			{/* Floating Elements */}
			<div className={styles.floating_elements}>
				<div className={styles.floating_dot_1}></div>
				<div className={styles.floating_dot_2}></div>
				<div className={styles.floating_dot_3}></div>
				<div className={styles.floating_dot_4}></div>
			</div>
		</div>
	);
};

export default Login;