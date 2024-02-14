import { useQuery } from "@tanstack/react-query";

import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import swal from "sweetalert";
import cross from "../../assets/images/close.png";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loader from "../../Components/Common/Loader";
import { Dialog } from "primereact/dialog";
import ShowMyOrder from "./ShowMyOrder";

export default function MyOrders() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const email = user?.email;
  const [visible, setVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState();
  //   const ordersQuery = useQuery({
  //     queryKey: ["orders"],
  //     queryFn: () =>
  //       fetch("https://frantic-crab-cape.cyclic.app/api/cart").then((res) => res.json()),
  //   });

  const ordersQuery = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch(
        `https://frantic-crab-cape.cyclic.app/api/order/email/${email}`
      ).then((res) => res.json()),
  });
  const orders = ordersQuery.data;
  console.log(orders?.data);
  //   const userIsAdmin = isUserAdminQuery.data;
  const refetch = () => {
    ordersQuery.refetch();
  };

  const isLoading = ordersQuery.isLoading;

  //   if (userIsAdmin?.data[0]?.role !== "admin" && userIsAdmin !== undefined) {
  //     router.push("/dashboard");
  //   }

  //   if (userIsAdmin?.data[0]?.role !== "admin") {
  //     router.push("/dashboard");
  //   }

  if (loading || isLoading) {
    return <Loader />;
  }
  const handleStatus = (e, id) => {
    e.preventDefault();
    fetch(`https://frantic-crab-cape.cyclic.app/api/order/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderStatus: "Canceled" }),
    })
      .then((res) => res.json())
      .then((data) => {
        swal("Updated!", "Your Order Status has been updated!", "success");
        refetch();
      });
  };

  const handleDelete = (id) => {
    fetch(`https://frantic-crab-cape.cyclic.app/api/order/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        swal("Deleted!", "Your Order has been deleted!", "success");
        refetch();
      });
  };
  const handleShow = (id) => {
    setVisible(true);
    setSelectedItemId(id);
  };

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
              <strong class="rounded border border-green-500 bg-green-500 px-3 py-1.5 text-[10px] font-medium text-white">
                Order id: #{order._id.slice(5, 10).toUpperCase()}
              </strong>
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

      {/* <>
          {userIsAdmin?.data[0]?.role !== "admin" &&
          userIsAdmin !== undefined &&
          router.push("/dashboard") ? (
            <div className="m-5">
              <h2 className="text-red-500 font-bold text-center text-xl">
                You Are Not Authenticated Redirecting to Dashboard
              </h2>
              <div className="flex justify-center items-center my-2">
                <Image src={cross} alt="" width={100} height={100}></Image>
              </div>
            </div>
          ) : (
            <Loading />
          )}
        </> */}
    </div>
  );
}
