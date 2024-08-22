const jwt = require('jsonwebtoken');
const usermodel = require('../models/usermodel');

const getUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).send('Please login first');
    }

    // Decode the token to get the user ID
    jwt.verify(token, 'secret', async (err, decoded) => {
      if (err) {
        return res.status(403).send('Invalid token');
      }
      else {

        try {
          const userId = decoded.userid;
          // console.log(userId)
          const user = await usermodel.findOne({ _id: userId }).exec();
          if (!user) {
            return res.status(404).json({ success: false, message: "No users found" });
          }
          res.status(200).json({ success: true, user });
        } catch (dbError) {
          console.log(dbError);
          res.status(500).json({ success: false, message: "Internal server error" });
        }
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = getUser;
