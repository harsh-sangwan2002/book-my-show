const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// parse incoming requests with JSON payloads
app.use(express.json());
app.use(cors());

const connectDB = require('./config/db');
const userRouter = require('./routes/user.route');

app.use('/api/users', userRouter);

app.listen(3000, async () => {
    console.log("Server is running on port 3000");
    await connectDB();
})