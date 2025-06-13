const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verifiedToken.id;
        next();
    } catch (err) {
        res.status(401).json({
            message: "Token is invalid",
            success: false,
        })
    }
}

module.exports = authMiddleware