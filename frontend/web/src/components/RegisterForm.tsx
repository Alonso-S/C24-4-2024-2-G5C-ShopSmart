import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import AuthContext from "../context/auth/AuthContext";
import styles from "../styles/RegisterForm.module.css";

interface RegisterFormProps {
    toggleForm: () => void;
}

const RegisterForm = ({ toggleForm }: RegisterFormProps) => {
    const { authRegister } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const provinceRef = useRef<HTMLInputElement>(null);
    const districtRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        console.log(newEmail);
        setFormData({ ...formData, email: newEmail });
        if (!emailRegex.test(newEmail)) {
            setError("Por favor ingresa un email válido.");
        } else {
            setError("");
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        console.log(newPassword);
        setFormData({ ...formData, password: newPassword });
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const name = nameRef.current?.value;
        const phone = phoneRef.current?.value;

        const province = provinceRef.current?.value;
        const district = districtRef.current?.value;

        const address = addressRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (
            name == undefined ||
            phone == undefined ||
            province == undefined ||
            district == undefined ||
            address == undefined ||
            email == undefined ||
            password == undefined
        ) {
            setError("Todos los campos son obligatorios.");
            setIsLoading(false);
            return;
        }

        if (password.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres.");
            setIsLoading(false);
            return;
        }
        console.log({
            name: name,
            phone: phone,
            province: province,
            district: district,
            address: address,
            email: email,
            password: password,
        });
        try {
            await authRegister({
                name: name,
                phone: phone,
                province: province,
                district: district,
                address: address,
                email: email,
                password: password,
            });
            window.location.href = "/";
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(
                    err.response?.data?.message ||
                        "Credenciales inválidas o error en el servidor.",
                );
            } else {
                setError("Error en el servidor.");
            }
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Regístrate</h1>
            <p className={styles.paragraph}>Crea tu nueva cuenta</p>
            <form onSubmit={handleRegister} className={styles.registerForm}>
                <input
                    ref={nameRef}
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    required
                />
                <input
                    ref={phoneRef}
                    type="tel"
                    name="phone"
                    placeholder="Celular"
                    required
                />
                <input
                    ref={provinceRef}
                    type="text"
                    placeholder="Provincia"
                    required
                />
                <input
                    ref={districtRef}
                    type="text"
                    name="distric"
                    placeholder="Distrito"
                    required
                />
                <input
                    ref={addressRef}
                    type="text"
                    name="address"
                    placeholder="Dirección"
                />
                <input
                    ref={emailRef}
                    type="email"
                    name="email"
                    onChange={handleEmailChange}
                    placeholder="Correo electrónico"
                    required
                />
                <input
                    ref={passwordRef}
                    type="password"
                    name="password"
                    onChange={handlePasswordChange}
                    placeholder="Contraseña"
                    required
                />
                <div className={styles.terms}>
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms">
                        Al registrarte aceptas nuestros{" "}
                        <span>Términos & Condiciones</span>
                    </label>
                </div>

                {error && <div style={{ color: "red" }}>{error}</div>}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Cargando" : "Continuar"}
                </button>
            </form>

            <p className={styles.paragraph}>
                ¿Ya tienes una cuenta?{" "}
                <span onClick={toggleForm}>Inicia sesión</span>
            </p>
        </div>
    );
};

export default RegisterForm;
