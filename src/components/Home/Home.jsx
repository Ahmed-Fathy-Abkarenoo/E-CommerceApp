import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Product from "./../Product/Product";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import CategorySlidre from "../CategorySlidre/CategorySlidre";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getRecentProducts();
    window.scrollTo(0, 0);
  }, []);

  async function getRecentProducts() {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setProducts(data.data);
      setIsLoading(false);
    } catch (error) {}
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>FreshCart</title>
        </Helmet>
      </HelmetProvider>

      <section className="mt-10 mb-6">
        <div className="container mx-auto">
          <div className="">
            <MainSlider />
          </div>
          <div className="w-full my-8">
            <CategorySlidre />
          </div>
          <div>
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <div className="recent-product container mx-auto">
                <div className="row grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {products.map((product) => {
                    return <Product key={product._id} product={product} />;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
