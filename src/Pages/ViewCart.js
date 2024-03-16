import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "@tanstack/react-query";
import swal from "sweetalert";
import auth from "../firebase.init";
import Navbar from "../Components/Shared/Navbar";
import { Link, useNavigate } from "react-router-dom";

export default function ViewCart() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const email = user?.email;

  const usersData = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch(`https://api.islamicposhak.com/api/users/`).then((res) =>
        res.json()
      ),
  });

  const users = usersData.data;
  const isAdmin = users?.data?.find((user) => user.email == email);
  console.log("isAdmin", isAdmin);
  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: () =>
      fetch(`https://api.islamicposhak.com/api/cart/${email}`).then((res) =>
        res.json()
      ),
  });
  const refetch = () => {
    cartQuery.refetch();
  };
  const cartProducts = cartQuery.data?.data;

  useEffect(() => {
    if (!cartProducts) {
      refetch();
    }
  });

  const handleDelete = (id) => {
    fetch(`https://api.islamicposhak.com/api/cart/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        refetch();
      }
    });
  };

  // const handleOrder = (e) => {
  //   e.preventDefault();
  //   let orders = [];
  //   cartProducts?.map((product) => {
  //     orderData.push({
  //       name: product?.name,
  //       price: product?.price,
  //       image: product?.image,
  //       quantity: e.target.quantity.value,
  //       deliveryAddress: e.target.address.value,
  //       orderDate: product?.orderDate,
  //       orderTime: product?.orderTime,
  //       orderStatus: product?.orderStatus,
  //       email: user?.email,
  //     });
  //   });
  //   if (orderData.quantity <= 0) {
  //     swal("Error!", "Quantity must be greater than 0!", "error");
  //     return;
  //   }
  //   if (orderData.deliveryAddress === "") {
  //     swal("Error!", "Delivery Address is required!", "error");
  //     return;
  //   }
  const handleMinus = (id) => {
    const quantity = cartProducts?.find(
      (product) => product?._id === id
    )?.quantity;
    fetch(`https://api.islamicposhak.com/api/cart/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: quantity - 1 < 0 ? "" : quantity - 1 }),
    }).then((res) => {
      if (res.ok) {
        refetch();
      }
    });
  };
  const handlePlus = (id) => {
    const quantity = cartProducts?.find(
      (product) => product?._id === id
    )?.quantity;
    fetch(`https://api.islamicposhak.com/api/cart/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: quantity + 1 }),
    }).then((res) => {
      if (res.ok) {
        refetch();
      }
    });
  };
  const handleOrder = (e) => {
    e.preventDefault();
    let orderData = [];
    cartProducts?.map((product) => {
      orderData.push({
        name: product?.name,
        price: product?.price,
        image: product?.image,
        quantity: product?.quantity,
        deliveryAddress: e.target.address.value,
        orderDate: new Date().toLocaleDateString(),
        orderTime: new Date().toLocaleTimeString(),
        orderStatus: "pending",
        email: user?.email,
        phone: isAdmin?.phone,
        customerName: isAdmin?.username,
        discount: product?.discount,
        long: product?.long ? product?.long : e.target.long?.value,
        body: product?.body ? product?.body : e.target.body?.value,
        review: {
          status: false,
          review: "",
        },
      });
    });

    console.log("orderData", orderData);
    // Check quantity for each product
    for (const product of orderData) {
      if (product.quantity <= 0) {
        swal("Error!", "Quantity must be greater than 0!", "error");
        return;
      }
      if (product.long === "Select long") {
        swal("Error!", "Long is required!", "error");
        return;
      }
      if (product.body === "Select body") {
        swal("Error!", "Body is required!", "error");
        return;
      }
    }

    // Check if deliveryAddress is empty
    if (orderData.length === 0 || orderData[0].deliveryAddress === "") {
      swal("Error!", "Delivery Address is required!", "error");
      return;
    }
    fetch("https://api.islamicposhak.com/api/order", {
      method: "POST",
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: orderData }),
    }).then((res) => {
      if (res.ok) {
        swal("Success!", "Product successfully ordered!", "success");
        navigate("/thankyou");
        // the carts all data will be deleted
        fetch(`https://api.islamicposhak.com/api/cart/email/${email}`, {
          method: "DELETE",
        }).then((res) => {
          if (res.ok) {
            refetch();
          }
        });
      }
    });
  };
  const subTotal = cartProducts?.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const vat = 0;
  const discount = cartProducts?.reduce((acc, item) => {
    return acc + (item.price * item?.discount) / 100;
  }, 0);
  const total = subTotal + vat - discount;
  console.log("discount", total);

  const longs = [
    "Select long",
    "5'0",
    "5'1",
    "5'2",
    "5'3",
    "5'4",
    "5'5",
    "5'6",
    "5'7",
    "5'8",
  ];
  const bodys = [
    "Select body",
    "30 Inch",
    "32 Inch",
    "34 Inch",
    "36 Inch",
    "38 Inch",
    "40 Inch",
    "42 Inch",
    "44 Inch",
    "46 Inch",
    "48 Inch",
  ];

  return (
    <div>
      <section>
        <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div class="mx-auto max-w-3xl">
            <header class="text-center">
              <h1 class="text-xl font-bold text-gray-900  sm:text-3xl">
                আপনার কার্ট
              </h1>
            </header>
            {cartProducts?.length === 0 && (
              <>
                <h4 className="text-center text-[50px] opacity-10 my-20">
                  আপনার কার্ট খালি
                </h4>
                <Link
                  to={"/products"}
                  className="text-blue-500 underline text-sm flex justify-end"
                >
                  {/* Go to products */}
                  পণ্যে যান
                </Link>
              </>
            )}
            <form class="mt-8 w-full" onSubmit={handleOrder}>
              <div class="mt-8">
                <ul class="space-y-4">
                  {cartProducts?.map((product, index) => (
                    <>
                      <li class="gap-4" key={index}>
                        <div className="grid grid-cols-2">
                          <div className="flex gap-5 flex-wrap">
                            <img
                              src={product?.image}
                              alt=""
                              class="h-20 w-20 rounded object-cover"
                            />

                            <dl class="mt-0.5 space-y-px text-[10px] text-gray-600 ">
                              <h3 class="text-sm text-gray-900 ">
                                {product?.name}
                              </h3>
                              <div>
                                <dt class="inline">দাম: </dt>
                                <dd class="inline">
                                  ৳{product?.price} x {product?.quantity}
                                </dd>
                              </div>

                              <div>
                                <dt class="inline">পরিমাণ: </dt>
                                <dd class="inline">{product?.quantity}</dd>
                              </div>
                              <div>
                                <dt class="inline">সাইজ লং: </dt>
                                {product?.long ? (
                                  <dd class="inline">{product?.long}</dd>
                                ) : (
                                  <select
                                    name="long"
                                    className="text-[13px] p-1 rounded-md w-full  bg-white dark:bg-black outline-none focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-700 focus:border-transparent "
                                  >
                                    {longs.map((long) => (
                                      <option value={long}>{long}</option>
                                    ))}
                                  </select>
                                )}
                              </div>
                              <div>
                                <dt class="inline">সাইজ বডি: </dt>
                                {product?.body ? (
                                  <dd class="inline">{product?.body}</dd>
                                ) : (
                                  <select
                                    name="body"
                                    className="text-[13px] p-1 rounded-md w-full  bg-white dark:bg-black outline-none focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-700 focus:border-transparent "
                                  >
                                    {bodys.map((body) => (
                                      <option value={body}>{body}</option>
                                    ))}
                                  </select>
                                )}
                              </div>
                            </dl>
                          </div>
                          {/* <div>
                          <h3 class="text-sm text-gray-900 ">ক্রেতার তথ্য</h3>

                          <dl class="mt-0.5 space-y-px text-[10px] text-gray-600 ">
                            <div>
                              <dt class="inline">ডেলিভারী ঠিকনা: </dt>
                              <dd className="inline">
                                {product?.deliveryAddress}
                              </dd>
                            </div>

                            <div>
                              <dt class="inline">অর্ডার তারিখ: </dt>
                              <dd class="inline">
                                {product?.orderTime},{product?.orderDate}
                              </dd>
                            </div>
                          </dl>
                        </div> */}
                          <div className="flex  gap-10">
                            <div className="flex items-center rounded border border-gray-200">
                              <button
                                type="button"
                                onClick={() => {
                                  handleMinus(product?._id);
                                }}
                                className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                              >
                                &minus;
                              </button>

                              <input
                                type="number"
                                id="Quantity"
                                value={product?.quantity}
                                className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                              />

                              <button
                                type="button"
                                onClick={() => {
                                  handlePlus(product?._id);
                                }}
                                className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                              >
                                &#43;
                              </button>
                            </div>
                            <div class="flex flex-1 justify-end items-center gap-2">
                              <>
                                <button
                                  class="text-gray-600  transition hover:text-red-600 dark:hover:text-red-600"
                                  onClick={() => {
                                    handleDelete(product?._id);
                                  }}
                                >
                                  <span class="sr-only">রিমোভ করুন</span>

                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="h-5 w-5"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                                </button>
                              </>
                            </div>
                          </div>
                        </div>
                      </li>
                    </>
                  ))}
                </ul>

                <div class="mt-8 flex justify-end border-t border-gray-100  pt-8 gap-10">
                  <div class="w-screen max-w-lg space-y-4">
                    <dl class="space-y-0.5 text-sm text-gray-700 ">
                      <div class="flex justify-between">
                        <dt>সাবটোটাল</dt>
                        <dd>৳{subTotal?.toFixed(0)}</dd>
                      </div>

                      <div class="flex justify-between">
                        <dt>ভ্যাট</dt>
                        <dd>৳{vat?.toFixed(0)}</dd>
                      </div>

                      <div class="flex justify-between">
                        <dt>ডিস্কাউন্ট</dt>
                        <dd>-৳{discount?.toFixed(0)}</dd>
                      </div>

                      <div class="flex justify-between !text-base font-medium">
                        <dt>মোট</dt>
                        <dd>৳{total?.toFixed(0)}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div class=" ">
                  <fieldset>
                    <div class="mt-8  ">
                      {/* <input
                            type="textarea"
                            name="address"
                            required
                            placeholder="ডেলিভারী ঠিকানা"
                            className="inline-block w-96 rounded  py-3 text-center text-xs focus:outline-none focus:ring-0 text-black d bg-white border-gray-300 "
                          /> */}
                      <div>
                        <label
                          htmlFor="OrderNotes"
                          className="block text-sm font-medium text-gray-700 "
                        >
                          {" "}
                          Order notes{" "}
                        </label>

                        <textarea
                          id="OrderNotes"
                          name="address"
                          className="mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm "
                          rows="4"
                          placeholder="Enter any additional order notes..."
                        ></textarea>
                      </div>

                      <div>
                        {" "}
                        <input
                          type="submit"
                          value="অর্ডার কনফার্ম করুন"
                          class="cursor-pointer px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 float-right mt-5"
                        />
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
