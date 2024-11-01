import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

export default function RoleBasedRoutes({children, role}) {
    const {user,loading} = useAuthContext();

    if (loading) {
        return <div>Loading...</div>
    }

    if (!role.includes(user.role)) {
        return <Navigate to="/login" />
    }

    if (!user) {
        return <Navigate to="/login" />
    }
    
    return children;
}
