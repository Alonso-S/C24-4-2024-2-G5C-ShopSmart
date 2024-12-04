import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link
                        to="/"
                        className={styles.navLink}
                        aria-label="Ir a la página principal"
                    >
                        Inicio
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link
                        to="/stores"
                        className={styles.navLink}
                        aria-label="Ir a la página de tiendas"
                    >
                        Tiendas
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link
                        to="/routes"
                        className={styles.navLink}
                        aria-label="Ir a la página de rutas"
                    >
                        Rutas
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link
                        to="/offers"
                        className={styles.navLink}
                        aria-label="Ir a la página de promociones"
                    >
                        Promos
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link
                        to="/inventory"
                        className={styles.navLink}
                        aria-label="Ir a la página de inventario"
                    >
                        Inventario
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link
                        to="/history"
                        className={styles.navLink}
                        aria-label="Ir a la página de historial"
                    >
                        Historial
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
