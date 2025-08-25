
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

import { Loader2 } from "lucide-react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const location = useLocation();

  if (isLoadingAuth) {
    // Show loading indicator while checking authentication
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-afriqai-blue" />
        <p className="mt-4 text-lg text-gray-600">Chargement...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated, preserving the intended destination
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

interface AdminRouteProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ 
  children, 
  requiredRole = "ADMIN",
}) => {
  const { isAuthenticated, currentUser: user, isLoadingAuth } = useAuth();
  const location = useLocation();

  if (isLoadingAuth) {
    // Show loading indicator while checking authentication
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-afriqai-blue" />
        <p className="mt-4 text-lg text-gray-600">Chargement...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Check if user has required role
  const hasRequiredRole = () => {
    if (!user) return false;
    
    if (Array.isArray(requiredRole)) {
      return requiredRole.some(role => user.role === role);
    }
    
    return user.role === requiredRole;
  };

    
    // If user is authenticated but doesn't have the required role, redirect to appropriate dashboard
    if (user) {
      switch (user.role) {
        case "ADMIN":
          return <Navigate to="/dashboard-admin" replace />;
        case "GESTIONNAIRE":
          return <Navigate to="/dashboard-gestionnaire" replace />;
        case "AGENT":
          return <Navigate to="/dashboard-agent" replace />;
        default:
          return <Navigate to="/dashboard-agent" replace />;
      }
    }
    
    return <Navigate to="/dashboard" replace />;
  }



