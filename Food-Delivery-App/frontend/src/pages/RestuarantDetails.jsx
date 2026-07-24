import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {  getRestuarantById } from '../services/restuarantapi';
import AuthContext from '../contexts/AuthContext';
import { getFoods } from '../services/foodsapi';
import FoodCard from '../components/FoodCard';


const RestuarantDetails = () => {
    const {id}=useParams();
    const [restuarant,setRestuarant]=useState(null);
    const [foods,setFoods]=useState(null);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const restuarantData = await getRestuarantById(`restuarant/${id}`);
        const foodData = await getFoods(`foods?restuarantId=${id}`);

        setRestuarant(restuarantData?.restuarant);
        setFoods(foodData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  console.log(restuarant,"90909090");
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
            <h2>Menu</h2>
            {foods?.length > 0 ? (
              <div className='grid gap-2 sm:grid-cols-2 md:grid-cols-3'>
                {foods?.map((food) => (
                  <FoodCard key={food._id} food={food} />
                ))}
              </div>
            ) : (
              <p>No foods available</p>
            )}
        

        </div>
    </section>
  )
}

export default RestuarantDetails