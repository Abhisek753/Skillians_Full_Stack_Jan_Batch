import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const SingleUser = () => {
    const {id} =useParams();

    useEffect(()=>{
      fetch(`https://jsonplaceholder.typicode.com/users/1/albums/?id=${id}`).then((res)=>{
        return res.json();
      }).then((data)=>{
        console.log(data)
      })

    },[])
  return (
    <div style={{height:"100vh",backgroundColor:"lightgreen"}}>SingleUser {id}</div>
  )
}

export default SingleUser