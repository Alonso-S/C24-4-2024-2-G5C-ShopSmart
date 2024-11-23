import { ReactNode, useCallback, useEffect, useMemo, useReducer } from "react";
import authReducer from "./AuthReducer";
import AuthContext from "./AuthContext";
import {
    loginUser,
    logoutUser,
    refreshToken,
    registerUser,
    verifyToken,
} from "../../api/auth/index";
import User from "../../types/UserDTO";
import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_REFRESH_TOKEN,
    AUTH_REGISTER,
    AUTH_VERIFY_TOKEN,
} from "./Actions";
import axios from "axios";
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
            setAuthenticated(AUTH_LOGIN, true);
        } catch (err) {
            console.error("Login error: ", err);
            throw new Error(
                err instanceof Error ? err.message : "Failed to login",
            );
        }
    }, []);

    const authLogout = useCallback(async () => {
        try {
            await logoutUser();
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
            console.log("Usuario registrado correctamente");
        } catch (err) {
            console.error(err);
            throw new Error("Error al registrar el usuario");
        }
    }, []);

    const authVerifyToken = useCallback(async () => {
        try {
            // Verificar si el token es válido
            await verifyToken(); // Llamada para verificar si el token es válido
            setAuthenticated(AUTH_VERIFY_TOKEN, true); // Si es válido, usuario autenticado
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const statusCode = err.response?.status;
                // Si el token es inválido (código 401), intentamos refrescarlo
                if (statusCode === 401) {
                    try {
                        await refreshToken(); // Intentamos refrescar el token
                        setAuthenticated(AUTH_REFRESH_TOKEN, true); // Si se refresca correctamente, autenticamos
                    } catch (refreshError) {
                        // Si el refresco falla, cerramos la sesión
                        console.error("Error refreshing token: ", refreshError);
                        setAuthenticated(AUTH_REFRESH_TOKEN, false);
                        console.log(
                            "Refresh token expired, please log in again.",
                        );
                    }
                } else {
                    // Si el error no es de tipo 401, se considera un error no esperado
                    console.error("Error verifying token: ", err);
                    setAuthenticated(AUTH_VERIFY_TOKEN, false);
                }
            } else {
                // Si no es un error de Axios, se captura el error genérico
                console.error("Unexpected error verifying token: ", err);
                setAuthenticated(AUTH_VERIFY_TOKEN, false);
            }
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

    useEffect(() => {
        const verifyAndRefreshToken = async () => {
            await authVerifyToken();
        };
        verifyAndRefreshToken();
    }, [authVerifyToken]);

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
