import React from "react";
import Banner from "../Components/Home/Banner";
import ProductsComp from "../Components/Home/ProductComp";
import HijabComp from "../Components/Home/HiabComp";
import Reviews from "../Components/Home/Reviews";

export default function Home() {
  return (
    <div>
      <Banner />
      <ProductsComp />
      <HijabComp />
      <Reviews />
    </div>
  );
}
