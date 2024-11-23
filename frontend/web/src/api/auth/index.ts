import axiosInstance from "../../utils/axiosInstance";
import User from "../../types/UserDTO";
import axios from "axios";

interface AuthLoginParams {
    email: string;
    password: string;
}

const loginUser = async ({ email, password }: AuthLoginParams) => {
    try {
        const response = await axiosInstance.post(
            "/auth/login",
            { email, password },
        );
        console.log(response);
        console.log(response.data);
    } catch (err) {
        if (axios.isAxiosError(err)) {
            throw new Error(err.response?.data?.message || "Failed to login");
        }
        throw new Error("Failed to login");
    }
};

const registerUser = async (user: User) => {
    try {
        const response = await axiosInstance.post(
            "/auth/register",
            user,
        );
        console.log(response);
        console.log(response.data);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const logoutUser = async () => {
    const response = await axiosInstance.post(
        "/auth/logout",
    );
    return response;
};

const verifyToken = async () => {
    try {
        await axios.get(
            "/auth/validate-token",
        );
    } catch (err) {
        if (axios.isAxiosError(err)) {
            throw new Error(
                err.response?.data?.message || "Failed to validate",
            );
        }
        throw new Error("Failed to validate");
    }
};

export { loginUser, logoutUser, registerUser, verifyToken };
