const mongoose=require("mongoose");

const connectDB = async ()=>{
    console.log(process.env.API_URL);
    try{
       await mongoose.connect(process.env.API_URL);
       console.log("MongoDb is connected")
    }catch(err){
        console.log("MongoDb connection failed",err)
    }
}
module.exports=connectDB;