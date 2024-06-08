import useReviews from "../../../hooks/useReviews";
import ManageReviewCard from "./ManageReviewCard";

const ManageReview = () => {
  const [reviews, refetch] = useReviews();

  return (
    <div className="min-h-screen mt-10">
      <h1 className="text-4xl uppercase font-bold text-center mb-4">
        Manage Reviews
      </h1>
      <div className="overflow-x-auto max-w-[1000px] border-2 p-6 rounded-xl shadow-xl">
        <table className="table">
          {/* head */}
          <thead className="text-sm text-black">
            <tr>
              <th>University Name</th>
              <th>Subject Category</th>
              <th>Reviewer Image</th>
              <th>Review Date</th>
              <th>Rating Point</th>
              <th>Reviewer Comments</th>
              <th className="text-red-900"></th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((item, idx) => (
              <ManageReviewCard
                key={idx}
                item={item}
                refetch={refetch}
              ></ManageReviewCard>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageReview;
