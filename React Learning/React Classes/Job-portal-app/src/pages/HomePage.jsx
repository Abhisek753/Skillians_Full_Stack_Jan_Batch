import React, { useEffect, useState } from 'react'
import JobListingPage from './JobListingPage';
const API_URL="http://localhost:3000/jobs"

const HomePage = () => {
  const [jobs,setJob]=useState([]);

  const fetchJobs=async()=>{
     try{
     const res=await fetch(API_URL);
      const data=await res.json();
      setJob(data);
     }catch(err){
      console.log(err)
  }
  }

  useEffect(()=>{
    fetchJobs();
  },[])
  return (
    <div>
     <JobListingPage jobs={jobs}/>


    </div>
  )
}

export default HomePage