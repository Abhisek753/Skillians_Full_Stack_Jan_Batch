import React from 'react'
import { Link } from 'react-router-dom'

const User = () => {
  let data=  [{id:"1",name:"Ankit",address:"Pune"},{id:"2",name:"Mutaq",address:"Tirupati"},{id:"3",name:"Ram",address:"Kolkata"}]
  return (
    <div>
      {data.map((el)=>(
   
      <Link to={`/user/${el.id}`}>
        <div style={{backgroundColor:"gray",padding:"10px",margin:"2px"}} key={el.id}>
            {el.id}
            <h2>{el.name}</h2>
            <p>{el.address}</p>
        </div>
      </Link>
       
      ))}
    </div>
  )
}

export default User