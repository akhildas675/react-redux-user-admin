import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const UserProtector = () => {
    console.log("sadad")
    const token = localStorage.getItem('token');

    console.log("s",token)
    // console.log(token, "This is the protector route token");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return <Outlet/>;
};

export default UserProtector;
