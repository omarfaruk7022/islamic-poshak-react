import React, { useState } from "react";
import logo from "../../assets/images//logo.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

export default function MobileNav() {
  const [user] = useAuthState(auth);

  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <div>
      <div>
        <header aria-label="Site Header" className="w-full absolute">
          <div className="mx-auto flex h-16 max-w-screen-2xl items-center sm:px-6 lg:px-8 ">
            <div className="">
              <nav
                aria-label="Main Nav"
                className="mt-6 flex flex-col space-y-1"
              >
                <div>
                  <Link to="/" className="">
                    <img src={logo} alt="logo" priority></img>
                  </Link>
                </div>
                <Link
                  href="/"
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-900  hover:bg-gray-200  transition-all dark:text-gray-300 dark:hover:hover:bg-black"
                >
                  <MdOutlineSpaceDashboard className="text-[20px]" />
                  <span className="text-sm font-medium"> Home </span>
                </Link>

                <Link
                  href="/products"
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-black dark:text-gray-200"
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

                  <span className="text-sm font-medium"> Products </span>
                </Link>

                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-black dark:text-gray-200"
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
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>

                  <span className="text-sm font-medium"> Dashboard </span>
                </Link>

                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 rounded-lg px-[19px] py-2 text-black dark:text-gray-200 text-sm font-medium"
                  >
                    <HiOutlineLogout className="text-[20px]" />
                    <span className="text-sm font-medium"> Logout </span>
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-black dark:text-gray-200 text-sm font-medium"
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
