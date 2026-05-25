
const validateProduct=(req,res,next)=>{
   const {id,name,price}=req.body;
    console.log(id,name,price);

    if(typeof name=="string" && typeof price=="number"){
        next()
    }else{
     res.json({message:"Incorrect Data format"});
    }

}

module.exports=validateProduct;