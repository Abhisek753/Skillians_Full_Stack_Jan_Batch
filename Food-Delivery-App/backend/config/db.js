const mongoose=require("mongoose");

const connectDB= async ()=>{
    try{
         const connection=await mongoose.connect("mongodb://127.0.0.1:27017/foodApp");
         console.log("MongoDB Connected Successfully")
    }catch(error){
        console.log("MongoDB connection failed");
    }
}
module.exports=connectDB;