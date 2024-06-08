import { useContext, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import useSingleScholarship from "../../../hooks/useSingleScholarship";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ApplicationRow = ({ item, refetch }) => {
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
    phone,
    gender,
    ssc,
    hsc,
    studyGap,
    _id,
    userAddress,
  } = item;

  const [scholarship] = useSingleScholarship(scholarship_id);
  const { application_fees, service_charge, university_location } = scholarship;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

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

  // update handler
  const onUpdateSubmit = async (data) => {
    const updatedApplication = {
      degree: data.degree,
      gender: data.gender,
      hsc: data.hsc,
      phone: data.phone,
      ssc: data.ssc,
      studyGap: data.studyGap,
      userAddress: data.userAddress,
    };

    // now post the data to server api
    axiosSecure.put(`/apply/${_id}`, updatedApplication).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Updated!",
          text: "Application has been updated.",
          icon: "success",
        });

        setIsEdit(false);
      }
    });
  };

  // validate if application is pending
  const validateStatus = () => {
    if (status != "pending") {
      toast.error("You can not edit apllication if it is not pending");
    } else {
      setIsEdit(true);
    }
  };

  // handle delete

  const handleDelete = () => {
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
        axiosSecure.delete(`/application/${_id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
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
        <td
          className={`font-bold capitalize ${
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
            onClick={validateStatus}
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
        <th>
          <Link to={`/scholarship/${scholarship_id}`}>
            <button className="btn btn-ghost btn-xs text-green-800">
              <FaEye />
            </button>
          </Link>
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
      {/* Modal for Edit*/}
      {isEdit && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={() => setIsEdit(false)}
        >
          <div
            className="relative bg-white p-6 border-2 m-6 rounded-lg shadow-lg w-full max-w-[500px] h-3/4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setIsEdit(false)}
            >
              ✕
            </button>
            <form
              onSubmit={handleSubmit(onUpdateSubmit)}
              className="space-y-6 flex flex-col"
            >
              <h2 className="text-center text-2xl mb-4 uppercase font-bold">
                UPDATE APPLICATION
              </h2>
              <div className=" space-y-2">
                <label className="font-bold">Phone Number*</label>
                <input
                  {...register("phone", {
                    required: true,
                    minLength: 11,
                    maxLength: 15,
                  })}
                  type="number"
                  defaultValue={phone}
                  placeholder={phone}
                  className="input input-bordered w-full"
                />
              </div>

              <div className=" space-y-2">
                <label className="font-bold">Gender*</label>
                <br />
                <select
                  {...register("gender", { required: true })}
                  className="select select-bordered w-full"
                  defaultValue={gender}
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>

              <div className=" space-y-2">
                <label className="font-bold">Your Address*</label>
                <input
                  {...register("userAddress", { required: true })}
                  type="text"
                  placeholder={
                    userAddress
                      ? userAddress
                      : "Your Address : Village, District, Country"
                  }
                  className="input input-bordered w-full"
                />
              </div>

              <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
                <div className=" space-y-2">
                  <label className="font-bold">SSC Result*</label>
                  <input
                    {...register("ssc", { required: true })}
                    type="text"
                    defaultValue={ssc}
                    placeholder={ssc}
                    className="input input-bordered w-full"
                  />
                </div>

                <div className=" space-y-2">
                  <label className="font-bold">HSC Result*</label>
                  <input
                    {...register("hsc", { required: true })}
                    type="text"
                    placeholder={hsc}
                    defaultValue={hsc}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
                <div className=" space-y-2">
                  <label className="font-bold">
                    Select The Appropirate Degree*
                  </label>
                  <br />
                  <select
                    {...register("degree", { required: true })}
                    defaultValue={degree}
                    className="select select-bordered w-full"
                  >
                    <option value="diploma">Diploma</option>
                    <option value="bachelor">Bachelor</option>
                    <option value="masters">Masters</option>
                  </select>
                </div>

                <div className=" space-y-2">
                  <label className="font-bold">Select Your Study Gap</label>
                  <br />
                  <select
                    {...register("studyGap")}
                    defaultValue={studyGap}
                    className="select select-bordered w-full"
                  >
                    <option value="1 year">1 Year</option>
                    <option value="2 years">2 Year</option>
                    <option value="3 years or more">3 Years or More</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="btn w-full bg-green-500 text-white hover:bg-black"
              >
                UPDATE APPLICATION
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicationRow;
