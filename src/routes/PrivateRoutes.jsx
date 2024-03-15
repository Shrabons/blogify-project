import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthenticatin } from "../hooks/useAuthentication";

const PrivateRoutes = () => {
  const { auth } = useAuthenticatin();
  return <>{auth?.authToken ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default PrivateRoutes;
