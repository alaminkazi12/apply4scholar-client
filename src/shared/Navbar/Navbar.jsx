import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../../assets/Apply4Scholar_logo.png";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Tooltip } from "react-tooltip";
import "react-toastify/dist/ReactToastify.css";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

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
          to="/all-scholarsips"
          className={({ isActive }) =>
            isActive
              ? "font-bold text-[#1A73E8] border-b-2 border-b-[#1A73E8]"
              : ""
          }
        >
          All Scholarship
        </NavLink>
      </li>
      {user && (
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
      )}
    </>
  );

  const handleLogout = () => [
    logOut()
      .then(() => {})
      .catch((error) => console.log(error)),
  ];

  return (
    <div className="navbar fixed z-10 max-w-[1440px] bg-[#F5F5F5] bg-opacity-0">
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
        <ul className="menu menu-horizontal px-1 text-white">{navlinks}</ul>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-2 text-white hidden lg:flex">
          {navlinks}
        </ul>
        <div>
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                id="profile"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className=" w-8 md:w-10 rounded-full">
                  <img
                    alt={user?.displayName || "Image Not Found"}
                    src={
                      user?.photoURL || "https://i.ibb.co/bX4Qscm/images.png"
                    }
                  />
                </div>
              </div>
              <Tooltip
                content={user?.displayName}
                place="top"
                anchorSelect="#profile"
              />
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  {user?.displayName || "Not Found"}
                  {/* <Link to="/profile" className="justify-between">
                  
                </Link> */}
                </li>
                {/* <li>
                <Link to="/update_profile">Update Profile</Link>
              </li> */}
                <li onClick={handleLogout}>
                  <a>Log Out</a>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn ">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
