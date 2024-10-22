const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    // Check if the Authorization header exists
    if (!authHeader) {
        return res.status(400).json({ message: 'No token, authorization denied' });
    }

    // Extract the token and remove 'Bearer ' prefix
    const token = authHeader.replace('Bearer ', '');
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user info to the request
        console.log(req.user);
        next(); // Call next middleware
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
