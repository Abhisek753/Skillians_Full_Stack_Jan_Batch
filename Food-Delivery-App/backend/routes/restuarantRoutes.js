const express=require("express");
const { getRestuarant, createRestuarant } = require("../controllers/restuarantController");
const router=express.Router();

router.get("/",getRestuarant);


router.post("/",createRestuarant);

router.get("/my",()=>{

});
router.put("/:id",()=>{
    
});
router.delete("/:id",()=>{
    
});
module.exports=router;