const API_URL="http://localhost:3000";

export const signup=async(userData)=>{
   try{
     const response=await fetch(`${API_URL}/users`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            ...userData,createdAt:new Date().toISOString(),status:"active"
        })
     })
     return await response.json()
   }catch(err){
     throw error
   }
}