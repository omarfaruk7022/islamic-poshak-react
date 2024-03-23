import React, { useEffect, useRef, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import swal from "sweetalert";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";

import auth from "../firebase.init";
import Loader from "../Components/Common/Loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { TailSpin } from "react-loader-spinner";

export default function Login() {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  let signInError;
  const navigate = useNavigate();
  const location = useLocation();
  const [loadingData, setLoadingData] = useState(false);
  let from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [navigate, from]);
  //   const [token] = useToken(user );

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    setLoadingData(true);
    const password = e.target.password.value;
    const email = e.target.email.value;
    if (!password || !email) {
      swal("Oops", "Email or Password Must Not Be Empty", "error");
      setLoadingData(false);
      return;
    } else if (password.length < 6) {
      swal("Oops", "Password Must Be 6 Characters", "error");
      setLoadingData(false);
      return;
    }
    if (!email.includes("@")) {
      swal("Oops", "Email Must Be Valid", "error");
      setLoadingData(false);
      return;
    } else {
      signInWithEmailAndPassword(email, password);
      setLoadingData(false);
    }
  };
  const handleUserSubmit = (e) => {
    e.preventDefault();
    const password = "123456";
    const email = "omar@gmail.com";
    if (!password || !email) {
      swal("Oops", "Email or Password Must Not Be Empty", "error");
      return;
    } else if (password.length < 6) {
      swal("Oops", "Password Must Be 6 Characters", "error");
      return;
    }
    if (!email.includes("@")) {
      swal("Oops", "Email Must Be Valid", "error");
      return;
    } else {
      signInWithEmailAndPassword(email, password);
    }
  };
  if (loading) {
    return <Loader />;
  }

  if (error) {
    swal("Oops", "Email or Password May Incorrect", "error");
  } else if (user) {
    window.history.back();
    swal("Yayy", "Login Successfully Completed", "success");
  }
  if (loading) {
    <Loader />;
    return;
  }

  return (
    <div>
      <Helmet>
        <title>Login </title>
        <meta
          name="description"
          content="
          Welcome Back To Islamic poshak collection
          "
        />
      </Helmet>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-green-500 sm:text-3xl">
            Get Started With Islamic poshak collection
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Welcome Back To{" "}
            <span className="text-green-400 font-bold">
              Islamic poshak collection
            </span>
          </p>

          <form
            onSubmit={handleAdminSubmit}
            action=""
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">
              Login to your account
            </p>

            {signInError}
            <div>
              <label for="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  // required
                  type="email"
                  name="email"
                  className="w-full rounded-lg border-gray-200 text-black p-4 pe-12 text-sm shadow-sm outline-none"
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
              <label for="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  // required
                  name="password"
                  type="password"
                  className="w-full rounded-lg text-black border-gray-200 p-4 pe-12 text-sm shadow-sm  outline-none"
                  placeholder="Enter password"
                />
              </div>
            </div>
            <div>
              {loadingData ? (
                <div className="flex justify-center">
                  <TailSpin
                    visible={true}
                    height="40"
                    width="40"
                    color="#4fa94d"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              ) : (
                <input
                  type="submit"
                  value="Login"
                  className="block w-full rounded-lg bg-green-500 px-5 py-3 text-sm font-medium text-white cursor-pointer hover:bg-green-700"
                />
              )}

              {/* <button
                onClick={handleUserSubmit}
                className="block w-full rounded-lg bg-green-500 px-5 py-3 text-sm font-medium text-white cursor-pointer hover:bg-green-700"
              >
                User Login
              </button> */}
            </div>
            <div className="flex justify-between">
              <p className="text-center text-sm text-gray-500">
                No account?
                <Link to={"/signup"} className="underline text-blue-600">
                  Sign up
                </Link>
              </p>
              <p className="text-center text-sm text-gray-500">
                <Link
                  to={"/forget-password"}
                  className="underline text-blue-600"
                >
                  Reset Password
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
