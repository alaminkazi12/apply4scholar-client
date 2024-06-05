import PageTitle from "../../shared/PageTitle/PageTitle";
import { useFormik } from "formik";
import { AuthContext } from "../../context/AuthProvider";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { login, googleLogin, gitHubLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [signInError, setupSignInError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { email, password } = values;

      // Sign in with email
      login(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          toast.success("Logged In Successfully!", {
            position: "top-right",
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setupSignInError(errorMessage.split("(auth/")[1].split(")")[0]);
        });
    },
  });

  return (
    <div>
      <PageTitle
        title={"Login"}
        subtitle={"Already Have An Account? Please login.. "}
      ></PageTitle>
      <div className="min-h-screen flex flex-col items-center bg-gray-100 py-12">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-8">
          <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
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

            {signInError && <p className=" text-red-800">{signInError}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </form>
          <p className="mt-2">
            New to Apply4scholar? Please {"   "}
            <Link className="text-blue-500 font-bold" to="/signup">
              SignUp {"   "}
            </Link>
            Now
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
