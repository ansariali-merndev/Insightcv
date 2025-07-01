import { createContext, useContext, useEffect, useState } from "react";
import { handleLogout, handleVerify } from "../lib/axios";
import Swal from "sweetalert2";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const checkUserAuthorized = async () => {
    const res = await handleVerify();
    if (res.success) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
    return res;
  };

  const userLogout = async () => {
    const res = await handleLogout();

    if (!res.success) {
      Swal.fire({
        title: "Something went wrong",
        text: "Please try later",
        timer: 2000,
      });
    }

    setIsAuthorized(false);
    Swal.fire({
      title: "Logout Successfuly",
      timer: 2000,
    });
  };

  useEffect(() => {
    checkUserAuthorized();
  }, []);

  const value = {
    isAuthorized,
    setIsAuthorized,
    userLogout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const UseUser = () => {
  return useContext(UserContext);
};
