import React from 'react'

const CompanyCard = ({company}) => {
  return (
    <div className='shadow-lg p-4 rounded bg-white text-center'>
        <img className='w-16 mx-auto mb-2' src={company.logo} alt={company.name}/>
        <h2 className='font-bold'>{company.name}</h2>
        <p className='text-gray-500'>{company.industry}</p>
          <p className='text-small'>{company.size} Employees</p>

    </div>
  )
}

export default CompanyCard