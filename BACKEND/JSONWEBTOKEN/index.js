const express=require("express");
const connectDB=require("./config/db");
const authRoute=require("./routes/authRoute");
const app=express();
app.use(express.json());
require('dotenv').config();
const port= 5001;

app.get("/",(req,res)=>{
    res.send("This is my first route");
});
app.use("/auth",authRoute);

connectDB().then(()=>{
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})
})
