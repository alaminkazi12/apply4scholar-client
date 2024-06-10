import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAppliedScholarship = () => {
  const axiosPublic = useAxiosPublic();
  // tan stack query
  const { data: appliedScholarship = [], refetch } = useQuery({
    queryKey: ["appliedScholarship"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-applied-scholarships");
      return res.data;
    },
  });
  return [appliedScholarship, refetch];
};

export default useAppliedScholarship;
