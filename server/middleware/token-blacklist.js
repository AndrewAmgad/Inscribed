const User = require('../models/user');
var schedule = require('node-schedule');
const jwt = require('jsonwebtoken');
var redis = require('redis');

var redisClient = redis.createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD
});

redisClient.on('connect', function () {
    console.log('Redis client connected');
});

redisClient.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

module.exports.redisClient = redisClient;


// This function should be called when the user decides to log out.
// THESE FUNCTIONS MUST BE CALLED AFTER CHECKAUTH, THEY WILLL NOT WORK OTHERWISE.
module.exports.blackListCurrent = (req, res, next) => {

    // Blacklist the current token of a user

    redisClient.LPUSH(req.userData.userId, req.token, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err
            });
        };
    });

    // Remove the token from the activeSessions array in the database
    
    User.findByIdAndUpdate(req.userData.userId, { $pull: { activeSessions: req.token } })
        .then(result => {
            console.log("Token removed from database")
        })
    console.log("Token blacklisted")
    next();

};

// This function can be called when the user decides to change the password
// or force-logout all users in case of a suspected breach.
module.exports.blackListAll = (req, res, next) => {
    User.findById(req.userData.userId)
        .then(user => {
            for (var i = 0; i < user.activeSessions.length; i++) {
                redisClient.LPUSH(req.userData.userId, user.activeSessions[i]);
            }
        })
    redisClient.LRANGE(req.userData.userId, "-100", "100", (err, result) => {
        console.log(result);
    })
    next();
}


// Loop through all of the blacklisted tokens and check if they're past their valid period, delete them to save storage.
module.exports.clearBlackList = () => {
    var tokens = []
    schedule.scheduleJob('30 48 22 * * *', () => {
    User.find().cursor().eachAsync(async (user) => {

        // Convert the ID object to a string for Redis to understand
        const id = user._id.toString();
        console.log("USER_ID: ", id);

        // Search Redis storage for blacklisted tokens corresponding to the user's ID
        redisClient.LRANGE(id, "-100", "100", (err, result) => {
            console.log("Error: " + err);

            if (result) {
                console.log("Initiating Loop on user's blacklisted tokens")
                // Loop through the stored tokens and remove them if they're past their expiry date

                for (var i = 0; i < result.length; i++) {
                    console.log("BEFORE_REM: ", result);

                    try {
                        jwt.verify(result[i], process.env.JWT_KEY);
                        console.log("Token is still active, no removal");
                    }

                    catch (error) {
                        console.log("TOKEN WILL BE REMOVED FROM REDIS STORE");

                        // Push expired token to the tokens array
                        tokens.push({
                            token: result[i]
                        })

                        redisClient.LREM(id, "-1", result[i]);
                        redisClient.LRANGE(id, "-100", "100", (err, result) => {
                        });

                    };
                };
            };
        });
    })
    
    
    .then(() => {
        // Push the tokens array to the expiredTokens collection
        if (tokens.length >= 1) {
            ExpiredToken.collection.insertMany(tokens, (err, docs) => {
                if (err) {
                    return console.error(err);
                } else {
                    console.log("Documents inserted to the collection")
                }
            })
        }
            

        });
    });
};

