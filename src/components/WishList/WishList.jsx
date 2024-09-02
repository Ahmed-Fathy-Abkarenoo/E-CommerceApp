import React from "react";
import Style from "./WishList.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import CartItems from "../CartItems/CartItems";
import WishItem from "../WishItem/WishItem";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Helmet, HelmetProvider } from "react-helmet-async";
import LoadingScreen2 from "../LoadingScreen2/LoadingScreen2";

export default function WishList() {
  const [wishListItems, setWishListItems] = useState([]);
  const [wishCount, setWishCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    getWishList();
    window.scrollTo(0, 0);
  }, []);

  async function getWishList() {
    setIsLoading(true);

    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: {
          token: localStorage.getItem("Token"),
        },
      }
    );

    // console.log(data);
    setWishCount(data.count);
    setWishListItems(data.data);
    setIsLoading(false);
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>WishList</title>
        </Helmet>
      </HelmetProvider>

      <section className="mt-10 mb-6 dark:bg-slate-800">
        <div className="container mx-auto">
          <div className="section-title text-center">
            <h1 className="text-3xl font-bold text-green-500 mb-3">
              Your Favorite items
            </h1>
            <p>
              You have
              <span className="bg-green-500 text-white rounded-md px-2 py-1 mx-2">
                {wishCount}
              </span>
              Items in this List
            </p>
          </div>
          <div className="mt-8 md:px-16">
            {wishListItems.length > 0 && isLoading && <LoadingScreen />}

            {wishListItems.length == 0 ? (
              <LoadingScreen2 />
            ) : (
              <WishItem
                wishListItems={wishListItems}
                getWishList={getWishList}
              />
            )}

            {/* <WishItem wishListItems={wishListItems} getWishList={getWishList} /> */}
          </div>
        </div>
      </section>
    </>
  );
}
