const theatreRouter = require('express').Router();
const { addTheatre, getAllTheatres, getAllTheatresForAnOwner, updateTheatre, deleteTheatre } = require('../controllers/theatre.contoller');

theatreRouter.post('/add', addTheatre)
    .get('/get-all-theatres', getAllTheatres)
    .get('/get-all-theatres/:id', getAllTheatresForAnOwner)
    .put('/update-theatre/:id', updateTheatre)
    .delete('/delete-theatre/:id', deleteTheatre);

module.exports = theatreRouter;