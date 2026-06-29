import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { getRestuarant } from '../services/restuarantapi';
import RestuarantCard from '../components/RestuarantCard';

const Home = () => {
const [restuarant,setRestuarant]=useState([]);

useEffect(()=>{
   const fetchRestuarant=async ()=>{

    try{
        const data= await getRestuarant("restuarant");
        setRestuarant(data);
    }catch(err){
     console.log(err)
    }
   }
   fetchRestuarant();
},[])

  return (
    <div>
      <section>
        <h1 className='mb-2 text-3xl font-bold'>Explore Restuarant</h1>
        <p className='mb-8 text-stone-600'>Order food from the best place near you</p>

        {restuarant.length===0?(
          <p>No restuarant yet. Restuarnat owner can add onece after login</p>
        ):(
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
             {restuarant.map((restuarant)=>(
            <RestuarantCard key={restuarant._id} restuarant={restuarant}/>
             ))}
          </div>
        )}
      </section>

    </div>
  )
}

export default Home