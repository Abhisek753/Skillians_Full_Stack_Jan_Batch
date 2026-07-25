import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMyRestuarants } from '../services/restuarantapi';
import AuthContext from '../contexts/AuthContext';


const RestuarantDashboard = () => {
    // const {token} = JSON.parse(localStorage.getItem('auth')) || {};
       const {token,user}=useContext(AuthContext);
    const [restuarant, setRestuarant] = useState(null);
    const [selectedRestuarantId, setSelectedRestuarantId] = useState(null);
    const [foodByRestuarant, setFoodByRestuarant] = useState([]);
    const currentRestuarant=restuarant?.find((restuarant)=>restuarant._id===selectedRestuarantId|| restuarant[0]||null)
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
       console.log(ownerRestaurants)
       setRestuarant(ownerRestaurants.restuarant);
       if(ownerRestaurants.length==0){
        console.log("No restaurants found for this owner.");
        setSelectedRestuarantId(null);
        setFoodByRestuarant([]);
        return;
       }
       const firstRestuarant= ownerRestaurants[0];
       
    };
const selectRestuarant=(restuarantId)=>{
   setSelectedRestuarantId(restuarantId);
}
    useEffect(()=>{
      loadDashboard();
    },[token,user?.role])
  return (
    <section className='space-y-6'>
        <div className='flex items-center justify-between'>
            <div>
                <h1 className='text-2xl font-bold'>Restaurant Dashboard</h1>
                <p className='text-stone-600'>Manage all your restaurant information and orders</p>
            </div>
           <div>
              <Link to="/restuarant/create" className='rounded-md bg-orange-600 text-white mr-4 py-2 px-4 hover:bg-orange-700'>
               Create Restuarant
            </Link>
            <Link to="/" className='rounded-md bg-orange-600 text-white py-2 px-4 hover:bg-orange-700'>
                Back to Home
            </Link>
           </div>
          </div>
           <div className='grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]'>
            <aside className='rounded-lg bg-white p-4 shadow-md'>
                <h2>Your Restuarant</h2>
                 <div className='mt-4 space-y-2'>
                    {restuarant?.map((restuarant)=>(
                        <button onClick={()=>selectRestuarant(restuarant._id)} className={`w-full rounded border px-3 py-2 text-left text-sm ${selectedRestuarantId == restuarant._id?'border-orange-500 bg-orange-50 text-orange-700':'border-stone-200 bg-white text-stone-700'}`}>
                           <div className='font-semibold'> {restuarant.name}</div>
                           <div className='mt-1 text-xs text-stone-500'> {restuarant.address}</div>
                        </button>
                    ))}
                </div>  
            </aside>
            <div className=' space-y-6'>
                <div className='rounded-lg bg-white p-6 shadow-md'>
                    <div className='flex items-start justify-between gap-4'>
                        <div>
                            <h2>{currentRestuarant?.name}</h2>
                              <p>{currentRestuarant?.address}</p>
                            
                        </div>
                        <button className='rounded border bg-red-500 hover:bg-red-700 text-white border-red-300 px-3 py-2 text-sm test-red-600 '>Delete Restuarant</button>
                       
                    </div>
                     {currentRestuarant?.image && (
                            <img  className='mt-4 h-48 w-full rounded object-cover' src={currentRestuarant?.image} alt={currentRestuarant?.name}/>
                        )}
                </div>

            </div>

           </div>
    </section>
  )
}

export default RestuarantDashboard