import { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ReviewCard from "./ReviewCard";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: reviews = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userReviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`myreviews/?email=${user?.email}`);
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

  return (
    <div className="min-h-screen mt-10">
      <Helmet>
        <title> My Reviews | Apply4Scholar </title>
      </Helmet>
      <h1 className="text-4xl uppercase font-bold text-center mb-4">
        My Reviews
      </h1>
      <div className="overflow-x-auto max-w-[1000px] border-2 p-6 rounded-xl shadow-xl">
        <table className="table">
          {/* head */}
          <thead className="text-sm text-black">
            <tr>
              <th>Scholarship Name</th>
              <th>University Name</th>
              <th>Review Comments</th>
              <th>Review Date</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((item, idx) => (
              <ReviewCard key={idx} item={item} refetch={refetch}></ReviewCard>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyReviews;
