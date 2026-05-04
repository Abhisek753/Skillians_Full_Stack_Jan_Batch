import React from 'react'
import JobCard from '../common/JobCard';

const JobListingPage = ({jobs}) => {
  if(jobs.length==0){
    return <p>No jobs Found</p>
  }
  return (
    <div>
      {jobs?.map((job)=>(
         <JobCard key={job.id} job={job}/>
      ))}
    </div>
  )
}

export default JobListingPage;