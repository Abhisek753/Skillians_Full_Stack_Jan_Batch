import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import { Link, Route, Routes } from 'react-router-dom'
import About from './components/About'
import Contact from './components/Contact'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
        <nav>
        <Link to='/'>Home</Link><br/>
        <Link to='/about'>About</Link><br/>
        <Link to='/contact'>Contact</Link>
      </nav>
    
      <Routes>
         <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
           <Route path='/contact' element={<Contact/>}/>
      </Routes>
  
     </div>
    </>
  )
}

export default App
