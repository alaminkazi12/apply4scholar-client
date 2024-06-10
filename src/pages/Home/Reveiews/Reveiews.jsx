import useReviews from "../../../hooks/useReviews";
import SectionTitle from "../../../shared/sectionTitle/SectionTitle";
import ReveiwCard from "./ReveiwCard";

const Reveiews = () => {
  const [reviews] = useReviews();
  const limitedReviews = reviews.slice(0, 6);
  return (
    <div>
      <SectionTitle
        heading={"Student Reviews"}
        subheading={
          "Hear from students about their experiences and success stories"
        }
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
        {limitedReviews.map((item, idx) => (
          <ReveiwCard key={idx} item={item}></ReveiwCard>
        ))}
      </div>
    </div>
  );
};

export default Reveiews;
