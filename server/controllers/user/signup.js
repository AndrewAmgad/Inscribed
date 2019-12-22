const User = require('../../models/user');
const bcrypt = require('bcrypt');


// Checks if text matches a proper email format
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = signUp = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    // Search the database for the entered email, return an error if one exists.
    User.find({ email: email }).then(user => {
        var errors = {};
        var error = false

        // INPUTS VALIDATION

        if (user && user.length >= 1) {
            error = true;
            errors.email_error = "The entered email already exists";

        } else if (!validateEmail(email)) {
            error = true;
            errors.email_error = "The email format is incorrect";
        } else if(email.length > 200){
            error = true;
            errors.email_error = "This email is too long";
        }

        if (firstName === undefined || firstName === "") {
            error = true;
            errors.firstName_error = "Firstname is required";
        } else if (firstName.length > 10) {
            error = true;
            errors.firstName_error = "Firstname must not exceed 10 characters"
        }

        if (lastName === undefined || lastName === "") {
            error = true;
            errors.lastName_error = "Lastname is required"
        } else if (lastName.length > 10) {
            error = true;
            errors.lastName_error = "Last name must not exceed 10 characters"
        }

        // Checks if the entered password is less than 10 characters or more than 200 characters, generates an error if it is.
        if (password !== undefined) {
            if (password.length <= 10) {
                error = true;
                errors.password_error = "Password is too short";
            } else if (password.length > 200) {
                error = true;
                errors.password_error = "This password is too long"
            }
        } else if (password === undefined) {
            error = true;
            errors.password_error = "No password has been entered"
        }

        // Checks if an error exists and returns the error messages.
        if (error) {
            res.status(409).json({
                errors
            });
        } else {

            // Hash the received password for database storage
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {

                    return res.status(500).json({
                        error: err
                    });

                } else {

                    // Create a new user with the entered email and password
                    // and store them in the database.

                    const user = new User({
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                        password: hash
                    }).save()
                        .then(result => {
                            res.status(201).json({
                                registrated: true,
                                name: firstName + " " + lastName,
                                email: result.email
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
                };
            });
        }
    });

};
