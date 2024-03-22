import React from "react";
import Banner from "../Components/Home/Banner";
import ProductsComp from "../Components/Home/ProductComp";
import HijabComp from "../Components/Home/HiabComp";
import ReviewsComp from "../Components/Home/ReviewsComp";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Islamic Poshak Collection | Online Shop for Islamic Dress</title>
        <meta
          name="description"
          content="
        Islamic poshak collection is a online shop for islamic dress. We provide all types of islamic dresses"
        />
      </Helmet>
      <Banner />
      <ProductsComp />
      <HijabComp />
      <ReviewsComp from={"home"} />
    </div>
  );
}
