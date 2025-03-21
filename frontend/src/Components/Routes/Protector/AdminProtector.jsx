import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtector = () => {
  const token = localStorage.getItem("adminToken")
   

  // console.log(token, "This is the admin protector route token");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  try {
    // const decodedToken = jwtDecode(token);
    // if (!decodedToken.isAdmin) {
    //   return <Navigate to="/admin/login" replace />;
    // }
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default AdminProtector;
