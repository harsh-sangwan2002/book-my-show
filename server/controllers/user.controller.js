const userModel = require('../models/user.model');

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        const user = await userModel.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(404).json({
                message: "Invalid credentials",
                success: false,
            });
        }

        const { password: _, ...userData } = user._doc;
        return res.status(200).json({
            message: "Login successful",
            success: true,
            user: userData,
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

const registerUser = async (req, res) => {

    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false,
            });
        }

        const newUser = await userModel.create({
            name,
            email,
            password,
            role: role || 'user',
        });
        const { password: _, ...userData } = newUser._doc;
        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            user: userData,
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        return res.status(200).json({
            message: "Users fetched successfully",
            success: true,
            users,
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

module.exports = {
    loginUser,
    registerUser,
    getAllUsers,
}