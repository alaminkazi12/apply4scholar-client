import { useContext, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import useSingleScholarship from "../../../hooks/useSingleScholarship";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const ApplicationRow = ({ item }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const {
    scholarship_id,
    university_name,
    subject_name,
    scholarship_category,
    degree,
    status,
    feedback,
  } = item;

  const [scholarship] = useSingleScholarship(scholarship_id);
  const { application_fees, service_charge, university_location } = scholarship;

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle review button
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const reveiwData = {
      rating: data.rating,
      comment: data.comment,
      data: new Date(),
      university_name: university_name,
      userEmail: user?.email,
      userName: user?.displayName,
      userImage: user?.photoURL,
      scholarship_id: scholarship_id,
    };
    //    post the review to the db
    axiosSecure.post("/review", reveiwData).then((res) => {
      if (res.data.insertedId) {
        toast.success("Reveiw submitted successfully");
      }
    });

    // Close the modal after form submission
    setIsModalOpen(false);
    reset(); // Reset form fields
  };

  return (
    <>
      <tr>
        <td>{university_name}</td>
        <td className="flex items-center">
          <span>{university_location?.city}, </span>
          <span> {university_location?.country}</span>
        </td>
        <td>{subject_name}</td>
        <td>{scholarship_category}</td>
        <td className="uppercase">{degree}</td>
        <td className="uppercase">{application_fees}</td>
        <td className="uppercase">{service_charge}</td>
        <td>{feedback ? feedback : "None"}</td>
        <td>{status}</td>
        <th>
          <button className="btn btn-ghost btn-xs text-yellow-900">
            <FaEdit />
          </button>
        </th>
        <th>
          <button className="btn btn-ghost btn-xs text-red-800">
            <FaTrash />
          </button>
        </th>
        <th>
          <button className="btn btn-ghost btn-xs text-green-800">
            <FaEye />
          </button>
        </th>
        <th>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-ghost btn-xs"
          >
            Review
          </button>
        </th>
      </tr>

      {/* Modal for review */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 max-w-[500px] mx-auto">
          <div className=" relative bg-white p-6 border-2 m-6 rounded-lg shadow-lg">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 flex flex-col "
            >
              <h2 className="text-center text-2xl mb-4 uppercase font-bold">
                REVIEW INFORMATION
              </h2>
              <div className="space-y-2">
                <label className="font-bold">RATING POINT*</label>
                <input
                  {...register("rating", {
                    required: true,
                  })}
                  type="text"
                  placeholder="Rating (1 to 5)"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="font-bold label">YOUR COMMENT*</label>
                <textarea
                  rows="5"
                  cols="55"
                  {...register("comment", {
                    required: true,
                  })}
                  className="textarea textarea-bordered w-full"
                  placeholder="Leave Your Comment Here"
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn w-full bg-green-500 text-white hover:bg-black"
              >
                SUBMIT REVIEW
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicationRow;
