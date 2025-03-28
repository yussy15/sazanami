import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// これを使って、認証されていないユーザーは /Signup にアクセスできないようにします
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Google認証に通過した場合のみアクセス可能にする
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
