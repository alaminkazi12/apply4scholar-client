import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UserRow = ({ item, refetch }) => {
  const { role, userEmail, userName, _id } = item;
  const axiosSecure = useAxiosSecure();

  // Function to handle the role change
  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    const updatedData = {
      role: selectedRole,
      id: _id,
    };

    // now update the role on database
    axiosSecure.put("/user", updatedData).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Updated!",
          text: `User now updated as ${selectedRole}.`,
          icon: "success",
        });

        refetch();
      }
    });
  };

  //   handle delete
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/user/${_id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });

            refetch();
          }
        });
      }
    });
  };

  return (
    <tr>
      <td>{userName}</td>
      <td>{userEmail}</td>
      <th>
        <select
          defaultValue={role}
          onChange={handleRoleChange}
          className="select select-bordered w-full max-w-xs uppercase"
        >
          <option value="user" disabled={role === "user"}>
            user
          </option>
          <option value="moderator" disabled={role === "moderator"}>
            moderator
          </option>
          <option value="admin" disabled={role === "admin"}>
            admin
          </option>
        </select>
      </th>
      <th>
        <button
          onClick={handleDelete}
          className="btn btn-ghost btn-xs text-red-400"
        >
          <FaTrash />
        </button>
      </th>
    </tr>
  );
};

export default UserRow;
