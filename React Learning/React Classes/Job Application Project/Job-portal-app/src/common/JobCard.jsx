import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
const APPLICATION_API="http://localhost:3000/applications"


const JobCard = ({job,showAction}) => {
  const user=JSON.parse(localStorage.getItem("user"))
const navigate=useNavigate()
const handleClick=()=>{
 navigate(`/job/${job.id}`)
}
const handleApply=async (e)=>{
  e.preventDefault();
  e.stopPropagation();
  if(!user){
    toast.error("Please Login First");
    return;
  }
  const applicationData={
    jobId:job.id,
    title:job.title,
    salaryMin:job.salaryMin,
    salaryMax:job.salaryMax,
    userId:user.id,
    name:user.name,
    email:user.email,
    phoen:user.phone,
    appliedData:new Date().toISOString(),
    status:"pending"
  }
  try{
   const response=await fetch(APPLICATION_API,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(applicationData),
   })
  //  debugger
   if(response.ok){
    toast.success("Applied successfully");
   }else{
    toast.error("Failed to apply. Please try again")
   }
  }catch(err){
    console.log(err);
    toast.error("Error for job")
  }


}
const onDelete=()=>{
  
}

  return (
    <div onClick={handleClick} className='shadow-md p=4 rounded mb-3 bg-gray-100 cursor-pointer p-4 m-2'>
        <div className='flex justify-between items-center'>
            <h2 className='text-lg font-bold'>{job.title}</h2>
            <span>{job.type}</span>
        </div>
        <p className='text-sm mt-1'>{job.company}</p>
         <p className='text-sm text-gray-500 mt-1'>{job.location}</p>
           <p className='text-sm mt-1'>₹{job.salaryMin} - ₹{job.salaryMax}</p>
         <div className='gap-2 mt-2 flex flex-wrap'>
              {job?.skills?.map((skill,i)=>(
            <span key={i} className='px-2 py-1 text-xs rounded  bg-gray-300'>{skill}</span>
           ))}
         </div>

         {showAction?(
          <div className='mt-3 flex gap-2'>
            <button 
            onClick={(e)=>{
               e.stopPropagation();
               navigate(`/job/${job.id}`)
            }}
            className='bg-green-500 text-white px-3'
            >
              View
            </button>
            <button   onClick={(e)=>{
               e.stopPropagation();
               onDelete(job.id);
            }}  className='bg-red-500 text-white px-3'>Delete</button>
      

          </div>
         ):(
              <div className='mt-3'>
              <button onClick={handleApply} className='bg-blue-500 text-white px-4 py-2'>Apply Now</button>
              </div>
         )}
        
         <ToastContainer/>
    </div>
  )
}

export default JobCard