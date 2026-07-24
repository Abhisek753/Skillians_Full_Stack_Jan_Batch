import axios from "axios";
const URL = "http://localhost:5000/api";

const getAuthHeaders = (authToken) => {
  // const token = authToken || localStorage.getItem("foodiehubToken");
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

export const getFoods = async (endpoint) => {
  const response = await axios.get(`${URL}/${endpoint}`);
  return response.data;
};

