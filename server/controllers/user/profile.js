const User = require('../../models/user');


module.exports = getProfile = (req, res, next) => {
    User.findById(req.userData.userId).then(user => {
        if(!user){
            return res.status(404).json({
                error: "User not found"
            });
        } else {
            res.status(200).json({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            });
        };
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};
