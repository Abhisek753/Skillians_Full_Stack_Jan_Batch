require('dotenv').config();


const rolesMiddleWare=(req,res,next)=>{
   const user=req.user;
   console.log("user",user)
    try{
      if(!user){
         res.status(403).json({message:"No user role found"});
      }
      console.log(user?.role)
       if(user.role =="Admin"){
           next();
      }else{
         res.status(403).json({message:"Permission denied"});
      }
    
    }catch(err){
        res.status(401).json({message:"Invalid Role",error:err});
    }
   }
module.exports=rolesMiddleWare;