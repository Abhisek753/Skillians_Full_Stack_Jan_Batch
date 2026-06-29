import axios from "axios";
const URL="http://localhost:5000/api";


export const getRestuarant=async(endpoint,userData)=>{
    const response=await axios.get(`${URL}/${endpoint}`);
    return response.data;
}
export const getRestuarantById=async(endpoint,userData)=>{
  const response=await axios.get(`${URL}/${endpoint}`);
    return response.data;
}
