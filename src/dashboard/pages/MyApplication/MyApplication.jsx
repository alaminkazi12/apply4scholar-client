import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../context/AuthProvider";
import ApplicationRow from "./ApplicationRow";

const MyApplication = () => {
  const [myApplications, setMyApplications] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axiosSecure.get(`/applications/?email=${user?.email}`).then((res) => {
      console.log(res.data);
      setMyApplications(res.data);
    });
  }, [axiosSecure, user]);

  return (
    <div className="min-h-screen mt-10">
      <h1 className="text-4xl uppercase font-bold text-center mb-4">
        My Application
      </h1>
      <div className="overflow-x-auto max-w-[1000px] border-2 p-6 rounded-xl shadow-xl">
        <table className="table">
          {/* head */}
          <thead className="text-sm text-black">
            <tr>
              <th>University Name</th>
              <th>University Location</th>
              <th>Subject Name</th>
              <th>Scholarship Category</th>
              <th>Applied Degree</th>
              <th>Application Fees</th>
              <th>Service Charge</th>
              <th>Feedback</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {myApplications.map((item, idx) => (
              <ApplicationRow key={idx} item={item}></ApplicationRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplication;
