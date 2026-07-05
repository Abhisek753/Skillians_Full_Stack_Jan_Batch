import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getMyRestuarants } from '../services/restuarantapi';

const RestuarantDashboard = () => {
    const {token} = JSON.parse(localStorage.getItem('auth')) || {};
    const [restuarant, setRestuarant] = useState(null);
    const [selectedRestuarantId, setSelectedRestuarantId] = useState(null);
    const [foodByRestuarant, setFoodByRestuarant] = useState([]);
    const [restuarantForm, setRestuarantForm] = useState({
        name: '',
        description: '',
        address: '',
        image: '',
    });
    const [foodForm, setFoodForm] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
    });
    const [editingFoodId, setEditingFoodId] = useState(null);


     const loadDashboard= async() => {
       if(!token){
        console.error("No token found");
        return;
       }
       const ownerRestaurants= await getMyRestuarants(token);
       setRestuarant(ownerRestaurants);
       if(ownerRestaurants.length==0){
        console.log("No restaurants found for this owner.");
        setSelectedRestuarantId(null);
        setFoodByRestuarant([]);
        return;
       }
       const firstRestuarant= ownerRestaurants[0];
       
    };
  return (
    <section className='space-y-6'>
        <div className='flex items-center justify-between'>
            <div>
                <h1 className='text-2xl font-bold'>Restaurant Dashboard</h1>
                <p className='text-stone-600'>Manage all your restaurant information and orders</p>
            </div>
            <Link to="/" className='rounded-md bg-orange-600 text-white py-2 px-4 hover:bg-orange-700'>
                Back to Home
            </Link>
        
        </div>
    </section>
  )
}

export default RestuarantDashboard