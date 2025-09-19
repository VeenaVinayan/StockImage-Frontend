import React, { type ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Contexxt/authContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("AuthContext must be used within AuthProvider");
  }

   if (!context.isAuthenticated) {
    return <Navigate to="/login" />; 
  }

  return <>{children}</>; 
};
