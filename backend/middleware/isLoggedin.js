const jwt = require('jsonwebtoken');
const usermodel = require('../models/usermodel');

const isLoggedin = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(403).json({message:'Access denied, Please login first'});
        }

        // Decode the token to get the user ID
        jwt.verify(token, 'secret', async (err, decoded) => {
            if (err) {
                return res.status(403).send('Invalid token');
            }

            try {
                const userId = decoded.userid;
                const user = await usermodel.findOne({ _id: userId }).exec();
                if (!user) {
                    return res.status(404).json({ success: false, message: "No users found" });
                }

                // Attach user to request object if you need to access it later in other routes
                req.user=user._id
                // Now we can proceed to the next middleware or route handler
                next();
            } catch (dbError) {
                console.log(dbError);
                res.status(501).json({ success: false, message: "Internal server error" });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = isLoggedin;
