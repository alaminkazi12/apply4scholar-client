import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [dbUsr, setDbUser] = useState({});
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/user/?email=${user?.email}`).then((res) => {
      setDbUser(res.data);
    });
  }, [axiosSecure, user]);

  const { role, userEmail, userName } = dbUsr;

  return (
    <div className="min-h-screen mt-10 flex flex-col items-center justify-center bg-gray-100 rounded-xl p-6 uppercase">
      <h1 className="text-4xl uppercase font-bold text-center mb-6 text-green-600">
        My Profile
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <img
          className="rounded-full border-4 border-green-500 mx-auto mb-4 w-32 h-32 object-cover"
          src={user?.photoURL}
          alt={userName}
        />
        <h2 className="text-2xl font-bold mb-2 text-gray-700">
          Name: {userName}
        </h2>
        <h3 className="text-xl text-gray-500 mb-2">Email: {userEmail}</h3>
        <h4 className="text-lg text-gray-500 uppercase">Role: {role}</h4>
      </div>
    </div>
  );
};

export default MyProfile;
