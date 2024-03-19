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
      fetch(`http://api.islamicposhak.com/api/users/email/${email}`).then(
        (res) => res.json()
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
                  onClick={() => setVisibleTopNav(false)}
                  to="/"
                  className="flex items-center gap-2 rounded-lg px-2 py-2 text-gray-900    transition-all  "
                >
                  <MdSpaceDashboard className="text-[20px]" />
                  <span className="text-sm font-medium">হোম</span>
                </Link>

                <Link
                  onClick={() => setVisibleTopNav(false)}
                  to="/borka"
                  className="flex items-center gap-2 rounded-lg px-2 py-2   text-gray-900  hover:bg-gray-200  transition-all "
                >
                  <MdLibraryAdd className="text-[20px]" />
                  <span className="text-sm font-medium">বোরকা</span>
                </Link>

                <Link
                  onClick={() => setVisibleTopNav(false)}
                  to="/hijab"
                  className="flex items-center gap-2 rounded-lg px-2 py-2   text-gray-900  hover:bg-gray-200  transition-all "
                >
                  <IoSettings className="text-[20px]" />
                  <span className="text-sm font-medium"> হিজাব </span>
                </Link>
                <Link
                  onClick={() => setVisibleTopNav(false)}
                  to="/all-products"
                  className="flex items-center gap-2 rounded-lg px-2 py-2   text-gray-900  hover:bg-gray-200  transition-all "
                >
                  <FaUsers className="text-[20px]" />
                  <span className="text-sm font-medium"> সকল প্রোডাক্টস </span>
                </Link>
                <Link
                  onClick={() => setVisibleTopNav(false)}
                  to="/reviews"
                  className="flex items-center gap-2 rounded-lg px-2 py-2   text-gray-900  hover:bg-gray-200  transition-all "
                >
                  <FaUsers className="text-[20px]" />
                  <span className="text-sm font-medium"> রিভিউ </span>
                </Link>
                <Link
                  onClick={() => setVisibleTopNav(false)}
                  to="/gallery"
                  className="flex items-center gap-2 rounded-lg px-2 py-2   text-gray-900  hover:bg-gray-200  transition-all "
                >
                  <FaUsers className="text-[20px]" />
                  <span className="text-sm font-medium"> গ্যালারী </span>
                </Link>

                {user ? (
                  <Link
                    onClick={() => setVisibleTopNav(false)}
                    to="/dashboard"
                    className="flex items-center gap-2 rounded-lg px-2 py-2   text-gray-900  hover:bg-gray-200  transition-all "
                  >
                    <HiShoppingBag className="text-[20px]" />
                    <span className="text-sm font-medium">ড্যাশবোর্ড</span>
                  </Link>
                ) : (
                  ""
                )}

                {user ? (
                  <button
                    onClick={() => {
                      handleSignOut();
                      setVisibleTopNav(false);
                    }}
                    className="flex items-center gap-2 rounded-lg px-[19px] py-2 text-black  text-sm font-medium"
                  >
                    <HiOutlineLogout className="text-[20px]" />
                    <span className="text-sm font-medium">লগ আউট</span>
                  </button>
                ) : (
                  <Link
                    onClick={() => setVisibleTopNav(false)}
                    to="/login"
                    className="flex items-center gap-2 rounded-lg px-2 py-2   text-gray-900  hover:bg-gray-200  transition-all "
                  >
                    <HiShoppingBag className="text-[20px]" />
                    <span className="text-sm font-medium"> লগইন করুন</span>
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
