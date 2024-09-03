import React from "react";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function VerifyCode() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const initialValues = {
    resetCode: "535863",
  };

  const validationSchema = Yup.object({
    resetCode: Yup.string().required("ResetCode is required"),
  });

  let { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues,
      onSubmit: verifyCode,
      validationSchema,
    });

  async function verifyCode() {
    setErrorMsg("");
    setIsLoading(true);

    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );
      navigator("/");
      setIsLoading(false);
      setClick(true);
    } catch (error) {
      setIsLoading(false);
      setErrorMsg(error.response.data.message);
    }
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="sm:flex sm:items-center">
            <form onSubmit={handleSubmit} className="px-4 py-6 w-full">
              <div className=" mb-6">
                <input
                  type="text"
                  name="resetCode"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={values.resetCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.resetCode && errors.resetCode && (
                  <p className="text-red-500 mt-4">{errors.resetCode}</p>
                )}
              </div>
              <div className="flex items-center justify-center">
                <button
                  className=" w-56 flex justify-center items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit">
                  Verify
                  {isLoading && <FaSpinner className="loading-icon ms-2" />}
                </button>
                <a
                  className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800 ml-4"
                  href="#">
                  Resend OTP
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
