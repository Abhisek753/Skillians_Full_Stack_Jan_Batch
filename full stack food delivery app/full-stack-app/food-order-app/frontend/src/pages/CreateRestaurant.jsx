import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../contexts/AuthContext';
import { createRestaurant, getMyRestaurants } from '../services/api';

function CreateRestaurant() {
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    image: '',
    description: '',
  });

  useEffect(() => {
    const checkExistingRestaurant = async () => {
      if (!token || user?.role !== 'restaurant') return;

      try {
        const restaurants = await getMyRestaurants(token);
        if (restaurants.length > 0) {
          navigate('/restaurant/dashboard');
        }
      } catch (error) {
        console.error('Failed to check existing restaurant', error);
      }
    };

    checkExistingRestaurant();
  }, [token, user?.role, navigate]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const restaurant = await createRestaurant(formData, token);
      toast.success('Restaurant created!');
      navigate(`/restaurants/${restaurant._id}`);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create restaurant';
      toast.error(message);
    }
  };

  if (user?.role !== 'restaurant') {
    return (
      <p className="text-red-600">Only restaurant owners can create a restaurant.</p>
    );
  }

  return (
    <section className="mx-auto max-w-lg rounded-lg bg-white p-8 shadow-md">
      <h1 className="mb-6 text-2xl font-bold">Create Restaurant</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            className="mt-1 w-full rounded border border-stone-300 px-3 py-2 focus:border-orange-500 focus:outline-none"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Spice Kitchen"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            className="mt-1 w-full rounded border border-stone-300 px-3 py-2 focus:border-orange-500 focus:outline-none"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="MG Road, Bangalore"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input
            className="mt-1 w-full rounded border border-stone-300 px-3 py-2 focus:border-orange-500 focus:outline-none"
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            className="mt-1 w-full rounded border border-stone-300 px-3 py-2 focus:border-orange-500 focus:outline-none"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Best Indian food in town"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
        >
          Create Restaurant
        </button>
      </form>
    </section>
  );
}

export default CreateRestaurant;
