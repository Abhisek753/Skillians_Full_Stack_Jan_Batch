import React from 'react'
import { FaFacebook,FaLinkedin ,FaInstagram, FaTwitter} from "react-icons/fa";
const Footer = () => {
  return (
  <footer className='bg-gray-100 mt-5 p-6'>
     <div className='max-w-6xl mx-auto grid mb-4 grid-cols-1 md:grid-cols-3 gap-6'>
        {/* About Section */}
        <div>
          <h2 className='font-bold text-lg mb-2'>Job Portal</h2>
          <p>Find your dream job or hire the best talent.
            We connect companies with skilled Professionals.
          </p>
        </div>
        {/* Address section */}
        <div>
          <h2 className='font-bold text-lg mb-2'>Address</h2>
          <p>Banglore, India</p>
             <p>Email: support@jobportal.com</p>
              <p>Phone:+91 0989897898</p>
        </div>
        {/* Social Media */}
         <div>
          <h2 className='font-bold text-lg mb-2'>Follow Us</h2>
            <div className='gap-4 text-xl flex'>
              <FaFacebook className='hover:text-blue-600 cursor-pointer'/>
            <FaTwitter className='hover:text-blue-400 cursor-pointer'/>
             <FaLinkedin className='hover:text-blue-400 cursor-pointer'/>
              <FaInstagram className='hover:text-pink-700 cursor-pointer'/>
            </div>
        </div>
     </div>
     <div className='text-center text-sm text-gray-500 border-t pt-3'>
      All rights reserved © 2026 Info Edge India Ltd.
     </div>
  </footer>
  )
}

export default Footer