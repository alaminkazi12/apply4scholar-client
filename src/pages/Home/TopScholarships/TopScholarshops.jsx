import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SectionTitle from "../../../shared/sectionTitle/SectionTitle";
import { useEffect, useState } from "react";
import Card from "./Card";

const TopScholarshops = () => {
  const axiosPublic = useAxiosPublic();
  const [topScholarships, setTopScholarships] = useState([]);

  useEffect(() => {
    axiosPublic
      .get("/top-scholarship")
      .then((res) => setTopScholarships(res.data));
  }, [axiosPublic]);

  console.log(topScholarships);

  return (
    <div>
      <SectionTitle
        heading={"top scholarships"}
        subheading={"Explore the Best Opportunities for Your Future"}
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {topScholarships.map((item) => (
          <Card item={item} key={item._id}></Card>
        ))}
      </div>
    </div>
  );
};

export default TopScholarshops;
