import React, { useState } from 'react';
import { signupUser } from '../services/authapi';
import {toast} from "react-toastify";

const Signup = () => {
const [formData,setFormData]=useState({
    name:"",
    email:"",
    password:"",
    role:"customer"
})
    
    const handleChange=(event)=>{
       setFormData({...formData,[event.target.name]:event.target.value})
    }

    const handleSubmit=async(event)=>{
     event.preventDefault()
   
    try{
      const data=await signupUser("auth/signup",formData);
      toast.success("Signup successfully");
      }catch(err){
      toast.error("Signup failed")
     
    }
    }
  return (
    <section className='rounded bg-white shadow-md w-[40%] m-auto p-8'>
        <h1 className='mb-4 text-2xl font-bold'>Create your Foodieapp Account</h1>
        <form  onSubmit={handleSubmit} className='space-y-4'>
         <div >
              <label className='font-medium block text-sm '>Name</label>
           <input className='mt-1 w-full rounded  border border-stone-300 px-3 py-2 focus:border-orange-500 focus:outline-none' placeholder='Enter Your name' type='taxt' required name='name' onChange={handleChange}/>
         </div>
         <div >
              <label className='font-medium block text-sm '>Email</label>
           <input className='mt-1 w-full rounded  border border-stone-300 px-3 py-2 focus:border-orange-500 focus:outline-none' placeholder='Enter Your email' type='email' required name='email' onChange={handleChange}/>
         </div>
          <div >
              <label className='font-medium block text-sm '>Password</label>
           <input className='mt-1 w-full rounded  border border-stone-300 px-3 py-2 focus:border-orange-500 focus:outline-none' placeholder='Enter Your password' type='password' required name='password' onChange={handleChange}/>
         </div>
          <div >
              <label className='font-medium block text-sm '>Role</label>
               <select name="role" onChange={handleChange} className='mt-1 w-full rounded  border border-stone-300 px-3 py-2 focus:border-orange-500 focus:outline-none'>
                <option value="customer">Customer</option>
                <option value="restuarant">Restuarant</option>

               </select>
         </div>
         <button type='submit' className='bg-orange-600 px-4 py-2 hover:bg-orange-700 rounded w-full text-white'>Signup</button>


        </form>

    </section>
  )
}

export default Signup