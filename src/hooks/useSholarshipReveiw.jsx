import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSholarshipReveiw = (id) => {
  const axiosSecure = useAxiosSecure();
  console.log(id);

  // tan stack query
  const { data: ScholarshipReviews = [], refetch } = useQuery({
    queryKey: ["ScholarshipReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews-scholarship/${id}`);
      return res.data;
    },
  });
  return [ScholarshipReviews, refetch];
};

export default useSholarshipReveiw;
