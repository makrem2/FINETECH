const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secret_key';

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']; // Get token from the request header
    if (!token) {
        return res.status(401).json({ message: 'Authorization token required' });
    }
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY); // Verify and decode
        req.user = decoded; // Attach decoded user data to the request
        next(); // Proceed to the next middleware/route
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
