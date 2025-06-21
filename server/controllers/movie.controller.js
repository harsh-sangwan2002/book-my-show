const movieModel = require('../models/movie.model');

const addMovie = async (req, res) => {

    try {
        const newMovie = movieModel(req.body);
        await newMovie.save();

        res.status(200).json({
            message: "Movie added successfully",
            data: newMovie,
        });
    } catch (err) {
        res.status(500).json({
            message: "Error adding movie",
            error: err.message,
        })
    }
}

const getAllMovies = async (req, res) => {

    try {

        const movies = await movieModel.find({});
        res.status(200).json({
            message: "Movies fetched successfully",
            data: movies,
        });
    } catch (err) {
        res.status(500).json({
            message: "Error fetching movies",
            error: err.message,
        })
    }
}

const updateMovie = async (req, res) => {
    try {

        const updatedMovie = await movieModel.findByIdAndUpdate(req.params.id, req.body);
        if (!updateMovie)
            return res.status(404).json({
                message: "Movie not found",
            });
        res.status(200).json({
            message: "Movie updated successfully",
            data: updatedMovie,
        })
    } catch (err) {
        res.status(500).json({
            message: "Error updating movie",
            error: err.message,
        })
    }
}

const deleteMovie = async (req, res) => {
    try {
        await movieModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Movie deleted successfully",
        })
    } catch (err) {
        res.status(500).json({
            message: "Error deleting movie",
            error: err.message,
        })
    }
}

module.exports = {
    addMovie,
    getAllMovies,
    updateMovie,
    deleteMovie
}