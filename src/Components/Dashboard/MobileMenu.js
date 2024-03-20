import { signOut } from "firebase/auth";

import React, { useState } from "react";
import {
  MdFormatListNumberedRtl,
  MdLibraryAdd,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import ThemeToggler from "./ThemeToggler";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "@tanstack/react-query";
import auth from "../../firebase.init";
import { Link } from "react-router-dom";
import { GoCodeReview } from "react-icons/go";
import { HiShoppingBag } from "react-icons/hi";
import { FaUsers } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";

export default function MobileMenu() {
  const [user, loading] = useAuthState(auth);
  const email = user?.email;
  const [active, setActive] = useState(1);

  const handleSignOut = () => {
    signOut(auth);
  };

  //  create useQuery to fetch data from api

  // const { isLoading, error, data } = useQuery({
  //   queryFn: () =>
  //     fetch(`https://api.islamicposhak.com/api/users/email/${email}`).then((res) =>
  //       res.json()
  //     ),
  // });
  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch(`https://api.islamicposhak.com/api/users/`, {
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
          ContentType: "application/json",
        },
      }).then((res) => res.json()),
  });
  const isAdmin = data.data.find((user) => user.email === email);

  return (
    <div className="flex h-screen flex-col justify-between bg-white dark:bg-black ">
      <div className="px-4 py-6">
        <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
          <Link
            onClick={() => setActive(1)}
            to="/dashboard/"
            className={`flex items-center gap-2 rounded-lg px-2 py-2 text-gray-900  ${
              active == 1 ? "bg-gray-200" : ""
            } transition-all hover:bg-gray-200 `}
          >
            <MdOutlineSpaceDashboard className="text-[20px]" />
            <span className="text-sm font-medium"> Dashboard </span>
          </Link>
          {isAdmin?.role === "admin" && (
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
                to="/dashboard/manage-product"
                className={`flex items-center gap-2 rounded-lg px-2 py-2 text-gray-900  ${
                  active == 3 ? "bg-gray-200" : ""
                } transition-all hover:bg-gray-200 `}
              >
                <IoSettings className="text-[20px]" />
                <span className="text-sm font-medium"> Manage Products </span>
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
                <span className="text-sm font-medium"> All orders </span>
              </Link>
              <Link
                onClick={() => setActive(6)}
                to="/dashboard/all-reviews"
                className={`flex items-center gap-2 rounded-lg px-2 py-2 text-gray-900  ${
                  active == 6 ? "bg-gray-200" : ""
                } transition-all hover:bg-gray-200 `}
              >
                <GoCodeReview className="text-[20px]" />
                <span className="text-sm font-medium"> All reviews </span>
              </Link>
            </>
          )}
          <Link
            onClick={() => setActive(6)}
            to="/dashboard/my-orders"
            className={`flex items-center gap-2 rounded-lg px-2 py-2 text-gray-900  ${
              active == 6 ? "bg-gray-200" : ""
            } transition-all hover:bg-gray-200 `}
          >
            <MdOutlineSpaceDashboard className="text-[20px]" />
            <span className="text-sm font-medium"> My orders </span>
          </Link>

          <Link
            onClick={() => setActive(5)}
            to="/dashboard/my-profile"
            className={`flex items-center gap-2 rounded-lg px-2 py-2 text-gray-900  ${
              active == 5 ? "bg-gray-200" : ""
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
  );
}
