import { useState } from 'react'
import './App.css'
import ReactHooks from './components/ReactHooks'
import Crud from './components/Crud'
import ReducerCounter from './components/ReducerCounter'
import Parent from './components/Parent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <ReactHooks/> */}
     {/* <Crud/> */}
   
     {/* <ReducerCounter/> */}
     <Parent/>
    </>
  )
}

export default App
