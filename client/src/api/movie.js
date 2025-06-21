import { axiosInstance } from '.'

export const getMovies = async (value) => {
    try {
        const response = await axiosInstance.get('/movies');
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}

export const addMovie = async (values) => {
    try {
        const response = await axiosInstance.post('/movies/add-movie', values);
        return response.data;
    } catch (error) {
        console.error('Error adding movie:', error);
        throw error;
    }
}

export const updateMovie = async (id, values) => {
    try {
        const response = await axiosInstance.put(`/movies/${id}`, values);
        return response.data;
    } catch (error) {
        console.error('Error updating movie:', error);
        throw error;
    }
}

export const deleteMovie = async (id) => {
    try {
        const response = await axiosInstance.delete(`/movies/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting movie:', error);
        throw error;
    }
}