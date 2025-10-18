import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Shield, Eye, EyeOff } from "lucide-react";

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
			<div className={styles.login_card}>
				{/* Header */}
				<div className={styles.header}>
					<Shield className={styles.icon} />
					<h1>Admin Login</h1>
					<p>Loan Management System</p>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className={styles.form}>
					{/* Email Input */}
					<div className={styles.input_group}>
						<label>Email</label>
						<input
							type="email"
							placeholder="Enter your email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
					</div>

					{/* Password Input */}
					<div className={styles.input_group}>
						<label>Password</label>
						<div className={styles.password_container}>
							<input
								type={showPassword ? "text" : "password"}
								placeholder="Enter your password"
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
								{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</div>
					</div>

					{/* Error Message */}
					{error && (
						<div className={styles.error_msg}>
							{error}
						</div>
					)}

					{/* Submit Button */}
					<button type="submit" disabled={isLoading} className={styles.submit_btn}>
						{isLoading ? "Logging in..." : "Login"}
					</button>

					{/* Links */}
					<div className={styles.links}>
						<span>You don't have an account yet?</span>
						<Link to="/admin/signup">  Sign Up Here</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;