const movieRouter = require('express').Router();

const movieModel = require('../models/movie.model');
const { addMovie, getAllMovies, updateMovie, deleteMovie } = require('../controllers/movie.controller');

movieRouter.get('/', getAllMovies)
    .post('/add-movie', addMovie)
    .put('/:id', updateMovie)
    .delete('/:id', deleteMovie);

module.exports = movieRouter;