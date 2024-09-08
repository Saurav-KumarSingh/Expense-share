const userModel=require('../models/usermodel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const login=  async (req, res) => {
    const {  email, password } = req.body;
    // console.log({  email, password })
    let user = await userModel.findOne({ email });
    if (!user) {
        return res.status(500).json({message:"User doesn't exist,please create account first",success:false});
    }
    bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            const token=jwt.sign({email,userid:user._id},"secret");
            
            res.status(200).cookie('token',token).json({message:'Successfully loged in',success:true})
        }else{
            res.status(500).json({message:"User doesn't exist,please create account first",success:false});
        }
    });

}

module.exports=login