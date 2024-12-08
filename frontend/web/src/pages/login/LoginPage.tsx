import LoginForm from "../../components/login-form/LoginForm";
import styles from "./login-page.module.css";
export const LoginPage = () => {
    return (
        <main className={styles.main}>
            <LoginForm />
        </main>
    );
};
