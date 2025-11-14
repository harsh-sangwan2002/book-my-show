const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
        const flag = bcrypt.compareSync(password, user.password);

        if (!user || !flag) {
            return res.status(404).json({
                message: "Invalid credentials",
                success: false,
            });
        }

        const { password: _, ...userData } = user._doc;
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d', });
        return res.status(200).json({
            message: "Login successful",
            success: true,
            user: userData,
            token,
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
        let { name, email, password, role, isAdmin } = req.body;

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

        const hashedPassword = await bcrypt.hash(password, 10);
        password = hashedPassword;

        const newUser = await userModel.create({
            name,
            email,
            password,
            role: role || 'user',
            isAdmin: isAdmin || false,
        });

        const { ...userData } = newUser._doc;
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

const getCurrentUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select('-password');
        res.send({
            success: true,
            message: "User details fetched successfully",
            data: user,
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
    getCurrentUser,
}