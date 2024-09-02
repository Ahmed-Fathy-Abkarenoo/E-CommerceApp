import React from "react";
import Style from "./Categories.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import LoadingScreen2 from "../LoadingScreen2/LoadingScreen2";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    getAllCategory();
    window.scrollTo(0, 0);
  }, []);

  async function getAllCategory() {
    setIsLoading(true);

    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );

    // console.log(data);
    setCategories(data.data);

    setIsLoading(false);
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Categories</title>
        </Helmet>
      </HelmetProvider>

      <section className="mt-10 mb-6">
        <div className="container mx-auto">
          {isLoading && <LoadingScreen2 />}
          <div className="grid grid-cols-8 gap-4 grid-flow-row lg:grid-flow-row">
            <div className="col-span-12 lg:col-span-2 shadow-2xl pt-5  pl-4 rounded-md">
              <h2 className="text-2xl font-bold text-green-500 mb-10 text-center">
                Categories
              </h2>
              <div className="nested-links flex gap-3 lg:block overflow-auto">
                {categories.map((category, index) => {
                  return (
                    <Link to={"subcategories/" + category._id} key={index}>
                      <div
                        className="lg:flex items-center mb-8"
                        // onClick={() => {
                        //   setSelectedCategory(category?._id);
                        // }}
                      >
                        <img
                          className="w-5 h-5 rounded-full mr-3"
                          src={category.image}
                          alt=""
                        />
                        <h2 className="line-clamp-1">{category.name}</h2>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6 shadow-2xl pt-5 pb-3 px-4 rounded-md">
              <h2 className="text-2xl font-bold text-green-500 mb-10 text-center">
                SubCategories
              </h2>
              <div className="container mx-auto">
                <Outlet />
              </div>
            </div>
          </div>
          {/* {false ? (
            <LoadingScreen />
          ) : (
            <div className="grid grid-cols-8 gap-4 grid-flow-row lg:grid-flow-row">
              <div className="col-span-12 lg:col-span-2 shadow-2xl pt-5  pl-4 rounded-md">
                <h2 className="text-2xl font-bold text-green-500 mb-10 text-center">
                  Categories
                </h2>
                <div className="nested-links flex gap-3 lg:block overflow-auto">
                  {categories.map((category, index) => {
                    return (
                      <Link to={"subcategories/" + category._id} key={index}>
                        <div
                          className="lg:flex items-center mb-8"
                          onClick={() => {
                            setSelectedCategory(category?._id);
                          }}>
                          <img
                            className="w-5 h-5 rounded-full mr-3"
                            src={category.image}
                            alt=""
                          />
                          <h2 className="line-clamp-1">{category.name}</h2>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="col-span-12 lg:col-span-6 shadow-2xl pt-5 pb-3 px-4 rounded-md">
                <h2 className="text-2xl font-bold text-green-500 mb-10 text-center">
                  SubCategories
                </h2>
                <div className="container mx-auto">
                  <Outlet />
                </div>
              </div>
            </div>
          )} */}
        </div>
      </section>
    </>
  );
}
