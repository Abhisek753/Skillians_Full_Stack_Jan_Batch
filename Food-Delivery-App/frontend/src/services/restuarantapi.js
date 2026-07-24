import axios from "axios";
const URL = "http://localhost:5000/api";

const getAuthHeaders = (authToken) => {
  // const token = authToken || localStorage.getItem("foodiehubToken");
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

export const getRestuarant = async (endpoint) => {
  console.log("876987098-098n-08n-09n")
  const response = await axios.get(`${URL}/restuarant`);
  return response.data;
};
// export const getRestaurants = async () => {
//   const response = await api.get('/restaurants');
//   return response.data;
// };

export const getRestuarantById = async (endpoint) => {
  const response = await axios.get(`${URL}/${endpoint}`);
  return response.data;
};

export const getMyRestuarants = async (authToken = null) => {
  const response = await axios.get(`${URL}/restuarant/my`, {
    headers: getAuthHeaders(authToken),
  });
  return response.data;
};