import { useEffect, useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { NavItem } from "../lib/utils";

export const MobileNav = () => {
  const [openNav, setOpenNav] = useState(false);

  return (
    <nav className="flex md:hidden">
      <button
        onClick={() => setOpenNav(true)}
        className="text-2xl cursor-pointer"
      >
        <RiMenu3Line />
      </button>
      <div
        className={`bg-gray-200 z-40 absolute inset-0 w-64 flex flex-col gap-4 justify-center items-center transform transition-transform duration-300 ease-in-out  ${
          openNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {NavItem.map((item, index) => (
          <NavLink key={index} onClick={() => setOpenNav(false)} to={item.url}>
            {item.label}
          </NavLink>
        ))}

        <NavLink
          onClick={() => setOpenNav(false)}
          to={"/sign-in"}
          className="px-2 py-1"
        >
          Sign in
        </NavLink>

        <p
          onClick={() => setOpenNav(false)}
          className="text-2xl absolute left-56 z-50 top-0 cursor-pointer"
        >
          &times;
        </p>
      </div>
    </nav>
  );
};
