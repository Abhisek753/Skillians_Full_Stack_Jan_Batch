const express=require("express");
const { getAllUsers, getUserById } = require("../controllers/userController");
const router=express.Router();

router.get("/",getAllUsers)
router.post("/",(req,res)=>{
  res.send("This is post user api")
})
router.get("/:id",getUserById);

module.exports=router;