const userModel=require('../models/usermodel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const login=  async (req, res) => {
    const {  email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
        return res.status(500).json({massage:"User doesn't exist,please create account first",success:false});
    }
    bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            const token=jwt.sign({email},"secret");
            res.cookie('token',token);
            res.status(200).json({massage:'Successfully loged in',success:true})
        }else{
            res.status(500).json({massage:"User doesn't exist,please create account first",success:false});
        }
    });

}

module.exports=login