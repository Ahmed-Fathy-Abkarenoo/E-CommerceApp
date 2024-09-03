import React from "react";
import Style from "./BrandProducts.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Product from "../Product/Product";
import LoadingScreen2 from "../LoadingScreen2/LoadingScreen2";

export default function BrandProducts() {
  let { id } = useParams();
  const [brandDetails, setBrandDetails] = useState(null);
  const [brandProducts, setBrandProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getBrandProducts(id);
    getBrand(id);
    window.scrollTo(0, 0);
  }, []);

  async function getBrandProducts(brandId) {
    setIsLoading(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`
    );

    setBrandProducts(data.data);
    setIsLoading(false);
  }

  async function getBrand(brandId) {
    setIsLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands/" + brandId
    );

    setBrandDetails(data.data);
    setIsLoading(false);
  }

  return (
    <>
      <section className="mt-10 mb-6">
        <div className="container mx-auto">
          {isLoading ? (
            <LoadingScreen2 />
          ) : (
            <>
              <div className="brand-logo flex justify-center items-center">
                <img src={brandDetails?.image} alt="logo" />
              </div>
              <h1 className="text-3xl font-semibold text-green-500">
                {brandDetails?.name} Products:
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                {brandProducts.length != 0 ? (
                  <>
                    {brandProducts.map((product, index) => {
                      return <Product key={index} product={product} />;
                    })}
                  </>
                ) : (
                  <>
                    {brandProducts == 0 && !isLoading && (
                      <div className=" col-span-12">
                        <p className="text-4xl font-medium text-green-500 text-center mb-10 animate__animated animate__slideInLeft">
                          Coming Soon........
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
