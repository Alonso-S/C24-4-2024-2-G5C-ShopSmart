import axiosInstance from "../../utils/axiosInstance";

const getRecentPurchases = async (id: number) => {
    try {
        const response = await axiosInstance.get(`/api/purchases/recent/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getAllPurchases = async (userId: number) => {
    try {
        const response = await axiosInstance.get(`/api/purchases/${userId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { getAllPurchases, getRecentPurchases };
