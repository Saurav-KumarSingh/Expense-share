const jwt = require('jsonwebtoken');
const usermodel = require('../models/usermodel');

const isLoggedin = async (req, res, next) => {
    try {
        // Extract the token from cookies
        const token = req.cookies.token;

        // Check if token exists
        if (!token) {
            return res.status(403).json({ message: 'Access denied, Please login first' });
        }

        // Verify and decode the token
        jwt.verify(token, 'secret', async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token, Please login again' });
            }

            // Retrieve the user ID from the decoded token
            const userId = decoded.userid;

            // Fetch the user from the database
            const user = await usermodel.findById(userId);
            if (!user) {
                return res.status(404).json({ success: false, message: 'No users found' });
            }

            // Attach the user to the request object for future use in other routes
            req.user = user;

            // Proceed to the next middleware or route handler
            next();
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = isLoggedin;
