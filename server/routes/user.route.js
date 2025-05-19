const userRouter = require('express').Router();
const { loginUser, registerUser, getAllUsers } = require('../controllers/user.controller');

userRouter.post('/login', loginUser)
    .post('/register', registerUser)
    .get('/', getAllUsers);

module.exports = userRouter;