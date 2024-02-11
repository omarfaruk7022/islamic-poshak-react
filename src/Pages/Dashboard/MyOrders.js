import { useQuery } from "@tanstack/react-query";

import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import swal from "sweetalert";
import cross from "../../assets/images/close.png";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loader from "../../Components/Common/Loader";

export default function MyOrders() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const email = user?.email;

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
  console.log(orders);
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
  return (
    <div>
      <>
        <div className="overflow-x-auto overflow-auto   p-5">
          <table className="min-w-full divide-y-2 divide-gray-100 dark:divide-gray-800 text-sm ">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900">
                  Image
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 ">
                  Product name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 ">
                  Price
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 ">
                  Quantity
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 ">
                  Ordered by
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 ">
                  Delivery Address
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 ">
                  Order Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 ">
                  View
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 ">
                  Action
                </th>
              </tr>
            </thead>
            {orders?.data?.map((order) => (
              <>
                <tbody className="divide-y divide-gray-200 overflow-auto ">
                  <tr>
                    <td className="">
                      <img
                        src={order?.image}
                        alt=""
                        className="rounded-md w-[40px]"
                      ></img>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
                      {order?.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
                      {order?.price}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
                      {order?.quantity}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
                      {order?.email}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
                      {order?.deliveryAddress}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
                      {order?.orderTime} , {order?.orderDate}
                    </td>
                    {/* <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
                      <form
                        className="lg:flex  items-center"
                          onSubmit={(e) => handleStatus(e, order?._id)}
                      >
                        <div className="form-control  ">
                          <select
                            onChange={(e) =>
                              handleStatus(e, order?._id, e.target.value)
                            }
                            name="status"
                            className="text-[13px] rounded-md w-28 h-10 bg-white dark:bg-black outline-none focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-700 focus:border-transparent "
                          >
                            <option
                              className="text-black dark:text-white"
                              default
                            >
                              {order?.orderStatus}
                            </option>

                            {order?.orderStatus !== "Pending" && (
                              <option className="text-black dark:text-white">
                                Pending
                              </option>
                            )}
                            {order?.orderStatus !== "Processing" && (
                              <option className="text-black dark:text-white">
                                Processing
                              </option>
                            )}
                            {order?.orderStatus !== "Confirmed" && (
                              <option className="text-black dark:text-white">
                                Confirmed
                              </option>
                            )}
                            {order?.orderStatus !== "Delivered" && (
                              <option className="text-black dark:text-white">
                                Delivered
                              </option>
                            )}
                            {order?.orderStatus !== "Canceled" && (
                              <option className="text-black dark:text-white">
                                Canceled
                              </option>
                            )}
                          </select>
                        </div>
                      </form>
                    </td> */}
                    {/* <td>
                      <div className="ml-2">
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded-md"
                          onClick={() =>
                            router.push(`/dashboard/order/${order?._id}`)
                          }
                        >
                          View
                        </button>
                      </div>
                    </td> */}
                    <td>
                      {order?.orderStatus == "Pending" ||
                      order?.orderStatus == "Processing" ? (
                        <div className="ml-2">
                          <button
                            className="bg-red-500 text-white px-2 py-1 rounded-md"
                            onClick={(e) => handleStatus(e, order?._id)}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        order?.orderStatus
                      )}
                    </td>
                  </tr>
                </tbody>
              </>
            ))}
          </table>
        </div>
      </>

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
