import React from 'react'
import { useNavigate } from 'react-router-dom'

const JobCard = ({job}) => {
const navigate=useNavigate()
const handleClick=()=>{
 navigate(`/job/${job.id}`)
}
  return (
    <div onClick={handleClick} className='shadow-md p=4 rounded mb-3 bg-gray-100 cursor-pointer p-4 m-2'>
        <div className='flex justify-between items-center'>
            <h2 className='text-lg font-bold'>{job.title}</h2>
            <span>{job.type}</span>
        </div>
        <p className='text-sm mt-1'>{job.company}</p>
         <p className='text-sm text-gray-500 mt-1'>{job.location}</p>
           <p className='text-sm mt-1'>₹{job.salaryMin} -₹{job.salaryMax}</p>
         <div className='gap-2 mt-2 flex flex-wrap'>
              {job?.skills?.map((skill,i)=>(
            <span className='px-2 py-1 text-xs rounded  bg-gray-300'>{skill}</span>
           ))}
         </div>
    </div>
  )
}

export default JobCard