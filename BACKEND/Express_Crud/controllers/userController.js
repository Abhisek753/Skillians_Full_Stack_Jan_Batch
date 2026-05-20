

const getAllUsers=(req,res)=>{
    const users=[{id:3,name:"Rajan",email:"raj@gmail.com"},{id:4,name:"Abhisek",email:"ab@gmail.com"}]
    res.send(users)
}
const getUserById=(req,res)=>{
    const users={id:3,name:"Test",email:"test@gmail.com"}
    res.send(users)
}

module.exports={
    getAllUsers,
    getUserById
}