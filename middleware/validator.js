
function authenticateToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    if (token !== apiToken) {
        return res.status(403).json({ message: 'Access denied. Invalid token.' });
    }

    next();
}

module.exports = {
    authenticateToken,
}