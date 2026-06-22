import axios from "axios";
const URL="http://localhost:5000/api";


export const signupUser=async(endpoint,userData)=>{
    const response=await axios.post(`${URL}/${endpoint}`,userData);
    return response.data;
}
