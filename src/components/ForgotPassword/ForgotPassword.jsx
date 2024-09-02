import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaSpinner } from "react-icons/fa6";
import { AuthContext } from "../../Contexts/AuthContext";
import { Helmet } from "react-helmet";
import { CartCountContext } from "../../Contexts/CartCounter";
import VerifyCode from "../VerifyCode/VerifyCode";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [click, setClick] = useState(false);

  const navigator = useNavigate();

  useEffect(() => {}, []);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter valid Email")
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Invalid email"
      ),
  });

  let { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues,
      onSubmit: forgotPassword,
      validationSchema,
    });

  async function forgotPassword() {
    setErrorMsg("");
    setIsLoading(true);

    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      navigator("/");
      setIsLoading(false);
      setClick(true);
    } catch (error) {
      setIsLoading(false);
      setErrorMsg(error.response.data.message);
      setClick(true);
    }
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="container mx-auto min-h-screen flex justify-center items-center">
        <div className="w-4/5 md:w-3/5 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-8 mb-20 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center text-green-700 dark:text-gray-200 mb-9">
            Forgot Password
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

            <button
              type="submit"
              className="md:w-1/2 flex justify-center items-center self-center bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md shadow-sm">
              Forgot Password
              {isLoading && <FaSpinner className="loading-icon ms-2" />}
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
        {click && <VerifyCode />}
      </div>
    </>
  );
}
