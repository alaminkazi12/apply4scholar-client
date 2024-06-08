import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSingleScholarship = (id) => {
  const axiosSecure = useAxiosSecure();
  const { data: scholarship = [], error } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (error) {
    console.error(`Error fetching scholarship with ID ${id}:`, error);
  }
  return [scholarship];
};

export default useSingleScholarship;
