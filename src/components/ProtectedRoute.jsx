import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const isLoggedin = useSelector((state) => state.authReducer.isLoggedIn);
  return isLoggedin ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
