import React from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { FaCartPlus } from "react-icons/fa";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";
import { format } from "date-fns";

export default function ProductsCard(product) {
  const { _id, name, image, price, description } = product.product;
  const [user, loading] = useAuthState(auth);
  const date = new Date();
  const formattedDate = format(date, "PP");
  const formattedDate2 = format(date, "p");
  const handleAddToCart = (e) => {
    e.preventDefault();
    const data = {
      productId: _id,
      orderDate: formattedDate,
      orderTime: formattedDate2,
      name: name,
      quantity: 1,
      price: price,
      image: image,
      email: user?.email,
    };
    // const data = {
    //   productId: _id,
    //   orderDate: formattedDate,
    //   orderTime: formattedDate2,
    //   name: product?.product?.name,
    //   price: product?.product?.price,
    //   image: product?.product?.image,
    //   email: user?.email,
    // };

    console.log(data);
    fetch("https://api.islamicposhak.com/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        swal("Success!", "Product added to cart!", "success");
      }
      console.log(res);
    });
  };

  return (
    // <div className=" rounded-md mt-5 p-2 lg:p-0">
    //   <div className=" block group  h-[310px] w-full lg:w-[220px]  border border-green-400 rounded-md hover:shadow-lg transition-shadow">
    //     <Link to={`/productDetails/${_id}`}>
    //       <img
    //         priority
    //         src={image}
    //         alt="Product Image"
    //         className="h-[210px] rounded-md p-3 m-auto "
    //       />

    //       <div className="flex justify-between pt-3 px-2 border-t-2">
    //         <div>
    //           <h1 className="text-gray-800  font-bold text-lg">{name}</h1>
    //         </div>
    //         <p className="text-gray-800  font-bold text-sm">{price}৳</p>
    //       </div>
    //     </Link>
    //     <div className="flex justify-between p-2">
    //       <p
    //         className="text-gray-800  font-bold text-[12px]"
    //         style={{
    //           display: "-webkit-box",
    //           WebkitLineClamp: 2,
    //           WebkitBoxOrient: "vertical",
    //           overflow: "hidden",
    //         }}
    //       >
    //         {description}
    //       </p>
    //       <form onSubmit={handleAddToCart}>
    //         <button
    //           type="submit"
    //           class="block rounded bg-green-600 px-5 py-3 text-xs font-medium text-white hover:bg-green-500 cursor-pointer transition-all"
    //         >
    //           <FaCartPlus />
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </div>

    <div class="w-full h-96 flex flex-col justify-between max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/productDetails/${_id}`}>
        <img
          class=" rounded-t-lg h-44 w-full object-cover object-center"
          src={image}
          alt="product image"
        />
      </Link>
      <div class="px-2 md:px-5 pb-2 md:pb-5 ">
        <Link to={`/productDetails/${_id}`}>
          <h5 class="text-[20px] font-semibold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
        </Link>
        <p className="text-[13px]">{description.slice(0, 25)}</p>
        <div class="flex items-center mt-2.5 mb-5">
          <div class="flex items-center space-x-1 rtl:space-x-reverse">
            <svg
              class="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              class="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              class="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              class="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              class="w-4 h-4 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </div>
          <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
            5.0
          </span>
        </div>
        <div class="flex  justify-between flex-wrap">
          <span class="text-2xl font-bold text-gray-900 dark:text-white">
            {price}৳
          </span>
          <form onSubmit={handleAddToCart}>
            <button
              type="submit"
              class="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add to cart
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
