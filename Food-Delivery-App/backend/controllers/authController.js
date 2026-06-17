const bcrypt=require("bcrypt");
const User = require("../models/User");
const jwt=require("jsonwebtoken");
const signup=async (req,res)=>{
    try{
      const {name,email,password,role}=req.body;
      if(!name||!email||!password){
        return res.status(400).json({message:"Please add all fields"});
      }
      if(role!=="customer"&& role!="restuarant"){
        return res.status(400).json({message:"Role must be customer or restuarent"});
      }
     //exixting user
     

     //
     const hashedPassword= await bcrypt.hash(password,10);
     const user=await User.create({
        name,
        email,
        password:hashedPassword,
        role
     })
     res.status(201).json({message:"User registered successfully",users:user});


    }catch(err){
        console.log(err);
        res.status(500).json({message:"Server error while signing up",error:err})
    }

}
const login=async (req,res)=>{
    
  const {email,password}=req.body;

  try{
    const user=await User.findOne({email});
    if(!user){
        res.status(404).json({message:"User not found"})
    }
     const isMatch=await bcrypt.compare(password,user.password);
     if(!isMatch){
        return res.status(404).json({message:"Invalid Credential"});
     }
     const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1hr'})
     res.json({message:"Login Successful",token});
  }catch(err){
    console.log(err);
  }
 
};

module.exports={
    signup,login
}