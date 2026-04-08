import React from 'react'

const Child = (props) => {
  return (
    <div style={{backgroundColor:"teal"}}>
        <h2>This is child component</h2>
        <h3>{props.data}</h3>
    </div>
  )
}

export default Child