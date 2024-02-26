import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo-1.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useQuery } from "@tanstack/react-query";

import { Sidebar } from "primereact/sidebar";
import { AiOutlineShoppingCart } from "react-icons/ai";

import MobileNav from "./MobileNav";
import { Link } from "react-router-dom";
import Cart from "../Home/Cart";
import auth from "../../firebase.init";
import MobileTopNav from "./MobileTopNav";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const [visibleRight, setVisibleRight] = useState(false);
  const [visibleNav, setVisibleNav] = useState(false);
  const [visibleTopNav, setVisibleTopNav] = useState(false);
  const [cartData, setCartData] = useState();

  const email = user?.email;
  const handleSignOut = () => {
    signOut(auth);
  };

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch(`http://localhost:5000/api/users/email/${email}`).then((res) =>
        res.json()
      ),
  });
  const userInfo = usersQuery.data?.data[0];
  const refetch = () => {
    usersQuery.refetch();
  };
  useEffect(() => {
    if (!userInfo) {
      refetch();
    }
  }, []);

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: () =>
      fetch(`http://localhost:5000/api/cart/${email}`).then((res) =>
        res.json()
      ),
  });
  const cartRefetch = () => {
    cartQuery.refetch();
  };

  const cartProducts = cartQuery.data?.data;

  return (
    <div>
      <div>
        <header
          aria-label="Site Header  "
          className="w-full bg-white shadow-lg   "
        >
          <div className="mx-auto flex h-20 max-w-screen-2xl items-center justify-between sm:px-6 lg:px-8  ">
            <div className="flex items-center gap-4 ">
              <button
                type="button"
                className="p-2 lg:hidden"
                onClick={() => setVisibleNav(true)}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div>
                <Sidebar
                  position="left"
                  visible={visibleNav}
                  onHide={() => setVisibleNav(false)}
                >
                  <MobileNav />
                </Sidebar>
              </div>
            </div>

            <div className="flex flex-1 items-center justify-end gap-8 ">
              <nav
                aria-label="Site Nav"
                className="hidden lg:flex lg:gap-4 lg:text-xs lg:font-bold lg:uppercase lg:tracking-wide lg:text-gray-700 "
              >
                <Link
                  to="/"
                  className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current "
                >
                  Home
                </Link>
                <Link
                  to="/hijab"
                  className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current "
                >
                  Hijab
                </Link>
                <Link
                  to="/borka"
                  className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current "
                >
                  Borka
                </Link>
                <Link
                  to="/all-products"
                  className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current "
                >
                  All products
                </Link>

                {user && (
                  <Link
                    to="/dashboard"
                    className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current "
                  >
                    Dashboard
                  </Link>
                )}

                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current"
                  >
                    LOGOUT
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current "
                  >
                    Login / Register
                  </Link>
                )}

                <div class="flex flex-1 items-center justify-between gap-8 sm:justify-end">
                  <div class="flex gap-4">
                    {/* <div className="bg-white dark:bg-[#263449] hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400 m-auto dark:rounded-md">
                      <ThemeToggler />
                    </div> */}
                  </div>

                  {user && (
                    <>
                      <div className="">
                        <button
                          icon="pi pi-arrow-left"
                          className="mb-4"
                          onClick={() => setVisibleRight(true)}
                        >
                          <AiOutlineShoppingCart className="text-[30px] absolute bg-white   transition-all p-1 rounded-md shadow-md" />
                          <span class="whitespace-nowrap rounded-full bg-green-100 px-1.5 py-0.5 text-sm text-green-700 relative left-5 bottom-1">
                            {cartProducts?.length}
                          </span>
                        </button>
                      </div>
                      <div>
                        <Sidebar
                          position="right"
                          visible={visibleRight}
                          onHide={() => setVisibleRight(false)}
                        >
                          <Cart cartData={cartData} setCartData={setCartData} />
                        </Sidebar>
                      </div>
                      <button
                        type="button"
                        class="group flex shrink-0 items-center rounded-lg transition"
                      >
                        <img
                          alt="profile"
                          src={userInfo?.profilePhoto}
                          class="h-10 w-10 rounded-full object-cover"
                        />

                        <p class="ms-2 hidden text-left text-xs sm:block">
                          <strong class="block font-medium">
                            {userInfo?.role}
                          </strong>

                          <span class="text-gray-500">{email}</span>
                        </p>
                      </button>
                    </>
                  )}
                </div>
              </nav>
              <div className="block lg:hidden">
                <button
                  icon="pi pi-arrow-left"
                  className="mb-4"
                  onClick={() => setVisibleRight(true)}
                >
                  <AiOutlineShoppingCart className="text-[30px] absolute bg-white   transition-all p-1 rounded-md shadow-md" />
                  <span class="whitespace-nowrap rounded-full bg-green-100 px-1.5 py-0.5 text-sm text-green-700 relative left-5 bottom-1">
                    {cartProducts?.length}
                  </span>
                </button>
              </div>
              <div className="flex items-center gap-4 ">
                <button
                  type="button"
                  className="p-2 lg:hidden"
                  onClick={() => setVisibleTopNav(true)}
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                <div>
                  <Sidebar
                    position="right"
                    visible={visibleTopNav}
                    onHide={() => setVisibleTopNav(false)}
                  >
                    <MobileTopNav
                      visibleTopNav={visibleTopNav}
                      setVisibleTopNav={setVisibleTopNav}
                    />
                  </Sidebar>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
