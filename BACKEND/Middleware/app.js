const express=require("express");
PORT=5000;
const app=express();
const checkAuth=require("./middlewares/checkAuth")
const validateProduct=require("./middlewares/validateProduct");
const notFound =require("./middlewares/notFound")
app.use(express.json());

// const Logger=(req,res,next)=>{
  
//     console.log(`${new Date()} ${(req.method)},${JSON.stringify(req.body)} ,${req.url}`)
//     next();
// }
// const Auth=(req,res,next)=>{
//    const isAuth=true;
//    if(isAuth){
//     next()
//    }else{
//     res.status(401).send("Can not access.");
//    }
  
// }
// app.use(Logger);

app.get("/getproduct",checkAuth,(req,res)=>{
     res.send({id:4,name:"saeer"});
})
app.post("/postproduct",validateProduct,(req,res)=>{
    res.send("Data added successfully");
})

app.use(notFound);

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
});