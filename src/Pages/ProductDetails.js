import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import swal from "sweetalert";
import auth from "../firebase.init";
import Loader from "../Components/Common/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

export default function ProductDetails() {
  const date = new Date();
  const formattedDate = format(date, "PP");
  const formattedDate2 = format(date, "p");
  const [loadingData, setLoadingData] = useState(false);

  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { id } = useParams();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [product, setProduct] = useState();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetch(`http://localhost:5000/api/product/${id}`)
      .then((res) => res.json())
      .then((json) => setProduct(json));
  }, [id]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <Loader />;
  }
  if (!user) {
    navigate("/login");
  }
  console.log(product);
  const handleAddToCart = (e) => {
    e.preventDefault();
    setLoadingData(true);
    const data = {
      productId: product?.data?._id,
      orderDate: formattedDate,
      orderTime: formattedDate2,
      name: product?.data?.name,
      quantity: 1,
      price: product?.data?.price,
      image: product?.data?.image,
      email: user?.email,
      discount: product?.data?.discount,
      long: e.target.long.value,
      body: e.target.body.value,
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
    if (
      data?.long === undefined ||
      data?.body === undefined ||
      data?.long === "" ||
      data?.body === ""
    ) {
      swal("Oops", "Please select a size!", "error");
      setLoadingData(false);
      return;
    }

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
      setLoadingData(false);
      console.log(res);
    });
  };

  const longs = ["5'0", "5'1", "5'2", "5'3", "5'4", "5'5", "5'6", "5'7", "5'8"];
  const bodys = [
    "30 Inch",
    "32 Inch",
    "34 Inch",
    "36 Inch",
    "38 Inch",
    "40 Inch",
    "42 Inch",
    "44 Inch",
    "46 Inch",
    "48 Inch",
  ];

  return (
    <div>
      {user && (
        <>
          <section>
            <div class="relative mx-auto max-w-screen-xl px-4 py-8">
              <div class="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
                <div class="grid grid-cols-2 gap-4 md:grid-cols-1">
                  <img
                    alt=""
                    src={product?.data?.image}
                    class=" w-full rounded-xl object-cover"
                  />

                  {/* <div class="grid grid-cols-2 gap-4 lg:mt-4">
                    <Image
                      width={300}
                      height={300}
                      alt="Les Paul"
                      src={product?.data?.image}
                      class="aspect-square w-full rounded-xl object-cover"
                    />

                    <Image
                      width={300}
                      height={300}
                      alt="Les Paul"
                      src={product?.data?.image}
                      class="aspect-square w-full rounded-xl object-cover"
                    />

                    <Image
                      width={300}
                      height={300}
                      alt="Les Paul"
                      src={product?.data?.image}
                      class="aspect-square w-full rounded-xl object-cover"
                    />

                    <Image
                      width={300}
                      height={300}
                      alt=""
                      src={product?.data?.image}
                      class="aspect-square w-full rounded-xl object-cover"
                    />
                  </div> */}
                </div>

                <div class="sticky top-0 ">
                  <strong class="rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600">
                    Pre Order
                  </strong>

                  <div class="mt-8 flex justify-between">
                    <div class="max-w-[35ch] space-y-2">
                      <h1 class="text-xl font-bold sm:text-2xl">
                        {product?.data?.name}
                      </h1>
                      <h1 class="text-xl font-bold sm:text-2xl">
                        Category: {product?.data?.category}
                      </h1>

                      <div class="-ms-0.5 flex">
                        <svg
                          class="h-5 w-5 text-yellow-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>

                        <svg
                          class="h-5 w-5 text-yellow-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>

                        <svg
                          class="h-5 w-5 text-yellow-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>

                        <svg
                          class="h-5 w-5 text-yellow-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>

                        <svg
                          class="h-5 w-5 text-gray-200"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>

                    <div>
                      <del class="text-lg font-bold">
                        ৳{product?.data?.price.toFixed(0)}
                      </del>
                      <p class="text-lg font-bold">
                        ৳
                        {parseFloat(
                          product?.data?.price *
                            (1 - product?.data?.discount / 100)
                        ).toFixed(0)}
                      </p>
                    </div>
                  </div>

                  <div class="mt-4">
                    <div class="prose max-w-none">
                      <p className="text-sm text-black ">
                        {product?.data?.description}
                      </p>
                    </div>
                  </div>

                  <div>
                    <form class="mt-4" onSubmit={handleAddToCart}>
                      <fieldset>
                        <div class="">
                          <h2 className="text-[14px]">Size long: </h2>
                          <div className="flex gap-2 flex-wrap">
                            {longs.map((long) => (
                              <label for={long} class="cursor-pointer">
                                <input
                                  type="radio"
                                  name="long"
                                  value={long}
                                  id={long}
                                  class="peer sr-only"
                                />

                                <span class="group inline-block rounded-full border px-3 py-1 text-xs font-medium peer-checked:bg-green-500 peer-checked:text-white">
                                  {long}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div class=" mt-5">
                          <h2 className="text-[14px]">Size Body: </h2>
                          <div className="flex gap-2 flex-wrap">
                            {bodys.map((body) => (
                              <label for={body} class="cursor-pointer">
                                <input
                                  type="radio"
                                  name="body"
                                  value={body}
                                  id={body}
                                  class="peer sr-only"
                                />

                                <span class="group inline-block rounded-full border px-3 py-1 text-xs font-medium peer-checked:bg-green-500 peer-checked:text-white">
                                  {body}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div class="mt-8 flex gap-4">
                          {loadingData ? (
                            <div className="flex justify-center ">
                              <TailSpin
                                visible={true}
                                height="40"
                                width="40"
                                color="#4fa94d"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass=""
                              />
                            </div>
                          ) : (
                            <input
                              type="submit"
                              class="block rounded bg-green-600 px-5 py-3 text-xs font-medium text-white hover:bg-green-500 cursor-pointer transition-all"
                              value="Add to Cart"
                            />
                          )}
                        </div>
                      </fieldset>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
