import axiosInstance from "../../utils/axiosInstance";

const getUserNotifications = async (userId: number) => {
    try {
        const response = await axiosInstance.get(
            `/api/notifications/user/${userId}`,
        );
        return response.data;
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw error;
    }
};

export { getUserNotifications };
