const Restuarant=require("../models/Restuarant");
const Food=require("../models/Food");

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
      if(!restuarant){
        return res.status(404).json({message:"Restuarant not found"});
      }
      res.json({"message":"Restuarant data",restuarant})
    }catch(err){
       res.status(500).json({message:"Server error while fetching restuarant"});
    }
}

const getMyRestuarants=async (req,res)=>{
    try{
      const restuarants=await Restuarant.find({ownerId:req.user._id}).populate("ownerId","name email");
      res.json(restuarants);
    }catch(err){
       res.status(500).json({message:"Server error while fetching restuarant"});
    }
}

const updateRestuarant=async(req,res)=>{
  try{
       const restuarant=await Restuarant.findById(req.params.id);
       if(!restuarant){
         return res.status(404).json({message:"Restuarant not found"});
       }
       if(restuarant.ownerId.toString()!==req.user._id.toString()){
         return res.status(403).json({message:"Not authorized to update this restuarant"});
       }
       const {name,address,image,description}=req.body;
       const updatedRestuarant=await Restuarant.findByIdAndUpdate(req.params.id,{
        name:name??restuarant.name,
        address:address??restuarant.address,
        image:image??restuarant.image,
        description:description??restuarant.description
       },{new:true});
       res.json(updatedRestuarant);
  }catch(error){
     res.status(500).json({message:"Server error while updating restuarant"});
  }
}



const deleteRestuarant=async(req,res)=>{
  try{
    const restuarant=await Restuarant.findById(req.params.id);
    if(!restuarant){
      return res.status(404).json({message:"Restuarant not found"});
    }
    if(restuarant.ownerId.toString()!==req.user._id.toString()){
      return res.status(403).json({message:"Not authorized to delete this restuarant"});
    }
    await Food.deleteMany({restuarantId:req.params.id});
    await Restuarant.findByIdAndDelete(req.params.id);
    res.json({message:"Restuarant removed successfully"});

  }catch(error){
       res.status(500).json({message:"Server error while deleting restuarant"});
  }
}




module.exports={
    getRestuarant,
    createRestuarant,
    getRestuarantById,
    getMyRestuarants,
    deleteRestuarant,
    updateRestuarant

}