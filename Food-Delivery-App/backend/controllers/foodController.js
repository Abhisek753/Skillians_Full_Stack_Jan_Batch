const Restuarant =require("../models/Restuarant");
const Food =require("../models/Food");



const getFoods=async(req,res)=>{
    try{
      const filter=req.query.restuarantId?{restuarantId:req.query.restuarantId}:{};
      
      const foods=await Food.find(filter).populate("restuarantId","name address image");
      res.send(foods);

    }catch(err){
      res.status(500).json({message:"Server error while fetching foods"})
    }
}

const getFoodById=async(req,res)=>{
   try{
     const food=await Food.findById(req.params.id).populate("restuarantId","name address image description");
     if(!food){
      return res.status(404).json({message:"Food not found"});
     }
     res.json(food);
   }catch(err){
     res.status(500).json({message:"Server error while fetching foods"})
   }  

}
const createFood=async(req,res)=>{
    try{
      const {name,price,image,description,restuarantId}=req.body;
      console.log("name,price,image,description,restuarantId",name,price,image,description,restuarantId)
      if(!name||!price==null || !restuarantId){
        return res.status(400).json({message:"Please add name,price and restuarantId"})
      }
      const restuarant=await Restuarant.findById(restuarantId);
      if(!restuarant){
        return res.status(404).json({message:"Restuarant not found"});
      }
      console.log(restuarant.ownerId.toString(),"555",req.user._id.toString())
      if(restuarant.ownerId.toString()!==req.user._id.toString()){
        return  res.status(404).json({message:"Not authorized to add food to this restuarant"});
      }

      const food=await Food.create({
        name,
        price,
        image:image||"",
        description:description||"",
        restuarantId
      })
      const populatedFood=await Food.findById(food._id).populate("restuarantId","name address image");
      res.status(201).json(populatedFood);
    }catch(error){
        console.log(error);
         res.status(500).json({message:"Server error while creating food",error:error});
    }
}
const updateFood=async(req,res)=>{
     try{
        const food=await Food.findById(req.params.id);
        if(!food){
          return res.status(404).json({message:"Food not found"});
        }
        const restuarant=await Restuarant.findById(food.restuarantId);
        if(!restuarant || restuarant.ownerId.toString()!==req.user._id.toString()){
          return res.status(403).json({message:"Not authorized to update this food"});
        }
        const {name,price,image,description}=req.body;
        const updatedFood=await Food.findByIdAndUpdate(req.params.id,{
          name:name??food.name,
          price:price??food.price,
          image:image??food.image,
          description:description??food.description
        },{new:true}).populate("restuarantId","name address image");
     res.json(updatedFood);
     }catch(error){
        res.status(500).json({message:"Server error while updating food"});
     }
}
const deleteFood=async(req,res)=>{
     try{
       const food=await Food.findById(req.params.id);
       if(!food){
         return res.status(404).json({message:"Food not found"});
       }
       const restuarant=await Restuarant.findById(food.restuarantId);
       if(!restuarant || restuarant.ownerId.toString()!==req.user._id.toString()){
         return res.status(403).json({message:"Not authorized to delete this food"});
       }
       await Food.findByIdAndDelete(req.params.id);
       res.json({message:"Food removed successfully"});
     }catch(error){
         res.status(500).json({message:"Server error while deleting food",error:error});
     }
}

module.exports={
    createFood,
    getFoods,
    getFoodById,
    updateFood,
    deleteFood
}








