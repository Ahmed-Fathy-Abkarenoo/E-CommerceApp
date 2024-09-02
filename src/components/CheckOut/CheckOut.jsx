import React from "react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaSpinner } from "react-icons/fa6";
import Style from "./CheckOut.module.css";
import { useParams } from "react-router-dom";

export default function CheckOut() {
  const [isLoading, setIsLoading] = useState(false);
  let { cartId } = useParams();

  useEffect(() => {}, []);

  const initialValues = {
    city: "",
    phone: "",
    details: "",
  };

  const validationSchema = Yup.object({
    city: Yup.string().required("City is required"),
    details: Yup.string().required("Details is required"),
    phone: Yup.string().required("Phone is required"),
  });

  let { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues,
      onSubmit: checkOut,
      validationSchema,
    });

  async function checkOut() {
    setIsLoading(true);

    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/orders/checkout-session/" +
          cartId,
        { shippingAddress: values },
        {
          headers: {
            token: localStorage.getItem("Token"),
          },
          params: { url: "http://localhost:5173" },
        }
      );

      setIsLoading(false);
      location.href = data.session.url;
    } catch (error) {
      setIsLoading(false);
    }
  }

  //"66c678aeed0dc0016cee72b8"

  return (
    <>
      <div className="container mx-auto min-h-screen flex justify-center items-center">
        <div className="w-4/5 md:w-3/5 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-8 mb-20 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center text-green-700 dark:text-gray-200 mb-9">
            Login
          </h1>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-7">
            <div className="relative">
              <input
                type="text"
                id="city"
                name="city"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label
                htmlFor="city"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                city Address
              </label>
              {touched.city && errors.city && (
                <p className="text-red-500">{errors.city}</p>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                id="details"
                name="details"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={values.details}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label
                htmlFor="details"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                details Address
              </label>
              {touched.details && errors.details && (
                <p className="text-red-500">{errors.details}</p>
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
                phone
              </label>
              {touched.phone && errors.phone && (
                <p className="text-red-500">{errors.phone}</p>
              )}
            </div>

            <button
              type="submit"
              className="md:w-1/4 flex justify-center items-center self-center bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md shadow-sm">
              Check Out
              {isLoading && <FaSpinner className="loading-icon ms-2" />}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
