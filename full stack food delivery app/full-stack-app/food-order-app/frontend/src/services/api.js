import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// Auth
export const signupUser = async (userData) => {
  const response = await api.post('/auth/signup', userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post('/auth/login', userData);
  return response.data;
};

// Restaurants
export const getRestaurants = async () => {
  const response = await api.get('/restaurants');
  return response.data;
};

export const getRestaurantById = async (id) => {
  const response = await api.get(`/restaurants/${id}`);
  return response.data;
};

export const createRestaurant = async (data, token) => {
  const response = await api.post('/restaurants', data, authHeader(token));
  return response.data;
};

export const getMyRestaurants = async (token) => {
  const response = await api.get('/restaurants/my', authHeader(token));
  return response.data;
};

export const updateRestaurant = async (id, data, token) => {
  const response = await api.put(`/restaurants/${id}`, data, authHeader(token));
  return response.data;
};

export const deleteRestaurant = async (id, token) => {
  const response = await api.delete(`/restaurants/${id}`, authHeader(token));
  return response.data;
};

// Foods
export const getFoods = async (restaurantId) => {
  const params = restaurantId ? { restaurantId } : {};
  const response = await api.get('/foods', { params });
  return response.data;
};

export const getFoodById = async (id) => {
  const response = await api.get(`/foods/${id}`);
  return response.data;
};

export const createFood = async (data, token) => {
  const response = await api.post('/foods', data, authHeader(token));
  return response.data;
};

export const updateFood = async (id, data, token) => {
  const response = await api.put(`/foods/${id}`, data, authHeader(token));
  return response.data;
};

export const deleteFood = async (id, token) => {
  const response = await api.delete(`/foods/${id}`, authHeader(token));
  return response.data;
};

// Cart
export const getCart = async (token) => {
  const response = await api.get('/cart', authHeader(token));
  return response.data;
};

export const addToCart = async (data, token) => {
  const response = await api.post('/cart', data, authHeader(token));
  return response.data;
};

export const updateCartItem = async (itemId, quantity, token) => {
  const response = await api.put(`/cart/${itemId}`, { quantity }, authHeader(token));
  return response.data;
};

export const removeCartItem = async (itemId, token) => {
  const response = await api.delete(`/cart/${itemId}`, authHeader(token));
  return response.data;
};

export default api;
