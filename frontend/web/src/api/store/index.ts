import axiosInstance from "../../utils/axiosInstance";

const getStores = async () => {
    try {
        const response = await axiosInstance.get("/api/stores");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getStoresWithLowestPrices = async (productId: number) => {
    try {
        const response = await axiosInstance.get(
            `/api/stores/lowest-prices/${productId}`,
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { getStores, getStoresWithLowestPrices };
