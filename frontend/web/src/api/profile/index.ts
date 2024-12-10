import UserProfile from "../../types/UserProfile";
import axiosInstance from "../../utils/axiosInstance";

const getUserData = async () => {
    try {
        const response = await axiosInstance.get("/api/profile/public-info");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getUserProfile = async () => {
    try {
        const response = await axiosInstance.get("/api/profile/full-info");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateUserProfile = async (profileData: UserProfile) => {
    try {
        const response = await axiosInstance.put("/api/profile", profileData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { getUserData, getUserProfile, updateUserProfile };
