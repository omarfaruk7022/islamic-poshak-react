import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { Link } from "react-router-dom";

export default function ThankYou() {
  const [user] = useAuthState(auth);
  const email = user?.email;
  const [userInfo, setUserInfo] = useState();
  const getUser = () => {
    fetch(`http://localhost:5000/api/users/email/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data.data[0]);
      });
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <section className=" dark:bg-dark pt-10">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
                <span className="mb-2 block text-2xl font-semibold text-green-400">
                  জাযাকাল্লাহ
                </span>
                <h2 className="mb-3 text-[30px] font-bold leading-[1.2] text-black  ">
                  আপনার অর্ডারটি সফল্ভাবে সম্পন্ন হয়েছে
                </h2>
                <p className="text-base text-body-color dark:text-dark-6">
                  আপনার সাথে উক্ত{" "}
                  <span className="font-bold">{user?.email} </span> মেইলে অথবা{" "}
                  <span className="font-bold">{userInfo?.phone} </span>নাম্বারে
                  এ যোগাযোগ করা হবে ।
                </p>

                <Link className="text-blue-600" to="/dashboard/my-orders">
                  আপনার সকল অর্ডার দেখতে এখানে ক্লিক করুন
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
