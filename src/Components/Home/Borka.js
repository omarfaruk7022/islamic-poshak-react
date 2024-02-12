import React, { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import Loader from "../Common/Loader";
import ProductsCard from "../Common/ProductCard";

export default function Borka() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("http://localhost:5000/api/product").then((res) => res.json()),
  });
  console.log("data", data?.data);
  return (
    <>
      <h4 className="text-3xl text-center pt-10">
        আমাদের নতুন <span className="text-green-500">বোরকা কালেকশন</span>
      </h4>
      <p class="max-w-md mx-auto mt-4 text-gray-500 text-center">
        আপনার জন্য সকল ধরনের বোরকা বিদ্যমান রয়েছে.
      </p>

      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : error ? (
        <h1>{error}</h1>
      ) : null}

      <div className="flex flex-wrap px-0 lg:px-36  gap-3 justify-center ">
        {data?.data
          .filter((product) => product.category === "Borka")

          .map((product) => (
            <ProductsCard key={product._id} product={product} />
          ))}
      </div>
    </>
  );
}
