import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../protecterComponent/protecter';

const ProtectedRoute = ({ element: Component, roleRequired, ...rest }) => {
    const { user } = useUser();
    
    // Vérifie si l'utilisateur a le rôle requis
    if (user && user.role === roleRequired) {
        return <Component {...rest} />;
    } else {
        return <Navigate to="/unauthorized" />;
    }
};

export default ProtectedRoute;
