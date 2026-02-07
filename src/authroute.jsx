import { Navigate } from "react-router-dom";
import useAuth from "./utilities/auth";


export default function AuthRoute({ children }) {
  const { loading, isAuth } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!isAuth) return <Navigate to="/login" />;

  return children;
}