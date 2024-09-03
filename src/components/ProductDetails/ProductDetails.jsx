import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RatingStars from "../RatingStars/RatingStars";
import { FaHeart } from "react-icons/fa6";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import { addToCart } from "../../services/cartServices";
import { addToWishList } from "../../services/wishListServices";
import { CartCountContext } from "../../Contexts/CartCounter";
import LoadingScreen2 from "../LoadingScreen2/LoadingScreen2";

export default function ProductDetails() {
  let { id } = useParams();

  const [productDetail, setProductDetail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [imgSrc, setImgSrc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { cartCount, setCartCount } = useContext(CartCountContext);

  useEffect(() => {
    getProductDetails();
    window.scrollTo(0, 0);
  }, [id]);

  function getProductDetails() {
    setIsLoading(true);
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products/" + id)
      .then(({ data }) => {
        setProductDetail(data.data);
        setImages(Array.from(data.data.images));
        getRelatedProduct(data.data?.category._id);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }

  async function getRelatedProduct(categoryId) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?limit=10&category[in]=${categoryId}`
    );
    console.log(data.data);
    setRelatedProducts(data.data);
  }

  const getImgSrc = (e) => {
    setImgSrc(e.target.getAttribute("src"));
  };

  return (
    <>
      <section className="mt-8 mb-4">
        {isLoading ? (
          <LoadingScreen2 />
        ) : (
          <div className="container mx-auto px-2">
            <div className="flex flex-wrap md:flex-nowrap justify-center gap-4">
              <div className="img-frame md:basis-[40%] md:py-4 h-[80%]">
                <div className="w-full h-[450px]">
                  <img
                    className="h-full w-full md:w-[80%] mx-auto"
                    src={imgSrc ? imgSrc : productDetail?.imageCover}
                    alt=""
                  />
                </div>
                <div className="imgs flex gap-2 overflow-auto mt-4">
                  {images.map((img, index) => {
                    return (
                      <img
                        className="w-1/4 cursor-pointer"
                        src={productDetail.images[index]}
                        alt={img}
                        key={index}
                        onClick={getImgSrc}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="product-details flex-1 md:pt-12">
                <h2 className="text-lg font-medium text-green-500">
                  {productDetail?.title}
                </h2>
                <div className="flex justify-between mt-2">
                  <p className="font-normal">{productDetail?.price} EGP</p>

                  <div className="flex gap-1">
                    <RatingStars rating={productDetail?.ratingsAverage ?? 0} />
                    <span className="bg-blue-200 rounded-md px-3">
                      {productDetail?.ratingsAverage ?? 0}
                    </span>
                  </div>
                </div>

                <hr className="mt-2" />
                <div className="mt-3">
                  <label className="text-sm text-gray-500">Description:</label>
                  <p className="text-sm">{productDetail?.description}</p>
                </div>
                <div className="mt-3">
                  <label className="text-sm text-gray-500">Category:</label>
                  <h3>{productDetail?.category.name}</h3>
                </div>
                <div className="mt-3">
                  <label className="text-sm text-gray-500">SubCategory:</label>
                  <h3>{productDetail?.subcategory[0].name}</h3>
                </div>
                <div className="mt-3">
                  <label className="text-sm text-gray-500">Brand:</label>
                  <h3>{productDetail?.brand.name}</h3>
                </div>
                <hr className="my-2" />
                <div className="mt-3">
                  <label className="text-sm text-gray-500">QTY:</label>
                  <h3>{productDetail?.quantity}</h3>
                </div>
                <div className="flex items-center justify-around mt-6">
                  <button
                    onClick={() => {
                      addToCart(productDetail?._id);
                      setCartCount(cartCount + 1);
                    }}
                    className="bg-green-500 px-6 py-1 rounded-lg text-white">
                    Add To Cart
                  </button>

                  <button
                    onClick={() => {
                      addToWishList(productDetail?._id);
                    }}
                    className="flex items-center gap-1 px-4 py-1 border border-green-500 rounded-lg">
                    Add To WishList <FaHeart />
                  </button>
                </div>
              </div>
            </div>
            <RelatedProducts products={relatedProducts} />
          </div>
        )}
      </section>
    </>
  );
}
