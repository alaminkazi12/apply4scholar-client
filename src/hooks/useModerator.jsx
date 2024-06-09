import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useModerator = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: isModarator } = useQuery({
    queryKey: [user?.email, "isModarator"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/moderator/${user?.email}`);
      console.log(res.data);
      return res.data.admin;
    },
  });
  return [isModarator];
};

export default useModerator;
