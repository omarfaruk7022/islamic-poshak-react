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
    fetch("http://localhost:5000/api/cart", {
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
    <div className=" rounded-md mt-5 p-2 lg:p-0">
      <div className=" block group  h-[310px] w-full lg:w-[220px]  border border-green-400 rounded-md hover:shadow-lg transition-shadow">
        <Link to={`/productDetails/${_id}`}>
          <img
            priority
            src={image}
            alt="Product Image"
            className="h-[210px] rounded-md p-3 m-auto "
          />

          <div className="flex justify-between pt-3 px-2 border-t-2">
            <div>
              <h1 className="text-gray-800  font-bold text-lg">{name}</h1>
            </div>
            <p className="text-gray-800  font-bold text-sm">{price}৳</p>
          </div>
        </Link>
        <div className="flex justify-between p-2">
          <p
            className="text-gray-800  font-bold text-[12px]"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </p>
          <form onSubmit={handleAddToCart}>
            <button
              type="submit"
              class="block rounded bg-green-600 px-5 py-3 text-xs font-medium text-white hover:bg-green-500 cursor-pointer transition-all"
            >
              <FaCartPlus />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
