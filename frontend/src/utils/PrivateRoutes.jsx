import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

function PrivateRoutes({children}) {
    const {user, loading} = useAuthContext();

    if (loading) {
        return <div>Loading...</div>
    }
    return user? children:  <Navigate to="/login" />
}

export default PrivateRoutes