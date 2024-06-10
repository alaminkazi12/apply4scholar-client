import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SectionTitle from "../../../shared/sectionTitle/SectionTitle";
import { useEffect, useState } from "react";
import Card from "./Card";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import { Link } from "react-router-dom";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10 p-4">
        {topScholarships.map((item) => (
          <Card item={item} key={item._id}></Card>
        ))}
      </div>
      <div className="flex justify-center items-center my-10">
        <Link to="/all-scholarsips">
          <PrimaryButton text={"Explore more"}></PrimaryButton>
        </Link>
      </div>
    </div>
  );
};

export default TopScholarshops;
