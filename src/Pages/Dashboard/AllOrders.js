import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import swal from "sweetalert";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Common/Loader";

export default function AllOrders() {
  const [user, loading] = useAuthState(auth);
  const email = user?.email;
  const [visible, setVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [orderData, setOrderData] = useState();
  const [loadingData, setLoadingData] = useState(true);
  const navigate = useNavigate();
  const handleView = (id) => {
    fetch(`https://api.islamicposhak.com/api/order/${id}`)
      .then((res) => res.json())
      .then((json) => setOrderData(json?.data));
    setLoadingData(false);
    setVisible(true);
    setSelectedItemId(id);
  };

  const ordersQuery = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch("https://api.islamicposhak.com/api/order").then((res) =>
        res.json()
      ),
  });

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://api.islamicposhak.com/api/users").then((res) =>
        res.json()
      ),
  });
  // const isUserAdminQuery = useQuery({
  //   queryKey: ["isUserAdmin"],
  //   queryFn: () =>
  //     fetch(`https://api.islamicposhak.com/api/users/email/${email}`).then((res) =>
  //       res.json()
  //     ),
  // });

  const users = usersQuery.data;
  const userIsAdmin = users.data?.find((user) => user.email === email);
  const orders = ordersQuery.data;

  const refetch = () => {
    ordersQuery.refetch();
  };

  const isLoading = ordersQuery.isLoading;

  if (userIsAdmin?.role !== "admin" && userIsAdmin !== undefined) {
    navigate("/dashboard");
  }

  if (loading || isLoading) {
    return <Loader />;
  }
  if (userIsAdmin?.role !== "admin") {
    navigate("/dashboard");
  }

  const handleStatus = (e, id, status) => {
    e.preventDefault();
    fetch(`https://api.islamicposhak.com/api/order/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderStatus: status }),
    })
      .then((res) => res.json())
      .then((data) => {
        swal("Updated!", "Your Order Status has been updated!", "success");
        refetch();
      });
  };

  const handleDelete = (id) => {
    fetch(`https://api.islamicposhak.com/api/order/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        swal("Deleted!", "Your Order has been deleted!", "success");
        refetch();
      });
  };

  console.log("orders?.data", orders);
  return (
    <div>
      {orders?.data?.map((order) => (
        <article class="rounded-xl bg-white p-4 ring ring-green-50 sm:p-6 lg:p-8 m-5">
          <div class="flex items-start sm:gap-8">
            <div
              class="hidden sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-green-500"
              aria-hidden="true"
            >
              <div class="flex items-center gap-1">
                <span class="h-8 w-0.5 rounded-full bg-green-500"></span>
                <span class="h-6 w-0.5 rounded-full bg-green-500"></span>
                <span class="h-4 w-0.5 rounded-full bg-green-500"></span>
                <span class="h-6 w-0.5 rounded-full bg-green-500"></span>
                <span class="h-8 w-0.5 rounded-full bg-green-500"></span>
              </div>
            </div>

            <div>
              <div className="flex gap-2">
                {" "}
                <strong class="rounded border border-green-500 bg-green-500 px-3 py-1.5 text-[10px] font-medium text-white">
                  Order id: #{order._id.slice(5, 10).toUpperCase()}
                </strong>
                <strong class="rounded border border-green-500 bg-green-500 px-3 py-1.5 text-[10px] font-medium text-white">
                  Order id: #{order?.phone}
                </strong>
                <strong class="rounded border border-green-500 bg-green-500 px-3 py-1.5 text-[10px] font-medium text-white">
                  Email: {order.email}
                </strong>
              </div>
              <div className="flex gap-5 flex-wrap items-center">
                {order?.orders?.map((item) => (
                  <div class="flex   gap-2 mt-4">
                    <div class="flex items-center ">
                      <div>
                        {" "}
                        <img
                          src={item?.image}
                          alt=""
                          class="h-20 w-20 object-cover rounded-lg"
                        />
                      </div>

                      <div className="px-3">
                        <p>
                          <a href="#" class="hover:underline">
                            {item?.name}
                          </a>
                        </p>
                        <p class="text-sm font-medium ">Price: {item?.price}</p>
                        <p class="text-sm font-medium">
                          Quantity: {item?.quantity}
                        </p>
                      </div>
                    </div>
                    <div
                      class="flex items
                  -start gap-2"
                    ></div>
                  </div>
                ))}
                <div>
                  <p class="text-md font-medium">
                    Total:
                    {order?.orders?.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )}
                  </p>
                </div>
              </div>
              <h3 class="mt-4 text-lg font-medium sm:text-xl">
                <a href="#" class="hover:underline">
                  {" "}
                  Some Interesting Podcast Title{" "}
                </a>
              </h3>

              <p class="mt-1 text-sm text-gray-700">{order?.description}</p>

              <div class="mt-4 sm:flex sm:items-center sm:gap-2">
                <div class="flex items-center gap-1 text-gray-500">
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>

                  <p class="text-xs font-medium">
                    {order?.orderTime} {order?.orderDate}
                  </p>
                </div>

                <span class="hidden sm:block" aria-hidden="true">
                  &middot;
                </span>

                <p class="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
                  Featuring{" "}
                  <a href="#" class="underline hover:text-gray-700">
                    Barry
                  </a>
                  ,
                  <a href="#" class="underline hover:text-gray-700">
                    Sandra
                  </a>{" "}
                  and
                  <a href="#" class="underline hover:text-gray-700">
                    August
                  </a>
                </p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
