
const checkAuth=(req,res,next)=>{

    console.log(req.headers);
    const token=req.headers["authorization"];
    if(token=="Bearer mysecrettoken"){
        next()
    }else{
        res.status(401).json({message:"Unauthorized user"});
    }
}

module.exports=checkAuth;