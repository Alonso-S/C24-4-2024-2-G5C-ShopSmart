import axiosInstance from "../../utils/axiosInstance";

const getProductRecommendations = async (userId: number) => {
    try {
        const response = await axiosInstance.get(
            `/api/recommendations/user/${userId}`,
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { getProductRecommendations };
