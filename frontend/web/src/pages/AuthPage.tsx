import AuthForm from "../components/AuthForm";
import styles from "../styles/AuthPage.module.css";
export const AuthPage = () => {
    return (
        <main className={styles.main}>
            <AuthForm />
        </main>
    );
};
