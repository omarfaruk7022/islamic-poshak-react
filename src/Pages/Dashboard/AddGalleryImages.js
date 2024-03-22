import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import swal from "sweetalert";
import auth from "../../firebase.init";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAdmin from "../../Components/Shared/useAdmin";
import Loader from "../../Components/Common/Loader";

export default function AddGalleryImages() {
  const imgStorageKey = "7bd193c3ab5dcf0453572e262a763279";
  const [user, loading] = useAuthState(auth);
  const [images, setImages] = useState([]);
  const [admin, adminLoading] = useAdmin(user);
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const img = e.target.image.files[0];
    if (!img) {
      swal("Oops", "Image Must Not Be Empty", "error");
      return;
    } else {
      const formData = new FormData();
      formData.append("image", img);
      const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            const image = result.data.url;

            if (image) {
              fetch("http://localhost:5000/api/gallery", {
                method: "POST",
                headers: {
                  authorization: `Bearer ${user?.accessToken}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ image }),
              }).then((res) => {
                if (res.ok) {
                  swal("Yayy", "Image Added Successfully", "success");
                  setTimeout(() => {
                    refetch();
                  }, 1000);
                  e.target.image.value = "";
                } else {
                  swal("Error", res.message, "error");
                }
              });
            } else {
              swal(
                "Error",
                "Please check all the fields filled with and valid and ",
                "error"
              );
            }
          }
        });
    }
  };

  const galleryQuery = useQuery({
    queryKey: ["gallery"],
    queryFn: () =>
      fetch("http://localhost:5000/api/gallery", {
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
          ContentType: "application/json",
        },
      }).then((res) => res.json()),
  });

  const gallery = galleryQuery.data;
  const refetch = galleryQuery.refetch;

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/api/gallery/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data) {
      swal("Yayy", "Image Deleted Successfully", "success");
      refetch();
    } else {
      swal("Error", "Something went wrong", "error");
    }
  };

  console.log("gallery", admin);
  return (
    <div>
      {adminLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <div className="">
          <div className="my-2 mt-5 p-20 bg-slate-200 w-96 m-auto">
            <form action="" onSubmit={handleImageUpload}>
              <div className="mb-3">
                <input type="file" className="form-control" id="image" />
              </div>
              <button
                type="submit"
                class="text-white w-full bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-[10px] md:text-sm px-3 py-2.5 mt-5 text-center  "
              >
                Submit
              </button>
            </form>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-3">
            {gallery?.data?.map((image) => (
              <div class="w-full h-92 flex flex-col justify-between max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img
                  class=" rounded-t-lg h-full w-full object-cover object-center"
                  src={image?.image}
                  alt="product image"
                />

                <div class="px-2 md:px-3 pb-2 md:pb-3 mt-2">
                  <button
                    onClick={() => handleDelete(image?._id)}
                    class="text-white w-full bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-[10px] md:text-sm px-3 py-2.5 mt-5 text-center  "
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
