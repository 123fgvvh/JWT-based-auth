const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model to interact with the database

// Middleware function to require authentication for protected routes
const requireAuth = (req, res, next) => {
    // Retrieve the JWT from cookies
    const token = req.cookies.jwt;  // Ensure req.cookies is used to access cookies

    // Check if the JSON Web Token exists
    if (token) {
        // Verify the token using the secret key ("mysecretkey")
        jwt.verify(token, "mysecretkey", (err, decodedToken) => {
            // If there is an error (e.g., token is invalid or expired)
            if (err) {
                // Respond with a 401 status and error message (unauthorized)
                res.status(401).json({ msg: "Token is not valid" });

                // Redirect the user to the login page
                res.redirect('/login');
            } else {
                // If the token is valid, log the decoded token (for debugging purposes)
                console.log(decodedToken);

                // Proceed to the next middleware or route handler
                next();
            }
        });
    } else {
        // If no token is found, redirect the user to the login page
        res.redirect('/login');
    }
};
//////////////////////////////////////////////////////////////////////////
// Middleware to check the current user and set it for views
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    // Check if a valid JWT exists
    if (token) {
        jwt.verify(token, "mysecretkey", async (err, decodedToken) => {
            if (err) {
                // If token is invalid, set the user to null
                res.locals.user = null;
                next();
            } else {
                // If token is valid, find the user by ID (assuming decodedToken contains user ID)
                try {
                    const user = await User.findById(decodedToken.id);
                    res.locals.user = user;  // Make the user data available to views
                    next();
                } catch (error) {
                    console.log(error);
                    res.locals.user = null;
                    next();
                }
            }
        });
    } else {
        // If no token is present, set the user to null
        res.locals.user = null;
        next();
    }
};

module.exports = { requireAuth, checkUser };
