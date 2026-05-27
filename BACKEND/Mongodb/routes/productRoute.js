const express=require("express");



const router=express.Router();

router.get("/getall",(req,res)=>{
res.send("get data api");
});

