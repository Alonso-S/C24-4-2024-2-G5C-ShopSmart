import UserProfile from "../../types/UserProfile";
import axiosInstance from "../../utils/axiosInstance";

const getUserProfile = async () => {
    try {
        const response = await axiosInstance.get("/api/profile");
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
export { getUserProfile, updateUserProfile };
