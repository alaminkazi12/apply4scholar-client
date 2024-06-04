import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../../assets/Apply4Scholar_logo.png";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  const navlinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "font-bold text-[#1A73E8] border-b-2 border-b-[#1A73E8]"
              : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-scholarship"
          className={({ isActive }) =>
            isActive
              ? "font-bold text-[#1A73E8] border-b-2 border-b-[#1A73E8]"
              : ""
          }
        >
          All Scholarship
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "font-bold text-[#1A73E8] border-b-2 border-b-[#1A73E8]"
              : ""
          }
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar fixed z-10 max-w-[1440px] bg-[#F5F5F5] bg-opacity-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-lg lg:hidden"
          >
            <GiHamburgerMenu />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navlinks}
          </ul>
        </div>
        <img src={logo} alt="apply4scholar logo" />
      </div>
      <div className="navbar-center hidden">
        <ul className="menu menu-horizontal px-1">{navlinks}</ul>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-2 hidden lg:flex">{navlinks}</ul>
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default Navbar;
