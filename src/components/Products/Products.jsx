import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Product from "./../Product/Product";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import Pagination from "@mui/material/Pagination";
import LoadingScreen2 from "../LoadingScreen2/LoadingScreen2";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Home() {
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  function getProducts(page) {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${page}`
    );
  }

  let { data, isLoading } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts(page),
    placeholderData: keepPreviousData,
    gcTime: 30000,
    retry: 3,
    retryDelay: 2000,
    select: (data) => data.data.data,
  });

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Products</title>
        </Helmet>
      </HelmetProvider>

      <section className="mt-10 mb-6">
        <h1 className="text-4xl font-bold text-green-500 text-center mb-8">
          All Products
        </h1>
        {isLoading ? (
          <LoadingScreen2 />
        ) : (
          <div className="container mx-auto">
            <div className="recent-product container mx-auto">
              <div className="row grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {data?.map((product) => {
                  return <Product key={product._id} product={product} />;
                })}
              </div>
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
