import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import auth from "../../firebase.init";

export default function Cart({ visibleRight, setVisibleRight }) {
  const [user] = useAuthState(auth);
  const email = user?.email;

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: () =>
      fetch(`http://api.islamicposhak.com/api/cart/${email}`).then((res) =>
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
    fetch(`http://api.islamicposhak.com/api/cart/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        swal("Deleted!", "Your Product has been deleted!", "success");
        refetch();
      }
    });
  };

  return (
    <>
      <div
        class="w-full max-w-sm  px-4 py-8 sm:px-6 lg:px-2"
        aria-modal="true"
        role="dialog"
        tabindex="-1"
      >
        <div class="mt-4 space-y-6">
          <ul class="space-y-4">
            {cartProducts?.map((product) => (
              <>
                <li class="flex items-center gap-4">
                  <img
                    src={product?.image}
                    alt=""
                    class="h-16 w-16 rounded object-cover"
                  />

                  <div>
                    <Link
                      to={`/productDetails/${product?.productId}`}
                      class="text-sm text-gray-900"
                    >
                      {product?.name}
                    </Link>

                    <dl class="mt-0.5 space-y-px text-[10px] text-gray-600">
                      <div>
                        <dt class="inline">দাম: </dt>
                        <dd class="inline">
                          {parseFloat(
                            product?.price * (1 - product?.discount / 100)
                          ).toFixed(0)}
                          ৳
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div class="flex flex-1 items-center justify-end gap-2">
                    <dl class="mt-0.5 space-y-px text-[10px] text-gray-600">
                      <div>
                        <dt class="inline">পরিমাণ: </dt>
                        <dd class="inline">{product?.quantity}</dd>
                      </div>
                    </dl>

                    <>
                      <button
                        onClick={() => {
                          handleDelete(product?._id);
                        }}
                        class="text-gray-600 transition hover:text-red-600"
                      >
                        <span class="sr-only">রিমোভ করুণ</span>
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

          <div class="space-y-4 text-center">
            <Link
              onClick={() => setVisibleRight(false)}
              to="/viewCart"
              class="inline-flex p-3 items-center justify-center rounded-md bg-green-100 dark:bg-green-200  text-green-500 dark:text-green-600 hover:bg-green-200 hover:text-green-600 transition"
            >
              {/* View my cart */}
              কার্ট দেখুন ({cartProducts?.length})
            </Link>

            <Link
              href={"/products"}
              class="block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
            >
              {/* Continue shopping */}
              শপিং করুন
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
