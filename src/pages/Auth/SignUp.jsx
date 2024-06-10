import { useContext, useState } from "react";
import PageTitle from "../../shared/PageTitle/PageTitle";
import { useFormik } from "formik";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const validate = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Must be at least 6 characters";
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = "Must contain at least one capital letter";
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
    errors.password = "Must contain at least one special character";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords must match";
  }

  if (!values.userImage) {
    errors.userImage = "Required";
  } else if (!values.userImage.type.startsWith("image/")) {
    errors.userImage = "File must be an image";
  }

  return errors;
};

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const { updateUserProfile, signUp, logOut } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [signUpError, setupSignUpError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      userImage: null,
    },
    validate,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("image", values.userImage);

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_api_key
        }`,
        formData
      );
      const photo = response.data.data.display_url;
      const { firstName, lastName, email, password } = values;
      const name = `${firstName} ${lastName}`;
      console.log(name);
      console.log(photo);

      // Sign up with email
      signUp(email, password)
        .then((userCredential) => {
          toast.success("Account Created Successfully!", {
            position: "top-right",
          });
          // Update profile
          updateUserProfile(name, photo).then(() => {});
          console.log(userCredential);

          // create user entry in the database
          const userInfo = {
            userName: name,
            userEmail: email.toLowerCase(),
            role: "user",
          };
          console.log(userInfo);
          axiosPublic.post("/users", userInfo).then((res) => {
            console.log(res.data);
            if (res.data.insertedId) {
              // logout
              logOut();

              setTimeout(() => {
                navigate("/login");
              }, 2000);
            }
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setupSignUpError(errorMessage.split("(auth/")[1].split(")")[0]);
        });
    },
  });

  return (
    <div>
      <Helmet>
        <title> Sign Up | Apply4Scholar </title>
      </Helmet>
      <PageTitle
        title="Sign Up"
        subtitle="New to Apply4Scholar? Please create an account."
      />
      <div className="min-h-screen flex flex-col items-center bg-gray-100 py-12">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-8">
          <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.firstName}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.lastName}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="userImage"
                className="block text-sm font-medium text-gray-700"
              >
                Upload User Image
              </label>
              <input
                id="userImage"
                name="userImage"
                type="file"
                onChange={(event) => {
                  formik.setFieldValue(
                    "userImage",
                    event.currentTarget.files[0]
                  );
                }}
                onBlur={formik.handleBlur}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {formik.touched.userImage && formik.errors.userImage ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.userImage}
                </div>
              ) : null}
            </div>
            {signUpError && <p className="text-red-500">{signUpError}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
              SignUp
            </button>
          </form>
          <p className="mt-2">
            Already Have An Account? Please{"   "}
            <Link className="text-blue-500 font-bold" to="/login">
              Login {"   "}
            </Link>
            Now
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
