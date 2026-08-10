import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../contexts/AuthContext';
import {
  createFood,
  deleteFood,
  deleteRestaurant,
  getFoods,
  getMyRestaurants,
  updateFood,
  updateRestaurant,
} from '../services/api';

const emptyFoodForm = {
  name: '',
  price: '',
  description: '',
  image: '',
};

const emptyRestaurantForm = {
  name: '',
  address: '',
  image: '',
  description: '',
};

function RestaurantDashboard() {
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);

  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState('');
  const [foodsByRestaurant, setFoodsByRestaurant] = useState({});
  const [loading, setLoading] = useState(true);
  const [restaurantForm, setRestaurantForm] = useState(emptyRestaurantForm);
  const [foodForm, setFoodForm] = useState(emptyFoodForm);
  const [editingFoodId, setEditingFoodId] = useState(null);
  const [editingFoodForm, setEditingFoodForm] = useState(emptyFoodForm);

  const currentRestaurant =
    restaurants.find((restaurant) => restaurant._id === selectedRestaurantId) || restaurants[0] || null;
  const currentFoods = currentRestaurant
    ? foodsByRestaurant[currentRestaurant._id] || []
    : [];

  // Load all restaurants owned by the logged-in user, plus their food items.
  const loadDashboard = async () => {
    if (!token || user?.role !== 'restaurant') {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const ownerRestaurants = await getMyRestaurants(token);
      setRestaurants(ownerRestaurants);

      if (ownerRestaurants.length === 0) {
        setSelectedRestaurantId('');
        setFoodsByRestaurant({});
        setRestaurantForm(emptyRestaurantForm);
        return;
      }

      const firstRestaurant = ownerRestaurants[0];
      const nextSelectedId = ownerRestaurants.some((restaurant) => restaurant._id === selectedRestaurantId)
        ? selectedRestaurantId
        : firstRestaurant._id;

      setSelectedRestaurantId(nextSelectedId);
      setRestaurantForm({
        name: firstRestaurant.name || '',
        address: firstRestaurant.address || '',
        image: firstRestaurant.image || '',
        description: firstRestaurant.description || '',
      });

      const foodsForRestaurants = await Promise.all(
        ownerRestaurants.map(async (restaurant) => {
          const restaurantFoods = await getFoods(restaurant._id);
          return { restaurantId: restaurant._id, foods: restaurantFoods };
        })
      );

      const foodsMap = {};
      foodsForRestaurants.forEach(({ restaurantId, foods }) => {
        foodsMap[restaurantId] = foods;
      });

      setFoodsByRestaurant(foodsMap);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to load dashboard';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [token, user?.role]);

  const selectRestaurant = (restaurantId) => {
    const restaurant = restaurants.find((item) => item._id === restaurantId);

    if (!restaurant) return;

    setSelectedRestaurantId(restaurantId);
    setRestaurantForm({
      name: restaurant.name || '',
      address: restaurant.address || '',
      image: restaurant.image || '',
      description: restaurant.description || '',
    });
    setFoodForm(emptyFoodForm);
    setEditingFoodId(null);
    setEditingFoodForm(emptyFoodForm);
  };

  const handleRestaurantChange = (event) => {
    setRestaurantForm({
      ...restaurantForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleRestaurantSubmit = async (event) => {
    event.preventDefault();

    if (!currentRestaurant) return;

    try {
      const updatedRestaurant = await updateRestaurant(currentRestaurant._id, restaurantForm, token);
      setRestaurants(
        restaurants.map((restaurant) =>
          restaurant._id === currentRestaurant._id ? updatedRestaurant : restaurant
        )
      );
      toast.success('Restaurant updated');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update restaurant';
      toast.error(message);
    }
  };

  const handleDeleteRestaurant = async () => {
    if (!currentRestaurant) return;

    const confirmed = window.confirm('Delete this restaurant and its menu?');
    if (!confirmed) return;

    try {
      await deleteRestaurant(currentRestaurant._id, token);

      const remainingRestaurants = restaurants.filter(
        (restaurant) => restaurant._id !== currentRestaurant._id
      );
      setRestaurants(remainingRestaurants);

      const updatedFoods = { ...foodsByRestaurant };
      delete updatedFoods[currentRestaurant._id];
      setFoodsByRestaurant(updatedFoods);

      if (remainingRestaurants.length === 0) {
        toast.success('Restaurant removed');
        navigate('/restaurant/create');
        return;
      }

      const nextRestaurant = remainingRestaurants[0];
      setSelectedRestaurantId(nextRestaurant._id);
      setRestaurantForm({
        name: nextRestaurant.name || '',
        address: nextRestaurant.address || '',
        image: nextRestaurant.image || '',
        description: nextRestaurant.description || '',
      });
      toast.success('Restaurant removed');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete restaurant';
      toast.error(message);
    }
  };

  const handleFoodChange = (event) => {
    setFoodForm({
      ...foodForm,
      [event.target.name]: event.target.value,
    });
  };

  // Add a new food item to the selected restaurant.
  const handleFoodSubmit = async (event) => {
    event.preventDefault();

    if (!currentRestaurant) return;

    try {
      const newFood = await createFood(
        {
          ...foodForm,
          price: Number(foodForm.price),
          restaurantId: currentRestaurant._id,
        },
        token
      );

      const updatedFoods = { ...foodsByRestaurant };
      updatedFoods[currentRestaurant._id] = [newFood, ...(updatedFoods[currentRestaurant._id] || [])];
      setFoodsByRestaurant(updatedFoods);
      setFoodForm(emptyFoodForm);
      toast.success('Food added');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add food';
      toast.error(message);
    }
  };

  const startEditingFood = (food) => {
    setEditingFoodId(food._id);
    setEditingFoodForm({
      name: food.name,
      price: food.price.toString(),
      description: food.description || '',
      image: food.image || '',
    });
  };

  const handleEditingFoodChange = (event) => {
    setEditingFoodForm({
      ...editingFoodForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditFoodSubmit = async (event) => {
    event.preventDefault();

    if (!currentRestaurant) return;

    try {
      const updatedFood = await updateFood(
        editingFoodId,
        {
          ...editingFoodForm,
          price: Number(editingFoodForm.price),
        },
        token
      );

      const updatedFoods = { ...foodsByRestaurant };
      updatedFoods[currentRestaurant._id] = (updatedFoods[currentRestaurant._id] || []).map((food) =>
        food._id === editingFoodId ? updatedFood : food
      );
      setFoodsByRestaurant(updatedFoods);
      setEditingFoodId(null);
      setEditingFoodForm(emptyFoodForm);
      toast.success('Food updated');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update food';
      toast.error(message);
    }
  };

  // Remove one food item from the selected restaurant menu.
  const handleDeleteFood = async (foodId) => {
    if (!currentRestaurant) return;

    const confirmed = window.confirm('Delete this food item?');
    if (!confirmed) return;

    try {
      await deleteFood(foodId, token);
      const updatedFoods = { ...foodsByRestaurant };
      updatedFoods[currentRestaurant._id] = (updatedFoods[currentRestaurant._id] || []).filter(
        (food) => food._id !== foodId
      );
      setFoodsByRestaurant(updatedFoods);
      toast.success('Food removed');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete food';
      toast.error(message);
    }
  };

  if (loading) {
    return <p className="text-stone-600">Loading dashboard...</p>;
  }

  if (user?.role !== 'restaurant') {
    return <p className="text-red-600">Only restaurant owners can view this page.</p>;
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Restaurant Dashboard</h1>
          <p className="mt-1 text-stone-600">Manage all your restaurants and menus from one place.</p>
        </div>
        <Link
          to="/"
          className="rounded border border-stone-300 px-3 py-2 text-sm text-stone-700 hover:bg-stone-100"
        >
          Back to Home
        </Link>
      </div>

      {!currentRestaurant ? (
        <div className="rounded-lg bg-white p-8 text-center shadow-md">
          <h2 className="text-xl font-semibold">No restaurant created yet</h2>
          <p className="mt-2 text-stone-600">Create your first restaurant to start adding food.</p>
          <Link
            to="/restaurant/create"
            className="mt-4 inline-block rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
          >
            Create Restaurant
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-lg bg-white p-4 shadow-md">
            <h2 className="text-lg font-semibold">Your Restaurants</h2>
            <div className="mt-4 space-y-2">
              {restaurants.map((restaurant) => (
                <button
                  key={restaurant._id}
                  onClick={() => selectRestaurant(restaurant._id)}
                  className={`w-full rounded border px-3 py-2 text-left text-sm ${
                    selectedRestaurantId === restaurant._id
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className="font-semibold">{restaurant.name}</div>
                  <div className="mt-1 text-xs text-stone-500">{restaurant.address}</div>
                </button>
              ))}
            </div>
          </aside>

          <div className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">{currentRestaurant.name}</h2>
                  <p className="mt-1 text-stone-600">{currentRestaurant.address}</p>
                </div>
                <button
                  onClick={handleDeleteRestaurant}
                  className="rounded border border-red-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Delete Restaurant
                </button>
              </div>

              {currentRestaurant.image && (
                <img
                  src={currentRestaurant.image}
                  alt={currentRestaurant.name}
                  className="mt-4 h-48 w-full rounded object-cover"
                />
              )}

              {currentRestaurant.description && (
                <p className="mt-4 text-stone-700">{currentRestaurant.description}</p>
              )}
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="text-xl font-semibold">Edit Restaurant</h3>
              <form className="mt-4 space-y-4" onSubmit={handleRestaurantSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                      className="mt-1 w-full rounded border border-stone-300 px-3 py-2"
                      name="name"
                      value={restaurantForm.name}
                      onChange={handleRestaurantChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Address</label>
                    <input
                      className="mt-1 w-full rounded border border-stone-300 px-3 py-2"
                      name="address"
                      value={restaurantForm.address}
                      onChange={handleRestaurantChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium">Image URL</label>
                  <input
                    className="mt-1 w-full rounded border border-stone-300 px-3 py-2"
                    name="image"
                    value={restaurantForm.image}
                    onChange={handleRestaurantChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Description</label>
                  <textarea
                    className="mt-1 w-full rounded border border-stone-300 px-3 py-2"
                    name="description"
                    value={restaurantForm.description}
                    onChange={handleRestaurantChange}
                    rows={3}
                  />
                </div>
                <button
                  type="submit"
                  className="rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
                >
                  Save Changes
                </button>
              </form>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Food Menu</h3>
                <span className="text-sm text-stone-500">This panel shows food for the selected restaurant.</span>
              </div>

              <form className="mt-4 space-y-4 rounded-lg border border-stone-200 p-4" onSubmit={handleFoodSubmit}>
                <h4 className="text-lg font-medium">Add Food</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                      className="mt-1 w-full rounded border border-stone-300 px-3 py-2"
                      name="name"
                      value={foodForm.name}
                      onChange={handleFoodChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Price</label>
                    <input
                      className="mt-1 w-full rounded border border-stone-300 px-3 py-2"
                      type="number"
                      name="price"
                      value={foodForm.price}
                      onChange={handleFoodChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium">Image URL</label>
                  <input
                    className="mt-1 w-full rounded border border-stone-300 px-3 py-2"
                    name="image"
                    value={foodForm.image}
                    onChange={handleFoodChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Description</label>
                  <textarea
                    className="mt-1 w-full rounded border border-stone-300 px-3 py-2"
                    name="description"
                    value={foodForm.description}
                    onChange={handleFoodChange}
                    rows={2}
                  />
                </div>
                <button
                  type="submit"
                  className="rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
                >
                  Add Food
                </button>
              </form>

              {currentFoods.length === 0 ? (
                <p className="mt-4 rounded bg-stone-50 p-4 text-stone-600">No food items yet for this restaurant.</p>
              ) : (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {currentFoods.map((food) => (
                    <div key={food._id} className="rounded-lg border border-stone-200 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-lg font-semibold">{food.name}</h4>
                          <p className="text-sm text-stone-600">₹{food.price}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditingFood(food)}
                            className="rounded border border-stone-300 px-3 py-1 text-sm text-stone-700 hover:bg-stone-100"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteFood(food._id)}
                            className="rounded border border-red-300 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      {food.image && (
                        <img
                          src={food.image}
                          alt={food.name}
                          className="mt-3 h-32 w-full rounded object-cover"
                        />
                      )}

                      {food.description && (
                        <p className="mt-2 text-sm text-stone-600">{food.description}</p>
                      )}

                      {editingFoodId === food._id && (
                        <form className="mt-4 space-y-3 border-t border-stone-200 pt-4" onSubmit={handleEditFoodSubmit}>
                          <div>
                            <label className="block text-sm font-medium">Name</label>
                            <input
                              className="mt-1 w-full rounded border border-stone-300 px-3 py-2"
                              name="name"
                              value={editingFoodForm.name}
                              onChange={handleEditingFoodChange}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium">Price</label>
                            <input
                              className="mt-1 w-full rounded border border-stone-300 px-3 py-2"
                              type="number"
                              name="price"
                              value={editingFoodForm.price}
                              onChange={handleEditingFoodChange}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium">Image URL</label>
                            <input
                              className="mt-1 w-full rounded border border-stone-300 px-3 py-2"
                              name="image"
                              value={editingFoodForm.image}
                              onChange={handleEditingFoodChange}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium">Description</label>
                            <textarea
                              className="mt-1 w-full rounded border border-stone-300 px-3 py-2"
                              name="description"
                              value={editingFoodForm.description}
                              onChange={handleEditingFoodChange}
                              rows={2}
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="submit"
                              className="rounded bg-orange-600 px-3 py-2 text-sm text-white hover:bg-orange-700"
                            >
                              Save Food
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingFoodId(null);
                                setEditingFoodForm(emptyFoodForm);
                              }}
                              className="rounded border border-stone-300 px-3 py-2 text-sm text-stone-700"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default RestaurantDashboard;
