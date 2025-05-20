import { axiosInstance } from ".";

export const loginUser = async (values) => {
    try {
        const response = await axiosInstance.post('/users/login', values);
        return response;
    } catch (err) {
        return err;
    }
}

export const registerUser = async (values) => {
    try {
        const response = await axiosInstance.post('/users/register', values);
        return response;
    } catch (err) {
        return err;
    }
}