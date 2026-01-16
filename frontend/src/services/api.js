import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/atk";

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Get all ATK items
export const getAllAtk = async () => {
    try {
        const response = await api.get("");
        return response.data;
    } catch (error) {
        console.error("Error fetching ATK data:", error);
        throw error;
    }
};

// Get single ATK item by ID
export const getAtkById = async (id) => {
    try {
        const response = await api.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ATK with id ${id}:`, error);
        throw error;
    }
};

// Create new ATK item
export const createAtk = async (atkData) => {
    try {
        const response = await api.post("", atkData);
        return response.data;
    } catch (error) {
        console.error("Error creating ATK:", error);
        if (
            error.response &&
            error.response.data &&
            error.response.data.detail
        ) {
            throw new Error(
                error.response.data.detail.error || "Gagal menambahkan data"
            );
        }
        throw error;
    }
};

// Update ATK item
export const updateAtk = async (id, atkData) => {
    try {
        const response = await api.put(`/${id}`, atkData);
        return response.data;
    } catch (error) {
        console.error(`Error updating ATK with id ${id}:`, error);
        if (
            error.response &&
            error.response.data &&
            error.response.data.detail
        ) {
            throw new Error(
                error.response.data.detail.error || "Gagal mengubah data"
            );
        }
        throw error;
    }
};

// Delete ATK item
export const deleteAtk = async (id) => {
    try {
        const response = await api.delete(`/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting ATK with id ${id}:`, error);
        if (
            error.response &&
            error.response.data &&
            error.response.data.detail
        ) {
            throw new Error(
                error.response.data.detail.error || "Gagal menghapus data"
            );
        }
        throw error;
    }
};

export default api;
