import React, { useEffect } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import swal from "sweetalert";

import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

export default function Signup() {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const history = useNavigate();

  let signInError;

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const phone = e.target.phone.value;
    const username = e.target.name.value;

    const userSignupData = {
      email,
      password,
      phone,
      username,
    };
    if (!password || !email || !phone) {
      swal("Oops", "Email or Password Must Not Be Empty", "error");
    } else if (password.length < 6) {
      swal("Oops", "Password Must Be 6 Characters", "error");
    }
    if (!email.includes("@")) {
      swal("Oops", "Email Must Be Valid", "error");
    } else {
      if (error) {
        swal("Error", error.message, "error");
      } else {
        fetch(`https://api.islamicposhak.com/api/users/email/${email}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(userSignupData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              createUserWithEmailAndPassword(email, password);
              swal("Yayy", "Sign Up Successfully Completed", "success");
              history("/");
            } else {
              swal("Error", "Sign Up Failed", "error");
            }
          });
      }
    }
  };

  return (
    <div>
      <div>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg">
            <h1 className="text-center text-2xl font-bold text-green-500 sm:text-3xl">
              Get Started With Islamic poshak
            </h1>

            <p className="mx-auto mt-4 max-w-md text-center text-sm text-gray-500">
              Welcome to
              <span className="text-green-400 font-bold">
                {" "}
                Islamic poshak Family
              </span>
            </p>
            <form
              onSubmit={handleSubmit}
              action=""
              className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
            >
              <p className="text-center text-lg font-medium">
                You can Sign Up as a{" "}
                <span className="text-green-400"> Normal User</span>
              </p>

              <div>
                <label for="name" className="sr-only">
                  Name
                </label>

                <div className="relative">
                  <input
                    required
                    type="text"
                    name="name"
                    className="w-full rounded-lg border-gray-200 text-black p-4 pe-12 text-sm shadow-sm  outline-none"
                    placeholder="Enter name"
                  />
                </div>
              </div>
              <div>
                <label for="email" className="sr-only">
                  Email
                </label>

                <div className="relative">
                  <input
                    required
                    type="email"
                    name="email"
                    className="w-full rounded-lg border-gray-200 text-black p-4 pe-12 text-sm shadow-sm  outline-none"
                    placeholder="Enter email"
                  />

                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <div>
                <label for="email" className="sr-only">
                  Phone number
                </label>

                <div className="relative">
                  <input
                    required
                    type="text"
                    name="phone"
                    className="w-full rounded-lg border-gray-200 text-black p-4 pe-12 text-sm shadow-sm  outline-none"
                    placeholder="Enter Phone number"
                  />
                </div>
              </div>

              <div>
                <label for="password" className="sr-only">
                  Password
                </label>

                <div className="relative">
                  <input
                    required
                    name="password"
                    type="password"
                    className="w-full rounded-lg text-black border-gray-200 p-4 pe-12 text-sm shadow-sm  outline-none"
                    placeholder="Enter password"
                  />

                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="block w-full rounded-lg bg-green-500 px-5 py-3 text-sm font-medium text-white"
              >
                Sign up
              </button>

              <p className="text-center text-sm text-gray-500">
                You have Account ?
                <br />
                <Link className="underline text-blue-600" to={"/login"}>
                  Please Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
