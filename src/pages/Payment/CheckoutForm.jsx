import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({
  fee,
  id,
  scholarship_category,
  subject_name,
  university_name,
  university_location,
}) => {
  const [error, setError] = useState("");
  const [tnxid, setTnxid] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (fee > 0) {
      axiosSecure.post("/create-payment-intent", { price: fee }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, fee]);

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        setTnxid(paymentIntent.id);
        setIsPaymentSuccessful(true);

        const payment = {
          email: user.email,
          price: fee,
          date: new Date(),
          scholarship_id: id,
          tnxid: paymentIntent.id,
          status: "pending",
        };

        const res = await axiosSecure.post("/payments", payment);
        if (res.data.insertedId) {
          toast.success("Payment Successful");
        }
      }
    }
  };

  //   application form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // now post the application to the server
    const applicationData = {
      userName: user?.displayName,
      userEmail: user?.email,
      userPhoto: user?.photoURL,
      scholarship_id: id,
      date: new Date(),
      university_name: university_name,
      subject_name: subject_name,
      university_address: {
        city: university_location?.city,
        country: university_location?.country,
      },
      scholarship_category: scholarship_category,
      phone: data.phone,
      addess: data.addess,
      degree: data.degree,
      gender: data.gender,
      ssc: data.ssc,
      hsc: data.hsc,
      studyGap: data.studyGap,
      status: "pending",
    };

    const applicatonRes = await axiosSecure.post("/apply", applicationData);
    if (applicatonRes.data.insertedId) {
      toast.success("Successfully Applied");
      navigate("/");
    }
  };

  return (
    <div>
      {!isPaymentSuccessful && (
        <form
          className="md:w-[500px] shadow-xl flex flex-col mx-auto space-y-10 mt-10 border-2 p-6 rounded-xl"
          onSubmit={handlePaymentSubmit}
        >
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            className="btn btn-primary"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay ${fee}
          </button>
          <div>
            <p className="text-red-700 text-center">{error}</p>
            {tnxid && (
              <p className="text-green-700 text-center">
                Your Transaction Id: {tnxid}
              </p>
            )}
          </div>
        </form>
      )}

      {isPaymentSuccessful && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 md:w-[660px] shadow-xl flex flex-col mx-auto space-y-10  border-2 p-6 rounded-xl "
        >
          <h2 className="text-center text-2xl mb-4 uppercase font-bold">
            Applicant Information
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
              placeholder="Your Phone Number"
              className="input input-bordered w-full"
            />
          </div>

          <div className=" space-y-2">
            <label className="font-bold">Gender*</label>
            <br />
            <select
              {...register("gender", { required: true })}
              className="select select-bordered w-full"
            >
              <option disabled defaultChecked>
                Select Your Gender
              </option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>

          <div className=" space-y-2">
            <label className="font-bold">Your Address*</label>
            <input
              {...register("address", { required: true })}
              type="text"
              placeholder="Your Address : Village, District, Country"
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className=" space-y-2">
              <label className="font-bold">SSC Result*</label>
              <input
                {...register("ssc", { required: true })}
                type="text"
                placeholder="Your SSC Result: 5.00 "
                className="input input-bordered w-full"
              />
            </div>

            <div className=" space-y-2">
              <label className="font-bold">HSC Result*</label>
              <input
                {...register("hsc", { required: true })}
                type="text"
                placeholder="Your HSC Result : 4.80"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className=" space-y-2">
              <label className="font-bold">
                Select The Appropirate Degree*
              </label>
              <br />
              <select
                {...register("degree", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled defaultChecked>
                  Select The Appropirate Degree
                </option>
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
                className="select select-bordered w-full"
              >
                <option disabled defaultChecked>
                  Select Your Study Gap
                </option>
                <option value="1 year">1 Year</option>
                <option value="2 years">2 Year</option>
                <option value="3 years or more">3 Years or More</option>
              </select>
            </div>
          </div>

          <div className=" space-y-2">
            <label className="font-bold">University Name</label>
            <input
              defaultValue={university_name}
              disabled
              {...register("universityName")}
              type="text"
              placeholder={university_name}
              className="input input-bordered w-full"
            />
          </div>
          <div className=" space-y-2">
            <label className="font-bold">Scholarship category</label>
            <input
              defaultValue={scholarship_category}
              disabled
              {...register("scholarshipCategory")}
              type="text"
              placeholder={scholarship_category}
              className="input input-bordered w-full"
            />
          </div>
          <div className=" space-y-2">
            <label className="font-bold">Subject Name</label>
            <input
              defaultValue={subject_name}
              disabled
              {...register("subjectCategory")}
              type="text"
              placeholder={subject_name}
              className="input input-bordered w-full"
            />
          </div>

          <PrimaryButton text={"SUBMIT APPLICATION"}></PrimaryButton>
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;
