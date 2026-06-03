const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    description:{type:String,default:"user"}
});

module.exports=mongoose.model("Products",productSchema);