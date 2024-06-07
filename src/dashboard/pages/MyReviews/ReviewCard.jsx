import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ReviewCard = ({ item, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { rating, comment, data, university_name, scholarship_name, _id } =
    item;

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const updatedReview = {
      rating: data.rating,
      comment: data.comment,
      id: _id,
    };

    // send the data to server for update
    axiosSecure.put("/reveiw", updatedReview).then((res) => {
      if (res.data.modifiedCount) {
        toast.success("Reveiw Updated Successfully");
        refetch();
      }
    });

    // Close the modal after form submission
    setIsModalOpen(false);
    reset(); // Reset form fields
  };

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
    <>
      <tr>
        <td>{scholarship_name ? scholarship_name : "Not available"}</td>
        <td>{university_name}</td>
        <td>{comment}</td>
        <td>{data.split("T")[0]}</td>
        <th>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-ghost btn-xs text-yellow-900"
          >
            <FaEdit />
          </button>
        </th>
        <th>
          <button
            onClick={handleDelete}
            className="btn btn-ghost btn-xs text-red-800"
          >
            <FaTrash />
          </button>
        </th>
      </tr>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 max-w-[500px] mx-auto">
          <div className="relative bg-white p-6 border-2 m-6 rounded-lg shadow-lg">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 flex flex-col"
            >
              <h2 className="text-center text-2xl mb-4 uppercase font-bold">
                UPDATE REVIEW
              </h2>
              <div className="space-y-2">
                <label className="font-bold">RATING POINT*</label>
                <input
                  {...register("rating", { required: true })}
                  type="text"
                  defaultValue={rating}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="font-bold label">YOUR COMMENT*</label>
                <textarea
                  rows="5"
                  {...register("comment", { required: true })}
                  className="textarea textarea-bordered w-full"
                  defaultValue={comment}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn w-full bg-green-500 text-white hover:bg-black"
              >
                UPDATE REVIEW
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewCard;
