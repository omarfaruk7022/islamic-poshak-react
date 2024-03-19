import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

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
                <span className="mb-2 block text-lg font-semibold text-green-400">
                  Order confirmed
                </span>
                <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-black  sm:text-4xl md:text-[40px]">
                  Order confirmed
                </h2>
                <p className="text-base text-body-color dark:text-dark-6">
                  Your order has been confirmed and will get an email to your{" "}
                  <span className="font-bold">{user?.email} </span>
                  or a call to your{" "}
                  <span className="font-bold">{userInfo?.phone} </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
