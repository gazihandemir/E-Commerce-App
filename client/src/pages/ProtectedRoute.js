import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
function ProtectedRoute({ children }) {
  const { loggedIn } = useAuth();
  return loggedIn ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
//https://github.com/sametkoyuncu/react-ecommerce-patika/issues/1#issuecomment-968351702
