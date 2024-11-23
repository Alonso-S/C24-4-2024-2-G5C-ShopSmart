import axiosInstance from "../../utils/axiosInstance";
import User from "../../types/UserDTO";
import axios from "axios";

interface AuthLoginParams {
    email: string;
    password: string;
}

const loginUser = async ({ email, password }: AuthLoginParams) => {
    try {
        const response = await axiosInstance.post("/auth/login", {
            email,
            password,
        });
        console.log(response);
        console.log(response.data);
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const message = err.response?.data?.message ||
                "Failed to log in. Please check your credentials.";
            const statusCode = err.response?.status;
            throw new Error(`Login error (status ${statusCode}): ${message}`);
        }
        throw new Error("Unexpected error occurred while logging in.");
    }
};

const registerUser = async (user: User) => {
    try {
        const response = await axiosInstance.post("/auth/register", user);
        console.log(response);
        console.log(response.data);
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const message = err.response?.data?.message ||
                "Failed to register the user. Please try again.";
            const statusCode = err.response?.status;
            throw new Error(
                `Registration error (status ${statusCode}): ${message}`,
            );
        }
        throw new Error(
            "Unexpected error occurred while registering the user.",
        );
    }
};

const logoutUser = async () => {
    try {
        const response = await axiosInstance.post("/auth/logout");
        console.log(response);
        return response;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const message = err.response?.data?.message ||
                "Failed to log out. Please try again.";
            const statusCode = err.response?.status;
            throw new Error(`Logout error (status ${statusCode}): ${message}`);
        }
        throw new Error("Unexpected error occurred while logging out.");
    }
};

const verifyToken = async () => {
    try {
        await axios.get("/auth/validate-token");
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const message = err.response?.data?.message ||
                "Failed to validate token. Please try again.";
            const statusCode = err.response?.status;
            throw new Error(
                `Token validation error (status ${statusCode}): ${message}`,
            );
        }
        throw new Error(
            "Unexpected error occurred while validating the token.",
        );
    }
};

const refreshToken = async () => {
    try {
        await axios.post("/auth/refresh-token");
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const message = err.response?.data?.message ||
                "Failed to refresh token. Please try again.";
            const statusCode = err.response?.status;
            throw new Error(
                `Token refresh error (status ${statusCode}): ${message}`,
            );
        }
        throw new Error(
            "Unexpected error occurred while refreshing the token.",
        );
    }
};

export { loginUser, logoutUser, refreshToken, registerUser, verifyToken };
