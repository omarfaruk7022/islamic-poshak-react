import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import cross from "../../assets/images/close.png";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loader from "../../Components/Common/Loader";
import useAdmin from "../../Components/Shared/useAdmin";

export default function AllUsers() {
  const [allUsers, setAllUsers] = useState();
  const [user, loading] = useAuthState(auth);
  const email = user?.email;
  const navigate = useNavigate();
  const [finalData, setFinalData] = useState([]);
  const [admin, adminLoading] = useAdmin(user);

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("http://localhost:5000/api/users", {
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
          ContentType: "application/json",
        },
      }).then((res) => res.json()),
  });
  // const isUserAdminQuery = useQuery({
  //   queryKey: ["isUserAdmin"],
  //   queryFn: () =>
  //     fetch(`http://localhost:5000/api/users/email/${email}`).then((res) =>
  //       res.json()
  //     ),
  // });

  const users = usersQuery.data;
  const userIsAdmin = users.data?.find((user) => user.email === email);

  useEffect(() => {
    if (users?.data) {
      setFinalData(users?.data);
    }
  }, [users?.data]);
  const refetch = () => {
    usersQuery.refetch();
  };

  const isLoading = usersQuery.isLoading;

  if (loading || isLoading) {
    return <Loader />;
  }

  const handleAdmin = (id) => {
    fetch(`http://localhost:5000/api/users/${id}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
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
    fetch(`http://localhost:5000/api/users/${id}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
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

  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.value;
    if (search == "" || search == null || search == undefined) {
      setFinalData(users?.data);
    } else {
      const searchData = users?.data?.filter((user) => {
        return (
          user?.username.toLowerCase().includes(search.toLowerCase()) ||
          user?.email.toLowerCase().includes(search.toLowerCase()) ||
          user?.role.toLowerCase().includes(search.toLowerCase())
        );
      });
      setFinalData(searchData);
    }
  };

  return (
    <div>
      {adminLoading ? (
        <Loader />
      ) : (
        <>
          <div className="overflow-x-auto  p-5">
            <div className="flex justify-end my-3">
              <form onChange={handleSearch}>
                <div class="relative">
                  <label for="Search" class="sr-only">
                    {" "}
                    Search{" "}
                  </label>

                  <input
                    type="text"
                    id="Search"
                    placeholder="Search for..."
                    class="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
                  />

                  <span class="absolute inset-y-0 end-0 grid w-10 place-content-center">
                    <button
                      type="submit"
                      class="text-gray-600 hover:text-gray-700"
                    >
                      <span class="sr-only">Search</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-4 w-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </button>
                  </span>
                </div>
              </form>
            </div>
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
                  {admin == "admin" && (
                    <>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-center text-gray-900 ">
                        Change Role
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              {finalData?.map((user) => (
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
                          <span className="text-green-500">user</span>
                        )}
                      </td>
                      {userIsAdmin?._id !== user?._id &&
                        user?.role !== "admin" && (
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
                      {userIsAdmin?._id !== user?._id &&
                        user?.role == "admin" && (
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
        </>
      )}
    </div>
  );
}
// AllUsers.Layout = DashboardLayout;
