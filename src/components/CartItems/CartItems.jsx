import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { addToWishList } from "../../services/wishListServices";
import { CartCountContext } from "../../Contexts/CartCounter";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa6";

export default function CartItems({ item, setCartItems, setDataLoading }) {
  const [isLoadingIncrese, setIsLoadingIncrese] = useState(false);
  const [isLoadingDecrese, setIsLoadingDecrese] = useState(false);
  const [productCount, setProductCount] = useState(item.count);
  const { setCartCount } = useContext(CartCountContext);

  async function removeFromCart(productId) {
    setDataLoading(true);
    let { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        headers: {
          token: localStorage.getItem("Token"),
        },
      }
    );

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

    setCartItems(data);
    setCartCount(data.numOfCartItems);

    setDataLoading(false);
  }

  async function updateItemQuantity(productId, count) {
    let { data } = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        count: count,
      },
      {
        headers: {
          token: localStorage.getItem("Token"),
        },
      }
    );

    setCartItems(data);
    setCartCount(data.numOfCartItems);
    setProductCount(count);
    setIsLoadingDecrese(false);
    setIsLoadingIncrese(false);
  }

  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-4">
        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
          <Link
            to={"/productdetails/" + item.product._id}
            className="shrink-0 md:order-1">
            <img
              className="h-28 w-28"
              src={item.product.imageCover}
              alt="imac image"
            />
          </Link>
          <div className="flex items-center justify-between md:order-3 md:justify-end md:gap-12">
            {/* <div>
              {item.product.quantity > 0 ? (
                <p className="bg-gray-100 rounded-lg text-green-500 px-2 py-1 text-sm font-semibold">
                  In Stock
                </p>
              ) : (
                <p className="bg-gray-100 rounded-lg text-red-500 px-2 py-1 text-sm font-semibold">
                  Stock Out
                </p>
              )}
            </div> */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => {
                  updateItemQuantity(item.product._id, item.count - 1);
                  setIsLoadingDecrese(true);
                }}
                disabled={item.count == 1 || isLoadingDecrese}
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 disabled:hover:bg-gray-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                {isLoadingDecrese ? (
                  <FaSpinner className="loading-icon" />
                ) : (
                  <svg
                    className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 1h16"
                    />
                  </svg>
                )}
              </button>
              <input
                type="text"
                onBlur={() => {
                  item.count != productCount &&
                    updateItemQuantity(item.product._id, productCount);
                }}
                onChange={(e) => {
                  setProductCount(e.target.value);
                }}
                className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                value={productCount}
              />
              <button
                type="button"
                onClick={() => {
                  updateItemQuantity(item.product._id, item.count + 1);
                  setIsLoadingIncrese(true);
                }}
                disabled={isLoadingIncrese}
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 disabled:cursor-not-allowed">
                {isLoadingIncrese ? (
                  <FaSpinner className="loading-icon" />
                ) : (
                  <svg
                    className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className="text-end md:order-4 md:w-32">
              <p className="text-base font-bold text-gray-900 dark:text-white">
                {item.price} EGP
              </p>
            </div>
          </div>
          <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
            <Link
              to={"/productdetails/" + item.product._id}
              className="text-base font-bold text-green-500 hover:underline dark:text-white">
              {item.product.title}
            </Link>
            <p className="text-sm font-light">
              <span className="text-sm font-semibold mr-1">Category:</span>
              {item.product.category.name}
            </p>
            <p className="text-sm font-light">
              <span className="text-sm font-semibold mr-1">Brand:</span>
              {item.product.brand.name}
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  addToWishList(item.product._id);
                }}
                type="button"
                className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
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
                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                  />
                </svg>
                Add to Favorites
              </button>
              <button
                onClick={() => {
                  removeFromCart(item.product._id);
                }}
                type="button"
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
    </>
  );
}
