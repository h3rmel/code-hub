// React Hook(s)
import { useState } from "react";

// Router
import { Link } from "react-router-dom";

// React Icons
import {
  HiOutlineHome,
  HiOutlineQuestionMarkCircle,
  HiOutlineMenuAlt3,
} from "react-icons/hi";

const Navbar = () => {
  const [navbar, setNavbar] = useState(true);

  const toggleNavbar = () => {
    setNavbar(!navbar);
  };
  return (
    <div className="md:col-span-1 md:flex md:justify-end">
      <nav className="text-right w-full">
        <div className="flex md:justify-end justify-between items-center border-b border-gray-100">
          <h1 className="logo">
            <a href="/" className="hover:text-gray-700 duration-300">
              Food Ninja
            </a>
          </h1>
          <div className="px-4 cursor-pointer md:hidden" onClick={toggleNavbar}>
            <HiOutlineMenuAlt3 size={24} />
          </div>
        </div>
        <ul className={`text-sm mt-2 ${navbar ? "hidden" : ""} md:block`}>
          <li className="py-1">
            <Link
              to="/"
              className="nav-link"
            >
              Home
              <HiOutlineHome size={20} />
            </Link>
          </li>
          <li className="py-1">
            <Link
              to="/about"
              className="nav-link"
            >
              About
              <HiOutlineQuestionMarkCircle size={20} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
