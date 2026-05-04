import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
const API_URL="http://localhost:3000"
const LoginPage = () => {
  const navigate=useNavigate()
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })

const handleChange=(e)=>{
  setFormData({
    ...formData,[e.target.name]:e.target.value
  })
}

const handleSubmit= async(e)=>{
    e.preventDefault()
    try{
     const response= await fetch(`${API_URL}/users?email=${formData.email}&password=${formData.password}`);
     const data=await response.json();
     const user=data[0];
    if(data?.length>0){
      localStorage.setItem("user",JSON.stringify(user));
      toast.success("Login Successful");
      navigate("/home")
    }else{
      toast.error("Invalid Email or Password");
    }
    

    }catch(err){
      console.log(err);
    }

   
}

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-50'>
        <div className='bg-gray-100 p-8 w-[350px]'>
           <h2 className='text-2xl text-center'>Login</h2>
           <form className='flex flex-col' onSubmit={handleSubmit}>
            <label>Email</label>
            <input type='text' name="email" placeholder='Enter Email' className='border p-2 mb-3'  onChange={handleChange}/>
                 <label>Password</label>
            <input type='text' name="password" placeholder='Enter Password' className='border p-2 mb-3'onChange={handleChange} />
            <button className='bg-blue-600 text-white p-2 mb-3'>Login</button>
            <p className='text-center text-sm'>Don't have an account? {" "}
              <Link to={"/signup"} className="text-blue-600 cursor-pointer">Signup</Link>
            </p>
           </form>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default LoginPage;