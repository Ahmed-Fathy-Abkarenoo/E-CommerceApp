import React from "react";
import error from "./../../assets/images/error.svg";

export default function NotFound() {
  return (
    <>
      <div className="container mx-auto flex justify-center items-center my-14">
        <img src={error} alt="NotFound image" />
      </div>
    </>
  );
}
