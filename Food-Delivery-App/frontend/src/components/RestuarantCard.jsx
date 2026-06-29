import React from 'react'
import  {Link} from "react-router-dom"
const RestuarantCard = ({restuarant}) => {
  return (
    <Link className='block overflow-hidden rounded-lg border border-stone-200 bg-white transition shadow-sm hover:shadow-md' to={`/restuarants/${restuarant._id}`}>
      <img className='h-48 w-full object-cover' src={restuarant.image}/>
      <div className='p-4'>
        <h2 className='text-xl'>{restuarant.name}</h2>
        <p className='mt-2 line-clamp-2 text-stone-500'>{restuarant.address}</p>
        <p className='mt-2 line-clamp-2 text-stone-500'>{restuarant.description}</p>
      </div>
    </Link>
  )
}

export default RestuarantCard