import React from "react";
import footerImage from "../../assets/images/logo-1.png";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="">
      <footer className="bg-gray-100 lg:grid lg:grid-cols-5 mt-36">
        <div className="relative block h-36 lg:col-span-2 lg:h-full">
          <img
            src={footerImage}
            alt=""
            className="absolute inset-0 m-auto h-60 w-60  lg:h-full  object-cover"
          />
        </div>

        <div className="px-4 py-16 sm:px-6 lg:col-span-3 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <p>
                <span className="text-xs uppercase tracking-wide text-gray-500">
                  {" "}
                  Call us{" "}
                </span>

                <a
                  href="tel:123-456-7890"
                  className="block text-2xl font-semibold text-gray-900"
                >
                  01918-090266
                </a>
              </p>

              <ul className="mt-8 space-y-1 text-sm text-gray-700">
                <li>We are 24/7 hours open</li>
              </ul>

              <ul className="mt-8 flex gap-6">
                <li>
                  <Link
                    to="https://www.facebook.com/islamiposhak"
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    <span className="sr-only">Facebook</span>

                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </li>

                <li>
                  <a
                    href="https://wa.me/8801918090266"
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    <FaWhatsapp className="h-6 w-6" />
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    <span className="sr-only">Twitter</span>

                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="font-medium text-gray-900">Specials</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <Link
                      to="/borka"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Borka
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/hijab"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      Hijab{" "}
                    </Link>
                  </li>

                  <li>
                    <a
                      href="/all-products"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      Islamic Dress{" "}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-gray-900">Menu</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <Link
                      to="/reviews"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      Reviews
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/gallery"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      Gallery
                    </Link>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      About us{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-100 pt-12">
            <div className="sm:flex sm:items-center sm:justify-between">
              <ul className="flex flex-wrap gap-4 text-xs">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 transition hover:opacity-75"
                  >
                    {" "}
                    Terms & Conditions{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-500 transition hover:opacity-75"
                  >
                    {" "}
                    Privacy Policy{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-500 transition hover:opacity-75"
                  >
                    {" "}
                    Cookies{" "}
                  </a>
                </li>
              </ul>

              <p className="mt-8 text-xs text-gray-500 sm:mt-0">
                &copy; 2024. Islamic poshak collection. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
