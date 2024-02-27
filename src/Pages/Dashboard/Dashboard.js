import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Common/Loader";
import HomeChart from "../../Components/Dashboard/HomeChart";

export default function Dashboard() {
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
      <div>
        <div>
          {/* <HomeChart /> */}
        </div>
      </div>
    </div>
  );
}

// Dashboard.Layout = DashboardLayout;
