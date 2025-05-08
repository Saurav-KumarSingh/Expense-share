const userModel = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const create = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        // console.log({ fullname, email, password } );

        
        // Generate profile picture URL
        const profilePic = `https://avatar.iran.liara.run/public?username=${fullname}`;
        
        // Check if the user already exists
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(409).send({ success: false, message: 'Account already exists' }); // 409 Conflict status code
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user in the database
        const newUser = await userModel.create({
            fullname,
            email,
            password: hashedPassword,
            profilepic: profilePic
        });

        // Generate JWT token
        const token = jwt.sign({ email: newUser.email, userid: newUser._id }, `${process.env.SCRET_KEY}`, { expiresIn: '1h' });

        // Set the token as an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: true, // Use secure cookies in production
            sameSite: 'None', // Set to 'Lax' or 'Strict' if appropriate
        }).status(201).json({ success: true, message: 'User registered successfully' });
        
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Server error' });
    }
};

module.exports = create;