import LoginForm from "../components/LoginForm";
import styles from "../styles/AuthPage.module.css";
export const AuthPage = () => {
    return (
        <main className={styles.main}>
            <LoginForm />
        </main>
    );
};
