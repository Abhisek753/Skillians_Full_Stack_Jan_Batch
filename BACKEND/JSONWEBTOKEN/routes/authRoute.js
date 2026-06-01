const express=require("express");
const User = require("../models/User");
const router=express.Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const JWT_SECRET=process.env.JWT_SECRET;
router.post("/register",async (req,res)=>{
  
    const {username,role,password}=req.body;
    
    try{
        const hashed=await bcrypt.hash(password,10);
        const user=await User.create({username,role,password:hashed});
        res.status(201).json({message:"User registered",user:user});
    }catch(err){
        res.status(400).json({message:"User registration failed",error:err})
    }
});

router.post("/login",async(req,res)=>{
  const {username,password}=req.body;

  try{
    const user=await User.findOne({username});
    if(!user){
        res.status(404).json({message:"User not found"})
    }
     const isMatch=await bcrypt.compare(password,user.password);
    //  console.log(isMatch,"88888");
     if(!isMatch){
        return res.status(404).json({message:"Invalid Credential"});
     }
     const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1hr'})
     res.json({message:"Login Successful",token})
  }catch(err){
    console.log(err)
  }
 
 
 
});

module.exports=router;