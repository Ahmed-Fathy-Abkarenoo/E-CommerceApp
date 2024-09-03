import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export default function CategorySlidre() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategory();
  }, []);

  async function getAllCategory() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );

    setCategories(data.data);
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          speed: 2000,
          autoplaySpeed: 2000,
          cssEase: "linear",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 2000,
          autoplaySpeed: 2000,
          cssEase: "linear",
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {categories.map((catImg, index) => {
          return (
            <Link to={"/categories/subcategories/" + catImg._id} key={index}>
              <div className="lg:w-40 lg:h-40">
                <img
                  className="w-full h-64 lg:w-40 lg:h-40"
                  src={catImg.image}
                  alt={catImg.name}
                />
              </div>
              <h3 className="w-fit my-2">{catImg.name}</h3>
            </Link>
          );
        })}
      </Slider>
    </>
  );
}
