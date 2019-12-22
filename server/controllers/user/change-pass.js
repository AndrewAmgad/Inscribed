const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

module.exports = (req, res, next) => {
    res.status(200).json({
        message: "You've reached the change password route!"
    })
}