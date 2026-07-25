const express=require("express");
const { getRestuarant,createRestuarant, getRestuarantById, deleteRestuarant, updateRestuarant, getMyRestuarants } = require("../controllers/restuarantController");
const { protect } = require("../middleware/authMiddleware");
const router=express.Router();

router.get("/",getRestuarant);
router.post("/",protect,createRestuarant);
router.get("/my",protect,getMyRestuarants);
router.put("/:id",protect,updateRestuarant);
router.get("/:id",getRestuarantById);
router.delete("/:id",protect,deleteRestuarant);
module.exports=router;