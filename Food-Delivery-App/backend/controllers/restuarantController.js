const Restuarant=require("../models/Restuarant");

const createRestuarant=async (req,res)=>{
    try{
      const {name,address,image,description}=req.body;
      if(!name || !address){
        return res.status(400).json({message:"Please add name and address"})
      }
      const restuarant=await Restuarant.create({
        name,
        address,
        image:image||"",
        description:description||"",
        ownerId:req.user._id,
      });
      res.status(201).json(restuarant);

    }catch(err){
      res.status(500).json({message:"Server error while creating restuarant"});
    }
}

const getRestuarant=async (req,res)=>{
    try{
      const restuarant=await Restuarant.find().populate("ownerId","name email");
      res.json(restuarant)
    }catch(err){
       res.status(500).json({message:"Server error while fetching restuarant"});
    }
}
const getRestuarantById=async (req,res)=>{
    try{
      const restuarant=await Restuarant.findById(req.params.id).populate("ownerId","name email");
      res.json(restuarant)
    }catch(err){
       res.status(500).json({message:"Server error while fetching restuarant"});
    }
}

module.exports={
    getRestuarant,
    createRestuarant,
    getRestuarantById
}