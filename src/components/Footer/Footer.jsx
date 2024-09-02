import React from "react";
import Style from "./Footer.module.css";
import GooglePlayLogo from "./../../assets/images/google-play-badge-2022-2.svg";
import AppStoreLogo from "./../../assets/images/Download_on_the_App_Store_Badge.svg.png";
import amazonPay from "./../../assets/images/amazon-pay-1.svg";
import americanExpress from "./../../assets/images/american-express-1.svg";
import masterCard from "./../../assets/images/mastercard-4.svg";
import payPal from "./../../assets/images/paypal-3.svg";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-300 font-sans dark:bg-gray-900">
        <div className="container px-6 py-6 mx-auto">
          <div className="">
            <div className="">
              <h1 className="max-w-lg text-xl font-light tracking-tight text-gray-800 xl:text-2xl dark:text-white">
                Get the FreshCart App
              </h1>

              <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                <input
                  id="footer-email"
                  type="text"
                  className="grow px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                  placeholder="Email Address"
                />

                <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-green-500 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                  Share App Link
                </button>
              </div>
            </div>
          </div>

          <hr className="my-4 border-gray-200 md:my-6 dark:border-gray-700 h-2" />

          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex gap-4 hover:cursor-pointer">
              <p className="text-xl font-light">Payment Partner</p>
              <img src={amazonPay} width="30" height="30" alt="fb" />
              <img src={americanExpress} width="30" height="30" alt="tw" />
              <img src={masterCard} width="30" height="30" alt="inst" />
              <img src={payPal} className="" width="30" height="30" alt="gt" />
            </div>
            <div className="flex gap-4 hover:cursor-pointer">
              <img src={GooglePlayLogo} alt="Google" />
              <img src={AppStoreLogo} width="150" height="50" alt="Apple" />
            </div>
          </div>
          <hr className="my-4 border-gray-200 md:my-6 dark:border-gray-700 h-2" />
          <p className="p-8 text-start md:text-center md:text-lg md:p-2">
            © 2024 Ahmed Fathy. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
