import { useState } from "react";
import useUsers from "../../../hooks/useUsers";
import UserRow from "./UserRow";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
  const [role, setRole] = useState("");
  const [users, refetch] = useUsers(role);

  const handleShort = (e) => {
    const role = e.target.value;
    setRole(role);
  };

  return (
    <div className="min-h-screen mt-10">
      <Helmet>
        <title> Manage Users | Apply4Scholar </title>
      </Helmet>
      <h1 className="text-xl md:text-4xl uppercase font-bold text-center mb-4 mt-14 w-[80%] mx-auto">
        MANAGE USERS
      </h1>
      <div className="flex justify-center mb-4 uppercase">
        <select
          onChange={handleShort}
          className="select select-success md:w-full  max-w-xs uppercase"
        >
          <option disabled selected>
            Short By Role
          </option>
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="overflow-x-auto max-w-[1000px] border-2 p-6 rounded-xl shadow-xl">
        <table className="table">
          {/* head */}
          <thead className="text-sm text-black">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, idx) => (
              <UserRow key={idx} item={item} refetch={refetch}></UserRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
