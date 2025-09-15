import styles from "./styles.module.css";
import DashBoard from "../DashBoard"
import { useNavigate } from "react-router-dom";

const Main = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/");
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Loan 360</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<DashBoard/>
		</div>
	);
};

export default Main;
