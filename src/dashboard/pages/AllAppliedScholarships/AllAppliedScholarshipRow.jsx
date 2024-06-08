import { VscFeedback } from "react-icons/vsc";
import useSingleScholarship from "../../../hooks/useSingleScholarship";
import { useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AllAppliedScholarshipRow = ({ item, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewDetails, setIsViewDetils] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    _id,
    userName,
    userEmail,
    userPhoto,
    scholarship_id,
    date,
    university_name,
    subject_name,
    scholarship_category,
    scholarship_name,
    subject_category,
    phone,
    degree,
    gender,
    ssc,
    hsc,
    studyGap,
    status,
  } = item;

  const [scholarship] = useSingleScholarship(scholarship_id);
  const { application_fees, service_charge, university_location } = scholarship;

  //   HANDLE FEEDBACK

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    const feedback = {
      feedback: data.feedback,
      id: _id,
    };

    // send the data to server for update
    axiosSecure.put("/feedback", feedback).then((res) => {
      if (res.data.modifiedCount) {
        toast.success("Feedback Submitted");
        refetch();
      }
    });

    // Close the modal after form submission
    setIsModalOpen(false);
    reset(); // Reset form fields
  };

  //   handle cancle

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const status = {
          status: "rejected",
          id: _id,
        };

        // send the data to server for update
        axiosSecure.put("/application-status", status).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Rejected!",
              text: "Application has been rejected.",
              icon: "success",
            });

            refetch();
          }
        });
      }
    });
  };

  return (
    <>
      <tr>
        <td>{university_name}</td>
        <td>{scholarship_name ? scholarship_name : "none"}</td>
        <td>{scholarship_category}</td>
        <td>{subject_category ? subject_category : "none"}</td>
        <td>{degree}</td>
        <td>{application_fees}</td>
        <td>{service_charge}</td>
        <td
          className={`font-normal ${
            status === "pending"
              ? "text-yellow-500"
              : status === "processing"
              ? "text-blue-500"
              : status === "completed"
              ? "text-green-500"
              : status === "rejected"
              ? "text-red-500"
              : ""
          }`}
        >
          {status}
        </td>
        <th>
          <button
            onClick={() => setIsViewDetils(true)}
            className="btn btn-ghost btn-xs text-red-400"
          >
            <FaEye />
          </button>
        </th>
        <th>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-ghost btn-xs text-yellow-600"
          >
            <VscFeedback />
          </button>
        </th>
        <th>
          {" "}
          {status == "rejected" ? (
            <button disabled className="btn btn-ghost btn-xs text-red-400">
              <ImCancelCircle />
            </button>
          ) : (
            <button
              onClick={handleCancel}
              className="btn btn-ghost btn-xs text-gray-400"
            >
              <ImCancelCircle />
            </button>
          )}
        </th>
      </tr>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative bg-white p-6 border-2 m-6 rounded-lg shadow-lg w-full max-w-[500px] h-3/4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
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
                FEEDBACK INFORMATION
              </h2>
              <div className="space-y-2">
                <label className="font-bold">WRITE THE FEEDBACK*</label>
                <textarea
                  rows="5"
                  {...register("feedback", { required: true })}
                  className="textarea textarea-bordered w-full"
                  placeholder="leave your feedback"
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn w-full bg-green-500 text-white hover:bg-black"
              >
                SUBMIT FEEDBACK
              </button>
            </form>
          </div>
        </div>
      )}
      {isViewDetails && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={() => setIsViewDetils(false)}
        >
          <div
            className="relative bg-white p-6 border-2 m-6 rounded-lg shadow-lg w-full max-w-[500px] h-3/4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setIsViewDetils(false)}
            >
              ✕
            </button>
            <div className="space-y-6 flex flex-col">
              <h2 className="text-center text-2xl mb-4 uppercase font-bold">
                APLLICATION INFORMATION
              </h2>
              <div className="border rounded-lg shadow-lg p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={userPhoto}
                    alt={userName}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-bold">{userName}</h2>
                    <p className="text-gray-600">{userEmail}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p className="font-semibold">
                    University:{" "}
                    <span className="font-normal">{university_name}</span>
                  </p>
                  <p className="font-semibold">
                    Subject: <span className="font-normal">{subject_name}</span>
                  </p>
                  <p className="font-semibold">
                    Scholarship Category:{" "}
                    <span className="font-normal">{scholarship_category}</span>
                  </p>
                  <p className="font-semibold">
                    Degree: <span className="font-normal">{degree}</span>
                  </p>
                  <p className="font-semibold">
                    Gender: <span className="font-normal">{gender}</span>
                  </p>
                  <p className="font-semibold">
                    Phone: <span className="font-normal">{phone}</span>
                  </p>
                  <p className="font-semibold">
                    SSC GPA: <span className="font-normal">{ssc}</span>
                  </p>
                  <p className="font-semibold">
                    HSC GPA: <span className="font-normal">{hsc}</span>
                  </p>
                  <p className="font-semibold">
                    Study Gap: <span className="font-normal">{studyGap}</span>
                  </p>
                  <p className="font-semibold">
                    Status: <span className="font-normal">{status}</span>
                  </p>
                  <p className="font-semibold">
                    Date:{" "}
                    <span className="font-normal">
                      {new Date(date).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllAppliedScholarshipRow;
