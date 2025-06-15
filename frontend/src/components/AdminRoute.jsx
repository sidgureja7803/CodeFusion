import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Loader } from "./Loader";

const AdminRoute = () => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <Loader />;
  }
  if (!authUser || authUser.role !== "ADMIN") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminRoute;
