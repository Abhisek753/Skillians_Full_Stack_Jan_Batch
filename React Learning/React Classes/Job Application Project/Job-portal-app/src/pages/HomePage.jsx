import React, { useEffect, useState } from 'react'
import JobListingPage from './JobListingPage';
import CompanyList from '../components/CompanyList';
import { ToastContainer } from 'react-toastify';
const API_URL="http://localhost:3000/jobs"
const COMPANY_API="http://localhost:3000/companies"

const HomePage = () => {
  const [activeTab,setActiveTab]=useState("companies")
  const [jobs,setJob]=useState([]);
    const [companies,setCompanies]=useState([]);

  const fetchJobs=async()=>{
     try{
     const res=await fetch(API_URL);
      const data=await res.json();
      setJob(data);
     }catch(err){
      console.log(err)
  }
  }
  const fetchCompanies=async()=>{
     try{
     const res=await fetch(COMPANY_API);
      const data=await res.json();
      setCompanies(data);
     }catch(err){
      console.log(err)
  }
  }

  useEffect(()=>{
    fetchJobs();
    fetchCompanies();
  },[])
  return (
    <div className='p-4'>
    
     <div className='flex gap-4 mb-8 border-b'>
      <button className={`px-6 py-3 font-semibold ${activeTab=="companies"?"border-b-2 border-blue-500 text-blue-500":"text-gray-600 hover:text-black"}`} onClick={()=>setActiveTab("companies")}>Top Companies</button>
      <button className={`px-6 py-3 font-semibold ${activeTab=="jobs"?"border-b-2 border-blue-500 text-blue-500":"text-gray-600 hover:text-black"}`} onClick={()=>setActiveTab("jobs")} >All Jobs</button>
     </div>
     {activeTab==="companies" && (
      <div>
      <CompanyList companies={companies}/>
      </div>
     )}
      {activeTab==="jobs" && (
      <div>
          <JobListingPage jobs={jobs} showAction={false}/>
      </div>
     )}
      <ToastContainer/>

    </div>
  )
}

export default HomePage