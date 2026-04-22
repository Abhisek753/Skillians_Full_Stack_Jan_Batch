import { useState } from 'react'
import './App.css'
import HomePage from './components/HomePage'
import Navbar from "./components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

  return (
    <>
    <Navbar/>
     <HomePage/>
    </>
  )
}

export default App
