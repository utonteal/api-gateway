const jwt = require('jsonwebtoken');
const secretKey = 'PHCENTRAL';

const verifyToken = function (req, res, next) {
    if (req.path == "/phcentral/login") {
        next();
        return;
    }

    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token.' });
        }
        // req.user = decoded;
        console.log(decoded);
        next();
    });
}


module.exports = {
    verifyToken
}
