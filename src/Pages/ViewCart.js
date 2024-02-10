import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "@tanstack/react-query";
import swal from "sweetalert";
import auth from "../firebase.init";
import Navbar from "../Components/Shared/Navbar";
import { Link } from "react-router-dom";

export default function ViewCart() {
  const [user] = useAuthState(auth);

  const email = user?.email;

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: () =>
      fetch(`https://frantic-crab-cape.cyclic.app/api/cart/${email}`).then(
        (res) => res.json()
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
    fetch(`https://frantic-crab-cape.cyclic.app/api/cart/${id}`, {
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
        orderDate: product?.orderDate,
        orderTime: product?.orderTime,
        orderStatus: product?.orderStatus,
        email: user?.email,
      });
    });

    // Check quantity for each product
    for (const product of orderData) {
      if (product.quantity <= 0) {
        swal("Error!", "Quantity must be greater than 0!", "error");
        return;
      }
    }

    // Check if deliveryAddress is empty
    if (orderData.length === 0 || orderData[0].deliveryAddress === "") {
      swal("Error!", "Delivery Address is required!", "error");
      return;
    }
    fetch("https://frantic-crab-cape.cyclic.app/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: orderData }),
    }).then((res) => {
      if (res.ok) {
        swal("Success!", "Product added to cart!", "success");
      }
    });
  };

  const subTotal = cartProducts?.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const vat = subTotal * 0.2;
  const discount = subTotal * 0.1;
  const total = subTotal + vat - discount;

  return (
    <div>
      <Navbar />

      <section>
        <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div class="mx-auto max-w-3xl">
            <header class="text-center">
              <h1 class="text-xl font-bold text-gray-900 dark:text-gray-200 sm:text-3xl">
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
            <div class="mt-8">
              <ul class="space-y-4">
                {cartProducts?.map((product, index) => (
                  <>
                    <li class="flex items-center gap-4" key={index}>
                      <img
                        src={product?.image}
                        alt=""
                        class="h-16 w-16 rounded object-cover"
                      />

                      <div>
                        <h3 class="text-sm text-gray-900 dark:text-gray-200">
                          {product?.name}
                        </h3>

                        <dl class="mt-0.5 space-y-px text-[10px] text-gray-600 dark:text-gray-300">
                          <div>
                            <dt class="inline">দাম: </dt>
                            <dd class="inline">৳{product?.price}</dd>
                          </div>

                          <div>
                            <dt class="inline">পরিমাণ: </dt>
                            <dd class="inline">{product?.quantity}</dd>
                          </div>
                        </dl>
                      </div>
                      <div>
                        <h3 class="text-sm text-gray-900 dark:text-gray-200">
                          ক্রেতার তথ্য
                        </h3>

                        <dl class="mt-0.5 space-y-px text-[10px] text-gray-600 dark:text-gray-300">
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
                      </div>

                      <div class="flex flex-1 items-center justify-end gap-2">
                        <>
                          <button
                            class="text-gray-600 dark:text-gray-200 transition hover:text-red-600 dark:hover:text-red-600"
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
                    </li>
                  </>
                ))}
              </ul>

              <div class="mt-8 flex justify-end border-t border-gray-100 dark:border-gray-800 pt-8">
                <div class="w-screen max-w-lg space-y-4">
                  <dl class="space-y-0.5 text-sm text-gray-700 dark:text-gray-300">
                    <div class="flex justify-between">
                      <dt>সাবটোটাল</dt>
                      <dd>৳{subTotal}</dd>
                    </div>

                    <div class="flex justify-between">
                      <dt>ভ্যাট</dt>
                      <dd>৳{vat}</dd>
                    </div>

                    <div class="flex justify-between">
                      <dt>ডিস্কাউন্ট</dt>
                      <dd>-৳{discount}</dd>
                    </div>

                    <div class="flex justify-between !text-base font-medium">
                      <dt>মোট</dt>
                      <dd>৳{total}</dd>
                    </div>
                  </dl>

                  <div class="flex justify-end">
                    <span class="inline-flex items-center justify-center rounded-full bg-green-100 dark:bg-green-200 px-2.5 py-0.5 text-green-500 dark:text-green-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="-ms-1 me-1.5 h-4 w-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                        />
                      </svg>

                      {/* <p class="whitespace-nowrap text-xs">
                        2 Discounts Applied
                      </p> */}
                    </span>
                  </div>

                  <div class="flex justify-end">
                    <form class="mt-8" onSubmit={handleOrder}>
                      <fieldset>
                        <div class="mt-8 flex gap-4">
                          <label for="quantity" class="sr-only">
                            পরিমাণ
                          </label>

                          <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min="1"
                            required
                            defaultValue="1"
                            placeholder="Qty"
                            class="w-12 rounded text-black dark:text-white bg-white border-gray-300 dark:border-gray-800 dark:bg-black py-3 text-center text-xs [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                          />

                          <input
                            type="text"
                            name="address"
                            required
                            placeholder="ডেলিভারী ঠিকানা"
                            className="inline-block w-96 rounded  py-3 text-center text-xs focus:outline-none focus:ring-0 text-black dark:text-white bg-white border-gray-300 dark:border-gray-800 dark:bg-black"
                          />

                          <input
                            type="submit"
                            value="অর্ডার করুন"
                            class="inline-flex items-center pointer justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 "
                          />
                        </div>
                      </fieldset>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
