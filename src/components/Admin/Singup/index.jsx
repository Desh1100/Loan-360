import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		status: "pending"
	});
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");
		setSuccess("");
		
		try {
			const url = "http://localhost:8001/admin/register";
			const { data: res } = await axios.post(url, data);
			
			// Show success message
			setSuccess("Admin account created successfully! Your account is pending approval. Please contact the super admin for activation.");
			
			// Auto navigate to login after 4 seconds
			setTimeout(() => {
				navigate("/Admin/Login");
			}, 4000);
			
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.error || error.response.data.message || "Registration failed");
			} else {
				setError("Network error. Please try again.");
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_card}>
				{/* Header */}
				<div className={styles.header}>
					<h1>Admin Registration</h1>
					<p>Request administrative access</p>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className={styles.form}>
					<div className={styles.input_group}>
						<label>First Name</label>
						<input
							type="text"
							placeholder="Enter first name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
					</div>

					<div className={styles.input_group}>
						<label>Last Name</label>
						<input
							type="text"
							placeholder="Enter last name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
					</div>

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

					<div className={styles.input_group}>
						<label>Password</label>
						<input
							type="password"
							placeholder="Create a password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
					</div>

					{/* Messages */}
					{error && <div className={styles.error_msg}>{error}</div>}
					{success && <div className={styles.success_msg}>{success}</div>}

					{/* Submit Button */}
					<button type="submit" disabled={isLoading} className={styles.submit_btn}>
						{isLoading ? "Creating Account..." : "Create Account"}
					</button>

					{/* Login Link */}
					<div className={styles.login_link}>
						<span>Already have an account? </span>
						<Link to="/Admin/Login">Sign In</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
