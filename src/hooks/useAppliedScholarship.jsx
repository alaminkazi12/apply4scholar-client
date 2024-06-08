import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAppliedScholarship = () => {
  const axiosPublic = useAxiosPublic();
  // tan stack query
  const { data: scholarship = [], refetch } = useQuery({
    queryKey: ["scholarship"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-applied-scholarships");
      return res.data;
    },
  });
  return [scholarship, refetch];
};

export default useAppliedScholarship;
