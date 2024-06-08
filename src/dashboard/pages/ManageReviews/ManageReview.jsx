import useReviews from "../../../hooks/useReviews";
import ReviewCard from "../AllReviews/ReviewCard";
import ManageReviewCard from "./ManageReviewCard";

const ManageReview = () => {
  const [reviews, refetch] = useReviews();

  return (
    <div className="min-h-screen mt-10">
      <h1 className="text-4xl uppercase font-bold text-center mb-4">
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
