import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className='border-b border-stone-200 bg-white shadow-sm'>
       <div className='mx-auto flex max-w-6xl items-center justify-between p-4'>
      
        <Link to="/" className="text-xl font-bold text-orange-600  ">
        FoodieHob
        </Link>
        <nav className='flex items-center gap-4 text-stone-700'>
          <Link to="/signup" className='hover:text-orange-600'>Signup</Link>
          <Link to="/login"  className='hover:text-orange-600'>Login</Link>

        </nav>

       </div>

    </header>
  )
}

export default Navbar