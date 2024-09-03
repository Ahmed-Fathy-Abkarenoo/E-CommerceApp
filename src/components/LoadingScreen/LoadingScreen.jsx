import React from "react";
import { FaSpinner } from "react-icons/fa6";

export default function LoadingScreen() {
  return (
    <>
      <div className="flex justify-center items-center bg-transparent text-7xl text-green-500 fixed inset-0">
        <FaSpinner className="loading-icon" />
      </div>
    </>
  );
}
