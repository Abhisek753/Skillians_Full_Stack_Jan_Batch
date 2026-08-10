import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getRestaurantById, getFoods } from '../services/api';
import FoodCard from '../components/FoodCard';

function RestaurantDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [restaurantData, foodsData] = await Promise.all([
          getRestaurantById(id),
          getFoods(id),
        ]);
        setRestaurant(restaurantData);
        setFoods(foodsData);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load restaurant');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <p className="text-stone-600">Loading restaurant...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <section>
      <Link to="/" className="mb-4 inline-block text-sm text-orange-600 hover:underline">
        ← Back to restaurants
      </Link>

      <div className="mb-8 overflow-hidden rounded-lg bg-white shadow-md">
        <img
          src={restaurant.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800'}
          alt={restaurant.name}
          className="h-56 w-full object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold">{restaurant.name}</h1>
          <p className="mt-2 text-stone-600">{restaurant.address}</p>
          {restaurant.description && (
            <p className="mt-3 text-stone-700">{restaurant.description}</p>
          )}
        </div>
      </div>

      <h2 className="mb-4 text-2xl font-semibold">Menu</h2>

      {foods.length === 0 ? (
        <p className="rounded-lg bg-white p-6 text-stone-600 shadow-md">
          No food items available yet.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {foods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      )}
    </section>
  );
}

export default RestaurantDetails;
