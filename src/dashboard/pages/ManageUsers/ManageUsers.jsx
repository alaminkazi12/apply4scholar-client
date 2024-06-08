import useUsers from "../../../hooks/useUsers";
import UserRow from "./UserRow";

const ManageUsers = () => {
  const [users, refetch] = useUsers();
  console.log(users);
  return (
    <div className="min-h-screen mt-10">
      <h1 className="text-4xl uppercase font-bold text-center mb-4">
        MANAGE USERS
      </h1>
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
