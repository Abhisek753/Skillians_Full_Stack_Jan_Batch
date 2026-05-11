import React, { useEffect, useState } from 'react'

import JobListingPage from "./JobListingPage"
const API_URL="http://localhost:3000/applications"
const CompanyDashboard = () => {
const [job,setJob]=useState([])

  const fetchData= async()=>{
   try{
     const res=await fetch(API_URL);
      const data=await res.json();
      setJob(data);
     }catch(err){
      console.log(err)
  }
  }

  useEffect(()=>{
     fetchData()
  },[])


  return (
    <div>
      {console.log("this is dashboard jobs",job)}
        <JobListingPage jobs={job} showAction={true} />
    </div>
  )
}

export default CompanyDashboard