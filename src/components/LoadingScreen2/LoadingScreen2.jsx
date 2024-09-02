import React from "react";
import Style from "./LoadingScreen2.module.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function LoadingScreen2() {
  const [counter, setCounter] = useState(0);
  const { pathname } = useLocation();

  const animation1 = (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <h1 className="text-center text-8xl font-semibold text-lime-400 animate__animated animate__flipInX animate__infinite">
          FreshCart....
        </h1>
      </div>
    </>
  );

  // const animation2 = (
  //   <>
  //     <div className="w-full h-screen flex justify-center items-center">
  //       <h1 className="text-center text-6xl font-semibold text-lime-400 animate-bounce">
  //         FreshCart....
  //       </h1>
  //     </div>
  //   </>
  // );

  useEffect(() => {}, []);

  return <>{animation1}</>;
}
