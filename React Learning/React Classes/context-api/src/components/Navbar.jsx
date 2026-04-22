import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

const Navbar = () => {
  const {theme,toggleTheme}=useContext(ThemeContext);
  return (
    <nav style={{backgroundColor:theme==="light"?"#f5f5f5f5":"#1a1a1a",color:theme=="light"?"#000000":"#ffffff",display:"flex",justifyContent:"space-between",padding:"10px"}} >
        <h1>My app</h1>
        <button
         style={{
          padding:"4px 8px",
          backgroundColor:theme==="light"?"#333333":"#ffffff",color:theme==="light"?"#ffffff":"#333333",
          border:"none",
          cursor:"pointer",
          fontWeight:"bold",
          
         }}
        onClick={toggleTheme}>{theme=="light"?"🌙Dark Mode":"☀️ Light Mode"}</button> 
    </nav>
  )
}
//10 min- toll - 9:10

export default Navbar;