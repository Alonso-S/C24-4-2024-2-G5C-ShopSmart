import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "../styles/Header.module.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/auth/AuthContext";
import AuthForm from "../components/AuthForm";

const Header = () => {
    const { isAuthenticated, authLogout } = useContext(AuthContext);

    const [isMenuActive, setIsMenuActive] = useState(false);
    const toggleForm = () => {
        setIsMenuActive(!isMenuActive);
    };
    useEffect(() => {
        setIsMenuActive(false);
    }, [isAuthenticated]);

    return (
        <>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <img
                        src="/logos/shopsmart_logo.png"
                        alt="ShopSmart Logo"
                        className={styles.logoImage}
                    />
                </div>
                <Navbar />
                <div className={styles.profileIcon} onClick={toggleForm}>
                    <img
                        src="/icons/ic_profile.png"
                        alt="Perfil"
                        className={styles.profileImage}
                    />
                </div>
            </header>

            {isMenuActive && (
                <div className={styles.profileMenu}>
                    {!isAuthenticated
                        ? <AuthForm />
                        : <button onClick={authLogout}>Cerrar sesión</button>}
                </div>
            )}
            <Outlet />
        </>
    );
};

export default Header;
