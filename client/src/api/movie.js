import { axiosInstance } from ".";

export const getAllMovies = async () => {
    try {
        const response = await axiosInstance.get("/movies/get-all-movies");
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const addMovie = async (payload) => {
    try {
        const response = await axiosInstance.post("/movies/add-movie", payload);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const updateMovie = async (movieId, payload) => {
    try {
        const response = await axiosInstance.put(`/movies/update-movie/${movieId}`, payload);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const deleteMovie = async (movieId) => {
    try {
        const response = await axiosInstance.delete(`/movies/delete-movie/${movieId}`);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};