import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteLawyer = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || user.role !== 'lawyer') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRouteLawyer;
