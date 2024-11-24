import React, { useContext, useState } from "react";
import AuthContext from "../context/auth/AuthContext";
import { Link } from "react-router-dom";
import styles from "../styles/LoginForm.module.css";

interface LoginFormProps {
    toggleForm: () => void;
}

const LoginForm = ({ toggleForm }: LoginFormProps) => {
    const { authLogin } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        console.log(newEmail);
        setEmail(newEmail);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        console.log(newPassword);
        setPassword(newPassword);
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true); // Comienza la carga

        if (password.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres.");
            setIsLoading(false); // Detener carga si hay error
            return;
        }

        try {
            await authLogin(email, password);
            window.location.href = "/";
        } catch (err) {
            console.log(err);
            setError("Credenciales inválidas o error en el servidor.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Bienvenido</h1>
            <p className={styles.paragraph}>Inicie sesión en su cuenta</p>
            <form onSubmit={handleLogin} className={styles.loginForm}>
                <input
                    placeholder="Correo o celular"
                    type="email"
                    id="email"
                    onChange={handleEmailChange}
                    required
                />
                <input
                    placeholder="Contraseña"
                    type="password"
                    id="password"
                    onChange={handlePasswordChange}
                    required
                />
                <div className={styles.options}>
                    <label>
                        <input type="checkbox" />
                        Recordar datos
                    </label>
                    <Link to="/">¿Olvidaste tu contraseña?</Link>
                </div>

                {error && <div style={{ color: "red" }}>{error}</div>}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Cargando" : "Iniciar sesión"}
                </button>
            </form>
            <div className={styles.socialLogin}>
                <p className={styles.paragraph}>O</p>
                <div className={styles.icons}>
                    <a href="#">
                        <img src="/icons/ic_gmail.png" alt="Google" />
                    </a>
                    <a href="#">
                        <img src="/icons/ic_facebook.png" alt="Facebook" />
                    </a>
                    <a href="#">
                        <img src="/icons/ic_apple.png" alt="Apple" />
                    </a>
                </div>
                <p className={styles.paragraph}>
                    ¿No tienes una cuenta?{" "}
                    <span onClick={toggleForm}>
                        Crear una cuenta
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
