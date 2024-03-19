import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Common/Loader";
import auth from "../../firebase.init";

export default function MyProfile() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();

  const [user, loading] = useAuthState(auth);
  const email = user?.email;

  useEffect(() => {
    fetch(`http://api.islamicposhak.com/api/users/email/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
      });
  }, [email]);

  if (loading) {
    return <Loader />;
  }
  if (!user) {
    navigate("/login");
  }

  console.log(userInfo?.data);
  return (
    <div>
      {user && userInfo ? (
        <>
          <div className="h-[500px]">
            <div className="bg-white  shadow-xl p-5 m-5 rounded-md">
              <p>{userInfo?.data[0]?.username}</p>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

// MyProfile.Layout = DashboardLayout;
