import { useEffect, useState } from 'react'

function ReactHooks() {
const [count,setCount]=useState(0);
const [value,setValue]=useState("")
 
const Increment=()=>{
  console.log("Increment")
    setCount(count+1)
}


  useEffect(()=>{
   fetch("https://jsonplaceholder.typicode.com/users/1/albums").then(res=>{
    return res.json()
   }).then((data)=>{
    console.log(data)
   })
  },[value])


  return (
    <>
     <h2>{count}</h2> 
     <button onClick={Increment}>Increase</button>
     <br/>
     <h3>{value}</h3>
     <input onInput={(e)=>setValue(e.target.value)} placeholder='Input Text'/>
    </>
  )
}

export default ReactHooks;
