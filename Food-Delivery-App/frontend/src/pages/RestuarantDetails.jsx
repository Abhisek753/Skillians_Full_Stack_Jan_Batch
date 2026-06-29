import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { getRestuarant, getRestuarantById } from '../services/restuarantapi';

const RestuarantDetails = () => {
    const {id}=useParams();
    const [restuarant,setRestuarant]=useState(null);
    const [foods,setFoods]=useState(null);

   useEffect(()=>{
    const fetchData=async()=>{
        try{
            const restuarantData= await getRestuarantById(`restuarant/${id}`);
            console.log(restuarantData)
            // const foodData= await getRestuarant("foods");
                  setRestuarant(restuarantData);
                //   setFoods(foodData);
        }catch(err){
             console.log(err);
        }
    }
    fetchData();
   },[])


  return (
    <section>
        <Link to="/" className='mb-4 inline-block text-sm text-orange-600 '>Back to restuarant</Link>
         <div className='mb-8 overflow-hidden rounded-lg bg-white shadow-md'>
            <img className='h-56 w-full object-cover' src={restuarant?.image}/>
            <div className='p-6'>
                <h1>{restuarant?.name}</h1>
                <p>{restuarant?.address}</p>
                 <p>{restuarant?.description}</p>
            </div>
         
         </div>
    </section>
  )
}

export default RestuarantDetails