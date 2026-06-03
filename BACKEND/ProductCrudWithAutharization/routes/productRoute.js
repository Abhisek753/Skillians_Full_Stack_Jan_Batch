const express=require("express");
const User = require("../models/User");
const { getAllProducts, addNewProduct, updateProduct, deleteProduct } = require("../conrollers/productController");
const authMiddleWare = require("../middlewares/authmiddleware");
const router=express.Router();

router.get("/getall",getAllProducts);
router.post("/add-product",authMiddleWare,addNewProduct);
router.put("/update-product/:id",authMiddleWare,updateProduct);
router.delete("/delete-product/:id",authMiddleWare,deleteProduct);

module.exports=router;
