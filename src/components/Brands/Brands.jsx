import React from "react";
import Style from "./Brands.module.css";
import { useState, useEffect } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import { Helmet, HelmetProvider } from "react-helmet-async";
import LoadingScreen2 from "../LoadingScreen2/LoadingScreen2";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    // console.log(event);
  };

  useEffect(() => {
    getAllBrands();
    window.scrollTo(0, 0);
  }, [page]);

  async function getAllBrands() {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands?page=${page}`
      );
      // console.log(data.data);

      setBrands(data.data);
      setIsLoading(false);
    } catch (error) {}
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Brands</title>
        </Helmet>
      </HelmetProvider>

      <section className="mt-10 mb-6">
        <h1 className="text-4xl font-bold text-green-500 text-center mb-8">
          All Brands
        </h1>
        {isLoading ? (
          <LoadingScreen2 />
        ) : (
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {brands.map((brand, index) => {
                return (
                  <div
                    className="col-span-1 border rounded-md p-2 product"
                    key={index}>
                    <div className="brand-card text-center">
                      <div className="brand-logo">
                        <img src={brand.image} alt="" />
                      </div>
                      <div className="brand-name">
                        <h2>{brand.name}</h2>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center mt-4">
              <Pagination count={2} page={page} onChange={handleChange} />
            </div>
          </div>
        )}
      </section>
    </>
  );
}
