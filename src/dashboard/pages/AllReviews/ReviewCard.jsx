import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaStar, FaTrash } from "react-icons/fa";

const ReviewCard = ({ item, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const {
    _id,
    rating,
    comment,
    data,
    university_name,
    userName,
    userImage,
    subject_category,
  } = item;

  // Handle delete review
  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete("/review", {
            data: { id: _id },
          });
          if (res.data.deletedCount === 1) {
            Swal.fire({
              title: "Deleted!",
              text: "Review has been deleted.",
              icon: "success",
            });
            refetch();
          } else {
            toast.error("Failed to delete review");
          }
        } catch (error) {
          toast.error("Failed to delete review");
        }
      }
    });
  };

  return (
    <div className="border rounded-lg shadow-lg p-4 flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        <img
          src={userImage}
          alt={`${userName}'s profile`}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="text-lg font-bold">{userName}</h3>
          <p className="text-sm text-gray-600">{university_name}</p>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500">Subject: {subject_category}</p>
        <p className="text-sm text-gray-500 flex items-center gap-4">
          Rating:{" "}
          <span className="flex items-center  gap-1 text-orange-700">
            <FaStar />
            {rating}
          </span>
        </p>
      </div>
      <p className="text-sm">{comment}</p>
      <p className="text-xs text-gray-400">
        {new Date(data).toLocaleDateString()}
      </p>
      <button
        onClick={handleDelete}
        className="flex items-center space-x-1 text-red-600 hover:text-red-800"
      >
        <FaTrash />
        <span>Delete</span>
      </button>
    </div>
  );
};

export default ReviewCard;
