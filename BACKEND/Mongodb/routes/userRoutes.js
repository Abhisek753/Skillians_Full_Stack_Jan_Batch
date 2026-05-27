const express=require("express");
const { addNewUsers, getUsers } = require("../controllers/userControllers");



const router=express.Router();

router.get("/getall",getUsers);

router.post("/add-user",addNewUsers)

module.exports=router