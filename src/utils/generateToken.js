const jwt = require('jsonwebtoken')

const generateToken =(res,userId)=>{
    const token =jwt.sign({userId},process.env.JWT_SECRET_KEY,{
        expiresIn:"10d",
    });
    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !== "development",
        samesite:"strict",
        maxAge:86400000,
    })
};

module.exports=generateToken;