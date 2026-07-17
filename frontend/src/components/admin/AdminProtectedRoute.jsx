import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({
  children,
}) {
  const admin =
    localStorage.getItem(
      "admin"
    );

  const token =
    localStorage.getItem(
      "adminToken"
    );

  if (!admin || !token) {
    return (
      <Navigate
        to="/admin/login"
      />
    );
  }

  return children;
}