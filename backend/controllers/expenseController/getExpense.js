
const usermodel = require('../../models/usermodel');

const getExpense = async (req, res) => {
    try {
        const user = await usermodel.findOne({ _id:req.user }).populate({
            path: "groupName",  // Populate groupName field
            // populate: {
            //     path: "members",  // Within groupName, populate the members field
            //     model: "User"     // Assuming "User" is the name of the user model
            // }
        });
                if (!user) {
                    return res.status(404).json({ success: false, message: "No users found" });
                }

                // Send user data in the desired format
                res.status(200).json({ success: true, user:user.groupName, message: 'User fetched successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = getExpense;
