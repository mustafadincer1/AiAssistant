const jwt = require('jsonwebtoken');

module.exports = function authStudent(req, res, next) {
    const token = req.header('auth-token');

    if (!token) return res.status(401).send("Access Denied");

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        console.log(req.user._role);
        if (req.user._role === "student") {
            console.log(1);
            next();
        } else {
            res.status(403).send("Access Denied");
        }
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
};
