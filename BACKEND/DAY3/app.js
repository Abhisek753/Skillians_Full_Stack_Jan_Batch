// console.log("my app.js file");
const { write } = require("fs");
const http = require("http");
let port=4000;
const server=http.createServer((req,res)=>{
const user=[
   {
   id:1,
   name:"Rohan"
},
{
   id:2,
   name:"Rajiv"
}
]

   if(req.url=="/"){
    res.write("Abhisek");
  
   }else{
        res.statusCode=404;
        res.write("Not found");
   }
  res.end();
});

server.listen(port,()=>{
    console.log(`Server Started ${port}`);
})
