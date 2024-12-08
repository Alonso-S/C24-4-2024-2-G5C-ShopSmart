import RegisterForm from "../../components/register-form/RegisterForm";
import styles from "./register-page.module.css";
export const RegisterPage = () => {
    return (
        <main className={styles.main}>
            <RegisterForm />
        </main>
    );
};
