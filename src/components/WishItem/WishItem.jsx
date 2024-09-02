import React, { useContext } from "react";
import Style from "./WishItem.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../../services/cartServices";
import { CartCountContext } from "../../Contexts/CartCounter";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

export default function WishItem({ wishListItems, getWishList }) {
  const [counter, setCounter] = useState(0);
  const { cartCount, setCartCount } = useContext(CartCountContext);

  useEffect(() => {}, []);

  async function removeFromWishList(productId) {
    let { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        headers: {
          token: localStorage.getItem("Token"),
        },
      }
    );

    // console.log(data);

    toast.success("Item Removed", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

    getWishList();
  }

  return (
    <>
      <div className="space-y-4">
        {wishListItems.map((item, index) => {
          return (
            <div
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-4"
              key={index}>
              <div className="space-y-4 md:flex md:items-center md:justify-between">
                <Link
                  to={"/productdetails/" + item._id}
                  className="shrink-0 md:order-1 mr-10">
                  <img
                    className="h-28 w-28"
                    src={item?.imageCover}
                    alt="imac image"
                  />
                </Link>
                <div className="flex items-center justify-between md:order-3 md:justify-end md:gap-28">
                  <div>
                    {item.quantity > 0 ? (
                      <p className="bg-gray-100 rounded-lg text-green-500 px-2 py-1 text-sm font-semibold">
                        In Stock
                      </p>
                    ) : (
                      <p className="bg-gray-100 rounded-lg text-red-500 px-2 py-1 text-sm font-semibold">
                        Stock Out
                      </p>
                    )}
                  </div>
                  <div className="text-end md:order-4 md:w-28">
                    <p className="text-base font-bold text-gray-900 dark:text-white">
                      {item.price} EGP
                    </p>
                  </div>
                </div>
                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                  <Link
                    to={"/productdetails/" + item._id}
                    className="text-base font-bold text-green-500 hover:underline dark:text-white">
                    {item.title}
                  </Link>
                  <p className="text-sm font-light">
                    <span className="text-sm font-semibold mr-1">
                      Category:
                    </span>
                    {item.category.name}
                  </p>
                  <p className="text-sm font-light">
                    <span className="text-sm font-semibold mr-1">Brand:</span>
                    {item.brand.name}
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => {
                        addToCart(item._id);
                        setCartCount(cartCount + 1);
                      }}
                      type="button"
                      className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                      <FaShoppingCart />
                      Add to Cart
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        removeFromWishList(item._id);
                      }}
                      className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                      <svg
                        className="me-1.5 h-5 w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18 17.94 6M18 18 6.06 6"
                        />
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
