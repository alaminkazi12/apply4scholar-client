import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useScholarship = () => {
  const axiosPublic = useAxiosPublic();
  // tan stack query
  const { data: scholarship = [] } = useQuery({
    queryKey: ["scholarship"],
    queryFn: async () => {
      const res = await axiosPublic.get("/scholarships");
      return res.data;
    },
  });
  return [scholarship];
};

export default useScholarship;
