const mongoose=require("mongoose");

const foodSchema=new mongoose.Schema({
   name:{type:String,required:true},
   price:{
    type:Number,
    required:true,
    min:0
   },
   description:{
    type:String,
    default:"",
    trim:true
   },
   restuarantId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Restuarant",
    required:true,
   },
   image:{
    type:String,
    default:""
   }

   
},{timestamps:true});
module.exports=mongoose.model("Food",foodSchema);