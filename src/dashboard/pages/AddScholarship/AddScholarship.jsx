import axios from "axios";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const AddScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.university_image[0]);

    // upload image to imgbb and get the url
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_api_key
      }`,
      formData
    );

    if (response.data.success) {
      const scholarshipData = {
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
        post_date: data.scholarship_post_date,
        scholarship_description: data.scholarship_description,
      };
      // send the data to server for update
      axiosSecure.post("/scholarship", scholarshipData).then((res) => {
        if (res.data.insertedId) {
          toast.success("Scholarship successfully added");
          reset();
        }
      });
    }
  };
  return (
    <div className="min-h-screen mt-10">
      <Helmet>
        <title> Add Scholarship | Apply4Scholar </title>
      </Helmet>
      <h2 className="text-xl md:text-4xl uppercase font-bold text-center mb-4 mt-14">
        ADD SCHOLARSHIP
      </h2>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-14 space-y-6 flex flex-col border-2 p-6 rounded-2xl shadow-xl"
        >
          <div className="space-y-2">
            <label className="font-bold">Scholarship Name:*</label>
            <input
              {...register("scholarship_name", { required: true })}
              placeholder="Scholarship Name"
              type="text"
              className="input input-bordered w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="font-bold">Scholarship Description:*</label>

            <textarea
              rows="5"
              {...register("scholarship_description", { required: true })}
              className="textarea textarea-bordered w-full"
              placeholder="Scholarship Description"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="font-bold">University Name:*</label>
            <input
              {...register("university_name", { required: true })}
              placeholder="University Name"
              type="text"
              className="input input-bordered w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold">University Image/Logo:*</label>
            <input
              {...register("university_image", { required: true })}
              type="file"
              className="file-input w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold">University Country:*</label>
            <input
              {...register("university_country", { required: true })}
              placeholder="University Country"
              type="text"
              className="input input-bordered w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold">University City:*</label>
            <input
              {...register("university_city", { required: true })}
              placeholder="University City"
              type="text"
              className="input input-bordered w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold">University World Rank:*</label>
            <input
              {...register("university_world_rank", { required: true })}
              placeholder="University World Rank"
              type="number"
              className="input input-bordered w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold">Subject Category:*</label>
            <select
              {...register("subject_category", { required: true })}
              className="input input-bordered w-full"
            >
              <option value="Agriculture">Agriculture</option>
              <option value="Engineering">Engineering</option>
              <option value="Doctor">Doctor</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="font-bold">Scholarship Category:*</label>
            <select
              {...register("scholarship_category", { required: true })}
              className="input input-bordered w-full"
            >
              <option value="Full fund">Full fund</option>
              <option value="Partial">Partial</option>
              <option value="Self-fund">Self-fund</option>
            </select>
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
            <label className="font-bold">Tuition Fees (optional):</label>
            <input
              {...register("tuition_fees")}
              placeholder="Tuition Fees"
              type="text"
              className="input input-bordered w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold">Application Fees:*</label>
            <input
              {...register("application_fees", { required: true })}
              placeholder="Application Fees"
              type="text"
              className="input input-bordered w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold">Service Charge:*</label>
            <input
              {...register("service_charge", { required: true })}
              placeholder="Service Charge"
              type="text"
              className="input input-bordered w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold">Application Deadline:*</label>
            <input
              {...register("application_deadline", { required: true })}
              type="date"
              className="input input-bordered w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold">Scholarship Post Date:*</label>
            <input
              {...register("scholarship_post_date", { required: true })}
              type="date"
              className="input input-bordered w-full"
            />
          </div>

          <button
            type="submit"
            className="btn w-full bg-green-500 text-white hover:bg-black"
          >
            ADD SCHOLARSHIP
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddScholarship;
