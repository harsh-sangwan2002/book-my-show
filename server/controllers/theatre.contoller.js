const theatreModel = require('../models/theatre.model');

const addTheatre = async (req, res) => {
    try {
        const newTheatre = theatreModel(req.body);
        await newTheatre.save();

        await newTheatre.save();
        res.status(201).json({
            success: true,
            message: 'Theatre added successfully',
            theatre: newTheatre
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error while adding a theatre'
        });
    }
}

const updateTheatre = async (req, res) => {
    try {

        const theatreExists = await theatreModel.findById(req.params.id);
        if (!theatreExists) {
            return res.status(404).json({
                success: false,
                message: 'Theatre not found'
            });
        }

        const theatre = await theatreModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: 'Theatre updated successfully',
            theatre
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error while updating theatre'
        });
    }
}

const getAllTheatres = async (req, res) => {
    try {
        const theatres = await theatreModel.find().populate('owner');
        if (!theatres || theatres.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No theatres found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Theatres fetched successfully',
            data: theatres
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error while fetching theatres'
        });
    }
}

const getAllTheatresForAnOwner = async (req, res) => {
    try {
        const theatres = await theatreModel.find({ owner: req.params.id });
        if (!theatres || theatres.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No theatres found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Theatres fetched successfully',
            data: theatres
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error while fetching theatres'
        });
    }
}


const deleteTheatre = async (req, res) => {
    try {
        const theatreExists = await theatreModel.findById(req.params.id);
        if (!theatreExists) {
            return res.status(404).json({
                success: false,
                message: 'Theatre not found'
            });
        }

        await theatreModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Theatre deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error while deleting theatre'
        });
    }
}

module.exports = {
    addTheatre,
    getAllTheatres,
    getAllTheatresForAnOwner,
    updateTheatre,
    deleteTheatre
}