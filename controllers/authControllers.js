const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: "", password: "" };

    if (err.code === 11000) {
        errors.email = "That email is already registered";
        return errors;
    }

    // Validation errors
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    // Incorrect email or password error (assuming custom error messages for incorrect login)
    if (err.message === "Incorrect email") {
        errors.email = "That email is not registered";
    }

    if (err.message === "Incorrect password") {
        errors.password = "That password is incorrect";
    }

    return errors;
};

// JWT token creation
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, "mysecretkey", {
        expiresIn: maxAge
    });
};

// Controllers
module.exports.signup_get = (req, res) => {
    res.render('signup');
};

module.exports.login_get = (req, res) => {
    res.render('login');
};

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

// Complete login_post function with JWT
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check for user email and password (assuming User model has a login static method)
        const user = await User.login(email, password);

        // If successful, create a JWT token
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    } catch (err) {
        // Handle any errors, like incorrect email or password
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.logout_get = (req,res)=>{
    res.clearCookie('jwt');
    res.redirect('/');
}
