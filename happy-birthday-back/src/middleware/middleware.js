const jwt = require('jsonwebtoken');

// Middleware de vérification du token
const verifyToken = (req, res, next) => {
    const token = req.header('authorization')?.split(' ')[1];
    console.log(req.header('authorisation')?.split(' ')[1])
    if (!token) {
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, "M4f56OiT87G2hM6A9");
        console.log(decoded.role)
        if (decoded.role === 0){
            next();
        }
    } catch (ex) {
        res.status(400).json({ success: false, message: 'Invalid token.' });
    }
};

module.exports = verifyToken;
