import React, { useState } from 'react'

const CounterApp = () => {
  const [count,setCount]=useState(0) ;
  
  const Increment=()=>{
   console.log("increment");
   setCount(a=>a+1);
  }
  const Decrement=()=>{
    console.log("decrement");
    setCount(pre=>pre-1);
  }
  const Reset=()=>{
    console.log("reset");
    setCount(0);
  }

  return (
    <div className="container">
        <div className='counter-box'>
        <h1 className='title'>Counter App</h1>
        <h2 class="count" >Count = {count}</h2>
       <div className="buttons">
        <button onClick={Increment}>Increment</button>
        <button onClick={Decrement}>Decrement</button>
        <button onClick={Reset}>Reset</button>
       </div>
    </div>
    </div>
  )
}

export default CounterApp