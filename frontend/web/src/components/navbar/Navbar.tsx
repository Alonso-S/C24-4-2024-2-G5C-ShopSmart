import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, ShoppingCart, X } from "lucide-react";
import styles from "./navbar.module.css";
import AuthContext from "../../context/auth/AuthContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const { isAuthenticated, authLogout } = useContext(AuthContext);

    const handleResize = () => {
        if (window.innerWidth > 768) {
            setIsOpen(false);
        }
    };
    const handleLogout = () => {
        authLogout();
        navigate("/");
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.flex}>
                    <div className={styles.logo}>
                        <Link to="/">
                            <ShoppingCart color="#06B6D4" />
                            <span className={styles.shop}>Shop</span>
                            <span className={styles.smart}>Smart</span>
                        </Link>
                    </div>
                    <div className={styles.navLinks}>
                        <Link to="/home" className={styles.navLink}>Home</Link>
                        <Link to="/recommendations" className={styles.navLink}>
                            Recommendations
                        </Link>
                        <Link to="/compare-prices" className={styles.navLink}>
                            Compare Prices
                        </Link>

                        <Link to="/lists" className={styles.navLink}>
                            Shopping List
                        </Link>
                        <Link to="/purchases" className={styles.navLink}>
                            Purchases
                        </Link>

                        <Link to="/products" className={styles.navLink}>
                            Products
                        </Link>

                        <Link to="/cart" className={styles.navLink}>Cart</Link>

                        <Link to="/notifications" className={styles.navLink}>
                            Notifications
                        </Link>
                        {isAuthenticated
                            ? (
                                <>
                                    <Link
                                        to="/profile"
                                        className={styles.navLink}
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className={`${styles.logOutButton} ${styles.button}`}
                                    >
                                        <LogOut className={styles.logoutIcon} />
                                        Log out
                                    </button>
                                </>
                            )
                            : (
                                <>
                                    <button
                                        onClick={() => {
                                            navigate("/login");
                                        }}
                                        className={`${styles.authButtonSignIn} ${styles.button}`}
                                    >
                                        Log In
                                    </button>
                                    <button
                                        onClick={() => {
                                            navigate("/register");
                                        }}
                                        className={`${styles.authButtonSignUp} ${styles.button}`}
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                    </div>
                    <div className={styles.mobileMenuButton}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={styles.menuButton}
                        >
                            {isOpen
                                ? <X className="h-6 w-6" />
                                : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className={styles.mobileMenu}>
                    <Link to="/" className={styles.mobileMenuLink}>Home</Link>
                    <Link to="/shopping-list" className={styles.mobileMenuLink}>
                        Shopping List
                    </Link>
                    <Link
                        to="/recommendations"
                        className={styles.mobileMenuLink}
                    >
                        Recommendations
                    </Link>

                    {isAuthenticated
                        ? (
                            <>
                                <Link
                                    to="/profile"
                                    className={styles.mobileMenuLink}
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className={`${styles.mobileAuthButton} ${styles.mobileLogOutButton}`}
                                >
                                    <LogOut className={styles.logoutIcon} />Log
                                    Out
                                </button>
                            </>
                        )
                        : (
                            <>
                                <button
                                    onClick={() => {
                                        navigate("/login");
                                    }}
                                    className={`${styles.mobileAuthButtonSignIn} ${styles.mobileAuthButton}`}
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => {
                                        navigate("/signup");
                                    }}
                                    className={`${styles.mobileAuthButtonSignUp} ${styles.mobileAuthButton}`}
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
