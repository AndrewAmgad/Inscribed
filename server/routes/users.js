const express = require('express');
const router = express.Router();
const signUp = require('../controllers/user/signup');
const signIn = require('../controllers/user/signin');
const changePass = require('../controllers/user/change-pass');
const profile = require('../controllers/user/profile');
const checkAuth = require('../middleware/check-auth');
const blacklist = require('../middleware/token-blacklist');
const passport = require('passport');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/changepass', checkAuth, blacklist.blackListAll, changePass);
router.get('/profile', checkAuth, profile)

router.get('/logout', checkAuth, blacklist.blackListCurrent, (req, res, next) => {
    // Prevent error occuring when a header has already been sent with previous middlewares
    if (res.headersSent) {
     return null
 }
 req.logout();
 res.cookie('auth', "", { httpOnly: true, sameSite: false, secured: false});


 return res.status(200).json({
     message: "User logged out successfully"
 })
});




router.get('/checkauth', checkAuth, (req, res, next) => {
    return res.status(200).json({
        id: req.userData.userId,
        firstName: req.userData.firstName,
        lastName: req.userData.lastName,
        authenticated: true
    })
});


router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log("Signed in using google");
    res.redirect('https://inscribed.herokuapp.com/home')
})



module.exports = router;