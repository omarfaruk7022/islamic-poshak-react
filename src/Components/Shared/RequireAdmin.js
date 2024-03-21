import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
import useAdmin from "./useAdmin";
import Loader from "../Common/Loader";

const RequireAdmin = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user);
  const location = useLocation();
  if (loading || adminLoading) {
    return <Loader />;
  }

  if (admin !== "admin") {
    return (
      <Navigate to="/dashboard" state={{ from: location }} replace></Navigate>
    );
  }
  return children;
};

export default RequireAdmin;
