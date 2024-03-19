import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import swal from "sweetalert";
import auth from "../../firebase.init";

export default function AddGalleryImages() {
  const imgStorageKey = "7bd193c3ab5dcf0453572e262a763279";
  const [user, loading] = useAuthState(auth);

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
              fetch("http://api.islamicposhak.com/api/gallery", {
                method: "POST",
                headers: {
                  authorization: `Bearer ${user?.accessToken}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ image }),
              }).then((res) => {
                if (res.ok) {
                  swal("Yayy", "Product Added Successfully", "success");

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
  return (
    <div className="mt-5 p-20 bg-slate-200 w-96 m-auto">
      <h1 className="text-center">Add Gallery Images</h1>
      <div className="my-2">
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
    </div>
  );
}
