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
      res.json({"message":"Restuarant data",restuarant})
    }catch(err){
       res.status(500).json({message:"Server error while fetching restuarant"});
    }
}

const updateRestuarant=async(req,res)=>{
  try{
       const {name,address,image,description}=req.body;
       const restuarant=await Restuarant.findByIdAndUpdate(req.params.id,{
        name:name??req.restuarant.name,
        address:address??req.restuarant.address,

        image:image??req.restuarant.image,
        description:description??req.restuarant.description
       });
       res.json(restuarant);
  }catch(error){
     res.status(500).json({message:"Server error while updating restuarant"});
  }
}



const deleteRestuarant=async(req,res)=>{
  try{
    console.log("param",req.params.id);
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
    deleteRestuarant,
    updateRestuarant

}