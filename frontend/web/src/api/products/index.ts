// src/api.ts

import axiosInstance from "../../utils/axiosInstance";

const getProductWithStores = async (productId: number) => {
    try {
        const response = await axiosInstance.get(`/api/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw error;
    }
};
const getDetailProduct = async (productId: number) => {
    try {
        const response = await axiosInstance.get(`/api/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los detalles del producto:", error);
        throw error;
    }
};

const getProductIdBySearchTerm = async (
    searchTerm: string,
) => {
    try {
        const response = await axiosInstance.get(`/api/products/search`, {
            params: { searchTerm },
        });
        return response.data;
    } catch (error) {
        console.error("Error al buscar productos:", error);
        throw error;
    }
};

export { getDetailProduct, getProductIdBySearchTerm, getProductWithStores };
