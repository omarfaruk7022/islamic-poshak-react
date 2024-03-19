import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import avatar from "../../assets/images/avatar.jpg";

export default function ReviewsComp() {
  const [user, loading] = useAuthState(auth);
  const [finalData, setFinalData] = useState([]);
  const email = user?.email;

  const reviewsQuery = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      fetch("http://api.islamicposhak.com/api/reviews").then((res) =>
        res.json()
      ),
  });

  const reviews = reviewsQuery?.data;
  const refetch = () => {
    reviewsQuery.refetch();
  };

  if (reviews?.data?.length < 0) {
    refetch();
  }

  console.log(reviews?.data);

  return (
    <div>
      <section class="bg-white">
        <div class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <h2 class="text-center text-2xl font-bold tracking-tight text-gray-900 ">
            আমাদের সম্মানীত ক্রেতাগণ দের দেয়া রিভিউ
          </h2>

          <div class="mt-8 [column-fill:_balance] sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8">
            {reviews?.data?.map((review) =>
              review?.status == true ? (
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
                          Customer
                        </p>
                        <p class="mt-0.5 text-[13px] font-medium text-gray-900">
                          {review?.email}
                        </p>
                      </div>
                    </div>

                    <p class="mt-4 text-gray-700">{review?.review}</p>
                  </blockquote>
                </div>
              ) : (
                " "
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
