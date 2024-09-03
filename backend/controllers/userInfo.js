const jwt = require('jsonwebtoken');
const usermodel = require('../models/usermodel');

const getUser = async (req, res) => {
    try {
        const user = await usermodel.findOne({ _id:req.user }).exec();
                if (!user) {
                    return res.status(404).json({ success: false, message: "No users found" });
                }

                // Send user data in the desired format
                res.status(200).json({ success: true, user, message: 'User fetched successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = getUser;
