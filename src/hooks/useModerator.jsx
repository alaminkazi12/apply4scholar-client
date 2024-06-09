import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useModerator = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: isModerator, isLoading } = useQuery({
    queryKey: [user?.email, "isModerator"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/moderator/${user?.email}`);
      return res.data.moderator;
    },
  });
  return [isModerator, isLoading];
};

export default useModerator;
