import React, { useContext } from "react";
import Style from "./Product.module.css";
import { FaHeart } from "react-icons/fa6";
import RatingStars from "../RatingStars/RatingStars";
import { Link } from "react-router-dom";
import { addToCart } from "../../services/cartServices";
import { addToWishList } from "../../services/wishListServices";
import { CartCountContext } from "../../Contexts/CartCounter";

export default function Product({ product }) {
  const { cartCount, setCartCount } = useContext(CartCountContext);

  return (
    <>
      <div className="col-span-1 product rounded-md">
        <div className="px-2 pb-2">
          <Link to={"/productdetails/" + product._id}>
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
              {/* <MdStarRate /> */}
              <span className="bg-blue-200 rounded-md px-2">
                {product.ratingsAverage}
              </span>
            </span>
            <button
              onClick={() => {
                addToWishList(product._id);
              }}>
              <FaHeart />
            </button>
          </div>
          <p className="text-lg font-semibold my-3">{product.price} EGP</p>
          <div className="btn text-center">
            <button
              className="w-3/4 bg-green-500 text-white py-1 px-4 rounded-md"
              onClick={() => {
                addToCart(product._id);
                setCartCount(cartCount + 1);
              }}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
