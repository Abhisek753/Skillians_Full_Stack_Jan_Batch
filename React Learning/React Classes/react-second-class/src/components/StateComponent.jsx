import React, { useState } from 'react'

const StateComponent = () => {
    const [data,setData]=useState(0);
    const [value,setValue]=useState("My Name")

    const Increment=()=>{
       setData(data+1);
       setValue("My name is Ankita");
    }

  return (
    <div>
       <h2>State Component</h2>
       <h1>
        {data}
       </h1>
       <h2>{value}</h2>
       <button onClick={Increment}>Click this button</button>

    </div>
  )
}

export default StateComponent