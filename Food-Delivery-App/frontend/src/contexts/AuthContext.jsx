import { createContext, useEffect, useState } from "react";


const AuthContext=createContext(null);

export const AuthProvider=({children})=>{
const [user,setUser]=useState(null);
const [token,setToken]=useState(null);

useEffect(()=>{
    const savedUser=localStorage.getItem("foodiehubUser");
    const savedToken=localStorage.getItem("foodiehubToken");
    if(savedUser&&savedToken){
        setUser(JSON.parse(savedUser));
        setToken(JSON.parse(savedToken));
    }
},[])


const saveAuth=(userData,authToken)=>{
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("foodiehubUser",JSON.stringify(userData));
    localStorage.setItem("foodiehubToken",JSON.stringify(authToken));
}

const logout=()=>{
    setUser(null);
    setToken(null);
    localStorage.removeItem("foodiehubUser");
    localStorage.removeItem("foodiehubToken");

}

return (
<AuthContext.Provider value={{user,token,saveAuth,logout}} >
     {children}
</AuthContext.Provider>

)

}

export default AuthContext;