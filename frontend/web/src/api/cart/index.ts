import axiosInstance from "../../utils/axiosInstance";

const getUserCart = async (userId: number) => {
    try {
        const response = await axiosInstance.get(`/api/cart/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error getting user cart:", error);
        throw error;
    }
};

export { getUserCart };
