import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaSpinner } from "react-icons/fa6";
import Style from "./Register.module.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [sucssesMsg, setSucssesMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigator = useNavigate();

  useEffect(() => {}, []);

  let { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: "",
      },

      onSubmit: register,

      validationSchema: Yup.object({
        name: Yup.string()
          .required("Name is required")
          .min(3, "Name must be more than 2 character")
          .max(20, "Name must be less than 20 character"),
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
        rePassword: Yup.string()
          .required("RePassword is required")
          .oneOf(
            [Yup.ref("password")],
            "Password and rePassword must be matched"
          ),
        phone: Yup.string()
          .required("Phone is required")
          .matches(/^01[0-2,5]{1}[0-9]{8}$/, "Invalid Phone Number"),
      }),
    });

  async function register() {
    setErrorMsg("");
    setSucssesMsg("");
    setIsLoading(true);

    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then(({ data }) => {
        setIsLoading(false);
        setSucssesMsg(data.message);

        setTimeout(() => {
          navigator("/E-CommerceApp");
        }, 1000);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMsg(err.response.data.message);
      });
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Register</title>
        </Helmet>
      </HelmetProvider>

      <div className="container mx-auto min-h-screen flex justify-center items-center">
        <div className="w-4/5 md:w-3/4 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-6 flex flex-col items-center">
          <h1 className="text-xl md:text-3xl font-bold text-center text-green-700 dark:text-gray-200 mb-9">
            Create an Account
          </h1>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-7">
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label
                htmlFor="name"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                Name
              </label>
              {touched.name && errors.name && (
                <p className="text-red-500">{errors.name}</p>
              )}
            </div>
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
            <div className="relative">
              <input
                type="password"
                id="rePassword"
                name="rePassword"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={values.rePassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label
                htmlFor="rePassword"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                Confirm Password
              </label>
              {touched.rePassword && errors.rePassword && (
                <p className="text-red-500">{errors.rePassword}</p>
              )}
            </div>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                name="phone"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label
                htmlFor="phone"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                Phone Number
              </label>
              {touched.phone && errors.phone && (
                <p className="text-red-500">{errors.phone}</p>
              )}
            </div>

            <button
              type="submit"
              className="md:w-1/4 flex justify-center items-center self-center bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500"
              disabled={isLoading}>
              Register{" "}
              {isLoading && <FaSpinner className="loading-icon ms-2" />}
            </button>
            {errorMsg && <p className="text-center text-red-500">{errorMsg}</p>}
            {sucssesMsg && (
              <p className="text-center text-green-500">{sucssesMsg}</p>
            )}
          </form>

          <div className="mt-2 text-center">
            <span className="text-sm text-gray-500 dark:text-gray-300">
              Already have an account?{" "}
            </span>
            <Link
              to="/E-CommerceApp"
              className="text-green-500 hover:text-green-600">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
