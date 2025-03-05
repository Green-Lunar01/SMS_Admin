/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }: any) => {
  const isAuthenticated = sessionStorage.getItem('edusoftToken');

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
