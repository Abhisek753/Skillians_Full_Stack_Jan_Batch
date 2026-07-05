const express=require("express");
const { getFoodById, getFoods, createFood, updateFood, deleteFood } = require("../controllers/foodController");
const { protect } = require("../middleware/authMiddleware");
const router=express.Router();

router.get("/",getFoods);

// get food by id
router.get("/:id",protect,getFoodById);
// create food
router.post("/",protect,createFood);
router.put("/:id",protect,updateFood);
router.delete("/:id",protect,deleteFood);
module.exports=router;