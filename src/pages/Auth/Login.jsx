import PageTitle from "../../shared/PageTitle/PageTitle";
import { useFormik } from "formik";
import { AuthContext } from "../../context/AuthProvider";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { login, googleLogin, gitHubLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [signInError, setupSignInError] = useState("");
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();

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

          const userInfo = {
            userName: user.displayName,
            userEmail: user.email,
            role: "user",
          };

          axiosPublic.post("/users", userInfo).then((res) => {
            console.log(res);
          });

          toast.success("Logged In Successfully!", {
            position: "top-right",
          });
          navigate(location?.state ? location.state : "/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setupSignInError(errorMessage.split("(auth/")[1].split(")")[0]);
        });
    },
  });

  // sign in with google
  const GoogleLoginHandler = () => {
    googleLogin().then((res) => {
      console.log(res.user.email);

      const userInfo = {
        userName: res.user.displayName,
        userEmail: res.user.email,
        role: "user",
      };

      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res);
      });

      toast.success("Logged In Successfully!", {
        position: "top-right",
      });

      navigate(location?.state ? location.state : "/");
    });
  };

  //   github Login
  const GithubLoginHandler = () => {
    gitHubLogin().then((res) => {
      const userInfo = {
        userName: res.user.displayName,
        userEmail: res.user.email,
        role: "user",
      };

      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res);
      });

      toast.success("Logged In Successfully!", {
        position: "top-right",
      });

      navigate(location?.state ? location.state : "/");
    });
  };

  return (
    <div>
      <Helmet>
        <title> Login | Apply4Scholar </title>
      </Helmet>
      <PageTitle
        title={"Login"}
        subtitle={"Already Have An Account? Please login.. "}
      ></PageTitle>
      <div className="min-h-screen flex flex-col items-center bg-gray-100 py-12">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-8">
          <div className="flex items-center justify-center gap-10 mt-10">
            <button
              onClick={GoogleLoginHandler}
              className="btn btn-circle border-2 border-gray-400 text-3xl"
            >
              <FcGoogle />
            </button>
            <button
              onClick={GithubLoginHandler}
              className="btn btn-circle border-2 border-gray-400 text-3xl"
            >
              <FaGithub />
            </button>
          </div>
          <div className="divider text-[#004d99]">Or</div>
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
