import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import swal from "sweetalert";
import auth from "../../firebase.init";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../../Components/Common/Loader";
import "../../App.css";
import { Dropdown } from "primereact/dropdown";
import useAdmin from "../../Components/Shared/useAdmin";

export default function AllOrders() {
  const [user, loading] = useAuthState(auth);
  const email = user?.email;
  const [visible, setVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [sortBy, setSortBy] = useState("all");
  const [finalData, setFinalData] = useState([]);
  const [admin, adminLoading] = useAdmin(user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.accessToken) {
      window.localStorage.setItem("accessToken", user?.accessToken);
    }
  }, []);
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
  // const isUserAdminQuery = useQuery({
  //   queryKey: ["isUserAdmin"],
  //   queryFn: () =>
  //     fetch(`https://api.islamicposhak.com/api/users/email/${email}`).then((res) =>
  //       res.json()
  //     ),
  // });

  const users = usersQuery?.data;
  const orders = ordersQuery?.data;

  useEffect(() => {
    if (orders) {
      setFinalData(orders?.data);
    }
  }, [orders]);
  useEffect(() => {
    if (sortBy == "all") {
      setFinalData(orders?.data);
    } else {
      const sortedData = orders?.data?.filter(
        (product) => product?.orderStatus.toLowerCase() == sortBy.toLowerCase()
      );
      setFinalData(sortedData);
    }
  }, [sortBy]);

  console.log("orders", finalData);
  const refetch = () => {
    ordersQuery.refetch();
  };

  const isLoading = ordersQuery.isLoading;

  if (admin !== "admin" && admin !== undefined) {
    navigate("/dashboard");
  }

  useEffect(() => {
    if (selectedStatus && selectedId) {
      handleStatus(selectedId, selectedStatus);
    }
  }, [selectedStatus]);

  const handleStatus = (id, status) => {
    console.log("id", id, "status", status);

    fetch(`https://api.islamicposhak.com/api/order/${id}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderStatus: status,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        swal("Updated!", "Your Order Status has been updated!", "success");
        refetch();
      });
  };

  const handleDelete = (id) => {
    const customer = orders?.data?.find((order) => order._id === id);
    console.log("id", id);
    swal({
      title: `Delete ${customer.customerName}'s Order?`,
      text: `Are you sure that you want to Delete ${customer?.customerName}'s order?`,
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`https://api.islamicposhak.com/api/order/${id}`, {
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
            "Content-Type": "application/json",
          },
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            swal(
              "Deleted!",
              `This ${customer?.customerName}'s file has been deleted!`,
              "success"
            );

            refetch();
          });
      }
    });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.value;
    if (search) {
      const searchData = orders?.data?.filter((order) => {
        return (
          order?.customerName.toLowerCase().includes(search.toLowerCase()) ||
          order?.orderStatus.toLowerCase().includes(search.toLowerCase()) ||
          order?.email.includes(search.toLowerCase()) ||
          order?.phone.includes(search.toLowerCase()) ||
          order?._id.includes(search.toLowerCase())
        );
      });
      setFinalData(searchData);
    } else {
      setFinalData(orders?.data);
    }
  };
  return (
    <div>
      {admin == "admin" ? (
        <div>
          <div className="flex justify-end items-center">
            <div>
              <div className="flex justify-center ">
                <form onChange={handleSearch}>
                  <div class="relative">
                    <label for="Search" class="sr-only">
                      {" "}
                      Search{" "}
                    </label>

                    <input
                      type="text"
                      id="Search"
                      placeholder="Search for..."
                      class="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
                    />

                    <span class="absolute inset-y-0 end-0 grid w-10 place-content-center">
                      <button
                        type="submit"
                        class="text-gray-600 hover:text-gray-700"
                      >
                        <span class="sr-only">Search</span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="h-4 w-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                          />
                        </svg>
                      </button>
                    </span>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex justify-end p-5">
              <label htmlFor="SortBy" className="sr-only">
                SortBy
              </label>

              <select
                onChange={(e) => setSortBy(e.target.value)}
                id="SortBy"
                className="h-10 rounded border-gray-300 text-sm"
              >
                <option defaultValue={"all"} value="all">
                  All
                </option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="delivered">Delivered</option>
                <option value="confirmed">Confirmed</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
          </div>
          {finalData?.length > 0 ? (
            <>
              {finalData?.map((order) => (
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
                      <div className="flex gap-2 flex-wrap">
                        {" "}
                        <strong class="rounded border border-green-500 bg-green-500 px-3 py-1 text-[12px] font-medium text-white">
                          Order id: #IP-{order._id.slice(5, 10).toUpperCase()}
                        </strong>
                        <strong class="rounded border border-green-500 bg-green-500 px-3 py-1 text-[12px] font-medium text-white">
                          Customer name : {order?.customerName}
                        </strong>
                        <strong class="rounded border border-green-500 bg-green-500 px-3 py-1 text-[12px] font-medium text-white">
                          Phone number : {order?.phone}
                        </strong>
                        <strong class="rounded border border-green-500 bg-green-500 px-3 py-1 text-[12px] font-medium text-white">
                          Email: {order.email}
                        </strong>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {order?.orders?.map((item) => (
                          <div class="">
                            <div class="flex items-center ">
                              <div>
                                {" "}
                                <img
                                  src={item?.image}
                                  alt=""
                                  class="h-24 w-24 object-cover rounded-lg"
                                />
                              </div>

                              <div className="px-3">
                                <p>
                                  <a href="#" class="hover:underline">
                                    {item?.name}
                                  </a>
                                </p>
                                <p class="text-sm font-medium ">
                                  Price:{" "}
                                  {item?.price *
                                    (1 - item?.discount / 100).toFixed(0)}{" "}
                                  ৳
                                </p>
                                <p class="text-sm font-medium">
                                  Quantity: {item?.quantity}
                                </p>
                                <p class="text-sm font-medium">
                                  Size long: {item?.long}
                                </p>
                                <p class="text-sm font-medium">
                                  Size body: {item?.body}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <p class="mt-1 text-sm text-gray-700">
                        {order?.description}
                      </p>

                      <div>
                        <p class="text-md font-medium my-2">
                          Total:
                          {order?.orders
                            ?.reduce(
                              (total, item) =>
                                total +
                                item.price *
                                  item.quantity *
                                  (1 - item.discount / 100),
                              0
                            )
                            .toFixed(0)}
                          ৳
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 items-center">
                        <div>
                          <button
                            className={` ${
                              order?.orderStatus.toLowerCase() == "canceled"
                                ? "bg-red-100 text-red-400"
                                : "bg-green-100 text-green-400"
                            }  text-[13px]   px-2 py-1  rounded-md cursor-auto`}
                          >
                            {order?.orderStatus.toUpperCase()}
                          </button>
                        </div>
                        <form
                          className="lg:flex  items-center"
                          onSubmit={(e) =>
                            handleStatus(order?._id, e.target.value)
                          }
                        >
                          <div className="form-control  ">
                            <select
                              onChange={(e) => {
                                handleStatus(order?._id, e.target.value);
                                setSelectedStatus(e.target.value);
                              }}
                              name="status"
                              className="text-[13px] rounded-md w-28  bg-white dark:bg-black outline-none focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-700 focus:border-transparent "
                            >
                              <option
                                defaultValue={order?.orderStatus.toUpperCase()}
                                className="text-black dark:text-white"
                              >
                                {order?.orderStatus}
                              </option>
                              {order?.orderStatus.toLowerCase() !==
                                "pending" && (
                                <option className="text-black dark:text-white">
                                  Pending
                                </option>
                              )}
                              {order?.orderStatus.toLowerCase() !==
                                "processing" && (
                                <option className="text-black dark:text-white">
                                  Processing
                                </option>
                              )}
                              {order?.orderStatus.toLowerCase() !==
                                "confirmed" && (
                                <option className="text-black dark:text-white">
                                  Confirmed
                                </option>
                              )}
                              {order?.orderStatus.toLowerCase() !==
                                "delivered" && (
                                <option className="text-black dark:text-white">
                                  Delivered
                                </option>
                              )}
                              {order?.orderStatus.toLowerCase() !==
                                "canceled" && (
                                <option className="text-black dark:text-white">
                                  Canceled
                                </option>
                              )}
                            </select>
                          </div>
                        </form>
                      </div>
                      <div className="my-2">
                        <h2 className="text-[12px]">
                          Customer address: {order?.deliveryAddress}
                        </h2>
                      </div>
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

                          <button
                            onClick={() => handleDelete(order?._id)}
                            className="bg-red-600  text-white text-[13px]  transition-all hover:btn-outline px-2 py-1 mx-2 rounded-md"
                          >
                            Delete
                          </button>
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
            </>
          ) : (
            <>
              <div className="flex justify-center ">
                <h2 className="text-4xl font-bold text-gray-200">
                  No Order found
                </h2>
              </div>
            </>
          )}
        </div>
      ) : (
        <Navigate to="/dashboard" />
      )}
    </div>
  );
}
