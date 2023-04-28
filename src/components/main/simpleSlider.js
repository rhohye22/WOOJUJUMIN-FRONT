import React, { Component } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SimpleSlider() {
  const imgUrl = require("./free-icon-chatbot-6819697.png");

  const items = [
    { id: 1, url: imgUrl },
    { id: 2, url: imgUrl },
    { id: 3, url: imgUrl },
  ];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    /*   autoplay: true, */
    speed: 3000, //바뀌는 속도
    autoplaySpeed: 5000, //멈춰있는 시간
    cssEase: "linear",
  };
  return (
    <div className="slidearea">
      <Slider {...settings}>
        {items.map((item) => {
          return (
            <div key={item.id} className="slideimg">
              <img src={item.url} alt="noimage" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
export default SimpleSlider;
