import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageScholarshipRow = ({ item, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const {
    scholarship_name,
    university_name,
    university_country,
    university_city,
    university_world_rank,
    subject_category,
    scholarship_category,
    tuition_fees,
    application_fees,
    service_charge,
    application_deadline,
    post_date,
    scholarship_description,
    _id,
  } = item;

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.photo[0]);
    // upload image to imgbb and get the url
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_api_key
      }`,
      formData
    );

    console.log(data);
    if (response.data.success) {
      const updatedData = {
        id: _id,
        scholarship_name: data.scholarship_name,
        university_name: data.university_name,
        university_image: response.data.data.display_url,
        university_country: data.university_country,
        university_city: data.university_city,
        university_world_rank: data.university_world_rank,
        subject_category: data.subject_category,
        scholarship_category: data.scholarship_category,
        degree: data.degree,
        tuition_fees: data.tuition_fees,
        application_fees: data.application_fees,
        service_charge: data.service_charge,
        application_deadline: data.application_deadline,
        post_date: data.post_date,
        scholarship_description: data.scholarship_description,
      };

      // send the data to server for update
      axiosSecure.put("/scholarship", updatedData).then((res) => {
        if (res.data.modifiedCount) {
          toast.success("Scholarship Updated Successfully");
          refetch();
        }
      });

      // Close the modal after form submission
      setIsModalOpen(false);
      reset(); // Reset form fields
    }
  };

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
          const res = await axiosSecure.delete("/scholarship", {
            data: { id: _id },
          });
          if (res.data.deletedCount === 1) {
            Swal.fire({
              title: "Deleted!",
              text: "Scholarship has been deleted.",
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
        <td>{scholarship_name}</td>
        <td>{university_name}</td>
        <td>{scholarship_category}</td>
        <td>{application_fees}</td>
        <td>{service_charge}</td>

        <th>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-ghost btn-xs text-yellow-600"
          >
            <FaEdit />
          </button>
        </th>
        <th>
          <button
            onClick={handleDelete}
            className="btn btn-ghost btn-xs text-red-400"
          >
            <FaTrash />
          </button>
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
                UPDATE SCHOLARSHIP
              </h2>
              <div className="space-y-2">
                <label className="font-bold">Scholarship Name*</label>
                <input
                  {...register("scholarship_name", { required: true })}
                  placeholder="Scholarship Name"
                  defaultValue={scholarship_name}
                  type="text"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="font-bold">University Name*</label>
                <input
                  {...register("university_name", { required: true })}
                  placeholder="University Name"
                  defaultValue={university_name}
                  type="text"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="font-bold">University World Rank*</label>
                <input
                  {...register("university_world_rank", { required: true })}
                  placeholder="University World Rank"
                  defaultValue={university_world_rank}
                  type="text"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="font-bold">Scholarship Category*</label>
                <select
                  {...register("scholarship_category", { required: true })}
                  className="input input-bordered w-full"
                  defaultValue={scholarship_category}
                >
                  <option value="Full Fund">Full Fund</option>
                  <option value="Partial">Partial</option>
                  <option value="Self-fund">Self-fund</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-bold">Application Deadline*</label>
                <input
                  {...register("application_deadline", { required: true })}
                  placeholder="Application Deadline"
                  defaultValue={application_deadline}
                  type="date"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="font-bold">Application Fees*</label>
                <input
                  {...register("application_fees", { required: true })}
                  placeholder="Application Fees"
                  defaultValue={application_fees}
                  type="text"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="font-bold">Service Charge*</label>
                <input
                  {...register("service_charge", { required: true })}
                  placeholder="Service Charge"
                  defaultValue={service_charge}
                  type="text"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="font-bold">Tuition Fees*</label>
                <input
                  {...register("tuition_fees", { required: true })}
                  placeholder="Stipend"
                  defaultValue={tuition_fees}
                  type="text"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="font-bold">Subject Category*</label>
                <select
                  {...register("subject_category", { required: true })}
                  className="input input-bordered w-full"
                  defaultValue={subject_category}
                >
                  <option value="Agriculture">Agriculture</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Doctor">Doctor</option>
                </select>
              </div>
              <div className=" space-y-2">
                <label className="font-bold">Scholarship Image</label>
                <input
                  {...register("photo")}
                  type="file"
                  placeholder="Upload your photo"
                  className="file-input w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="font-bold">
                  University Location (City, Country)*
                </label>
                <input
                  {...register("university_city", { required: true })}
                  placeholder="University City"
                  defaultValue={university_city}
                  type="text"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="font-bold">
                  University Location (City, Country)*
                </label>
                <input
                  {...register("university_country", { required: true })}
                  placeholder="University Country"
                  defaultValue={university_country}
                  type="text"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="font-bold">Degree:*</label>
                <select
                  {...register("degree", { required: true })}
                  className="input input-bordered w-full"
                >
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Masters">Masters</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-bold">Post Date*</label>
                <input
                  {...register("post_date", { required: true })}
                  placeholder="Post Date"
                  defaultValue={post_date}
                  type="date"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="font-bold">Scholarship Description*</label>
                <textarea
                  rows="5"
                  {...register("scholarship_description", { required: true })}
                  className="textarea textarea-bordered w-full"
                  placeholder="Scholarship Description"
                  defaultValue={scholarship_description}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn w-full bg-green-500 text-white hover:bg-black"
              >
                UPDATE SCHOLARSHIP
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageScholarshipRow;
