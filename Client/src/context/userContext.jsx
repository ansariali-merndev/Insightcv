import { createContext, useContext, useEffect, useState } from "react";
import { handleLogout, handleVerify } from "../lib/axios";
import Swal from "sweetalert2";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [check, setCheck] = useState(false);

  const checkUserAuthorized = async () => {
    const res = await handleVerify();
    if (res.success) {
      setIsAuthorized(true);
      setUsername(res.user.username);
      setImage(res.user.image);
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
  }, [check]);

  const value = {
    isAuthorized,
    setIsAuthorized,
    userLogout,
    username,
    image,
    setCheck,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const UseUser = () => {
  return useContext(UserContext);
};
