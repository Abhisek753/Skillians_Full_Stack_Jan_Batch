import React from 'react'

const FoodCard = ({ food }) => {
  
    const handleAddToCart = () => {
        console.log(`Added ${food.name} to cart`);
    }

  return (
    <div>
      <img className='h-56 w-full object-cover' src={food.image} alt={food.name} />
      <div className='p-4'>
        <h3 className='text-lg font-bold'>{food.name}</h3>
        <p className='text-gray-600'>{food.description}</p>
        <p className='text-xl font-bold'>${food.price.toFixed(2)}</p>
        <button onClick={handleAddToCart} className='mt-4 rounded-md bg-orange-600 text-white py-2 px-4 hover:bg-orange-700'>
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default FoodCard