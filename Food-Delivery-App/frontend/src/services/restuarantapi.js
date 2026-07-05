import axios from "axios";
const URL = "http://localhost:5000/api";

const getAuthHeaders = (authToken) => {
  const token = authToken || localStorage.getItem("foodiehubToken");
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

export const getRestuarant = async (endpoint, authToken = null) => {
  const response = await axios.get(`${URL}/${endpoint}`, {
    headers: getAuthHeaders(authToken),
  });
  return response.data;
};

export const getRestuarantById = async (endpoint, authToken = null) => {
  const response = await axios.get(`${URL}/${endpoint}`, {
    headers: getAuthHeaders(authToken),
  });
  return response.data;
};

export const getMyRestuarants = async (authToken = null) => {
  const response = await axios.get(`${URL}/restuarant/my`, {
    headers: getAuthHeaders(authToken),
  });
  return response.data;
};