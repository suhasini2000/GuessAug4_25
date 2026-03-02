// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Set this after login

  if (!token || !isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}
