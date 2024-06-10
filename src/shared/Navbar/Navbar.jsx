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
              : "text-white hover:text-[#1A73E8] hover:bg-white px-4 py-2 rounded-lg transition-all duration-300"
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
              : "text-white hover:text-[#1A73E8] hover:bg-white px-4 py-2 rounded-lg transition-all duration-300"
          }
        >
          All Scholarships
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard/home"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-[#1A73E8] border-b-2 border-b-[#1A73E8]"
                : "text-white hover:text-[#1A73E8] hover:bg-white px-4 py-2 rounded-lg transition-all duration-300"
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
    <div className="navbar fixed z-10 max-w-[1440px] bg-black bg-opacity-15">
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black rounded-box w-52 uppercase"
          >
            {navlinks}
          </ul>
        </div>
        <Link to="/">
          <img src={logo} alt="apply4scholar logo" />
        </Link>
      </div>
      <div className="navbar-center hidden">
        <ul className="menu menu-horizontal px-1 text-white">{navlinks}</ul>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-2 text-black hidden lg:flex uppercase text-md">
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
                  <Link to="/dashboard/profile" className="justify-between">
                    {user?.displayName || "Not Found"}
                  </Link>
                </li>
                {/* <li>
                <Link to="/update_profile">Update Profile</Link>
              </li> */}
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
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
