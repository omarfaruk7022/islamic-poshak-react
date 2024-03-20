import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import swal from "sweetalert";

import { useAuthState } from "react-firebase-hooks/auth";
import cross from "../../assets/images/close.png";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import EditModal from "../../Components/Dashboard/EditModal";
import Loader from "../../Components/Common/Loader";
import useAdmin from "../../Components/Shared/useAdmin";

export default function ManageProducts() {
  const [visible, setVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [user] = useAuthState(auth);
  const email = user?.email;
  const [admin, adminLoading] = useAdmin(user);
  const navigate = useNavigate();

  const productsQuery = useQuery({
    queryKey: ["products"],

    queryFn: () =>
      fetch("https://api.islamicposhak.com/api/product").then((res) =>
        res.json()
      ),
  });

  const products = productsQuery.data;

  const refetch = () => {
    productsQuery.refetch();
  };
  if (admin !== "admin" && admin !== undefined) {
    navigate("/dashboard");
  }
  const handleEdit = (id) => {
    setVisible(true);
    setSelectedItemId(id);
  };

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Are You want to Delete this Product? ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`https://api.islamicposhak.com/api/product/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "fail") {
              swal("Error", "Product Delete Failed", "error");
            } else {
              swal("Yayy", "Product Delete Successfully Completed", "success");
              refetch();
            }
          });
      }
    });
  };

  return (
    <div>
      {admin === "admin" && admin !== undefined ? (
        <>
          <div className="overflow-x-auto p-5 ">
            <table className="min-w-full divide-y-2 divide-gray-100  text-sm overflow-y-scroll  ">
              <thead className="ltr:text-left rtl:text-right">
                <tr className="">
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 ">
                    Image
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 ">
                    Name
                  </th>

                  <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 ">
                    Price
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 ">
                    Quantity
                  </th>

                  <th className="whitespace-nowrap px-4 py-2 font-medium  text-left text-gray-900 ">
                    Status
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 ">
                    Added By
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 ">
                    Action
                  </th>
                </tr>
              </thead>
              {products?.data?.map((product) => (
                <>
                  <tbody className="divide-y divide-gray-200 ">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 ">
                        <img
                          className="rounded-md w-[40px]"
                          draggable={false}
                          src={product?.image}
                          alt=""
                        ></img>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 ">
                        {product?.name}
                      </td>

                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 ">
                        {product?.price}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 ">
                        {product?.quantity}
                      </td>

                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 r ">
                        {product?.status === "in-stock" && (
                          <span class="inline-flex items-center justify-center rounded-full bg-emerald-200 dark:bg-green-400 px-2.5 py-0.5 text-emerald-700 dark:text-emerald-900">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="-ms-1 me-1.5 h-4 w-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>

                            <p className="whitespace-nowrap text-sm">
                              In-stock
                            </p>
                          </span>
                        )}
                        {product?.status === "out-of-stock" && (
                          <span class="inline-flex items-center justify-center rounded-full bg-red-100 dark:bg-red-200 px-2.5 py-0.5 text-red-700 dark:text-red-00">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="-ms-1 me-1.5 h-4 w-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                              />
                            </svg>

                            <p class="whitespace-nowrap text-sm">
                              Out-of-stock
                            </p>
                          </span>
                        )}
                        {product?.status === "discontinued" && (
                          <p className="text-red-500">Discontinued</p>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 ">
                        {product?.addedBy}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 ">
                        <button
                          label="Show"
                          icon="pi pi-external-link"
                          onClick={() => handleEdit(product?._id)}
                          className="bg-green-500 text-white px-2 py-1 rounded-md"
                        >
                          Edit
                        </button>
                      </td>
                      {visible && (
                        <EditModal
                          id={selectedItemId}
                          visible={visible}
                          setVisible={setVisible}
                          refetch={refetch}
                        />
                      )}
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        <button
                          onClick={() => handleDelete(product?._id)}
                          className="bg-red-600 text-white px-2 py-1 rounded-md"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </>
              ))}
            </table>
          </div>
        </>
      ) : (
        <>
          {admin !== "admin" &&
          admin !== undefined &&
          navigate("/dashboard") ? (
            <div className="m-5">
              <h2 className="text-red-500 font-bold text-center text-xl">
                You Are Not Authenticated Redirecting to Dashboard
              </h2>
              <div className="flex justify-center items-center my-2">
                <img src={cross} alt=""></img>
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </>
      )}
    </div>
  );
}
