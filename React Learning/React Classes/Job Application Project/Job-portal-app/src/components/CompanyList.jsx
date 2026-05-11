import React from 'react'
import CompanyCard from '../common/CompanyCard'

const CompanyList = ({companies}) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {companies?.map((company)=>(
        <CompanyCard key={company.id} company={company}/>
        ))}
    </div>
  )
}

export default CompanyList