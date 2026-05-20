
const {products,users}=require("../data/products");

const getAllProducts=(req,res)=>{
   res.send(products);
}
const getProductById=(req,res)=>{
    const id=parseInt(req.params.id);
    const product=products.find(e=>e.id==id)
    if(!product){
        return res.status(404).json({message:"Product not found"});
    }
    res.send(product);
}

const createProduct=(req,res)=>{
 const {id,name,price}=req.body;
 console.log("my product",products);
 const existing=products.find(p=>p.id==Number(id));
 console.log(existing)
 if(existing){
    return res.status(400).json({message:"Product with this id already exist"});
 }
 const newProduct={id,name,price};
  products.push(newProduct);
  res.status(201).json({message:"Product Created",Data:newProduct})
}
const updateProduct=(req,res)=>{
   res.send("created");
    
}
const deleteProduct=(req,res)=>{
    console.log("delete api")
    const id=parseInt(req.params.id);
    const index=products.findIndex(e=>e.id==id);
    if(index==-1){
        return res.status(404).json({message:"Product not found"});
    }
   products.splice(index,1);
   res.status(204).json({message:"Product Deleted"});
}

module.exports={
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
