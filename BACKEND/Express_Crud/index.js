const express = require('express');
const app = express();
const PORT = 5000;
const userRoutes=require("./routes/userRoutes");
const productRoutes=require("./routes/productRoutes");
app.use(express.json());

app.get("/", (req, res)=>{
    res.send({"id":4,"name":"Abhisek"});
})

app.use("/users",userRoutes);
app.use("/products",productRoutes);

app.listen(PORT,()=>{
    console.log(`Server is Running at Port ${PORT}`);
})