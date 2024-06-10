import { Helmet } from "react-helmet-async";
import useReviews from "../../../hooks/useReviews";
import ReviewCard from "../AllReviews/ReviewCard";

const ManageReview = () => {
  const [reviews, refetch] = useReviews();

  return (
    <div className="min-h-screen mt-10">
      <Helmet>
        <title> Manage Reviews | Apply4Scholar </title>
      </Helmet>
      <h1 className="text-xl md:text-4xl uppercase font-bold text-center mb-4 mt-14 w-[80%] mx-auto">
        Manage Reviews
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {reviews.map((item, idx) => (
          <ReviewCard key={idx} item={item} refetch={refetch}></ReviewCard>
        ))}
      </div>
    </div>
  );
};

export default ManageReview;
