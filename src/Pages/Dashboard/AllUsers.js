import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import cross from "../../assets/images/close.png";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loader from "../../Components/Common/Loader";

export default function AllUsers() {
  const [allUsers, setAllUsers] = useState();
  const [user, loading] = useAuthState(auth);
  const email = user?.email;
  const navigate = useNavigate();

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://api.islamicposhak.com/api/users").then((res) =>
        res.json()
      ),
  });
  // const isUserAdminQuery = useQuery({
  //   queryKey: ["isUserAdmin"],
  //   queryFn: () =>
  //     fetch(`https://api.islamicposhak.com/api/users/email/${email}`).then((res) =>
  //       res.json()
  //     ),
  // });

  const users = usersQuery.data;
  const userIsAdmin = users.data?.find((user) => user.email === email);
  console.log("userIsAdmin", users?.data);
  const refetch = () => {
    usersQuery.refetch();
  };

  const isLoading = usersQuery.isLoading;

  if (userIsAdmin?.role !== "admin" && userIsAdmin !== undefined) {
    navigate("/dashboard");
  }

  if (loading || isLoading) {
    return <Loader />;
  }
  if (userIsAdmin?.role !== "admin") {
    navigate("/dashboard");
  }

  const handleAdmin = (id) => {
    fetch(`https://api.islamicposhak.com/api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "admin" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          swal("Yayy", "Admin Added Successfully", "success");
          refetch();
        }
      });
  };

  const handleRemoveAdmin = (id) => {
    fetch(`https://api.islamicposhak.com/api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "user" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          swal("Yayy", "Admin Removed Successfully", "success");
          refetch();
        }
      });
  };

  return (
    <div>
      <div className="overflow-x-auto  p-5">
        <table className="min-w-full divide-y-2 divide-gray-100  text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 ">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 ">
                Email
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 hite">
                Role
              </th>
              {userIsAdmin?.role == "admin" && (
                <>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-center text-gray-900 ">
                    Change Role
                  </th>
                </>
              )}
            </tr>
          </thead>
          {users?.data?.map((user) => (
            <>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium  text-gray-700 ">
                    {user?.username}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 ">
                    {user?.email}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 ">
                    {user?.role === "admin" ? (
                      <span className="text-red-500">Admin</span>
                    ) : (
                      <span className="text-green-500">Normal user</span>
                    )}
                  </td>
                  {userIsAdmin?._id !== user?._id && user?.role !== "admin" && (
                    <>
                      <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                        <button
                          onClick={() => handleAdmin(user?._id)}
                          className="bg-green-500  text-white px-2 py-1 rounded-md"
                        >
                          Make Admin
                        </button>
                      </td>
                    </>
                  )}
                  {userIsAdmin?._id === user?._id && (
                    <>
                      <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                        <button className="bg-yellow-500 text-white text-[11px] px-2 py-1 rounded-md">
                          You Can't Change Your Role
                        </button>
                      </td>
                    </>
                  )}
                  {userIsAdmin?._id !== user?._id && user?.role == "admin" && (
                    <>
                      <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                        <button
                          onClick={() => handleRemoveAdmin(user?._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded-md"
                        >
                          Remove Admin
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              </tbody>
            </>
          ))}
        </table>
      </div>

      <p className="text-red-500 font-bold text-sm text-center p-5">
        Caution: No one has the right to remove anyone from here
      </p>
    </div>
  );
}
// AllUsers.Layout = DashboardLayout;
