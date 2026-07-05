import axios from "axios";
const URL="http://localhost:5000/api";
let token=localStorage.getItem("foodiehubToken");

export const getFoods=async(endpoint)=>{
  console.log(token);
    const response=await axios.get(`${URL}/${endpoint}`,{
       headers:{
        Authorization:`Bearer ${token}`
      }
    });
    return response.data;
}
export const getRestuarantById=async(endpoint)=>{
  const response=await axios.get(`${URL}/${endpoint}`);
    return response.data;
}
