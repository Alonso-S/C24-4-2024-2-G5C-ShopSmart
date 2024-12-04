import { ReactNode, useCallback, useEffect, useMemo, useReducer } from "react";
import authReducer from "./AuthReducer";
import AuthContext from "./AuthContext";
import {
    loginUser,
    // logoutUser,
    registerUser,
    verifyAndRefreshToken,
} from "../../api/auth/index";
import User from "../../types/UserDTO";
import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_REGISTER,
    AUTH_VERIFY_TOKEN,
} from "./Actions";

interface AuthStateProps {
    children: ReactNode;
}
const AuthState = ({ children }: AuthStateProps) => {
    const initState = {
        isAuthenticated: false,
    };
    const [state, dispatch] = useReducer(authReducer, initState);

    const setAuthenticated = (type: string, value: boolean) => {
        dispatch({
            type: type,
            payload: value,
        });
    };

    const authLogin = useCallback(async (email: string, password: string) => {
        try {
            await loginUser({ email, password });
            localStorage.setItem("isAuthenticated", "true");
            setAuthenticated(AUTH_LOGIN, true);
        } catch (err) {
            console.error("Login error: ", err);
            throw new Error(
                err instanceof Error ? err.message : "Failed to login",
            );
        }
    }, []);

    // Función para manejar el logout
    const authLogout = useCallback(async () => {
        try {
            localStorage.setItem("isAuthenticated", "false");
            setAuthenticated(AUTH_LOGOUT, false);
            console.log("Session successfully closed");
        } catch (err) {
            console.error("Logout error: ", err);
            throw new Error(
                err instanceof Error ? err.message : "Failed to logout",
            );
        }
    }, []);

    const authRegister = useCallback(async (user: User) => {
        try {
            await registerUser(user);
            setAuthenticated(AUTH_REGISTER, true);
            localStorage.setItem("isAuthenticated", "true");
            console.log("Usuario registrado correctamente");
        } catch (err) {
            console.error(err);
            throw new Error("Error al registrar el usuario");
        }
    }, []);

    const value = useMemo(
        () => ({
            authLogin,
            authLogout,
            authRegister,
        }),
        [authLogin, authLogout, authRegister],
    );

    const firstLogin = useCallback(async () => {
        try {
            await verifyAndRefreshToken();
            localStorage.setItem("isAuthenticated", "true");
            setAuthenticated(AUTH_VERIFY_TOKEN, true);
        } catch (err) {
            console.error("Error verifying token: ", err);
            localStorage.setItem("isAuthenticated", "false");
            setAuthenticated(AUTH_VERIFY_TOKEN, false);
        }
    }, []);
    useEffect(() => {
        firstLogin();
    }, [firstLogin]);

    useEffect(() => {
        const handleStorageChange = async () => {
            const isAuthValue =
                localStorage.getItem("isAuthenticated") === "true";
            if (!isAuthValue) {
                setAuthenticated(AUTH_VERIFY_TOKEN, false);

                localStorage.setItem("isAuthenticated", "false");
                window.location.href = "/";
                return;
            }
            try {
                firstLogin();
            } catch (err) {
                console.error("Error verifying token: ", err);
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [firstLogin]);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: state.isAuthenticated,
                authLogin: value.authLogin,
                authLogout: value.authLogout,
                authRegister: value.authRegister,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthState;
