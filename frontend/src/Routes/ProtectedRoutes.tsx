import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type ChildComponentProps={
    isAuthenticated:boolean
}

const ProtectedRoute = ({isAuthenticated}:ChildComponentProps) => {

  /*if (false) {
    alert("vous n'êtes pas connecté")
    return <Navigate to="/" replace />;
  }*/

  return <Outlet />;
};

export default ProtectedRoute;