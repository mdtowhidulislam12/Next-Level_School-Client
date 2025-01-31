import React from 'react';
import { useAuth } from '../AuthProvider/Authprovider';
import { Navigate, useLocation,  } from 'react-router-dom';



const PrivateRoute = ({ children }) => {

    const { user,loading } = useAuth();
    const location = useLocation();

    if(!user){
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
    
};

export default PrivateRoute;