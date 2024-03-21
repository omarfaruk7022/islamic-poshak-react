import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const useAdmin = () => {
  const [admin, setAdmin] = useState("");
  const [adminLoading, setAdminLoading] = useState(true);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const email = user?.email;

    if (email) {
      fetch(`https://api.islamicposhak.com/api/users/email/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAdmin(data?.data[0]?.role);
          setAdminLoading(false);
          console.log("admin", data?.data[0]?.role);
        });
    }
  }, [user]);
  return [admin, adminLoading];
};

export default useAdmin;
