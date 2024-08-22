const userModel=require('../models/usermodel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const create=async (req, res) => {
    const { fullname, email, password } = req.body;
    // console.log( { fullname, email, password })
    
    let user = await userModel.findOne({ email });
    if (user) {
        return res.status(500).send({success:false,massage:'account already exist'});
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            const userData = await userModel.create({ fullname, email, password: hash });
            const token =jwt.sign({email:email,userid:userData._id}, "secret");
            res.cookie('token',token);
            res.status(201).json({success:true,massage:'user registered successfully'})
        })
    });
}


module.exports=create;