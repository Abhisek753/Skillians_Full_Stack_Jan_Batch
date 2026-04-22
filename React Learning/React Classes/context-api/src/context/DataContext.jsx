
import React, { Children, createContext, useState } from "react";

export const DataContext=createContext();

export const DataProvider=({children})=>{
const [data,setData]=useState([
    {id:1,name:"Rajan",description:"I am a full stack developer having 2 years of experience."},
     {id:2,name:"Arjun",description:"I am a full stack developer having 2 years of experience."},
      {id:3,name:"Bhima",description:"I am a full stack developer having 2 years of experience."}
])

const toggleTheme=()=>{
    
   setTheme((pre)=>(pre=="light"?"dark":"light"));
};

    return (
        <DataContext.Provider value={{data}}>
            {children}
        </DataContext.Provider>
    )


}