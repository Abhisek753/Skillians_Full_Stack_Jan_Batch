import axios from "axios";

const URL = "http://localhost:5000/api";

const getAuthHeaders = (authToken) => {
  if (!authToken) return {};
  return { Authorization: `Bearer ${authToken}` };
};

export const getRestuarant = async () => {
  const response = await axios.get(`${URL}/restuarant`);
  return response.data;
};

export const getRestuarantById = async (id) => {
  const response = await axios.get(`${URL}/restuarant/${id}`);
  return response.data;
};

export const getMyRestuarants = async (authToken) => {
  const response = await axios.get(`${URL}/restuarant/my`, {
    headers: getAuthHeaders(authToken),
  });
  return response.data;
};

export const createRestuarant = async (restuarantData, authToken) => {
  const response = await axios.post(`${URL}/restuarant`, restuarantData, {
    headers: getAuthHeaders(authToken),
  });
  return response.data;
};

export const updateRestuarant = async (id, restuarantData, authToken) => {
  const response = await axios.put(`${URL}/restuarant/${id}`, restuarantData, {
    headers: getAuthHeaders(authToken),
  });
  return response.data;
};

export const deleteRestuarant = async (id, authToken) => {
  const response = await axios.delete(`${URL}/restuarant/${id}`, {
    headers: getAuthHeaders(authToken),
  });
  return response.data;
};
