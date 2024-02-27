import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../firebase.init";
import ProductsCard from "../Components/Common/ProductCard";
import Loader from "../Components/Common/Loader";

// export async function getStaticProps() {
//   const products = await loadProducts();
//   return {
//     props: {
//       products,
//     },
//   };
// }

export default function AllProducts() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [sortBy, setSortBy] = useState("");
  const [availability, setAvailability] = useState("");

  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("http://localhost:5000/api/product").then((res) => res.json()),
  });

  const allProducts = data?.data;
  const sortedData = allProducts?.filter(
    (product) => product?.category == sortBy
  );
  const availableProducts = allProducts?.filter(
    (product) => product?.status == availability
  );

  const finalData = [];

  // for (let i = 0; i < 1; i++) {
  //   finalData.push({
  //     ...sortedData[i],
  //     ...availableProducts[i],
  //   });
  // }

  console.log(sortedData);
  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <>
        <h4 className="text-3xl text-center pt-10">আমাদের সকল প্রোডাক্টস</h4>
        {/* <div className="grid grid-cols-2 gap-3  md:grid-cols-3 lg:grid-cols-6 px-0 lg:px-36">
          {data?.data.map((product) => (
            <ProductsCard key={product._id} product={product} />
          ))}
        </div> */}
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <header>
              <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Product Collection
              </h2>

              <p className="mt-4 max-w-md text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
                praesentium cumque iure dicta incidunt est ipsam, officia dolor
                fugit natus?
              </p>
            </header>

            <div className="mt-8 sm:flex sm:items-center sm:justify-between">
              {/* <div className="block sm:hidden">
                <button className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                  <span className="text-sm font-medium">
                    {" "}
                    Filters & Sorting{" "}
                  </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4 rtl:rotate-180"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div> */}

              <div className="mb-5 sm:mb-0 block sm:flex items-center gap-2">
                <div className="relative">
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                      <span className="text-sm font-medium">
                        {" "}
                        Availability{" "}
                      </span>

                      <span className="transition group-open:-rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </span>
                    </summary>

                    <div className="z-50 group-open:absolute group-open:top-auto group-open:mt-2 ltr:group-open:start-0">
                      <div className="w-96 rounded border border-gray-200 bg-white">
                        <header className="flex items-center justify-between p-4">
                          <span className="text-sm text-gray-700">
                            {" "}
                            0 Selected{" "}
                          </span>

                          <button
                            onClick={() => setAvailability("")}
                            type="button"
                            className="text-sm text-gray-900 underline underline-offset-4"
                          >
                            Reset
                          </button>
                        </header>

                        <ul className="space-y-1 border-t border-gray-200 p-4">
                          <li>
                            <label
                              htmlFor="FilterInStock"
                              className="inline-flex items-center gap-2"
                            >
                              <input
                                onChange={(e) =>
                                  setAvailability(e.target.value)
                                }
                                type="checkbox"
                                value={"in-stock"}
                                id="FilterInStock"
                                className="size-5 rounded border-gray-300"
                              />

                              <span className="text-sm font-medium text-gray-700">
                                {" "}
                                In Stock
                              </span>
                            </label>
                          </li>

                          <li>
                            <label
                              htmlFor="FilterOutOfStock"
                              className="inline-flex items-center gap-2"
                            >
                              <input
                                onChange={(e) =>
                                  setAvailability(e.target.value)
                                }
                                type="checkbox"
                                id="FilterOutOfStock"
                                value={"out-of-stock"}
                                className="size-5 rounded border-gray-300"
                              />

                              <span className="text-sm font-medium text-gray-700">
                                {" "}
                                Out of Stock
                              </span>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </details>
                </div>

                <div className="relative mt-5 sm:mt-0 ">
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                      <span className="text-sm font-medium"> Price </span>

                      <span className="transition group-open:-rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </span>
                    </summary>

                    <div className="z-50 group-open:absolute group-open:top-auto group-open:mt-2 ltr:group-open:start-0">
                      <div className="w-96 rounded border border-gray-200 bg-white">
                        <header className="flex items-center justify-between p-4">
                          <span className="text-sm text-gray-700">
                            {" "}
                            The highest price is $600{" "}
                          </span>

                          <button
                            type="button"
                            className="text-sm text-gray-900 underline underline-offset-4"
                          >
                            Reset
                          </button>
                        </header>

                        <div className="border-t border-gray-200 p-4">
                          <div className="flex justify-between gap-4">
                            <label
                              htmlFor="FilterPriceFrom"
                              className="flex items-center gap-2"
                            >
                              <span className="text-sm text-gray-600">$</span>

                              <input
                                type="number"
                                id="FilterPriceFrom"
                                placeholder="From"
                                className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                              />
                            </label>

                            <label
                              htmlFor="FilterPriceTo"
                              className="flex items-center gap-2"
                            >
                              <span className="text-sm text-gray-600">$</span>

                              <input
                                type="number"
                                id="FilterPriceTo"
                                placeholder="To"
                                className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </details>
                </div>
              </div>

              <div className="">
                <label htmlFor="SortBy" className="sr-only">
                  SortBy
                </label>

                <select
                  onChange={(e) => setSortBy(e.target.value)}
                  id="SortBy"
                  className="h-10 rounded border-gray-300 text-sm"
                >
                  <option>Sort By</option>
                  <option value="Borka">Borka</option>
                  <option value="Hijab">Hijab</option>
                  <option value="Abaya">Abaya</option>
                </select>
              </div>
            </div>

            <ul className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {sortedData?.length > 0
                ? sortedData?.map((product) => (
                    // <ProductsCard key={product._id} product={product} />
                    <li>
                      <Link
                        to={`/productDetails/${product?._id}`}
                        className="group block overflow-hidden"
                      >
                        <img
                          src={product?.image}
                          alt=""
                          className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                        />

                        <div className="relative bg-white pt-3">
                          <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                            {product?.name}
                          </h3>

                          <p className="mt-2 flex justify-between">
                            <span className="sr-only"> Regular Price </span>

                            <span className="tracking-wider text-gray-900">
                              {" "}
                              {product?.price *
                                (1 - product?.discount / 100)}৳{" "}
                            </span>
                            <del>
                              <span className="tracking-wider text-gray-900">
                                {" "}
                                {product?.price} ৳{" "}
                              </span>
                            </del>
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))
                : data?.data?.map((product) => (
                    // <ProductsCard key={product._id} product={product} />
                    <li>
                      <Link
                        to={`/productDetails/${product?._id}`}
                        className="group block overflow-hidden"
                      >
                        <img
                          src={product?.image}
                          alt=""
                          className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                        />

                        <div className="relative bg-white pt-3">
                          <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                            {product?.name}
                          </h3>

                          <p className="mt-2 flex justify-between">
                            <span className="sr-only"> Regular Price </span>

                            <span className="tracking-wider text-gray-900">
                              {" "}
                              {product?.price *
                                (1 - product?.discount / 100)}৳{" "}
                            </span>
                            <del>
                              <span className="tracking-wider text-gray-900">
                                {" "}
                                {product?.price}৳{" "}
                              </span>
                            </del>
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
            </ul>
          </div>
        </section>
      </>
    </div>
  );
}
