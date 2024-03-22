import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import swal from "sweetalert";
import auth from "../firebase.init";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const resetPassword = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (!email) {
      swal("Oops", "Email Must Not Be Empty", "error");
      return;
    } else if (!email.includes("@")) {
      swal("Oops", "Email Must Be Valid", "error");
      return;
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          swal("Success", "Password reset email sent", "success");
          e.target.reset();
          navigate("/login");
        })
        .catch((error) => {
          swal("Oops", error.message, "error");
        });
    }
  };
  return (
    <div className="flex justify-center">
      <Helmet>
        <title>Forget password</title>
        <meta
          name="description"
          content="
          Forget password page for islamicposhak.com. Reset your password here."
        />
      </Helmet>
      <div>
        <h2 className="text-3xl my-5">Forget password</h2>
        <form onSubmit={resetPassword}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your Email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all"
              type="submit"
            >
              Send email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
