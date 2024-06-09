import { BsMenuButtonWide } from "react-icons/bs";
import { FaHome, FaUser } from "react-icons/fa";
import {
  FaEnvelopeOpen,
  FaGraduationCap,
  FaPeopleGroup,
  FaPlus,
  FaStar,
} from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const DashRoot = () => {
  const [isAdmin] = useAdmin();
  console.log(isAdmin);
  const navlinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "font-bold bg-[#1A73E8] text-[16px] text-white py-3 rounded-md hover:bg-black"
              : "text-white"
          }
        >
          <FaHome />
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/home"
          className={({ isActive }) =>
            isActive
              ? "font-bold bg-[#1A73E8] text-[16px] text-white py-3 rounded-md hover:bg-black"
              : "text-white"
          }
        >
          <MdDashboard />
          DASHBOARD
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/my-reviews"
          className={({ isActive }) =>
            isActive
              ? "font-bold bg-[#1A73E8] text-[16px] text-white py-3 rounded-md hover:bg-black"
              : "text-white"
          }
        >
          <FaStar />
          MY REVIEWS
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/my-application"
          className={({ isActive }) =>
            isActive
              ? "font-bold bg-[#1A73E8] text-[16px] text-white py-3 rounded-md hover:bg-black"
              : "text-white"
          }
        >
          <FaHome />
          MY APPLICATION
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            isActive
              ? "font-bold bg-[#1A73E8] text-[16px] text-white py-3 rounded-md hover:bg-black"
              : "text-white"
          }
        >
          <FaUser />
          PROFILE
        </NavLink>
      </li>
      {isAdmin && (
        <li>
          <NavLink
            to="/dashboard/add-scholarship"
            className={({ isActive }) =>
              isActive
                ? "font-bold bg-[#1A73E8] text-[16px] text-white py-3 rounded-md hover:bg-black"
                : "text-white"
            }
          >
            <FaPlus />
            ADD SCHOLARSHIP
          </NavLink>
        </li>
      )}

      {isAdmin && (
        <li>
          <NavLink
            to="/dashboard/manage-scholarship"
            className={({ isActive }) =>
              isActive
                ? "font-bold bg-[#1A73E8] text-[16px] text-white py-3 rounded-md hover:bg-black"
                : "text-white"
            }
          >
            <FaGraduationCap />
            MANAGE SCHOLARSHIP
          </NavLink>
        </li>
      )}

      {isAdmin && (
        <li>
          <NavLink
            to="/dashboard/manage-applied-scholarship"
            className={({ isActive }) =>
              isActive
                ? "font-bold bg-[#1A73E8] text-[16px] text-white py-3 rounded-md hover:bg-black"
                : "text-white"
            }
          >
            <FaEnvelopeOpen />
            MANAGE APPLIED APPLICATION
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          to="/dashboard/all-applied-scholarship"
          className={({ isActive }) =>
            isActive
              ? "font-bold bg-[#1A73E8] text-[16px] text-white py-3 rounded-md hover:bg-black"
              : "text-white"
          }
        >
          <FaEnvelopeOpen />
          ALL APPLIED APPLICATION
        </NavLink>
      </li>
      {isAdmin && (
        <li>
          <NavLink
            to="/dashboard/manage-users"
            className={({ isActive }) =>
              isActive
                ? "font-bold bg-[#1A73E8] text-[16px] text-white py-3 rounded-md hover:bg-black"
                : "text-white"
            }
          >
            <FaPeopleGroup />
            MANAGE USERS
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          to="/dashboard/all-reviews"
          className={({ isActive }) =>
            isActive
              ? "font-bold bg-[#1A73E8] text-[16px] text-white py-3 rounded-md hover:bg-black"
              : "text-white"
          }
        >
          <FaStar />
          All REVIEWS
        </NavLink>
      </li>
      {isAdmin && (
        <li>
          <NavLink
            to="/dashboard/manage-reviews"
            className={({ isActive }) =>
              isActive
                ? "font-bold bg-[#1A73E8] text-[16px] text-white py-3 rounded-md hover:bg-black"
                : "text-white"
            }
          >
            <FaStar />
            MANAGE REVIEW
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center relative">
        <div>
          <Outlet></Outlet>
        </div>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-outline lg:hidden absolute left-4 top-4"
        >
          <BsMenuButtonWide />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-60 md:w-80 min-h-full bg-[#1d7534] text-white">
          {navlinks}
        </ul>
      </div>
    </div>
  );
};

export default DashRoot;
