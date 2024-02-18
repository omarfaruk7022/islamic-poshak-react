import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
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

  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("http://localhost:5000/api/product").then((res) => res.json()),
  });

  console.log(data);
  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <>
        <h4 className="text-3xl text-center pt-10">আমাদের সকল প্রোডাক্টস</h4>
        <div className="grid grid-cols-2 gap-3  md:grid-cols-3 lg:grid-cols-6 px-0 lg:px-36">
          {data?.data.map((product) => (
            <ProductsCard key={product._id} product={product} />
          ))}
        </div>
      </>
    </div>
  );
}
