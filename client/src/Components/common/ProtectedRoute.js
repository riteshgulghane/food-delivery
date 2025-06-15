// ProtectedRoute.js - HOC for protected routes
import { Navigate, useLocation } from 'react-router-dom';
import { getToken } from '../../utils/auth';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = getToken();

  if (!token) {
    // Redirect to login page if not authenticated
    // Save the current location to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
