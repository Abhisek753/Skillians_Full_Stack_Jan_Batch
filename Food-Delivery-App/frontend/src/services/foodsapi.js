import axios from "axios";

const URL = "http://localhost:5000/api";

const getAuthHeaders = (authToken) => {
  if (!authToken) return {};
  return { Authorization: `Bearer ${authToken}` };
};

export const getFoods = async (restuarantId) => {
  const response = await axios.get(`${URL}/foods`, {
    params: restuarantId ? { restuarantId } : {},
  });
  return response.data;
};

export const getFoodById = async (id, authToken) => {
  const response = await axios.get(`${URL}/foods/${id}`, {
    headers: getAuthHeaders(authToken),
  });
  return response.data;
};

export const createFood = async (foodData, authToken) => {
  const response = await axios.post(`${URL}/foods`, foodData, {
    headers: getAuthHeaders(authToken),
  });
  return response.data;
};

export const updateFood = async (id, foodData, authToken) => {
  const response = await axios.put(`${URL}/foods/${id}`, foodData, {
    headers: getAuthHeaders(authToken),
  });
  return response.data;
};

export const deleteFood = async (id, authToken) => {
  const response = await axios.delete(`${URL}/foods/${id}`, {
    headers: getAuthHeaders(authToken),
  });
  return response.data;
};
