import { useEffect, useState } from 'react';
import { getRestaurants } from '../services/api';
import RestaurantCard from '../components/RestaurantCard';

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load restaurants');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return <p className="text-stone-600">Loading restaurants...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <section>
      <h1 className="mb-2 text-3xl font-bold">Explore Restaurants</h1>
      <p className="mb-8 text-stone-600">Order food from the best places near you</p>

      {restaurants.length === 0 ? (
        <p className="rounded-lg bg-white p-8 text-center text-stone-600 shadow-md">
          No restaurants yet. Restaurant owners can add one after login.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Home;
