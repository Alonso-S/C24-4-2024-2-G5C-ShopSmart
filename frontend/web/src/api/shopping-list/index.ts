import axiosInstance from "../../utils/axiosInstance";

const getLatestShoppingLists = async (userId: number) => {
    try {
        const response = await axiosInstance.get(
            `/api/shopping-lists/user/${userId}/latest`,
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getUserLists = async (userId: number) => {
    try {
        const response = await axiosInstance.get(
            `/api/shopping-lists/user/${userId}`,
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { getLatestShoppingLists, getUserLists };
