import { useState } from 'react'
import './App.css'
import ReactHooks from './components/ReactHooks'
import Crud from './components/Crud'
import ReducerCounter from './components/ReducerCounter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <ReactHooks/> */}
     {/* <Crud/> */}
   
     <ReducerCounter/>
    </>
  )
}

export default App
