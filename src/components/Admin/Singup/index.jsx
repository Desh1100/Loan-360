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
			<div className={styles.background_pattern}></div>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Already Have Account?</h1>
					<p style={{ 
						color: 'var(--warm-white)', 
						textAlign: 'center', 
						marginBottom: '1.5rem',
						fontSize: '1.1rem',
						opacity: 0.9,
						position: 'relative',
						zIndex: 1
					}}>
						Sign in to access your admin dashboard
					</p>
					<Link to="/Admin/Login">
						<button type="button" className={styles.white_btn}>
							Sign In
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<div className={styles.header}>
							<h1>Create Admin Account</h1>
							<p style={{ 
								color: 'var(--coffee)', 
								margin: '0 0 0.5rem 0',
								fontSize: '1.1rem',
								fontWeight: 500
							}}>
								Join our administrative team
							</p>
							<p style={{ 
								color: 'var(--secondary-brown)', 
								margin: 0,
								fontSize: '0.9rem',
								opacity: 0.8
							}}>
								Please fill in your details below
							</p>
						</div>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						{success && <div className={styles.success_msg}>{success}</div>}
						<button type="submit" className={styles.green_btn} disabled={isLoading}>
							{isLoading ? "Creating Account..." : "Sign Up"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
