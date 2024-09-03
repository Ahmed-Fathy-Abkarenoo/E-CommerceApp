import React from "react";

export default function LoadingScreen2() {
  const animation1 = (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <h1 className="text-center text-8xl font-semibold text-lime-400 animate__animated animate__flipInX animate__infinite">
          FreshCart....
        </h1>
      </div>
    </>
  );

  return <>{animation1}</>;
}
