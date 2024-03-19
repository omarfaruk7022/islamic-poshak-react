import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import avatar from "../../assets/images/avatar.jpg";
import auth from "../../firebase.init";
import Loader from "../../Components/Common/Loader";

export default function AllReviews() {
  const [user, loading] = useAuthState(auth);
  const [allReviews, setAllReviews] = useState([]);
  const reviewsQuery = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      fetch("http://api.islamicposhak.com/api/reviews").then((res) =>
        res.json()
      ),
  });
  const ordersQuery = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch("http://api.islamicposhak.com/api/order", {
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

  const handleReviewStatus = async (id) => {
    const response = await fetch(
      `http://api.islamicposhak.com/api/reviews/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: true }),
      }
    );
    const data = await response.json();
    refetch();
  };
  console.log("allReviews", allReviews, loadingReviews, loadingOrders);

  return (
    <div>
      <div class="mt-8 [column-fill:_balance] sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8 px-5">
        {loadingReviews || loadingOrders ? (
          <Loader />
        ) : (
          <>
            {allReviews?.map((review) => (
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
                </blockquote>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
