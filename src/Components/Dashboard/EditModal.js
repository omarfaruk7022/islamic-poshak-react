import { Dialog } from "primereact/dialog";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import swal from "sweetalert";
import auth from "../../firebase.init";

export default function EditModal({ id, visible, setVisible, refetch }) {
  const imgStorageKey = "7bd193c3ab5dcf0453572e262a763279";
  const [user] = useAuthState(auth);
  const email = user?.email;

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;
    const price = e.target.price.value;
    const quantity = e.target.quantity.value;
    const status = e.target.status.value;
    const addedBy = email;
    const img = e.target.image.files[0];

    const formData = new FormData();
    console.log(formData);
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
          const data = {
            name,
            description,
            price,
            image,
            addedBy,
            status,
            quantity,
          };
          if (
            name &&
            description &&
            price &&
            image &&
            quantity &&
            status &&
            addedBy
          ) {
            fetch(`http://localhost:5000/api/product/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }).then((res) => {
              if (res.ok) {
                refetch();
                swal("Yayy", "Product Updated Successfully", "success");
              } else {
                swal("Error", "Product Updated Failed", "error");
              }
            });
          }
        }
      });
  };
  return (
    <div>
      <>
        <div>
          <Dialog
            visible={visible}
            onHide={() => setVisible(false)}
            style={{ width: "50vw" }}
            breakpoints={{ "960px": "75vw", "641px": "100vw" }}
          >
            <div className="">
              <h2 className="text-center text-xl font-bold">Edit Product</h2>
              <form className="p-5" onSubmit={handleSubmit}>
                <label
                  for="name"
                  className="relative block overflow-hidden rounded-md border border-gray-300  px-3 pt-3 shadow-sm  my-2 focus-within:ring-1 w-96 m-auto"
                >
                  <input
                    type="name"
                    id="name"
                    placeholder="Name"
                    required
                    className="peer h-8 w-full text-black   text-[15px] border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />

                  <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700  transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Name
                  </span>
                </label>
                <label
                  for="description"
                  className="relative block overflow-hidden rounded-md border border-gray-300   px-3 pt-3 shadow-sm  focus-within:ring-1 w-96 m-auto"
                >
                  <input
                    type="name"
                    id="description"
                    placeholder="Description"
                    required
                    className="peer h-8 w-full text-black  text-[15px] border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />

                  <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Description
                  </span>
                </label>
                <label
                  for="price"
                  className="relative block my-2 overflow-hidden rounded-md border border-gray-300  px-3 pt-3 shadow-sm  focus-within:ring-1 w-96 m-auto"
                >
                  <input
                    type="text"
                    id="price"
                    placeholder="Price"
                    required
                    className="peer h-8 w-full text-black  text-[15px] border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />

                  <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700   transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Price
                  </span>
                </label>
                <label
                  for="quantity"
                  className="relative block my-2 overflow-hidden rounded-md border border-gray-300 px-3 pt-3 shadow-sm  focus-within:ring-1 w-96 m-auto"
                >
                  <input
                    type="number"
                    id="quantity"
                    placeholder="Quantity"
                    required
                    className="peer h-8 w-full  text-[15px] border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />

                  <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700  transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Quantity
                  </span>
                </label>
                <label
                  for="status"
                  className="relative block my-2 overflow-hidden rounded-md border border-gray-300 px-3 pt-3 shadow-sm  focus-within:ring-1 w-96 m-auto"
                >
                  <input
                    type="text"
                    id="status"
                    placeholder="Status"
                    required
                    className="peer h-8 w-full text-[15px] border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />

                  <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700  transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Status
                  </span>
                </label>

                <input
                  type="file"
                  name="image"
                  placeholder="Image"
                  required
                  className="peer h-8 w-96 m-auto block my-3  text-black  text-[15px] border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                />

                <div className="flex justify-center">
                  <input
                    type="submit"
                    value="Submit"
                    className="p-4 w-24  rounded-lg  bg-green-400 cursor-pointer text-sm text-black text-[15px]"
                  />
                </div>
              </form>
            </div>
          </Dialog>
        </div>
      </>
    </div>
  );
}
