import React, { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import RatingStars from "../RatingStars/RatingStars";
import { Link } from "react-router-dom";
import { addToCart } from "../../services/cartServices";
import { addToWishList } from "../../services/wishListServices";
import { CartCountContext } from "../../Contexts/CartCounter";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { WishedItemsContext } from "../../Contexts/WishedItems";

export default function Product({ product }) {
  const { setCartCount } = useContext(CartCountContext);
  const [wishFlag, setWishFlag] = useState(false);

  const { wishedItems } = useContext(WishedItemsContext);

  const handleWishClick = () => {
    if (wishFlag) {
      removeFromWishList(product._id);
    } else {
      addToWishList(product._id);
    }
    setWishFlag(!wishFlag);
  };

  const handleAddClick = async () => {
    const count = await addToCart(product._id);
    setCartCount(count);
  };

  useEffect(() => {
    const isWished = wishedItems.some((item) => item._id === product._id);
    setWishFlag(isWished);
  }, [wishedItems, product._id]);

  async function removeFromWishList(productId) {
    let { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
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
  }

  return (
    <>
      <div className="col-span-1 product rounded-md">
        <div className="px-2 pb-2">
          <Link to={"/E-CommerceApp/productdetails/" + product._id}>
            <div className="product-image">
              <img
                src={product.imageCover}
                alt="ProductImage"
                className="w-full"
              />
            </div>
            <div className="product-content">
              <h2 className="text-green-500 font-light">
                {product.category.name}
              </h2>
              <h3 className="line-clamp-1">{product.title}</h3>
              <p className="line-clamp-2 my-2">{product.description}</p>
            </div>
          </Link>
          <div className="product-rate flex justify-between">
            <span className="flex items-center gap-1">
              <RatingStars rating={product.ratingsAverage} />
              <span className="bg-blue-200 rounded-md px-2">
                {product.ratingsAverage}
              </span>
            </span>
            <button
              onClick={() => {
                handleWishClick();
              }}>
              <FaHeart className={wishFlag ? "text-red-500" : "text-black"} />
            </button>
          </div>
          <p className="text-lg font-semibold my-3">{product.price} EGP</p>
          <div className="btn text-center">
            <button
              className="w-3/4 bg-green-500 text-white py-1 px-4 rounded-md"
              onClick={() => {
                handleAddClick();
              }}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
