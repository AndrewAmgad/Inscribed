const jwt = require('jsonwebtoken');
const tokenBlacklist = require('../middleware/token-blacklist');

module.exports = (req, res, next) => {

    var token;
    // Check if the token is received from a cookie or sent through the authorization header.
    if (req.cookies.auth) {
        token = req.cookies.auth;
    } else if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        // Store the decrypted token in req
        req.userData = decoded;
        req.token = token;

        // Check if the token is blacklisted
        tokenBlacklist.redisClient.LRANGE(req.userData.userId, "-100", "100", (err, result) => {
            console.log("Check Blacklist Error: " + err);
            if (result) {
                console.log("Checking user's blacklist");
                for (var i = 0; i < result.length; i++) {
                    if (req.token === result[i]) {
                        if (!res.headersSent) {
                            console.log("Token has been blacklisted before")
                            req.blacklist = true;
                            return res.status(401).json({
                                error: "Auth failed"
                            });
                        };
                    };
                };
            };

            if (err) {
                res.status(400).json({
                    error: err
                });
            };

            console.log(req.blacklist)
            next();
        });

    } catch (error) {
        // Check if the user is authenticated using google OAuth
        if (!req.user) {
            return res.status(401).json({
                error: 'Auth failed'
            });
        } else {
            const userData = {
                userId: req.user.id,
                firstName: req.user.firstName,
                lastName: req.user.lastName
            }
            req.userData = userData
            next()
        }
        
    };

};
