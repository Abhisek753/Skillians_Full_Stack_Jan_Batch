import React from 'react'
import Child from './Child'

const Parent = (props) => {
  return (
    <div style={{backgroundColor:"#d1d1d1"}}>
        {props.name}  Address :{props.address}
        <h2>This is parent component</h2>
        <p>Today we are going to work with state</p>
        <Child data={props.name}/>
    </div>
  )
}

export default Parent