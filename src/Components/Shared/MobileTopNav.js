import React, { useState } from "react";
import logo from "../../assets/images/logo-1.png";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  MdLibraryAdd,
  MdOutlineSpaceDashboard,
  MdSpaceDashboard,
} from "react-icons/md";
import { HiOutlineLogout, HiShoppingBag } from "react-icons/hi";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";

export default function MobileTopNav({ visibleTopNav, setVisibleTopNav }) {
  const [user, loading] = useAuthState(auth);
  const email = user?.email;

  const handleSignOut = () => {
    signOut(auth);
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch(`http://localhost:5000/api/users/email/${email}`).then((res) =>
        res.json()
      ),
  });
  return (
    <div>
      <div>
        <header aria-label="Site Header" className="w-full absolute mt-20">
          <div className="mx-auto flex h-16 max-w-screen-2xl items-center sm:px-6 lg:px-8 ">
            <div className="">
              <nav
                aria-label="Main Nav"
                className="mt-6 flex flex-col space-y-1"
              >
                <div>
                  <Link to="/" className="">
                    <img
                      src={logo}
                      className="w-28 h-28"
                      alt="logo"
                      priority
                    ></img>
                  </Link>
                </div>
                <Link
                  to="/"
                  className="flex items-center gap-2 rounded-lg px-2 py-2 text-gray-900    transition-all  "
                >
                  <MdSpaceDashboard className="text-[20px]" />
                  <span className="text-sm font-medium"> Home </span>
                </Link>

                <Link
                  to="/borka"
                  className="flex items-center gap-2 rounded-lg px-2 py-2   text-gray-900  hover:bg-gray-200  transition-all "
                >
                  <MdLibraryAdd className="text-[20px]" />
                  <span className="text-sm font-medium"> Borka </span>
                </Link>

                <Link
                  to="/hijab"
                  className="flex items-center gap-2 rounded-lg px-2 py-2   text-gray-900  hover:bg-gray-200  transition-all "
                >
                  <IoSettings className="text-[20px]" />
                  <span className="text-sm font-medium"> Hijab </span>
                </Link>
                <Link
                  to="/all-products"
                  className="flex items-center gap-2 rounded-lg px-2 py-2   text-gray-900  hover:bg-gray-200  transition-all "
                >
                  <FaUsers className="text-[20px]" />
                  <span className="text-sm font-medium"> All products </span>
                </Link>
                {user ? (
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 rounded-lg px-2 py-2   text-gray-900  hover:bg-gray-200  transition-all "
                  >
                    <HiShoppingBag className="text-[20px]" />
                    <span className="text-sm font-medium"> Dashboard </span>
                  </Link>
                ) : (
                  ""
                )}

                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 rounded-lg px-[19px] py-2 text-black  text-sm font-medium"
                  >
                    <HiOutlineLogout className="text-[20px]" />
                    <span className="text-sm font-medium"> Logout </span>
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-black  text-sm font-medium"
                  >
                    <span className="text-sm font-medium">
                      {" "}
                      Login / Register{" "}
                    </span>
                  </Link>
                )}
              </nav>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
