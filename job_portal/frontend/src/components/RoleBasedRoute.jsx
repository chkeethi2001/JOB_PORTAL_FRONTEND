import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RoleBasedRoute({ allowedRoles, children }) {
  const { role } = useSelector((state) => state.auth);

  if (!role) {
    // not logged in
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    // logged in but not allowed
    return <Navigate to="/" />;
  }

  return children;
}
