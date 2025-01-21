const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secret_key';

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Authorization token required' });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach user data to the request
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
