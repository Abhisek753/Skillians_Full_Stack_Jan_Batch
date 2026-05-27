const URL="mongodb://127.0.0.1:27017/january";
const mongoose=require("mongoose");

const connectDb=async ()=>{
    try{
        mongoose.connect(URL);
        console.log("Mongodb connected");
    }catch(err){
        console.log(err)
    }
}

module.exports=connectDb;