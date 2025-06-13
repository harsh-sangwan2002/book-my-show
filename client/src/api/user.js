import { axiosInstance } from ".";

export const loginUser = async (payload) => {
    try {
        const response = await axiosInstance.post('/users/login', payload);
        return response;
    } catch (err) {
        return err;
    }
}

export const registerUser = async (payload) => {
    try {
        const response = await axiosInstance.post('/users/register', payload);
        return response;
    } catch (err) {
        return err;
    }
}

export const getCurrentUser = async (payload) => {
    try {
        const response = await axiosInstance.get('/users/get-current-user', payload);
        return response;
    } catch (err) {
        return err;
    }
}