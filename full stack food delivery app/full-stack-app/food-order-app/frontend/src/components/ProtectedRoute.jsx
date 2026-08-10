import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

// This component checks if the user is logged in.
// If yes, it shows the page. If no, it redirects to login.
function ProtectedRoute({ children, roles = [] }) {
  const { token, user } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
