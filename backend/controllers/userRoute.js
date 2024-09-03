const userModel=require('../models/usermodel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const create=async (req, res) => {
    const { fullname, email, password } = req.body;
    // console.log( { fullname, email, password })
    const profilePic=`https://avatar.iran.liara.run/public?username=${fullname}`
    
    let user = await userModel.findOne({ email });
    if (user) {
        return res.status(500).send({success:false,message:'account already exist'});
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            const userData = await userModel.create({ fullname, email, password: hash ,profilepic:profilePic});
            const token =jwt.sign({email:email,userid:userData._id}, "secret");
            res.cookie('token',token);
            res.status(201).json({success:true,message:'user registered successfully'})
        })
    });
}


module.exports=create;