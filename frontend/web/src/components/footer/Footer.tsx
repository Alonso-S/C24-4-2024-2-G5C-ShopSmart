import { Link } from "react-router-dom";
import styles from "./footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p>&copy; 2024 ShopSmart. All rights reserved.</p>
                <nav className={styles.nav}>
                    <Link to="/terms" className={styles.navLink}>
                        Terms of Service
                    </Link>
                    <Link to="/privacy" className={styles.navLink}>
                        Privacy Policy
                    </Link>
                    <Link to="/contact" className={styles.navLink}>
                        Contact Us
                    </Link>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
