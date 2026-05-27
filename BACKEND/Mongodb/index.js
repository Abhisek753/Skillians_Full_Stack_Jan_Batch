const express=require("express");
const connectDb = require("./config/db");
const userRoute=require("./routes/userRoutes")
PORT=5000;
const app=express();
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("This is my get route")
})

app.use("/users",userRoute)


connectDb();

app.listen(PORT,()=>{
    console.log(`server is running in port ${PORT}`)
})