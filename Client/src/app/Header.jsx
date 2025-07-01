import { Link, NavLink } from "react-router-dom";
import { NavItem } from "../lib/utils";
import { MobileNav } from "./MobileNav";

export const Header = () => {
  return (
    <header className="flex justify-between items-center px-4 shadow-lg h-[12vh]">
      <Link to="/" className="text-2xl font-extrabold text-blue-600">
        InsightCV
      </Link>
      <nav className="hidden md:flex gap-4">
        {NavItem.map(({ label, url }, index) => (
          <NavLink to={url} key={index} className="px-2 py-1">
            {label}
          </NavLink>
        ))}

        <NavLink to={"/sign-in"} className="px-2 py-1">
          Sign in
        </NavLink>
      </nav>
      <MobileNav />
    </header>
  );
};
