import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../context/AuthProvider";
import ApplicationRow from "./ApplicationRow";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

const MyApplication = () => {
  // const [myApplications, setMyApplications] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const {
    data: myApplications = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myApllication", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // useEffect(() => {
  //   axiosSecure.get(`/applications/?email=${user?.email}`).then((res) => {
  //     console.log(res.data);
  //     setMyApplications(res.data);
  //   });
  // }, [axiosSecure, user]);

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
              <ApplicationRow
                key={idx}
                item={item}
                refetch={refetch}
              ></ApplicationRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplication;
