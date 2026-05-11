import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const API_URL="http://localhost:3000/jobs"
const JobDetailPage = () => {
 const {id}=useParams();
const [job,setJob]=useState(null);

const fetchJob= async()=>{
   const res=await fetch(`${API_URL}/${id}`);
   const data=await res.json();
   setJob(data)
   console.log("data per id",data)
}
useEffect(()=>{
 fetchJob()
},[])
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>{job?.title}</h1>
       <p className='mt-2 text-gray-600'>{job?.company}</p>
        <p className='mt-2'>{job?.location}</p>
         <p className='mt-2'>₹{job?.salaryMin}-₹{job?.salaryMax}</p>
           <h3 className='mt-2 font-semibold'>Description</h3>
           <p >{job?.description}</p>
           <div className='flex gap-2 mt-2'>
            {job?.skills?.map((s,i)=>(
              <span className='bg-gray-300 px-2 py-1' key={i}>{s}</span>
            ))}
           </div>
              <h3 className='mt-2 font-semibold'>Job requirement</h3>
           <p>{job?.requirements}</p>
    </div>
  )
}

export default JobDetailPage