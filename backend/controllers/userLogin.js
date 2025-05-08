const userModel = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        let user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User doesn't exist, please create an account first", success: false });
        }

        // Compare provided password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password, please try again", success: false });
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.email, userid: user._id }, `${process.env.SCRET_KEY}`, { expiresIn: '1h' });

        // Set the token as an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: true, // Use in production with HTTPS
            sameSite: 'None', // Adjust as needed
        }).status(200).json({ message: 'Successfully logged in', success: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', success: false });
    }
};

module.exports = login;
