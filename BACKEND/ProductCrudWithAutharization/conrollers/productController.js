const Product = require("../models/Product");


const getAllProducts=async (req,res)=>{
     
     try{
      const products=await Product.find();
      res.status(200).json(products);
     }catch(err){
       res.status(500).json({message:"Error in fetching data"});
     }

     // res.send("get all product");
}
const addNewProduct=async (req,res)=>{
  const {name,price,description}=req.body;
  const newProduct=await Product.create({name,price,description});
   
  res.status(201).json({message:"Product Addded Sucessfully",product:newProduct})
}
const updateProduct=async (req,res)=>{
     res.send("update  product");
}
const deleteProduct=async (req,res)=>{
    const {id}=req.params;
    try{
       const deleteProduct=await Product.findByIdAndDelete(id);
        res.status(200).json({message:"Product Deleted Sucessfully",product:deleteProduct});
    }catch(err){
           res.status(500).json({message:"Error in deleting data",error:err});
    }
}

module.exports={
    getAllProducts,
    addNewProduct,
    updateProduct,
    deleteProduct
}

// router.get("/getall",getAllProducts);
// router.get("/add-product",addNewProduct);
// router.get("/update-product/:id",updateProduct);
// router.get("/delete-product/:id",deleteProduct);
