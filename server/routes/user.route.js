const userRouter = require('express').Router();
const { loginUser, registerUser, getCurrentUser } = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

userRouter.post('/login', loginUser)
    .post('/register', registerUser)
    .get('/get-current-user', authMiddleware, getCurrentUser);

module.exports = userRouter;