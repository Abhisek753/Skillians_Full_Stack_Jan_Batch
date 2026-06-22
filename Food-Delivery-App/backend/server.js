const express=require("express");
var cors = require('cors')
const dotenv=require("dotenv");
const authRoutes=require("./routes/authRoutes")
dotenv.config();
const connectDB = require("./config/db");
const PORT=process.env.PORT;


const app=express();
app.use(express.json());
app.use(cors());

app.use("/api/auth",authRoutes);

connectDB()
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})
