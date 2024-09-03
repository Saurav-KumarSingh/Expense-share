const jwt = require('jsonwebtoken');
const usermodel = require('../models/usermodel');

const getUsers = async (req, res) => {
    try {
        const current =req.user;
        const users = await usermodel.find({_id:{$ne:current}}).exec();
        // console.log(users)
               
        res.status(200).json({ success: true, users, message: 'User fetched successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = getUsers;
