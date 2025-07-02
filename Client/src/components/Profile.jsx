import { useState } from "react";
import { UseUser } from "../context/userContext";

export const Profile = () => {
  const [show, setShow] = useState(false);

  const { userLogout, username, image } = UseUser();

  return (
    <div className="px-2 py-1">
      <button onClick={() => setShow(true)} className="">
        My profile
      </button>
      <div
        onClick={() => setShow(false)}
        className={`absolute right-0 w-64 mt-2 ${
          show ? "flex" : "hidden"
        } flex-col justify-center items-center bg-zinc-200 z-20 px-8 py-4 rounded-2xl`}
      >
        <img
          src={image}
          alt="images"
          className="w-10 mx-auto rounded-full mb-2"
        />
        <h2>{username}</h2>
        <button
          onClick={userLogout}
          className="bg-indigo-600 text-white px-3 py-1 rounded-[4px] cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
