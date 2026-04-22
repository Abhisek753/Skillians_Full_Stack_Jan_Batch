import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children,isLogin}) => {

    if(!isLogin){
        return <Navigate to="/"/>
    }
    return (
    children
    )
}

export default PrivateRoute