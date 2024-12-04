import { createContext } from "react";
import UserDTO from "../../types/UserDTO";

interface AuthContextType {
    isAuthenticated: boolean;
    authLogin: (email: string, password: string) => Promise<void>;
    authLogout: () => void;
    authRegister: (user: UserDTO) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    authLogin: async () => {},
    authLogout: async () => {},
    authRegister: async () => {},
});

export default AuthContext;
