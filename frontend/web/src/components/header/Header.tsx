import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import styles from "./header.module.css";

const Header = () => {
    return (
        <>
            <header className={styles.header}>
                <Navbar />
            </header>
            <Outlet />
        </>
    );
};

export default Header;
