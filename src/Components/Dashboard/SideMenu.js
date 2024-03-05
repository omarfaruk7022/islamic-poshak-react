import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useQuery } from "@tanstack/react-query";
import { MdLibraryAdd } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { HiOutlineLogout, HiShoppingBag } from "react-icons/hi";
import auth from "../../firebase.init";
import { Link, useParams } from "react-router-dom";
import useAdmin from "../Shared/useAdmin";

export default function SideMenu() {
  const [user] = useAuthState(auth);
  const email = user?.email;
  const [active, setActive] = useState(1);
  const { slug } = useParams();
  const [admin, adminLoading] = useAdmin(user);

  const handleSignOut = () => {
    signOut(auth);
  };

  // const { isLoading, error, data } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: () =>
  //     fetch(`https://api.islamicposhak.com/api/users/`).then((res) =>
  //       res.json()
  //     ),
  // });

  // console.log("role", data);

  // const isAdmin = data.data.find((user) => user.email === email);

  // const refetch = () => {
  //   data.refetch();
  // };

  // const getUser = async () => {
  //   const res = await fetch(
  //     `https://api.islamicposhak.com/api/users/email/${email}`
  //   );
  //   const data = await res.json();
  //   setIsAdmin(data.data[0]);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);

  console.log("user", admin);

  return (
    <>
      {adminLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="hidden lg:block shadow-2xl px-6  w-[220px] ">
          <div className="flex h-screen flex-col justify-between overflow-y-auto ">
            <div className=" py-6 ">
              <nav
                aria-label="Main Nav"
                className="mt-6 flex flex-col space-y-1 "
              >
                <Link
                  onClick={() => setActive(1)}
                  to="/dashboard"
                  className={`flex items-center gap-2 rounded-lg px-2 py-2 text-gray-900  ${
                    active == 1 ? "bg-gray-200" : ""
                  } transition-all hover:bg-gray-200 `}
                >
                  <MdSpaceDashboard className="text-[20px]" />
                  <span className="text-sm font-medium"> Dashboard </span>
                </Link>

                {admin?.role == "admin" && (
                  <>
                    <Link
                      onClick={() => setActive(2)}
                      to="/dashboard/add-product"
                      className={`flex items-center gap-2 rounded-lg px-2 py-2 text-gray-900  ${
                        active == 2 ? "bg-gray-200" : ""
                      } transition-all hover:bg-gray-200 `}
                    >
                      <MdLibraryAdd className="text-[20px]" />
                      <span className="text-sm font-medium"> Add Product </span>
                    </Link>

                    <Link
                      onClick={() => setActive(3)}
                      to="/dashboard/manage-products"
                      className={`flex items-center gap-2 rounded-lg px-2 py-2 text-gray-900  ${
                        active == 3 ? "bg-gray-200" : ""
                      } transition-all hover:bg-gray-200 `}
                    >
                      <IoSettings className="text-[20px]" />
                      <span className="text-sm font-medium">
                        {" "}
                        Manage Product{" "}
                      </span>
                    </Link>
                    <Link
                      onClick={() => setActive(4)}
                      to="/dashboard/all-users"
                      className={`flex items-center gap-2 rounded-lg px-2 py-2 text-gray-900  ${
                        active == 4 ? "bg-gray-200" : ""
                      } transition-all hover:bg-gray-200 `}
                    >
                      <FaUsers className="text-[20px]" />
                      <span className="text-sm font-medium"> All Users </span>
                    </Link>
                    <Link
                      onClick={() => setActive(5)}
                      to="/dashboard/all-orders"
                      className={`flex items-center gap-2 rounded-lg px-2 py-2 text-gray-900  ${
                        active == 5 ? "bg-gray-200" : ""
                      } transition-all hover:bg-gray-200 `}
                    >
                      <HiShoppingBag className="text-[20px]" />
                      <span className="text-sm font-medium"> All Orders </span>
                    </Link>
                  </>
                )}

                <Link
                  onClick={() => setActive(6)}
                  to="/dashboard/my-profile"
                  className={`flex items-center gap-2 rounded-lg px-2 py-2 text-gray-900  ${
                    active == 6 ? "bg-gray-200" : ""
                  } transition-all hover:bg-gray-200 `}
                >
                  <RiAccountPinCircleFill className="text-[20px]" />
                  <span className="text-sm font-medium"> My Profile </span>
                </Link>
                <Link
                  onClick={() => setActive(7)}
                  to="/dashboard/my-orders"
                  className={`flex items-center gap-2 rounded-lg px-2 py-2 text-gray-900  ${
                    active == 7 ? "bg-gray-200" : ""
                  } transition-all hover:bg-gray-200 `}
                >
                  <RiAccountPinCircleFill className="text-[20px]" />
                  <span className="text-sm font-medium"> My Orders </span>
                </Link>

                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-2  text-gray-900  hover:bg-gray-200  transition-all  ">
                    <div className="flex items-center gap-2">
                      <MdManageAccounts className="text-[20px]" />
                      <span className="text-sm font-medium"> Account </span>
                    </div>

                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  <nav
                    aria-label="Account Nav"
                    className="mt-2 flex flex-col px-2"
                  >
                    {/* <Link
                  to="#"
                  className="flex items-center gap-2 rounded-lg px-4 py-2  text-gray-900  hover:bg-gray-200  transition-all "
                >
                  <MdSecurity className="text-[20px]" />
                  <span className="text-sm font-medium"> Security </span>
                </Link> */}

                    <button
                      onClick={handleSignOut}
                      type="submit"
                      className="flex w-full items-center gap-2 rounded-lg px-4 py-2   text-gray-900  hover:bg-gray-200  transition-all "
                    >
                      <HiOutlineLogout className="text-[20px]" />

                      <span className="text-sm font-medium"> Logout </span>
                    </button>
                  </nav>
                </details>
              </nav>
            </div>

            <div className="sticky inset-x-0 bottom-0 ">
              <Link to="/" className="flex items-center gap-2 py-3">
                <img
                  alt="Man"
                  src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  className="h-8 w-8 rounded-full object-cover"
                />

                <div>
                  <p className="text-xs">
                    <strong className="block font-medium">
                      {admin?.username}
                    </strong>

                    <span>
                      {admin?.role === "admin" ? (
                        <>
                          <p className="text-red-500 font-bold">Admin</p>
                        </>
                      ) : (
                        <>
                          <p className="text-green-500 ">Normal User</p>
                        </>
                      )}
                    </span>
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
