const Users = require("../models/Users");


const getUsers=async (req,res)=>{
  try{
       const newUsers=await Users.find();
       res.send(newUsers)
    }catch(err){
        console.log(err)
    }
}
const addNewUsers=async (req,res)=>{
    const {name,email,age}=req.body;

    try{
       const newUsers=await Users.create({name,email,age});
       res.send({message:"User Created",newUsers})
    }catch(err){
        console.log(err)
    }
}

module.exports={
    addNewUsers,
    getUsers
}