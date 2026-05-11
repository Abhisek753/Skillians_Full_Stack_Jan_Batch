import React from 'react'
import JobCard from '../common/JobCard';

const JobListingPage = ({jobs,showAction}) => {
  if(jobs?.length==0||jobs==undefined){
    return <p>No jobs Found</p>
  }
  return (
    <div>
      {jobs?.map((job)=>(
         <JobCard key={job.id} job={job} showAction={showAction}/>
      ))}
    </div>
  )
}

export default JobListingPage;