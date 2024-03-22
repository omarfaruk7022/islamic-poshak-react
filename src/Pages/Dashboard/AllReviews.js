import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import avatar from "../../assets/images/avatar.jpg";
import auth from "../../firebase.init";
import Loader from "../../Components/Common/Loader";
import useAdmin from "../../Components/Shared/useAdmin";
import { useNavigate } from "react-router-dom";

export default function AllReviews() {
  const [user, loading] = useAuthState(auth);
  const [finalData, setFinalData] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [admin, adminLoading] = useAdmin(user);
  const navigate = useNavigate();
  const reviewsQuery = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      fetch("http://localhost:5000/api/reviews").then((res) => res.json()),
  });
  const ordersQuery = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch("http://localhost:5000/api/order", {
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
          ContentType: "application/json",
        },
      }).then((res) => res.json()),
  });
  const reviews = reviewsQuery?.data;
  const orders = ordersQuery?.data;
  const loadingReviews = reviewsQuery?.isLoading;
  const loadingOrders = ordersQuery?.isLoading;
  const refetch = () => {
    reviewsQuery.refetch();
    ordersQuery.refetch();
  };

  useEffect(() => {
    refetch();
  }, [ordersQuery]);

  useEffect(() => {
    const reviewsWithOrders = reviews?.data?.map((review) => {
      const order = orders?.data?.find((order) => order._id === review.orderId);
      return {
        ...review,
        order,
      };
    });
    setAllReviews(reviewsWithOrders);
  }, [reviews, orders]);

  if (reviews?.data?.length < 0) {
    refetch();
  }

  useEffect(() => {
    if (allReviews) {
      setFinalData(allReviews);
    }
  }, [allReviews]);

  const handleReviewStatus = async (id) => {
    const response = await fetch(`http://localhost:5000/api/reviews/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: true }),
    });
    const data = await response.json();
    refetch();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.value;
    if (search == "" || search == null || search == undefined) {
      setFinalData(allReviews);
    } else {
      const searchData = allReviews?.filter((user) => {
        return (
          user?.order?.customerName
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          user?.email.toLowerCase().includes(search.toLowerCase())
        );
      });
      setFinalData(searchData);
    }
  };

  const handleReviewDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/api/reviews/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    refetch();
  };

  return (
    <div>
      {adminLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-end m-4">
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
          <div class="mt-8 [column-fill:_balance] sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8 px-5">
            {loadingReviews || loadingOrders ? (
              <Loader />
            ) : (
              <>
                {finalData?.map((review) => (
                  <div class="mb-8 sm:break-inside-avoid">
                    <blockquote class="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
                      <div class="flex items-center gap-4">
                        <img
                          alt=""
                          src={avatar}
                          class="size-14 rounded-full object-cover"
                        />

                        <div>
                          <p class="mt-0.5 text-lg font-medium text-gray-900">
                            {review?.order?.customerName}
                          </p>
                          <p class=" text-[13px] font-medium text-gray-900">
                            {review?.email}
                          </p>
                          <strong class="rounded border border-green-500 bg-green-500 px-3 py-1 text-[12px] font-medium text-white">
                            Order id: #IP-
                            {review?.order?._id.slice(5, 10).toUpperCase()}
                          </strong>
                        </div>
                      </div>

                      <p class="mt-4 text-gray-700">{review?.review}</p>
                      <div className="flex justify-between items-center">
                        {review?.status == false ? (
                          <div class="mt-5">
                            <button
                              onClick={() => {
                                handleReviewStatus(review._id);
                              }}
                              class="bg-red-100 text-red-400
                              text-[13px]   px-2 py-1  rounded-md "
                            >
                              Approve Review
                            </button>
                          </div>
                        ) : (
                          <div className="mt-5">
                            <span
                              class="bg-green-100 text-green-400
                              text-[13px]   px-2 py-1  rounded-md cursor-auto"
                            >
                              Approved
                            </span>
                          </div>
                        )}
                        <div className="mt-5">
                          <span
                            onClick={() => {
                              handleReviewDelete(review._id);
                            }}
                            class="bg-red-100 text-red-400
                              text-[13px]   px-2 py-1  rounded-md cursor-pointer"
                          >
                            Delete
                          </span>
                        </div>
                      </div>
                    </blockquote>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
