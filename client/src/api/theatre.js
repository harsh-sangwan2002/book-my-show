import { axiosInstance } from '.';

export const addTheatre = async (values) => {
    try {
        console.log(values);
        const response = await axiosInstance.post('theatres/add', values);
        return response.data;
    } catch (error) {
        console.error('Error adding theatre:', error);
        throw error;
    }
}

export const getAllTheatres = async () => {
    try {
        const response = await axiosInstance.get('theatres/get-all-theatres');
        return response.data;
    } catch (error) {
        console.error('Error fetching theatres:', error);
        throw error;
    }
}

export const getAllTheatresByOwner = async (id) => {
    try {
        const response = await axiosInstance.get(`theatres/get-all-theatres/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching theatres for owner:', error);
        throw error;
    }
}

export const updateTheatre = async (theatreId, theatreData) => {
    try {
        const response = await axiosInstance.put(`theatres/update-theatre/${theatreId}`, theatreData);
        return response.data;
    } catch (error) {
        console.error('Error updating theatre:', error);
        throw error;
    }
}

export const deleteTheatre = async (theatreId) => {
    try {
        const response = await axiosInstance.delete(`theatres/delete-theatre/${theatreId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting theatre:', error);
        throw error;
    }
}