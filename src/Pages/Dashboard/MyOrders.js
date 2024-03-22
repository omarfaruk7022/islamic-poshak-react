import { useQuery } from "@tanstack/react-query";

import React, { useEffect, useState } from "react";
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
  const [sortBy, setSortBy] = useState("all");
  const [finalData, setFinalData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //   const ordersQuery = useQuery({
  //     queryKey: ["orders"],
  //     queryFn: () =>
  //       fetch("http://localhost:5000/api/cart").then((res) => res.json()),
  //   });

  const getOrders = () => {
    fetch(`http://localhost:5000/api/order/email/${email}`, {
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getOrders();
  }, [email]);
  console.log("finalData", orders);
  // const ordersQuery = useQuery({
  //   queryKey: ["orders"],
  //   queryFn: () =>
  //     fetch(`http://localhost:5000/api/order/email/${email}`, {
  //       headers: {
  //         authorization: `Bearer ${user?.accessToken}`,
  //         "Content-Type": "application/json",
  //       },
  //     }).then((res) => res.json()),
  // });
  // const orders = ordersQuery.data;

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

  if (loading) {
    return <Loader />;
  }
  const handleStatus = (e, id) => {
    e.preventDefault();

    fetch(`http://localhost:5000/api/order/${id}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderStatus: "canceled" }),
    })
      .then((res) => res.json())
      .then((data) => {
        swal("Updated!", "Your Order Status has been updated!", "success");
      });
  };

  // const handleDelete = (id) => {
  //   swal({
  //     title: `Delete your Order?`,
  //     text: `Are you sure that you want to Delete your order?`,
  //     icon: "warning",
  //     dangerMode: true,
  //   }).then((willDelete) => {
  //     if (willDelete) {
  //       fetch(`http://localhost:5000/api/order/${id}`, {
  //         headers: {
  //           authorization: `Bearer ${user?.accessToken}`,
  //           "Content-Type": "application/json",
  //         },
  //         method: "DELETE",
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           swal("Deleted!", `This your order has been deleted!`, "success");

  //           refetch();
  //         });
  //     }
  //   });
  // };
  // const handleShow = (id) => {
  //   setVisible(true);
  //   setSelectedItemId(id);
  // };

  const handleReview = async (e, id) => {
    e.preventDefault();
    const review = e.target.review.value;
    if (review == "") {
      swal("Review is Empty", "Please write a review!", "error");
      return;
    }
    // fetch(`http://localhost:5000/api/order/${id}`, {
    //   method: "PATCH",
    //   headers: {
    //     authorization: `Bearer ${user?.accessToken}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     review: {
    //       status: false,
    //       review: review,
    //     },
    //   }),
    // });
    try {
      const response = await fetch(`http://localhost:5000/api/order/${id}`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review: {
            status: false,
            review: review,
          },
        }),
      });

      if (response.ok) {
        const raw = {
          email: user?.email,
          review: review,
          orderId: id,
          status: false,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
        };
        console.log(raw);
        try {
          const reviewResponse = await fetch(
            `http://localhost:5000/api/reviews`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(raw),
            }
          );

          if (reviewResponse.ok) {
            swal("Review Added", "Your Review has been added!", "success");
            e.target.reset();
          }

          const reviewResponseData = await reviewResponse.json();
          return reviewResponseData;
        } catch (error) {
          console.error("Error updating order review:", error);
          return { error: error.message }; // Return error message
        }
      }

      const responseData = await response.json();
      return responseData; // Return the response data
    } catch (error) {
      console.error("Error updating order review:", error);
      return { error: error.message }; // Return error message
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.value;
    if (search) {
      const searchData = orders?.data?.filter((order) => {
        return (
          order?.orderStatus.toLowerCase().includes(search.toLowerCase()) ||
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
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
                <article class="rounded-xl bg-white p-4 ring ring-green-50 sm:p-6 lg:p-8 m-5 flex justify-between">
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
                        Order id: #IP-{order._id.slice(5, 10).toUpperCase()}
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
                                <p class="text-sm font-medium ">
                                  Price:{" "}
                                  {item?.price *
                                    (1 - item?.discount / 100).toFixed(0)}
                                </p>
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
                      </div>
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

                      <div className="pb-5 flex flex-wrap items-center gap-2">
                        <button
                          className={` ${
                            order?.orderStatus.toLowerCase() == "canceled"
                              ? "bg-red-100 text-red-400"
                              : "bg-green-100 text-green-400"
                          }  text-[13px]   px-2 py-1  rounded-md cursor-auto`}
                        >
                          {order?.orderStatus.toUpperCase()}
                        </button>
                        {order?.orderStatus?.toLowerCase() == "pending" ? (
                          <>
                            <button
                              onClick={(e) => handleStatus(e, order._id)}
                              className="bg-red-500 text-white text-[13px]   px-2 py-1  rounded-md"
                            >
                              Cancel Order
                            </button>
                          </>
                        ) : (
                          ""
                        )}
                      </div>

                      <div class="sm:flex sm:items-center sm:gap-2">
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
                      </div>
                      {order?.review?.review ? (
                        <p>
                          <strong>Review:</strong> {order?.review?.review}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div>
                    {order?.orderStatus?.toUpperCase() == "DELIVERED" &&
                    order?.review?.review == "" ? (
                      <div class="mt-6 flex justify-end gap-2">
                        <button
                          onClick={() =>
                            document.getElementById("my_modal_3").showModal()
                          }
                          class="bg-green-100 text-green-400 text-[15px]   px-2 py-1  rounded-md cursor-pointer"
                        >
                          Review
                        </button>
                        {/* You can open the modal using document.getElementById('ID').showModal() method */}

                        <dialog id="my_modal_3" className="modal">
                          <div className="modal-box">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal */}
                              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                              </button>
                            </form>
                            <h3 className="font-bold text-lg">Thanks </h3>
                            <p className="py-4">
                              You can give a review to improve our service
                            </p>

                            <div>
                              <label
                                for="OrderNotes"
                                class="block text-sm font-medium text-gray-700"
                              >
                                {" "}
                                Review{" "}
                              </label>

                              <form
                                onSubmit={(e) => handleReview(e, order?._id)}
                              >
                                <textarea
                                  id="OrderNotes"
                                  name="review"
                                  class="mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm"
                                  rows="4"
                                  placeholder="Enter any additional order notes..."
                                ></textarea>
                                <button
                                  type="submit"
                                  class="bg-green-100 text-green-400 text-[17px]   px-3 py-2  rounded-md cursor-pointer float-end mt-4 hover:bg-green-500 hover:text-white"
                                >
                                  Submit
                                </button>
                              </form>
                            </div>
                          </div>
                        </dialog>
                        {/* <button
                    onClick={() => handleShow(order._id)}
                    class="bg-green-100 text-green-400 text-[15px]   px-2 py-1  rounded-md cursor-auto"
                  >
                    Download invoice
                  </button> */}
                      </div>
                    ) : (
                      ""
                    )}
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
        </>
      )}
    </div>
  );
}
