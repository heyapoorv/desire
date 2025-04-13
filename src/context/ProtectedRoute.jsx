  // import { Navigate } from "react-router-dom";
  // import { useAuth } from "../context/AuthContext";

  // const ProtectedRoute = ({ children, userType }) => {
  //   const { currentUser } = useAuth();

  //   if (!currentUser) {
  //     return <Navigate to="/login" />;
  //   }
    
  //   // Check if user is of correct type for this route
  //   if (userType && currentUser.userType !== userType) {
  //     // Redirect to appropriate dashboard based on user type
  //     if (currentUser.userType === "company") {
  //       return <Navigate to="/company-dashboard" />;
  //     } else {
  //       return <Navigate to="/candidate-dashboard" />;
  //     }
  //   }

  //   return children;
  // };

  // export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children, userType }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" />;
  }

  const storedType = localStorage.getItem("userType");

  if (userType && storedType !== userType) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
