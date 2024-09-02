import React, { useRef } from "react";
import Style from "./MainSlider.module.css";
import { useEffect } from "react";
import Slider from "react-slick";
import cover1 from "../../assets/images/ps.jpeg";
import cover2 from "../../assets/images/—Pngtree—fruits tropical_4172131.png";
import slideImg1 from "../../assets/images/slider-image-1.jpeg";
import slideImg2 from "../../assets/images/slider-image-2.jpeg";
import slideImg3 from "../../assets/images/slider-image-3.jpeg";

export default function MainSlider() {
  useEffect(() => {}, []);

  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="flex justify-center items-center flex-wrap">
        <div className="flex-auto lg:basis-3/4 overflow-hidden">
          <div className="slider-container">
            <Slider
              ref={(slider) => {
                sliderRef = slider;
              }}
              {...settings}>
              <img
                src={slideImg1}
                className="lg:w-full lg:h-[400px]"
                alt="slideImg1"
              />
              <img
                src={slideImg2}
                className="lg:w-full lg:h-[400px]"
                alt="slideImg2"
              />
              <img
                src={slideImg3}
                className="lg:w-full lg:h-[400px]"
                alt="slideImg3"
              />
            </Slider>
          </div>
          <div style={{ textAlign: "center" }}>
            <button className="button" onClick={previous}></button>
            <button className="button" onClick={next}></button>
          </div>
        </div>
        <div className="flex justify-center flex-auto  mt-4 lg:block lg:basis-1/4 lg:mt-0 ">
          <img
            src={cover1}
            className="w-32 md:w-48 lg:w-full lg:h-[190px]"
            alt="cover1"
          />
          <img
            src={cover2}
            className="w-32 md:w-48 lg:w-full lg:h-[190px]"
            alt="cover2"
          />
        </div>
      </div>
    </>
  );
}
