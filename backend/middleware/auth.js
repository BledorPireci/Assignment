const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'].split(" ")[1];

    if (token == null) {
        return res.status(403).json({
            msg: 'No token, authorization denied',
        });
    }
    jwt.verify(token, "secret", (err, user) => {
        if (err) {
            return res.status(403).json({
                msg: 'Token is not valid',
            });
        }
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };