import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const { token } = useSelector((state) => state.auth);

  return token ? <Navigate to="/dashboard" replace /> : children;
}