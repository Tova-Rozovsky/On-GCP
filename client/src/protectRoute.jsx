// protectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

const checkToken = (token) => {
    return token !== undefined && token !== null;
};

const ProtectedRoute = ({ children }) => {
    const token = getCookie('token');

    if (!checkToken(token)) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default ProtectedRoute;
