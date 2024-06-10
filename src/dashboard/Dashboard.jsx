import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../context/AuthProvider";
import useUsers from "../hooks/useUsers";
import { FaEnvelope, FaUser } from "react-icons/fa";
import useAppliedScholarship from "../hooks/useAppliedScholarship";
import { FaGraduationCap, FaStar } from "react-icons/fa6";
import useReviews from "../hooks/useReviews";
import useScholarship from "../hooks/useScholarship";
import useAdmin from "../hooks/useAdmin";
import useModerator from "../hooks/useModerator";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [users] = useUsers();
  const [appliedScholarship] = useAppliedScholarship();
  const [reviews] = useReviews();
  const [scholarship] = useScholarship();
  const [isAdmin] = useAdmin();
  const [isModerator] = useModerator();
  const axiosSecure = useAxiosSecure();

  const { data: userReviews = [] } = useQuery({
    queryKey: ["userReviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`myreviews/?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: myApplications = [] } = useQuery({
    queryKey: ["myApllication", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return (
    <div className="min-h-screen mt-10">
      <Helmet>
        <title> DashBoard | Apply4Scholar </title>
      </Helmet>

      <h1 className="text-xl md:text-4xl uppercase font-bold text-center mb-4 mt-14">
        dashboard
      </h1>
      <div>
        <h1 className="text-sm md:text-2xl lg:text-4xl uppercase text-center mb-2 text-green-600">
          Hi, {user.displayName}! Welcome to your dashboard
        </h1>
        {isAdmin && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-center rounded-xl px-4 py-8 bg-yellow-600">
              <div>
                <FaUser className="text-7xl opacity-25"></FaUser>
              </div>
              <div className="text-white font-bold flex flex-col items-center">
                <h4 className="text-2xl md:text-4xl uppercase text-center">
                  Total Users
                </h4>
                <h5 className="text-4xl md:text-5xl">{users.length}</h5>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-xl px-4 py-8 bg-green-700">
              <div>
                <FaGraduationCap className="text-7xl opacity-25"></FaGraduationCap>
              </div>
              <div className="text-white font-bold flex flex-col items-center">
                <h4 className="text-2xl md:text-4xl uppercase text-center">
                  Applied Scholarships
                </h4>
                <h5 className="text-4xl md:text-5xl">
                  {appliedScholarship.length}
                </h5>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-xl px-4 py-8 bg-orange-600">
              <div>
                <FaStar className="text-7xl opacity-25"></FaStar>
              </div>
              <div className="text-white font-bold flex flex-col items-center">
                <h4 className="text-2xl md:text-4xl uppercase text-center">
                  Total Reviews
                </h4>
                <h5 className="text-4xl md:text-5xl">{reviews.length}</h5>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-xl px-4 py-8 bg-sky-700">
              <div>
                <FaGraduationCap className="text-7xl opacity-25"></FaGraduationCap>
              </div>
              <div className="text-white font-bold flex flex-col items-center">
                <h4 className="text-2xl md:text-4xl uppercase text-center">
                  Total Scholarships
                </h4>
                <h5 className="text-4xl md:text-5xl">{scholarship.length}</h5>
              </div>
            </div>
          </div>
        )}
        {isModerator && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-center rounded-xl px-4 py-8 bg-green-700">
              <div>
                <FaGraduationCap className="text-7xl opacity-25"></FaGraduationCap>
              </div>
              <div className="text-white font-bold flex flex-col items-center">
                <h4 className="text-2xl md:text-4xl uppercase text-center">
                  Applied Scholarships
                </h4>
                <h5 className="text-4xl md:text-5xl">
                  {appliedScholarship.length}
                </h5>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-xl px-4 py-8 bg-orange-600">
              <div>
                <FaStar className="text-7xl opacity-25"></FaStar>
              </div>
              <div className="text-white font-bold flex flex-col items-center">
                <h4 className="text-2xl md:text-4xl uppercase text-center">
                  Total Reviews
                </h4>
                <h5 className="text-4xl md:text-5xl">{reviews.length}</h5>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-xl px-4 py-8 bg-sky-700">
              <div>
                <FaGraduationCap className="text-7xl opacity-25"></FaGraduationCap>
              </div>
              <div className="text-white font-bold flex flex-col items-center">
                <h4 className="text-2xl md:text-4xl uppercase text-center">
                  Total Scholarships
                </h4>
                <h5 className="text-4xl md:text-5xl">{scholarship.length}</h5>
              </div>
            </div>
          </div>
        )}
        {!isModerator && !isAdmin && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-center gap-4 rounded-xl px-4 py-8 bg-green-700">
              <div>
                <FaEnvelope className="text-7xl opacity-25"></FaEnvelope>
              </div>
              <div className="text-white font-bold flex flex-col items-center">
                <h4 className="text-2xl md:text-4xl uppercase text-center">
                  My applications
                </h4>
                <h5 className="text-4xl md:text-5xl">
                  {myApplications.length}
                </h5>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-xl px-4 py-8 bg-orange-600">
              <div>
                <FaStar className="text-7xl opacity-25"></FaStar>
              </div>
              <div className="text-white font-bold flex flex-col items-center">
                <h4 className="text-2xl md:text-4xl uppercase text-center">
                  My reviews
                </h4>
                <h5 className="text-4xl md:text-5xl">{userReviews.length}</h5>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
