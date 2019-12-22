const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = signIn = (req, res, next) => {
    console.log(req.cookies)
    const email = req.body.email;
    const password = req.body.password
    User.findOne({ email: email }).then(user => {
        if (!user) {
            return res.status(401).json({
                error: "This email entered does not exist"
            });
        } else {
            // Hash the entered password
            bcrypt.compare(password, user.password, (err, result) => {
                if (!result) {
                    res.status(401).json({
                        error: "The password you entered is invalid"
                    });

                } else {
                    // Generate the JWT token
                    const token = jwt.sign({
                        email: user.email,
                        userId: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "7d"
                        });

                    // CHANGE SECURED TO TRUE BEFORE PRODUCTION & HTTPS
                    res.cookie('auth', token, { httpOnly: true, sameSite: false, secured: false, expires: new Date(Date.now() + 604800000)});

                    // Loop through the user's previous tokens, delete them if they're past their expiry date.
                    for (var i = 0; i < user.activeSessions.length; i++) {
                        try {
                            jwt.verify(user.activeSessions[i], process.env.JWT_KEY);
                            console.log("Token is active, no removal.")
                        }
                        catch(error){
                            User.findByIdAndUpdate(user._id, {$pull: {activeSessions: user.activeSessions[i]}})
                            .then(result => {
                                console.log("Token removed")
                            })
                        }
                    }

                    // Add token to the user's list of active tokens
                    User.findByIdAndUpdate(user._id, {$push: {activeSessions: token}}, {new: true}).then(result => {
                        console.log("New token added to database");
                    });

                    res.status(200).json({
                        authenticated: true,
                        message: 'Auth Successful',
                        token: token,
                    });
                };
            });
        };
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });;
};