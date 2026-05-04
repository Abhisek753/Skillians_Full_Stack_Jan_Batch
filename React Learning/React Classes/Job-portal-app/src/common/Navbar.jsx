import React, { useEffect, useState } from 'react'
import { FaBriefcase, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Navbar = () => {
const [user,setUser]=useState(null);


  useEffect(()=>{
    const userData=localStorage.getItem("user");
    if(userData){
      setUser(JSON.parse(userData));

    }
  },[]);
  return (
    <nav className='bg-white  sticky shadow-xl top-0 z-50 '>
      <div className='container ' style={{padding:"0px 15px"}}>
          <div className='flex justify-between items-center  h-16'>
            {/* logo */}
            <Link to={"/home"} className='flex items-center space-x-2 font-bold text-xl'>
            <FaBriefcase className='text-2xl text-blue-500'/>
             <span className='ml-4 text-blue-500' style={{marginLeft:"5px"}}>JobPortal</span>
           </Link>

            <div className='items-center flex '>
              <Link className='text-gray-700 hover:text-black space-x-8' to="/jobs">
              Find Jobs
            </Link>
            </div>
             <div className='flex items-center gap-4'>
              {user?(
                <>
                <span className='text-gray-700'>{user.name}</span>
                <button className='text-white cursor-pointer bg-red-500 px-4 py-2 hover:bg-red-700'>Logout</button>
                </>
              ):(
                <Link to="/login" className='flex items-center'>
             <FaUser className='text-2xl' />
             <span className='ml-4' style={{marginLeft:"5px"}}>Sign In</span>
              </Link>
              )}
             </div>
            
          </div>
      </div>
   
    </nav>
  )
}

export default Navbar