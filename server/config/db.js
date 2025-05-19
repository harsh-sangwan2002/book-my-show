const mongoose = require('mongoose');
const url = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

module.exports = connectDB;