import React, { useContext, useState } from 'react'
import { login } from '../services/authapi';
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
const Login = () => {
const [formData,setformData]=useState({
  email:"",
  password:""
});
const navigate=useNavigate()
const {saveAuth} =useContext(AuthContext);

  const handleSubmit=async (event)=>{
    event.preventDefault();
    try{
      console.log("test")
      const data=await login("auth/login",formData);
      saveAuth(data.user,data.token);
      toast.success("Login Successful");
      navigate("/");
    }catch(err){
      toast.error("Login Failed",err)
    }
  }

  const handleChange=(event)=>{
     setformData({...formData,[event.target.name]:event.target.value})

  }
  return (
    <section className='rounder w-[40%] m-auto bg-white p-8 shadow-md'>
      <h1 className=' mb-4 text-2xl font-bold'>Login to FoodieHub</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
         <div>
          <label className='block text-sm font-medium'>Email</label>
          <input 
           className='mt-1 w-full rounded  border border-stone-300 px-3 py-2 focus:border-orange-500 focus:outline-none'
           type='email'
           name="email"
           value={formData.email}
           onChange={handleChange}
           placeholder='Enter your email'
           required
          />
         </div>
          <div>
          <label className='block text-sm font-medium'>Password</label>
          <input 
           className='mt-1 w-full rounded  border border-stone-300 px-3 py-2 focus:border-orange-500 focus:outline-none'
           type='password'
           name="password"
           value={formData.password}
           onChange={handleChange}
           placeholder='Enter your password'
           required
          />
         </div>
         <button  type='submit' className=' bg-orange-600 px-4 py-2 hover:bg-orange-700 rounded w-full text-white'>Login</button>

      </form>
    </section>
  )
}

export default Login