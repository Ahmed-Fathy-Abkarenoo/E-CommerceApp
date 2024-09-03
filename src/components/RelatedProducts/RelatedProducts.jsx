import React from "react";
import { Link } from "react-router-dom";

export default function RelatedProducts({ products }) {
  return (
    <>
      <div className="mt-9 mb-8">
        <h2 className="text-2xl font-bold mb-4">More Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {products?.map((reProduct, index) => {
            return (
              <div
                className="col-span-1 product  shadow-2xl rounded-lg cursor-pointer"
                key={index}>
                <Link to={"/productdetails/" + reProduct._id}>
                  <div className="p-4">
                    <div>
                      <img
                        className="w-full"
                        src={reProduct.imageCover}
                        alt=""
                      />
                      <button></button>
                    </div>
                    <h3 className="font-light">{reProduct.brand.name}</h3>
                    <p className="text-sm font-bold">{reProduct.price} EGP</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
