import useScholarship from "../../hooks/useScholarship";
import PageTitle from "../../shared/PageTitle/PageTitle";
import Card from "../Home/TopScholarships/Card";

const AllScholarships = () => {
  const [scholarships] = useScholarship();
  console.log(scholarships);
  return (
    <div>
      <PageTitle
        title={"All Scholarships"}
        subtitle={"Explore Scholarships to Fuel Your Future"}
      ></PageTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
        {scholarships.map((item) => (
          <Card item={item} key={item._id}></Card>
        ))}
      </div>
    </div>
  );
};

export default AllScholarships;
