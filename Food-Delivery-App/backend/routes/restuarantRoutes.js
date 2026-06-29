const express=require("express");
const { getRestuarant, createRestuarant, getRestuarantById } = require("../controllers/restuarantController");
const router=express.Router();

router.get("/",getRestuarant);


router.post("/",createRestuarant);

router.get("/my",()=>{

});
router.get("/:id",getRestuarantById);
router.delete("/:id",()=>{
    
});
module.exports=router;