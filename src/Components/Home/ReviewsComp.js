import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import avatar from "../../assets/images/avatar.jpg";

export default function ReviewsComp({ from }) {
  const [user, loading] = useAuthState(auth);
  const [finalData, setFinalData] = useState([]);
  const email = user?.email;

  const reviewsQuery = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      fetch("https://api.islamicposhak.com/api/reviews").then((res) =>
        res.json()
      ),
  });

  const reviews = reviewsQuery?.data;
  useEffect(() => {
    if (reviews?.data) {
      setFinalData(reviews?.data);
    }
  }, [reviews?.data]);
  const refetch = () => {
    reviewsQuery.refetch();
  };

  if (reviews?.data?.length < 0) {
    refetch();
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.value;
    if (search == "" || search == null || search == undefined) {
      setFinalData(reviews?.data);
    } else {
      const searchData = reviews?.data?.filter((user) => {
        return (
          user?.email?.toLowerCase().includes(search.toLowerCase()) ||
          user?.review?.toLowerCase().includes(search.toLowerCase())
        );
      });
      setFinalData(searchData);
    }
  };

  return (
    <div>
      <section class="bg-white">
        <div class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <h2 class="text-center text-2xl font-bold tracking-tight text-gray-900 ">
            আমাদের সম্মানীত ক্রেতাগণ দের দেয়া রিভিউ
          </h2>

          {from === "page" ? (
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
          ) : (
            ""
          )}

          <div class="mt-8 [column-fill:_balance] sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8">
            {finalData?.map((review) =>
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
