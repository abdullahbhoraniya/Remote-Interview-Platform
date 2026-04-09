import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/Auth.store.js';

const ProtectedRoute = ({ children }) => {
  const { authChecked, isAuthenticated } = useAuthStore();

  if (!authChecked) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
