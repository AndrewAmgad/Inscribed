const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20");
const User = require('../models/user');
// This function is called automatically once done() is reached within passport.use
passport.serializeUser((user, done) => {
    // null represents an error, it's gonna be null since there's a user getting passed anyways
    // and we're certain there's no error
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        // Done attaches user to req.user
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    // options for the strategy
    callbackURL: '/user/google/redirect',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }).then((currentUser) => {
        console.log("reached")
        if (currentUser) {
            done(null, currentUser);
        } else {
            new User({
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                googleId: profile.id
            }).save().then((newUser) => {
                console.log("new user created");
                done(null, newUser);
            });
        }
    });
}));