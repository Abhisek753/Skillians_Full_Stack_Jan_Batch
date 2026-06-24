const mongoose=require("mongoose");

const restuarantSchema=new mongoose.Schema({
   name:{type:String,required:true},
   ownerId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
   address:{type:String,required:true},
   image:{type:String,required:true,default:""},
   description:{type:String,required:true,default:""},


   
},{timestamps:true});
module.exports=mongoose.model("Restuarant",restuarantSchema);