import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Navbar from "../Shared/Navbar";
import SideMenu from "../Dashboard/SideMenu";
import Loader from "../Common/Loader";

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();

  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <Loader />;
  }
  if (!user) {
    navigate("/login");
  }

  return (
    <div>
 

      <div className="flex">
        <div>
          <SideMenu />
        </div>
        <div className="w-full h-full ">{children}</div>
      </div>
    </div>
  );
}
