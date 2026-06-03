const express=require("express");
const connectDB=require("./config/db");
const authRoute=require("./routes/authRoute");
const productRoute=require("./routes/productRoute");
const app=express();
app.use(express.json());
require('dotenv').config();
const port = process.env.PORT;

app.get("/",(req,res)=>{
    res.send("This is my first route");
});
app.use("/auth",authRoute);
app.use("/products",productRoute);

connectDB().then(()=>{
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})
})
