const express = require('express');
require('dotenv').config();
const app = express();

app.use(express.json());

const connectDB = require('./config/db');
const userRouter = require('./routes/user.route');

app.use('/api/users', userRouter);

app.listen(3000, async () => {
    console.log("Server is running on port 3000");
    await connectDB();
})