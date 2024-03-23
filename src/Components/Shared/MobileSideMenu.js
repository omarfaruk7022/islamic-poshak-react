import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdLibraryAdd, MdOutlineSpaceDashboard } from "react-icons/md";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

import useAdmin from "./useAdmin";
import { IoSettings } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi";
import { GoCodeReview } from "react-icons/go";
import { GrGallery } from "react-icons/gr";
import Loader from "../Common/Loader";

export default function MobileSideMenu({ visibleNav, setVisibleNav }) {
  const [user, loading] = useAuthState(auth);
  const email = user?.email;
  const [active, setActive] = useState(0);
  const [admin, adminLoading] = useAdmin(user);

  const handleSignOut = () => {
    signOut(auth);
  };

  // const { isLoading, error, data } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: () =>
  //     fetch(`http://localhost:5000/api/users/email/${email}`).then((res) =>
  //       res.json()
  //     ),
  // });

  return (
    <div>
      {adminLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            <header aria-label="Site Header" className="w-full absolute mt-20">
              <div className="mx-auto flex h-16 max-w-screen-2xl items-center sm:px-6 lg:px-8 ">
                <div className="mt-20">
                  <nav
                    aria-label="Main Nav"
                    className="mt-6 flex flex-col space-y-1"
                  >
                    <Link
                      onClick={() => {
                        setActive(1);
                        setVisibleNav(false);
                      }}
                      to="/dashboard/"
                      className={`flex items-center gap-2 rounded-lg px-2 py-2 text-gray-900  ${
                        active == 1 ? "bg-gray-200" : ""
                      } transition-all hover:bg-gray-200 `}
                    >
                      <MdOutlineSpaceDashboard className="text-[20px]" />
                      <span className="text-sm font-medium"> Dashboard </span>
                    </Link>
                    {admin === "admin" && (
                      <>
                        <Link
                          onClick={() => {
                            setActive(2);
                            setVisibleNav(false);
                          }}
                          to="/dashboard/add-product"
                          className={`flex items-center gap-2 rounded-lg px-2 py-2 text-gray-900  ${
                            active == 2 ? "bg-gray-200" : ""
                          } transition-all hover:bg-gray-200 `}
                        >
                          <MdLibraryAdd className="text-[20px]" />
                          <span className="text-sm font-medium">
                            {" "}
                            Add Product
                          </span>
                        </Link>
                        <Link
                          onClick={() => {
                            setActive(3);
                            setVisibleNav(false);
                          }}
                          to="/dashboard/add-gallery-image"
                          className={`flex items-center gap-2 rounded-lg px-2 py-2 text-gray-900  ${
                            active == 3 ? "bg-gray-200" : ""
                          } transition-all hover:bg-gray-200 `}
                        >
                          <GrGallery className="text-[20px]" />
                          <span className="text-sm font-medium">
                            {" "}
                            Add Gallery image{" "}
                          </span>
                        </Link>
                        <Link
                          onClick={() => {
                            setActive(4);
                            setVisibleNav(false);
                          }}
                          to="/dashboard/manage-products"
                          className={`flex items-center gap-2 rounded-lg px-2 py-2 text-gray-900  ${
                            active == 4 ? "bg-gray-200" : ""
                          } transition-all hover:bg-gray-200 `}
                        >
                          <IoSettings className="text-[20px]" />
                          <span className="text-sm font-medium">
                            {" "}
                            Manage Products{" "}
                          </span>
                        </Link>
                        <Link
                          onClick={() => {
                            setActive(5);
                            setVisibleNav(false);
                          }}
                          to="/dashboard/all-users"
                          className={`flex items-center gap-2 rounded-lg px-2 py-2 text-gray-900  ${
                            active == 5 ? "bg-gray-200" : ""
                          } transition-all hover:bg-gray-200 `}
                        >
                          <FaUsers className="text-[20px]" />
                          <span className="text-sm font-medium">
                            {" "}
                            All Users{" "}
                          </span>
                        </Link>
                        <Link
                          onClick={() => {
                            setActive(6);
                            setVisibleNav(false);
                          }}
                          to="/dashboard/all-orders"
                          className={`flex items-center gap-2 rounded-lg px-2 py-2 text-gray-900  ${
                            active == 6 ? "bg-gray-200" : ""
                          } transition-all hover:bg-gray-200 `}
                        >
                          <HiShoppingBag className="text-[20px]" />
                          <span className="text-sm font-medium">
                            {" "}
                            All orders{" "}
                          </span>
                        </Link>
                        <Link
                          onClick={() => {
                            setActive(8);
                            setVisibleNav(false);
                          }}
                          to="/dashboard/all-reviews"
                          className={`flex items-center gap-2 rounded-lg px-2 py-2 text-gray-900  ${
                            active == 8 ? "bg-gray-200" : ""
                          } transition-all hover:bg-gray-200 `}
                        >
                          <GoCodeReview className="text-[20px]" />
                          <span className="text-sm font-medium">
                            {" "}
                            All reviews{" "}
                          </span>
                        </Link>
                      </>
                    )}
                    <Link
                      onClick={() => {
                        setActive(7);
                        setVisibleNav(false);
                      }}
                      to="/dashboard/my-orders"
                      className={`flex items-center gap-2 rounded-lg px-2 py-2 text-gray-900  ${
                        active == 7 ? "bg-gray-200" : ""
                      } transition-all hover:bg-gray-200 `}
                    >
                      <MdOutlineSpaceDashboard className="text-[20px]" />
                      <span className="text-sm font-medium"> My orders </span>
                    </Link>

                    <Link
                      onClick={() => {
                        setActive(9);
                        setVisibleNav(false);
                      }}
                      to="/dashboard/my-profile"
                      className={`flex items-center gap-2 rounded-lg px-2 py-2 text-gray-900  ${
                        active == 9 ? "bg-gray-200" : ""
                      } transition-all hover:bg-gray-200 `}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 opacity-75"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>

                      <span className="text-sm font-medium"> My Profile </span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      type="submit"
                      className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-black dark:text-gray-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 opacity-75"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>

                      <span className="text-sm font-medium"> Logout </span>
                    </button>
                  </nav>
                </div>
              </div>
            </header>
          </div>
        </>
      )}
    </div>
  );
}
