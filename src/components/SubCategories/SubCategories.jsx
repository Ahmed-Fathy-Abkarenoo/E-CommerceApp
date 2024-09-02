import React from "react";
import Style from "./SubCategories.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default function SubCategories() {
  let { id } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllSubCategory();
  }, [id]);

  async function getAllSubCategory() {
    setIsLoading(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );

    console.log(data);
    setSubCategories(data.data);
    setIsLoading(false);
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {isLoading && <LoadingScreen />}
        {subCategories.length != 0 ? (
          <>
            {subCategories.map((sub, index) => {
              return (
                <div
                  className="col-span-1 text-center lg:p-4 border border-green-500 rounded-md"
                  key={index}>
                  <h3 className="text-xs lg:text-xl font-light italic lg:tracking-wide">
                    {sub.name}
                  </h3>
                </div>
              );
            })}
          </>
        ) : (
          <h2 className="col-span-12 text-sm font-light lg:text-lg lg:font-medium text-center w-full">
            No SubCategory in this Category
          </h2>
        )}
      </div>
    </>
  );
}
