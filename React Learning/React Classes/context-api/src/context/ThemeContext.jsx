import React, { Children, createContext, useState } from "react";

export const ThemeContext=createContext();

export const ThemeProvider=({children})=>{
const [theme,setTheme]=useState("dark");

const toggleTheme=()=>{
    
   setTheme((pre)=>(pre=="light"?"dark":"light"));
};

    return (
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )


}