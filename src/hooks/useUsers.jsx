import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = (role) => {
  const axiosSecure = useAxiosSecure();
  console.log(role);

  // Tanstack query
  const { data: users = [], refetch } = useQuery({
    queryKey: ["user", role], // Include role in the query key
    queryFn: async () => {
      const url = role ? `/users/?role=${role}` : `/users`;
      const res = await axiosSecure.get(url);
      return res.data;
    },
    enabled: true, // Always enable the query
  });

  return [users, refetch];
};

export default useUsers;
