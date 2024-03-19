import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Common/Loader";
import ProductsCard from "../Common/ProductCard";

export default function HijabComp() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("http://api.islamicposhak.com/api/product").then((res) =>
        res.json()
      ),
  });
  console.log("data", data?.data);
  return (
    <>
      <h4 className="text-3xl text-center pt-10">
        আমাদের সকল <span className="text-green-500">হিজাব</span>
      </h4>
      <p class="max-w-md mx-auto mt-4 text-gray-500 text-center">
        আপনার জন্য সকল ধরনের হিজাব বিদ্যমান রয়েছে.
      </p>

      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : error ? (
        <h1>{error}</h1>
      ) : null}

      <div className="grid grid-cols-2 gap-3  md:grid-cols-3 lg:grid-cols-6 px-5 lg:px-28 xl:px-36">
        {data?.data
          .filter((product) => product.category == "Hijab")
          ?.slice(0, 8)
          .map((product) => (
            <ProductsCard key={product._id} product={product} />
          ))}
      </div>
    </>
  );
}
