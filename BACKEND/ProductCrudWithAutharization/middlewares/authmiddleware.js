const jwt=require("jsonwebtoken");
require('dotenv').config();
const JWT_SECRET=process.env.JWT_SECRET;

const authMiddleWare=(req,res,next)=>{
    const authHeader=req.headers["authorization"];
    const token=authHeader && authHeader.split(" ")[1];
     if(!token){
        res.status(401).json({message:"No token provided"});
    }
    console.log("token--->",token);
    try{
        const decoded=jwt.verify(token,JWT_SECRET);
        console.log(decoded,"decoded value")
        req.user=decoded;
        next()
    }catch(err){
        res.status(401).json({message:"Invalid token",error:err});
    }
   }
module.exports=authMiddleWare;