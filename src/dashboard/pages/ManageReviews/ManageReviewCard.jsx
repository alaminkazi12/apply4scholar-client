import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageReviewCard = ({ item, refetch }) => {
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

  //   now delte the scholarship
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
    <tr>
      <td>{university_name}</td>
      <td>{subject_category ? subject_category : "None"}</td>
      <td>
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img src={userImage} alt={userName} />
          </div>
        </div>
      </td>
      <td>{data}</td>
      <td>{rating}</td>
      <td>{comment}</td>
      <th>
        <button
          onClick={handleDelete}
          className="btn btn-ghost btn-xs text-red-400"
        >
          <FaTrash />
        </button>
      </th>
    </tr>
  );
};

export default ManageReviewCard;
