import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaSpinner } from "react-icons/fa6";
import Style from "./Login.module.css";
import { AuthContext } from "../../Contexts/AuthContext";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { CartCountContext } from "../../Contexts/CartCounter";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigator = useNavigate();

  useEffect(() => {}, []);

  const { setUserToken } = useContext(AuthContext);
  let { setCartCount } = useContext(CartCountContext);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter valid Email")
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Invalid email"
      ),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,20}$/,
        "Min 8 character, Max 20 character, At least one uppercase , one lowercase & one special character"
      ),
  });

  let { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues,
      onSubmit: login,
      validationSchema,
    });

  async function login() {
    setErrorMsg("");
    setIsLoading(true);

    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );

      setIsLoading(false);
      setUserToken(data.token);
      localStorage.setItem("Token", data.token);
      location.pathname == "/E-CommerceApp/"
        ? navigator("/E-CommerceApp/home")
        : navigator(location.pathname);
      getCart();
    } catch (error) {
      setIsLoading(false);
      setErrorMsg(error.response.data.message);
    }
  }

  async function getCart() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: localStorage.getItem("Token") },
      })
      .then((data) => {
        setCartCount(data.numOfCartItems);
      });
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Login</title>
        </Helmet>
      </HelmetProvider>

      <div className="container mx-auto min-h-screen flex justify-center items-center">
        <div className="w-4/5 md:w-3/5 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-8 mb-20 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center text-green-700 dark:text-gray-200 mb-9">
            Login
          </h1>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-7">
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                Email Address
              </label>
              {touched.email && errors.email && (
                <p className="text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label
                htmlFor="password"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                Password
              </label>
              {touched.password && errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>
            <div className="text-end">
              <Link
                to={"forgotpassword"}
                className="inline-flex items-center gap-2 text-sm font-medium text-green-500 underline hover:no-underline dark:text-green-500">
                Forgot Password
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 12H5m14 0-4 4m4-4-4-4"
                  />
                </svg>
              </Link>
            </div>

            <button
              type="submit"
              className="md:w-1/4 flex justify-center items-center self-center bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md shadow-sm">
              Login {isLoading && <FaSpinner className="loading-icon ms-2" />}
            </button>
            {errorMsg && <p className="text-center text-red-500">{errorMsg}</p>}
          </form>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-500 dark:text-gray-300 me-2">
              Do not have an account?
            </span>
            <Link
              to="/E-CommerceApp/register"
              className="text-green-500 hover:text-green-600">
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
