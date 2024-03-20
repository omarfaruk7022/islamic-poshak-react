import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Common/Loader";
import HomeChart from "../../Components/Dashboard/HomeChart";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, loading] = useAuthState(auth);
  const ordersQuery = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch("https://api.islamicposhak.com/api/order", {
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
          ContentType: "application/json",
        },
      }).then((res) => res.json()),
  });

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://api.islamicposhak.com/api/users", {
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
          ContentType: "application/json",
        },
      }).then((res) => res.json()),
  });

  const users = usersQuery.data;
  const orders = ordersQuery.data;
  console.log(users?.data?.length, orders);
  if (loading) {
    return <Loader />;
  }
  if (!user) {
    navigate("/login");
  }

  return (
    <div>
      <div>
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 p-5">
          <div class="h-32 rounded-lg bg-gray-100">
           <div  class="
              flex
              items-center
              justify-center
              h-full
              bg-white
              rounded-lg
              shadow-md"
            >
             Upcoming...
              </div>
            {/* {users?.data?.length ? (
              <div
                class="
              flex
              items-center
              justify-center
              h-full
              bg-white
              rounded-lg
              shadow-md
            "
              >
                <div class="flex flex-col items-center justify-center">
                  <h2 class="text-3xl font-bold">{users?.data?.length}</h2>
                  <p class="text-gray-500">Users</p>
                </div>
              </div>
            ) : (
              <div class="flex items-center justify-center h-full bg-white rounded-lg shadow-md">
                <div class="flex flex-col items-center justify-center">
                  <h2 class="text-3xl font-bold">0</h2>
                  <p class="text-gray-500">Users</p>
                </div>
              </div>
            )} */}
          </div>
          <div class="h-32 rounded-lg bg-white">
          <div  class="
              flex
              items-center
              justify-center
              h-full
              bg-white
              rounded-lg
              shadow-md"
            >
             Upcoming...
              </div>
            {/* {orders?.data?.length ? (
              <div
                class="
              flex
              items-center
              justify-center
              h-full
              bg-white
              rounded-lg
              shadow-md
            "
              >
                <div class="flex flex-col items-center justify-center">
                  <h2 class="text-3xl font-bold">{orders?.data?.length}</h2>
                  <p class="text-gray-500">
                    Orders
                  </p>
                </div>
              </div>
            ) : (
              <div class="flex items-center justify-center h-full bg-white rounded-lg shadow-md">
                <div class="flex flex-col items-center justify-center">
                  <h2 class="text-3xl font-bold">0</h2>
                  <p class="text-gray-500">Orders</p>
                </div>
              </div>
            )} */}
          </div>
          <div class="h-32 rounded-lg bg-gray-100">
          <div  class="
              flex
              items-center
              justify-center
              h-full
              bg-white
              rounded-lg
              shadow-md"
            >
             Upcoming...
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard.Layout = DashboardLayout;
