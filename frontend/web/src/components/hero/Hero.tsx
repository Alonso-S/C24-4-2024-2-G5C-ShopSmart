import { useNavigate } from "react-router-dom";
import styles from "./hero.module.css";

export default function Hero() {
    const navigate = useNavigate();
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    Optimize Your Grocery Shopping with AI
                </h1>
                <p className={styles.subtitle}>
                    Shop smarter, save time, and reduce costs with ShopSmart
                </p>
                <button
                    className={styles.cta}
                    onClick={() => {
                        navigate("/home");
                    }}
                >
                    Get Started
                </button>
            </div>
        </section>
    );
}
